/**
 * 통합워크북 양식 매핑 — 폼 입력을 실물 워크북의 어느 시트·어느 칸에 넣을지 정의합니다.
 *
 * 기준 파일: `template.xlsx` (실물 "ChatGPT 광고 작업용 통합 워크북"에서 샘플 값만 지운 것)
 * 시트 구성: 작성안내 / campaigns / 상품·브리프 / 이미지소재 / 정책·참고자료 /
 *            adgroups / ads / (추가자료)고객질문·검색데이터 / (추가자료)주력키워드
 *
 * adgroups·ads 는 AI 에이전트가 나중에 채우는 시트이므로 제출 시점에는 비워 둡니다.
 * 양식이 개정되면 이 파일의 컬럼 이름과 셀 좌표만 고치면 됩니다.
 */

import type { Campaign, SubmissionMeta, WorkbookDraft } from "./types";
import { fileNameFromUrl } from "./util";

export type CellValue = string | number;

/** 헤더 행 아래로 한 행씩 붙이는 표 시트 */
export type AppendSheet = {
  kind: "append";
  sheetName: string;
  /** 실물 양식에서 시트를 찾을 때 쓰는 부분 일치 후보 */
  match: string[];
  /** 양식 기준 헤더 행 번호 (양식이 바뀌어도 헤더 문구로 다시 찾습니다) */
  headerRow: number;
  columns: { header: string; key: string; width?: number }[];
  /** 새로 만들 때만 쓰는 안내 문구 */
  preamble?: string[];
  rows: (draft: WorkbookDraft, meta: SubmissionMeta) => Record<string, CellValue>[];
};

/** 항목표처럼 정해진 칸에 값을 넣는 시트 */
export type FixedSheet = {
  kind: "fixed";
  sheetName: string;
  match: string[];
  cells: (draft: WorkbookDraft, meta: SubmissionMeta) => { ref: string; value: CellValue }[];
  /** 양식이 없을 때 대신 만들 표 */
  fallback: { header: string; key: string; width?: number }[];
  fallbackRows: (draft: WorkbookDraft, meta: SubmissionMeta) => Record<string, CellValue>[];
};

export type SheetSpec = AppendSheet | FixedSheet;

/* ------------------------------------------------------------------ 값 변환 */

/** 광고주에게 보여 주는 목표 이름. */
const OBJECTIVE_LABEL: Record<Campaign["objective"], string> = {
  reach: "도달/노출(Reach)",
  click: "클릭(Click)",
  conversion: "전환(Conversion)",
};
/**
 * 공식 campaigns 시트의 objective 컬럼은 Views 와 Clicks 만 받습니다
 * (양식 드롭다운이 "Views,Clicks", 가이드도 "Views or clicks — CPM 또는 CPC 입찰 결정").
 * 전환은 대응 값이 없어 입찰 방식이 가장 가까운 Clicks 로 내보내고,
 * 광고주가 실제로 고른 목표는 담당자·제출정보 시트에 남깁니다.
 */
const OBJECTIVE: Record<Campaign["objective"], string> = {
  reach: "Views",
  click: "Clicks",
  conversion: "Clicks",
};
const BUDGET_TYPE: Record<Campaign["budgetType"], string> = { daily: "Daily", lifetime: "Lifetime" };
const PRIORITY: Record<string, string> = { high: "높음", normal: "보통", low: "낮음" };
/** 양식 드롭다운 어휘에 맞춥니다 (경쟁사: 가능·불가 / 비교: 가능·제한적 가능·불가) */
const ALLOWED: Record<string, string> = { yes: "가능", limited: "제한적 가능", no: "불가" };
const PARTNER: Record<string, string> = { advertiser: "광고주", agency: "대행사" };

function campaignName(draft: WorkbookDraft, id: string) {
  const found = draft.campaigns.find((c) => c.id === id) ?? draft.campaigns[0];
  return found?.name ?? "";
}

function productName(draft: WorkbookDraft, id: string) {
  const found = draft.products.find((p) => p.id === id) ?? draft.products[0];
  return found?.name ?? "";
}

function lines(text: string) {
  return String(text ?? "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
}

/** `자료명 | 링크 | 참고 내용` 한 줄을 칸으로 나눕니다. */
function pipeParts(line: string) {
  const parts = line.split("|").map((p) => p.trim());
  return { a: parts[0] ?? "", b: parts[1] ?? "", c: parts.slice(2).join(" | ") };
}

function num(value: string): CellValue {
  const cleaned = String(value ?? "").replace(/[,\s]/g, "");
  if (!cleaned) return "";
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : value;
}

/** 확장자로 양식의 "파일 형식" 드롭다운 값을 정합니다. */
function fileKind(imageUrl: string) {
  const source = String(imageUrl ?? "").toLowerCase();
  if (/\.png(\?|#|$)/.test(source)) return "PNG";
  if (/\.jpe?g(\?|#|$)/.test(source)) return "JPG";
  return "";
}

/* ------------------------------------------------------------------ 시트 정의 */

/** 실물 양식에는 담당자 칸이 없어 접수 정보 시트를 앞에 한 장 덧붙입니다. */
const CONTACT_SHEET: FixedSheet = {
  kind: "fixed",
  sheetName: "담당자·제출정보",
  match: ["담당자", "제출정보"],
  // 양식에 없는 시트이므로 항상 fallback 경로로 새로 만들어집니다.
  cells: () => [],
  fallback: [
    { header: "항목", key: "label", width: 22 },
    { header: "내용", key: "value", width: 64 },
  ],
  fallbackRows: (d, meta) => {
    const c = d.contact;
    const rows: Record<string, CellValue>[] = [
      { label: "접수번호", value: meta.receiptNo },
      { label: "제출일시", value: meta.submittedAt.replace("T", " ").slice(0, 16) },
      { label: "작성자 구분", value: PARTNER[c.partnerType] ?? c.partnerType },
      { label: c.partnerType === "agency" ? "대행사명" : "회사명", value: c.company },
      { label: "브랜드명", value: c.brand },
      { label: "담당자명", value: c.name },
      { label: "업무 이메일", value: c.email },
      { label: "연락처", value: c.phone },
    ];
    for (const [i, camp] of d.campaigns.entries()) {
      const picked = OBJECTIVE_LABEL[camp.objective] ?? camp.objective;
      const note = camp.objective === "conversion"
        ? `${picked} — 공식 시트에는 Clicks 로 표기됨`
        : picked;
      rows.push({ label: `광고 목표 ${i + 1} · ${camp.name || `캠페인 ${i + 1}`}`, value: note });
    }
    if (c.partnerType === "agency") {
      rows.push({ label: "광고주 회사명", value: c.advertiser });
    } else if (c.hasAgency) {
      rows.push(
        { label: "대행사명", value: c.agencyCompany },
        { label: "대행사 담당자", value: c.agencyName },
        { label: "대행사 이메일", value: c.agencyEmail },
        { label: "대행사 연락처", value: c.agencyPhone },
      );
    }
    return rows;
  },
};

const CAMPAIGNS: AppendSheet = {
  kind: "append",
  sheetName: "campaigns",
  match: ["campaign"],
  headerRow: 1,
  columns: [
    { header: "campaign_name", key: "campaign_name", width: 26 },
    { header: "budget_max", key: "budget_max", width: 14 },
    { header: "budget_type", key: "budget_type", width: 14 },
    { header: "launch_date", key: "launch_date", width: 14 },
    { header: "end_date", key: "end_date", width: 14 },
    { header: "objective", key: "objective", width: 12 },
    { header: "target_countries", key: "target_countries", width: 18 },
  ],
  rows: (d) =>
    d.campaigns.map((c) => ({
      campaign_name: c.name,
      budget_max: num(c.budget),
      budget_type: BUDGET_TYPE[c.budgetType] ?? c.budgetType,
      launch_date: c.startDate,
      end_date: c.endDate,
      objective: OBJECTIVE[c.objective] ?? c.objective,
      // 양식 예시가 ["KR"] 형태의 JSON 배열 문자열입니다.
      target_countries: `["${c.country || "KR"}"]`,
    })),
};

const BRIEF: AppendSheet = {
  kind: "append",
  sheetName: "상품·브리프",
  match: ["상품·브리프", "브리프"],
  headerRow: 4,
  preamble: ["1. 상품·브리프 정보", "상품·SKU별로 1행씩 작성합니다."],
  columns: [
    { header: "campaign_name", key: "campaign_name", width: 22 },
    { header: "브랜드명", key: "brand", width: 18 },
    { header: "상품·SKU명", key: "sku", width: 24 },
    { header: "상품 한 줄 설명", key: "summary", width: 40 },
    { header: "주요 특징·혜택", key: "features", width: 44 },
    { header: "고객이 얻는 편익", key: "benefit", width: 40 },
    { header: "차별점", key: "difference", width: 36 },
    { header: "핵심 타깃", key: "target", width: 32 },
    { header: "고객 니즈·문제", key: "need", width: 40 },
    { header: "주요 이용 조건", key: "conditions", width: 32 },
    { header: "필수 포함 문구", key: "keyMessage", width: 36 },
    { header: "금지 표현", key: "banned", width: 30 },
    { header: "대표 랜딩 URL", key: "url", width: 40 },
    { header: "우선순위", key: "priority", width: 10 },
    { header: "비고", key: "notes", width: 30 },
  ],
  rows: (d) =>
    d.products.map((p) => ({
      campaign_name: campaignName(d, p.campaignId),
      brand: p.brand || d.contact.brand,
      sku: p.name,
      summary: p.summary,
      features: p.features,
      benefit: p.benefit,
      difference: p.difference,
      target: p.target,
      need: p.need,
      conditions: p.conditions,
      // 파이프라인은 이 칸을 "/" 로 이어진 후보군으로 읽습니다.
      keyMessage: lines(p.keyMessage).join(" / "),
      banned: lines(p.banned).join(", "),
      url: p.url,
      priority: PRIORITY[p.priority] ?? p.priority,
      notes: p.notes,
    })),
};

const CREATIVES: AppendSheet = {
  kind: "append",
  sheetName: "이미지소재",
  match: ["이미지소재", "이미지"],
  headerRow: 4,
  preamble: ["2. 이미지 소재 정보", "이미지 1개당 1행씩 작성합니다."],
  columns: [
    { header: "campaign_name", key: "campaign_name", width: 22 },
    { header: "연결 상품·SKU", key: "sku", width: 24 },
    { header: "이미지 파일명", key: "fileName", width: 26 },
    { header: "image_link", key: "imageUrl", width: 40 },
    { header: "파일 형식", key: "fileKind", width: 10 },
    { header: "가로(px)", key: "width", width: 10 },
    { header: "세로(px)", key: "height", width: 10 },
    { header: "1:1 여부", key: "square", width: 10 },
    { header: "로고 메인 비주얼 여부", key: "logoMain", width: 18 },
    { header: "이미지 내 노출 문구(있는 경우)", key: "onImage", width: 30 },
    { header: "광고주가 강조할 핵심 메시지", key: "message", width: 40 },
    { header: "주요 타깃", key: "target", width: 28 },
    { header: "소재 사용 가능 범위", key: "scope", width: 24 },
    { header: "소재 사용 시작일", key: "startDate", width: 14 },
    { header: "소재 사용 종료일", key: "endDate", width: 14 },
    { header: "소재별 랜딩 URL", key: "url", width: 40 },
    { header: "필수 고지·주의사항", key: "notice", width: 32 },
  ],
  rows: (d) =>
    d.creatives.map((c) => ({
      campaign_name: campaignName(d, c.campaignId),
      sku: productName(d, c.productId),
      fileName: fileNameFromUrl(c.imageUrl),
      imageUrl: c.imageUrl,
      fileKind: fileKind(c.imageUrl),
      // 규격(가로·세로·1:1·로고 메인)은 폼에서 받지 않아 담당자가 확인해 채웁니다.
      width: "",
      height: "",
      square: "",
      logoMain: "",
      onImage: "",
      message: c.message,
      target: c.target,
      scope: c.scope,
      startDate: c.startDate,
      endDate: c.endDate,
      url: c.url,
      notice: c.notice,
    })),
};

const POLICY: FixedSheet = {
  kind: "fixed",
  sheetName: "정책·참고자료",
  match: ["정책"],
  // 양식의 "광고주 작성"(B열) 칸에만 값을 넣습니다. 항목명·가이드·예시는 그대로 둡니다.
  cells: (d) => {
    const p = d.policy;
    const refs = lines(p.references);
    const cells = [
      { ref: "B4", value: p.tone },
      { ref: "B5", value: ALLOWED[p.competitor] ?? p.competitor },
      { ref: "B6", value: ALLOWED[p.comparison] ?? p.comparison },
      { ref: "B7", value: p.legal },
      { ref: "B8", value: lines(p.banned).join(", ") },
      { ref: "B9", value: p.excluded },
      { ref: "B10", value: p.notes },
    ];
    // 참고자료 표(12행 헤더, 13~15행)는 항목명이 "법무·심의 가이드 / 브랜드 가이드 /
    // 기타 참고자료"로 고정돼 있습니다. 폼은 자유 입력이라 어느 항목인지 알 수 없으므로
    // 전부 "기타 참고자료"(15행)에 모아 적고, 담당자가 확인해 옮기도록 둡니다.
    if (refs.length) {
      const parsed = refs.map((line) => (line.includes("|") ? pipeParts(line) : { a: line, b: "", c: "" }));
      cells.push(
        { ref: "B15", value: "있음" },
        { ref: "C15", value: parsed.map((p) => p.b || p.a).join("\n") },
        { ref: "D15", value: parsed.map((p) => [p.a, p.c].filter(Boolean).join(" — ")).join("\n") },
      );
    }
    return cells.filter((c) => c.value !== "");
  },
  fallback: [
    { header: "항목", key: "label", width: 24 },
    { header: "광고주 작성", key: "value", width: 70 },
  ],
  fallbackRows: (d) => {
    const p = d.policy;
    return [
      { label: "브랜드 톤앤매너", value: p.tone },
      { label: "경쟁사명 언급 가능 여부", value: ALLOWED[p.competitor] ?? p.competitor },
      { label: "비교 표현 사용 가능 여부", value: ALLOWED[p.comparison] ?? p.comparison },
      { label: "법무·심의 검수 필요 항목", value: p.legal },
      { label: "공통 금지 표현", value: lines(p.banned).join(", ") },
      { label: "매칭 제외 주제", value: p.excluded },
      { label: "기타 유의사항", value: p.notes },
      { label: "참고자료", value: lines(p.references).join("\n") },
    ];
  },
};

const CUSTOMER_DATA: AppendSheet = {
  kind: "append",
  sheetName: "(추가자료)고객질문·검색데이터(있을경우)",
  match: ["고객질문", "검색데이터"],
  headerRow: 4,
  preamble: ["3. 고객 질문·검색 데이터 소스", "선택 입력입니다."],
  columns: [
    { header: "campaign_name", key: "campaign_name", width: 20 },
    { header: "연결 상품·SKU", key: "sku", width: 22 },
    { header: "데이터 소스 유형", key: "kind", width: 18 },
    { header: "페이지·파일명", key: "title", width: 30 },
    { header: "URL·공유 링크", key: "link", width: 42 },
    { header: "분석 범위·설명", key: "note", width: 44 },
    { header: "수집 기간", key: "period", width: 16 },
    { header: "활용 가능 여부", key: "usable", width: 14 },
  ],
  rows: (d) =>
    lines(d.policy.customerSources).map((line) => {
      const { a, b, c } = pipeParts(line);
      const hasPipe = line.includes("|");
      return {
        campaign_name: "공통",
        sku: "",
        kind: "",
        title: hasPipe ? a : line,
        link: hasPipe ? b : "",
        note: hasPipe ? c : "",
        period: "",
        usable: "가능",
      };
    }),
};

const KEYWORDS: AppendSheet = {
  kind: "append",
  sheetName: "(추가자료)주력키워드(있을경우)",
  match: ["주력키워드", "주력 키워드", "키워드"],
  headerRow: 4,
  preamble: ["4. 상품별 주력 키워드", "선택 입력입니다."],
  columns: [
    { header: "campaign_name", key: "campaign_name", width: 20 },
    { header: "연결 상품·SKU", key: "sku", width: 22 },
    { header: "주력 키워드", key: "keyword", width: 32 },
    { header: "키워드 유형", key: "kind", width: 14 },
    { header: "우선순위", key: "priority", width: 10 },
    { header: "검색·사용 의도", key: "intent", width: 20 },
    { header: "출처", key: "source", width: 18 },
    { header: "사용 가능 여부", key: "usable", width: 14 },
    { header: "비고", key: "notes", width: 24 },
  ],
  rows: (d) =>
    lines(d.policy.keywords).map((k) => ({
      campaign_name: "공통",
      sku: "",
      keyword: k,
      kind: "",
      priority: "",
      intent: "",
      source: "광고주 제공",
      usable: "가능",
      notes: "",
    })),
};

/** adgroups·ads 는 AI 에이전트가 채우는 시트라 제출 시점에는 건드리지 않습니다. */
export const SHEETS: SheetSpec[] = [
  CONTACT_SHEET,
  CAMPAIGNS,
  BRIEF,
  CREATIVES,
  POLICY,
  CUSTOMER_DATA,
  KEYWORDS,
];
