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

const base64 = fs.readFileSync(src).toString("base64");
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
