/* ko/en 질환 데이터 정합성 검증 — 콘텐츠를 추가·수정한 뒤 실행한다.
   실행: node scripts/validate-data.js
   실패(누락·중복·필드 빠짐)가 있으면 종료 코드 1을 반환한다. */
const path = require("path");

global.window = {};
const FILES = ["neck", "shoulder", "elbow-hand", "back", "hip", "knee", "foot", "extra"];
for (const f of FILES) require(path.join(__dirname, "..", "js", "data", f + ".js"));
for (const f of FILES) require(path.join(__dirname, "..", "js", "data", "en", f + ".js"));

const ko = global.window.ALL_CONDITIONS || [];
const en = global.window.CONTENT_EN || {};

const errors = [];
const warnings = [];

/* 1. id 중복 */
const seen = new Set();
for (const c of ko) {
  if (seen.has(c.id)) errors.push(`중복 id: ${c.id}`);
  seen.add(c.id);
}

/* 2. ko ↔ en 짝 맞춤 */
for (const c of ko) if (!en[c.id]) errors.push(`영어 번역 없음: ${c.id}`);
for (const id of Object.keys(en)) if (!seen.has(id)) errors.push(`한국어 원본 없는 영어 항목: ${id}`);

/* 3. 필수 필드 */
const KO_REQUIRED = ["id", "name", "eng", "category", "summary", "description", "causes", "symptoms", "selfTests", "passive", "active", "warnings"];
const EN_REQUIRED = ["name", "summary", "description", "causes", "symptoms", "selfTests", "passive", "active", "warnings"];
for (const c of ko)
  for (const k of KO_REQUIRED)
    if (c[k] === undefined || (Array.isArray(c[k]) && c[k].length === 0))
      errors.push(`ko:${c.id} 필드 누락/비어 있음: ${k}`);
for (const [id, c] of Object.entries(en))
  for (const k of EN_REQUIRED)
    if (c[k] === undefined || (Array.isArray(c[k]) && c[k].length === 0))
      errors.push(`en:${id} 필드 누락/비어 있음: ${k}`);

/* 4. 경고 수준 — note 유무, 배열 길이 불일치(비교 페이지는 index로 짝을 맞춤) */
for (const c of ko) {
  const e = en[c.id];
  if (!e) continue;
  if (!!c.note !== !!e.note) warnings.push(`note 유무 불일치: ${c.id}`);
  for (const k of ["description", "causes", "symptoms", "selfTests", "passive", "active", "warnings"])
    if (Array.isArray(c[k]) && Array.isArray(e[k]) && c[k].length !== e[k].length)
      warnings.push(`배열 길이 불일치: ${c.id}.${k} (ko ${c[k].length} vs en ${e[k].length})`);
}

console.log(`질환 수 — ko: ${ko.length}, en: ${Object.keys(en).length}`);
for (const w of warnings) console.warn("⚠️ " + w);
if (errors.length) {
  for (const err of errors) console.error("❌ " + err);
  process.exit(1);
}
console.log("✅ 데이터 정합성 검증 통과");
