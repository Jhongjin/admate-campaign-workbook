/**
 * 접수 메일 발송 — Resend 를 씁니다.
 *
 * 필요한 환경변수
 *   RESEND_API_KEY      Resend API 키 (없으면 발송하지 않고 브라우저 내려받기로 대체)
 *   WORKBOOK_MAIL_FROM  보내는 사람 (기본: OpenAI Ads 브리프 <noreply@nasmedia.co.kr>)
 *   WORKBOOK_MAIL_TO    받는 사람 (기본: openai@nasmedia.co.kr, 콤마로 여러 명)
 *   WORKBOOK_MAIL_CC    참조 (선택, 콤마로 여러 명)
 */

import { Resend } from "resend";
import type { SubmissionMeta, WorkbookDraft } from "./types";

export const DEFAULT_TO = "openai@nasmedia.co.kr";
const DEFAULT_FROM = "OpenAI Ads 브리프 <noreply@nasmedia.co.kr>";

export type SendResult =
  | { sent: true; id: string | null }
  | { sent: false; reason: "not-configured" | "failed"; message?: string };

function list(value: string | undefined, fallback = "") {
  return (value ?? fallback)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rawRow(label: string, html: string) {
  return `<tr>
    <th align="left" style="padding:7px 14px 7px 0;color:#6b7280;font-weight:600;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</th>
    <td style="padding:7px 0;color:#111827">${html || "—"}</td>
  </tr>`;
}

function row(label: string, value: string) {
  return rawRow(label, escapeHtml(value));
}

function buildHtml(draft: WorkbookDraft, meta: SubmissionMeta, fileName: string) {
  const c = draft.contact;
  const isAgency = c.partnerType === "agency";
  const period = draft.campaigns
    .map((x) => escapeHtml(`${x.name || "이름 없음"} (${x.startDate || "?"} ~ ${x.endDate || "?"})`))
    .join("<br />");

  const rows = [
    row("접수번호", meta.receiptNo),
    row("제출일시", meta.submittedAt.replace("T", " ").slice(0, 16)),
    row("작성자 구분", isAgency ? "대행사" : "광고주"),
    row(isAgency ? "대행사명" : "회사명", c.company),
    isAgency ? row("광고주 회사명", c.advertiser) : "",
    row("브랜드명", c.brand),
    row("담당자", `${c.name}${c.phone ? ` · ${c.phone}` : ""}`),
    row("업무 이메일", c.email),
    !isAgency && c.hasAgency ? row("대행사", `${c.agencyCompany}${c.agencyName ? ` · ${c.agencyName}` : ""}`) : "",
  ].join("");

  const counts = [
    row("캠페인", `${draft.campaigns.length}건`),
    row("상품·서비스", `${draft.products.length}건`),
    row("광고 이미지", `${draft.creatives.length}건`),
  ].join("");

  return `<!doctype html>
<html lang="ko"><body style="margin:0;padding:24px;background:#f6f7fb;font-family:'Malgun Gothic','Apple SD Gothic Neo',sans-serif;font-size:14px;line-height:1.7;color:#111827">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden">
    <div style="padding:22px 26px;background:#0f1724;color:#fff">
      <div style="font-size:12px;letter-spacing:.12em;color:#9cc4ff;font-weight:700">KT NASMEDIA · OPENAI ADS</div>
      <div style="margin-top:6px;font-size:19px;font-weight:700">브리프 워크북이 제출되었습니다</div>
    </div>
    <div style="padding:24px 26px">
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      <hr style="margin:20px 0;border:0;border-top:1px solid #eef0f4" />
      <table style="width:100%;border-collapse:collapse">${counts}${rawRow("캠페인 기간", period)}</table>
      <hr style="margin:20px 0;border:0;border-top:1px solid #eef0f4" />
      <p style="margin:0 0 6px;font-weight:700">첨부 파일</p>
      <p style="margin:0;color:#4b5563">${escapeHtml(fileName)}</p>
      <p style="margin:16px 0 0;color:#6b7280;font-size:13px">
        회신은 제출 담당자(${escapeHtml(c.email)})에게 바로 전달됩니다.
      </p>
    </div>
  </div>
</body></html>`;
}

function buildText(draft: WorkbookDraft, meta: SubmissionMeta, fileName: string) {
  const c = draft.contact;
  return [
    "OpenAI Ads 브리프 워크북이 제출되었습니다.",
    "",
    `접수번호: ${meta.receiptNo}`,
    `제출일시: ${meta.submittedAt}`,
    `작성자 구분: ${c.partnerType === "agency" ? "대행사" : "광고주"}`,
    `${c.partnerType === "agency" ? "대행사명" : "회사명"}: ${c.company}`,
    c.partnerType === "agency" ? `광고주 회사명: ${c.advertiser}` : "",
    `브랜드명: ${c.brand}`,
    `담당자: ${c.name} / ${c.email} / ${c.phone}`,
    "",
    `캠페인 ${draft.campaigns.length}건 · 상품 ${draft.products.length}건 · 이미지 ${draft.creatives.length}건`,
    `첨부: ${fileName}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendWorkbookMail(args: {
  draft: WorkbookDraft;
  meta: SubmissionMeta;
  fileName: string;
  buffer: Buffer;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "not-configured" };

  const to = list(process.env.WORKBOOK_MAIL_TO, DEFAULT_TO);
  const cc = list(process.env.WORKBOOK_MAIL_CC);
  const from = process.env.WORKBOOK_MAIL_FROM || DEFAULT_FROM;
  const { draft, meta, fileName, buffer } = args;
  const label = draft.contact.brand || draft.contact.company || "브랜드 미기재";

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      ...(cc.length ? { cc } : {}),
      ...(draft.contact.email ? { replyTo: draft.contact.email } : {}),
      subject: `[OpenAI Ads 브리프] ${label} · ${meta.receiptNo}`,
      html: buildHtml(draft, meta, fileName),
      text: buildText(draft, meta, fileName),
      attachments: [{ filename: fileName, content: buffer.toString("base64") }],
    });
    if (error) return { sent: false, reason: "failed", message: error.message };
    return { sent: true, id: data?.id ?? null };
  } catch (err) {
    return { sent: false, reason: "failed", message: err instanceof Error ? err.message : String(err) };
  }
}
