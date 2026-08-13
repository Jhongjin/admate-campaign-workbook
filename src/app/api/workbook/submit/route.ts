import { NextResponse } from "next/server";
import { buildWorkbookXlsx, makeReceiptNo } from "@/lib/workbook/build-xlsx";
import { DEFAULT_TO, sendWorkbookMail } from "@/lib/workbook/mailer";
import type { SubmitPayload, WorkbookDraft } from "@/lib/workbook/types";

export const runtime = "nodejs";
// 첨부 파일을 만들어 보내므로 캐시하지 않습니다.
export const dynamic = "force-dynamic";

const REQUIRED_CONSENTS = 4;

/** 서버에서 다시 확인하는 최소 조건 — 브라우저 검사만 믿지 않습니다. */
function validate(draft: WorkbookDraft, consents: string[]) {
  const problems: string[] = [];
  const c = draft?.contact;
  if (!c) return ["작성 내용을 읽을 수 없습니다."];

  if (!c.company?.trim()) problems.push(c.partnerType === "agency" ? "대행사명" : "회사명");
  if (!c.brand?.trim()) problems.push("브랜드명");
  if (!c.name?.trim()) problems.push("담당자명");
  if (!/^\S+@\S+\.\S+$/.test(c.email ?? "")) problems.push("업무 이메일");
  if (c.partnerType === "agency" && !c.advertiser?.trim()) problems.push("광고주 회사명");

  if (!draft.campaigns?.length) problems.push("캠페인");
  draft.campaigns?.forEach((x, i) => {
    if (!x.name?.trim()) problems.push(`캠페인 ${i + 1} 이름`);
    if (!x.budget || Number(x.budget) <= 0) problems.push(`캠페인 ${i + 1} 예산`);
    if (!x.startDate || !x.endDate) problems.push(`캠페인 ${i + 1} 기간`);
  });

  if (!draft.products?.length) problems.push("상품·서비스");
  draft.products?.forEach((x, i) => {
    if (!x.name?.trim()) problems.push(`상품 ${i + 1} 이름`);
    if (!x.summary?.trim()) problems.push(`상품 ${i + 1} 한 줄 소개`);
    if (!x.url?.startsWith("http")) problems.push(`상품 ${i + 1} 연결 페이지`);
  });

  if (!draft.policy?.tone?.trim()) problems.push("원하는 문체와 분위기");
  if (!draft.policy?.banned?.trim()) problems.push("사용하면 안 되는 표현");

  if (!Array.isArray(consents) || consents.length < REQUIRED_CONSENTS) {
    problems.push("제출 전 확인 항목 동의");
  }
  return problems;
}

/** 브리프 한 건은 수십 KB면 충분합니다. 그보다 큰 요청은 받지 않습니다. */
const MAX_BODY_BYTES = 512 * 1024;

export async function POST(request: Request) {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "작성 내용이 너무 큽니다." }, { status: 413 });
  }

  let payload: SubmitPayload;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "작성 내용이 너무 큽니다." }, { status: 413 });
    }
    payload = JSON.parse(raw) as SubmitPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "요청을 읽을 수 없습니다." }, { status: 400 });
  }

  const draft = payload?.draft;
  const consents = payload?.consents ?? [];
  if (!draft) {
    return NextResponse.json({ ok: false, error: "작성 내용이 비어 있습니다." }, { status: 400 });
  }

  const problems = validate(draft, consents);
  if (problems.length) {
    return NextResponse.json(
      { ok: false, error: "확인이 필요한 항목이 있습니다.", problems },
      { status: 422 },
    );
  }

  const now = new Date();
  const meta = { receiptNo: makeReceiptNo(now), submittedAt: now.toISOString() };

  let built;
  try {
    built = await buildWorkbookXlsx(draft, meta);
  } catch (err) {
    console.error("[workbook] xlsx build failed", err);
    return NextResponse.json(
      { ok: false, error: "워크북 파일을 만들지 못했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }

  const mail = await sendWorkbookMail({ draft, meta, fileName: built.fileName, buffer: built.buffer });

  if (!mail.sent && mail.reason === "failed") {
    console.error("[workbook] mail failed", mail.message);
  }
  if (built.skipped.length) {
    console.warn("[workbook] 값을 넣지 못한 시트", built.skipped);
  }

  return NextResponse.json({
    ok: true,
    receiptNo: meta.receiptNo,
    submittedAt: meta.submittedAt,
    fileName: built.fileName,
    mailTo: process.env.WORKBOOK_MAIL_TO || DEFAULT_TO,
    mailSent: mail.sent,
    // 메일 발송이 안 된 경우에만 브라우저에서 직접 내려받을 수 있게 파일을 함께 돌려줍니다.
    file: mail.sent ? null : built.buffer.toString("base64"),
    notice: mail.sent
      ? null
      : mail.reason === "not-configured"
        ? "메일 발송이 아직 설정되지 않아 파일을 직접 내려받도록 안내합니다."
        : "메일 발송에 실패해 파일을 직접 내려받도록 안내합니다.",
  });
}
