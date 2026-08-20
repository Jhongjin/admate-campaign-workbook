/**
 * template.xlsx 를 base64 모듈로 굽습니다.
 *
 *   node scripts/build-template.mjs
 *
 * 서버리스 번들에 xlsx 파일이 빠지는 문제를 피하려고 소스로 포함시킵니다.
 * 양식이 개정되면 template.xlsx 를 교체하고 이 스크립트를 다시 실행하세요.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(here, "..", "src", "lib", "workbook", "template.xlsx");
const out = path.join(here, "..", "src", "lib", "workbook", "template-data.ts");

const bytes = fs.readFileSync(src);

// 사내 문서보안(DRM) 에이전트가 xlsx 를 제자리에서 암호화해 버리는 일이 있습니다.
// 그 상태로 구우면 앱이 양식을 열지 못하므로 여기서 막습니다.
if (bytes.subarray(0, 5).toString("latin1") === "SCDSA" || bytes.subarray(0, 2).toString("latin1") !== "PK") {
  console.error(`${src} 가 표준 xlsx(ZIP) 가 아닙니다. DRM 으로 암호화되었을 수 있습니다.`);
  console.error("암호 없는 표준 xlsx 로 다시 저장한 뒤 실행하세요. template-data.ts 는 그대로 두었습니다.");
  process.exit(1);
}

const base64 = bytes.toString("base64");
const chunks = base64.match(/.{1,120}/g) ?? [];

fs.writeFileSync(
  out,
  `/* 자동 생성 파일 — 직접 고치지 마세요. \`node scripts/build-template.mjs\` 로 다시 만듭니다.
   원본: src/lib/workbook/template.xlsx (통합워크북 빈 양식) */

const PARTS = [
${chunks.map((c) => `  "${c}",`).join("\n")}
];

/** 통합워크북 빈 양식 (xlsx) */
export const TEMPLATE_BASE64 = PARTS.join("");
`,
  "utf8",
);

console.log(`wrote ${path.relative(process.cwd(), out)} (${(base64.length / 1024).toFixed(1)} KB base64)`);
