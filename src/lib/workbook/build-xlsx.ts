/**
 * 폼 입력을 통합워크북 xlsx 로 만듭니다.
 *
 * 실물 양식(template.xlsx)을 열어 시트를 찾아 값만 채웁니다 — 서식·안내문·드롭다운이
 * 그대로 남습니다. adgroups·ads 는 AI 에이전트가 채우는 시트라 건드리지 않습니다.
 * 양식을 못 읽는 예외 상황에서는 같은 컬럼 구성으로 새 파일을 만들어 접수는 이어집니다.
 */

import ExcelJS from "exceljs";
import { SHEETS, type AppendSheet, type CellValue, type FixedSheet, type SheetSpec } from "./template";
import { TEMPLATE_BASE64 } from "./template-data";
import type { SubmissionMeta, WorkbookDraft } from "./types";

/** 병합 셀 등에서 text 접근이 던지는 경우가 있어 감싸 둡니다. */
function text(cell: ExcelJS.Cell | undefined) {
  try {
    return cell && cell.text != null ? String(cell.text) : "";
  } catch {
    return "";
  }
}

/** 시트명·헤더 비교용 정규화 — 공백, 가운뎃점, 괄호, 언더스코어 차이를 무시합니다. */
function norm(value: string) {
  return value.toLowerCase().replace(/[\s·・_\-()[\]{}]/g, "");
}

/** 실물 양식은 접두·접미가 붙으므로 부분 일치로 시트를 찾습니다. */
function findSheet(wb: ExcelJS.Workbook, spec: SheetSpec) {
  const exact = wb.worksheets.find((ws) => norm(ws.name) === norm(spec.sheetName));
  if (exact) return exact;
  const tokens = spec.match.map(norm);
  return wb.worksheets.find((ws) => tokens.some((t) => norm(ws.name).includes(t)));
}

/** 우리 컬럼 이름이 가장 많이 맞는 행을 헤더 행으로 봅니다. */
function findHeaderRow(ws: ExcelJS.Worksheet, spec: AppendSheet) {
  const wanted = spec.columns.map((c) => norm(c.header));
  let best = { row: 0, hits: 0 };
  const limit = Math.min(Math.max(ws.rowCount, 1), 30);
  for (let r = 1; r <= limit; r += 1) {
    let hits = 0;
    for (let c = 1; c <= Math.max(ws.columnCount, 1); c += 1) {
      const t = norm(text(ws.getCell(r, c)));
      if (t && wanted.includes(t)) hits += 1;
    }
    if (hits > best.hits) best = { row: r, hits };
  }
  if (best.hits >= 2) return best.row;
  // 헤더 문구가 바뀐 양식이면 정의해 둔 행 번호를 씁니다.
  return spec.headerRow;
}

/** 헤더 이름 → 열 번호. 양식에서 컬럼 순서가 달라도 이름으로 맞춥니다. */
function headerIndex(ws: ExcelJS.Worksheet, headerRow: number) {
  const map = new Map<string, number>();
  for (let c = 1; c <= Math.max(ws.columnCount, 1); c += 1) {
    const t = norm(text(ws.getCell(headerRow, c)));
    if (t && !map.has(t)) map.set(t, c);
  }
  return map;
}

/** 헤더 아래에서 값이 모두 빈 첫 행 — 양식의 예시·안내 행을 덮어쓰지 않습니다. */
function firstFreeRow(ws: ExcelJS.Worksheet, headerRow: number) {
  const limit = Math.max(ws.rowCount, headerRow) + 1;
  for (let r = headerRow + 1; r <= limit; r += 1) {
    let filled = false;
    for (let c = 1; c <= Math.max(ws.columnCount, 1); c += 1) {
      if (text(ws.getCell(r, c)).trim()) { filled = true; break; }
    }
    if (!filled) return r;
  }
  return limit;
}

function appendIntoSheet(ws: ExcelJS.Worksheet, spec: AppendSheet, rows: Record<string, CellValue>[]) {
  if (!rows.length) return true;
  const headerRow = findHeaderRow(ws, spec);
  const index = headerIndex(ws, headerRow);
  if (!index.size) return false;

  let target = firstFreeRow(ws, headerRow);
  for (const data of rows) {
    const row = ws.getRow(target);
    for (const col of spec.columns) {
      const at = index.get(norm(col.header));
      if (!at) continue;
      const value = data[col.key];
      if (value === undefined || value === "") continue;
      row.getCell(at).value = value;
    }
    row.commit();
    target += 1;
  }
  return true;
}

function writeFixedCells(ws: ExcelJS.Worksheet, spec: FixedSheet, draft: WorkbookDraft, meta: SubmissionMeta) {
  const cells = spec.cells(draft, meta);
  if (!cells.length) return false;
  for (const { ref, value } of cells) ws.getCell(ref).value = value;
  return true;
}

/* ------------------------------------------------------ 양식이 없을 때의 대비책 */

const HEADER_FILL: ExcelJS.Fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F3A5F" } };

function createSheet(
  wb: ExcelJS.Workbook,
  name: string,
  preamble: string[],
  columns: { header: string; key: string; width?: number }[],
  rows: Record<string, CellValue>[],
) {
  const safeName = name.replace(/[*?:/\\[\]]/g, "").slice(0, 31);
  const ws = wb.addWorksheet(safeName);
  ws.columns = columns.map((c) => ({ key: c.key, width: c.width ?? 24 }));

  let r = 1;
  preamble.forEach((line, i) => {
    const cell = ws.getCell(r, 1);
    cell.value = line;
    cell.font = i === 0 ? { bold: true, size: 13 } : { size: 10, color: { argb: "FF6B7280" } };
    r += 1;
  });

  const header = ws.getRow(r);
  columns.forEach((c, i) => {
    const cell = header.getCell(i + 1);
    cell.value = c.header;
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = HEADER_FILL;
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  });
  header.height = 24;
  header.commit();
  ws.views = [{ state: "frozen", ySplit: r }];
  r += 1;

  for (const data of rows) {
    const row = ws.getRow(r);
    columns.forEach((c, i) => {
      const value = data[c.key];
      const cell = row.getCell(i + 1);
      cell.value = value === undefined ? "" : value;
      cell.alignment = { vertical: "top", wrapText: true };
    });
    row.commit();
    r += 1;
  }
  return ws;
}

/* ------------------------------------------------------------------ 공개 API */

export type BuildResult = {
  buffer: Buffer;
  fileName: string;
  /** 실물 양식을 열어 채웠는지 (false 면 대비책으로 새로 만든 파일) */
  usedTemplate: boolean;
  /** 값을 넣지 못한 시트 이름 — 운영자 확인용 */
  skipped: string[];
};

/** 접수번호 — NM-20260805-4KQ2 형태입니다. */
export function makeReceiptNo(now: Date) {
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NM-${date}-${rand}`;
}

function safeName(part: string) {
  return part.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, "_").slice(0, 40) || "브리프";
}

export async function buildWorkbookXlsx(
  draft: WorkbookDraft,
  meta: SubmissionMeta,
): Promise<BuildResult> {
  const wb = new ExcelJS.Workbook();
  const skipped: string[] = [];
  let usedTemplate = false;

  try {
    const bytes = Buffer.from(TEMPLATE_BASE64, "base64");
    // ExcelJS 타입 정의는 Node Buffer 대신 ArrayBuffer 계열을 요구합니다.
    await wb.xlsx.load(bytes as unknown as ArrayBuffer);
    usedTemplate = wb.worksheets.length > 0;
  } catch {
    usedTemplate = false;
  }

  if (!usedTemplate) {
    wb.creator = "KT nasmedia · OpenAI Ads 브리프";
  }

  for (const spec of SHEETS) {
    const existing = usedTemplate ? findSheet(wb, spec) : undefined;

    if (spec.kind === "append") {
      const rows = spec.rows(draft, meta);
      if (existing) {
        if (appendIntoSheet(existing, spec, rows)) continue;
        skipped.push(spec.sheetName);
        continue;
      }
      createSheet(wb, spec.sheetName, spec.preamble ?? [spec.sheetName], spec.columns, rows);
      continue;
    }

    if (existing) {
      if (writeFixedCells(existing, spec, draft, meta)) continue;
      // 양식에는 있는데 넣을 값이 없으면 그대로 둡니다.
      if (spec.cells(draft, meta).length === 0 && spec.sheetName !== "담당자·제출정보") continue;
    }
    createSheet(wb, spec.sheetName, [spec.sheetName], spec.fallback, spec.fallbackRows(draft, meta));
  }

  const brand = safeName(draft.contact.brand || draft.contact.company);
  const day = meta.submittedAt.slice(0, 10).replace(/-/g, "");
  const fileName = `OpenAI_Ads_통합워크북_${brand}_${day}_${meta.receiptNo}.xlsx`;
  const buffer = Buffer.from(await wb.xlsx.writeBuffer());
  return { buffer, fileName, usedTemplate, skipped };
}
