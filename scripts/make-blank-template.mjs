/**
 * 값이 채워진 통합워크북에서 샘플 데이터만 지워 빈 양식을 만듭니다.
 *
 *   node scripts/make-blank-template.mjs "<원본 워크북.xlsx>"
 *
 * 서식·안내문·드롭다운은 그대로 두고 광고주 입력 칸만 비웁니다.
 * 결과는 src/lib/workbook/template.xlsx 로 저장되며,
 * 이어서 `node scripts/build-template.mjs` 를 실행해 번들용 모듈을 다시 구워야 합니다.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = process.argv[2];
if (!src) {
  console.error("사용법: node scripts/make-blank-template.mjs \"<원본 워크북.xlsx>\"");
  process.exit(1);
}
const out = path.join(here, "..", "src", "lib", "workbook", "template.xlsx");

/** 시트별로 "이 행부터 아래를 비운다" */
const CLEAR_FROM = {
  campaigns: 4,
  "상품·브리프": 5,
  이미지소재: 5,
  adgroups: 4,
  ads: 5,
  "(추가자료)고객질문·검색데이터(있을경우)": 5,
  "(추가자료)주력키워드(있을경우)": 5,
};

/** 정책 시트는 항목표라 광고주 입력 칸만 비웁니다. */
const POLICY_CELLS = [
  "B4", "B5", "B6", "B7", "B8", "B9", "B10",
  "B13", "C13", "D13", "E13", "F13",
  "B14", "C14", "D14", "E14", "F14",
  "B15", "C15", "D15", "E15", "F15",
];

const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(src);

for (const ws of wb.worksheets) {
  const from = CLEAR_FROM[ws.name];
  if (from) {
    for (let r = from; r <= ws.rowCount; r += 1) {
      const row = ws.getRow(r);
      for (let c = 1; c <= ws.columnCount; c += 1) row.getCell(c).value = null;
      row.commit();
    }
    continue;
  }
  if (ws.name === "정책·참고자료") {
    for (const ref of POLICY_CELLS) ws.getCell(ref).value = null;
  }
}

await wb.xlsx.writeFile(out);
console.log(`wrote ${path.relative(process.cwd(), out)}`);
console.log("다음: node scripts/build-template.mjs");
