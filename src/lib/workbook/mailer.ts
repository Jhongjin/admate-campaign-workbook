/**
 * 접수 메일 발송 — 검증 전까지 Resend를 기본으로 유지하고, 명시 전환 시에만 사내 SMTP를 씁니다.
 *
 * 필요한 환경변수
 *   WORKBOOK_MAIL_TRANSPORT  "resend"(기본) 또는 "smtp". SMTP 전환은 검증 후 명시합니다.
 *   SMTP_HOST           사내 SMTP Relay 주소. WORKBOOK_MAIL_TRANSPORT=smtp 일 때만 씁니다.
 *   SMTP_PORT           SMTP 포트 (기본: 25)
 *   SMTP_USER / SMTP_PASS SMTP 인증 정보. IP 허용 Relay라면 둘 다 생략할 수 있습니다.
 *   SMTP_REQUIRE_TLS    STARTTLS 강제 여부 (기본: true)
 *   RESEND_API_KEY      SMTP Relay가 없을 때만 쓰는 기존 Resend API 키
 *   WORKBOOK_MAIL_FROM  보내는 사람 (기본: KT nasmedia OpenAI Ads <alert@nasmedia.co.kr>)
 *   WORKBOOK_MAIL_TO    받는 사람 (기본: openai@nasmedia.co.kr, 콤마로 여러 명)
 *   WORKBOOK_MAIL_CC    참조 (선택, 콤마로 여러 명)
 */

import nodemailer from "nodemailer";
import { Resend } from "resend";
import { COLLECT_CONTACT_PII } from "./privacy";
import type { SubmissionMeta, WorkbookDraft } from "./types";

export const DEFAULT_TO = "openai@nasmedia.co.kr";
const DEFAULT_FROM = "KT nasmedia OpenAI Ads <alert@nasmedia.co.kr>";

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
    ...(COLLECT_CONTACT_PII ? [row("담당자", `${c.name}${c.phone ? ` · ${c.phone}` : ""}`), row("업무 이메일", c.email)] : []),
    !isAgency && c.hasAgency ? row("대행사", `${c.agencyCompany}${COLLECT_CONTACT_PII && c.agencyName ? ` · ${c.agencyName}` : ""}`) : "",
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
      ${COLLECT_CONTACT_PII && c.email ? `<p style="margin:16px 0 0;color:#6b7280;font-size:13px">회신은 제출 담당자(${escapeHtml(c.email)})에게 바로 전달됩니다.</p>` : ""}
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
    COLLECT_CONTACT_PII ? `담당자: ${c.name} / ${c.email} / ${c.phone}` : "",
    "",
    `캠페인 ${draft.campaigns.length}건 · 상품 ${draft.products.length}건 · 이미지 ${draft.creatives.length}건`,
    `첨부: ${fileName}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function smtpPort() {
  const parsed = Number(process.env.SMTP_PORT ?? "25");
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 65535 ? parsed : 25;
}

async function sendViaSmtp(args: {
  draft: WorkbookDraft;
  meta: SubmissionMeta;
  fileName: string;
  buffer: Buffer;
  to: string[];
  cc: string[];
  from: string;
}): Promise<SendResult> {
  const host = process.env.SMTP_HOST?.trim();
  if (!host) return { sent: false, reason: "not-configured" };

  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (Boolean(user) !== Boolean(pass)) {
    return { sent: false, reason: "failed", message: "SMTP 인증 정보가 완전하지 않습니다." };
  }

  // 외부 호스팅 환경에서 계정 비밀번호를 평문으로 전송하지 않도록 기본값은 fail-closed입니다.
  const requireTls = process.env.SMTP_REQUIRE_TLS !== "false";
  const transporter = nodemailer.createTransport({
    host,
    port: smtpPort(),
    // port 25는 일반적으로 STARTTLS 협상용입니다. SMTPS(465)를 쓰는 경우에만 true로 설정합니다.
    secure: process.env.SMTP_SECURE === "true",
    requireTLS: requireTls,
    ...(user && pass ? { auth: { user, pass } } : {}),
    ...(requireTls ? { tls: { minVersion: "TLSv1.2" as const } } : {}),
  });

  const label = args.draft.contact.brand || args.draft.contact.company || "브랜드 미기재";
  try {
    const result = await transporter.sendMail({
      from: args.from,
      to: args.to,
      ...(args.cc.length ? { cc: args.cc } : {}),
      ...(COLLECT_CONTACT_PII && args.draft.contact.email ? { replyTo: args.draft.contact.email } : {}),
      subject: `[OpenAI Ads 브리프] ${label} · ${args.meta.receiptNo}`,
      html: buildHtml(args.draft, args.meta, args.fileName),
      text: buildText(args.draft, args.meta, args.fileName),
      attachments: [{ filename: args.fileName, content: args.buffer }],
    });
    return { sent: true, id: result.messageId ?? null };
  } catch (err) {
    return { sent: false, reason: "failed", message: err instanceof Error ? err.message : String(err) };
  } finally {
    transporter.close();
  }
}

export async function sendWorkbookMail(args: {
  draft: WorkbookDraft;
  meta: SubmissionMeta;
  fileName: string;
  buffer: Buffer;
}): Promise<SendResult> {
  const to = list(process.env.WORKBOOK_MAIL_TO, DEFAULT_TO);
  const cc = list(process.env.WORKBOOK_MAIL_CC);
  const from = process.env.WORKBOOK_MAIL_FROM || DEFAULT_FROM;
  const { draft, meta, fileName, buffer } = args;
  const label = draft.contact.brand || draft.contact.company || "브랜드 미기재";

  // SMTP 자격증명이 먼저 등록되더라도, 명시 전환 전에는 기존 Resend 발송을 유지합니다.
  if (process.env.WORKBOOK_MAIL_TRANSPORT === "smtp") {
    return sendViaSmtp({ draft, meta, fileName, buffer, to, cc, from });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "not-configured" };

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      ...(cc.length ? { cc } : {}),
      ...(COLLECT_CONTACT_PII && draft.contact.email ? { replyTo: draft.contact.email } : {}),
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
