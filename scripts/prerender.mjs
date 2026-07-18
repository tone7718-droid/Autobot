/* 질환별 정적 페이지 + sitemap.xml + robots.txt 생성기 (의존성 없는 순수 Node)
   실행: node scripts/prerender.mjs
   콘텐츠(js/data)를 수정하면 다시 실행해 산출물을 함께 커밋한다.
   Vercel은 파일시스템을 rewrite보다 먼저 매칭하므로 이 정적 페이지가
   /condition/<id>/ 로 서빙되고, 나머지 경로는 기존 SPA로 폴백된다. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = (process.env.SITE_URL || "https://musculoskeletal-disorders.vercel.app").replace(/\/$/, "");

/* ---------- 데이터 로드 (window 스텁으로 브라우저용 파일을 그대로 실행) ---------- */
const win = {};
const dataFiles = [
  ...fs.readdirSync(path.join(ROOT, "js/data")).filter((f) => f.endsWith(".js")),
].map((f) => `js/data/${f}`);
const enFiles = fs
  .readdirSync(path.join(ROOT, "js/data/en"))
  .filter((f) => f.endsWith(".js"))
  .map((f) => `js/data/en/${f}`);
for (const file of [...dataFiles, ...enFiles]) {
  const code = fs.readFileSync(path.join(ROOT, file), "utf8");
  new Function("window", code)(win);
}
const CONDITIONS = win.ALL_CONDITIONS || [];
const CONTENT_EN = win.CONTENT_EN || {};
if (!CONDITIONS.length) throw new Error("질환 데이터를 불러오지 못했습니다");

const CATEGORIES = {
  neck: { icon: "🦒", ko: "목", en: "Neck" },
  shoulder: { icon: "🏋️", ko: "어깨", en: "Shoulder" },
  "elbow-hand": { icon: "✋", ko: "팔꿈치 · 손목 · 손", en: "Elbow · Wrist · Hand" },
  back: { icon: "🧍", ko: "허리 · 골반", en: "Lower Back · Pelvis" },
  hip: { icon: "🦵", ko: "엉덩이 · 허벅지", en: "Hip · Thigh" },
  knee: { icon: "🦿", ko: "무릎", en: "Knee" },
  foot: { icon: "🦶", ko: "발목 · 발", en: "Ankle · Foot" },
};

const STR = {
  ko: {
    site: "내 통증 사용설명서",
    what: "📖 어떤 질환인가요?",
    why: "왜 생기나요?",
    symptoms: "✅ 이런 증상이 있나요?",
    tests: "🔬 집에서 해보는 자가 관찰",
    testNote: "아프지 않은 범위에서 천천히 해보세요. 아래 반응은 증상 관찰을 위한 참고이며 진단을 대신하지 않습니다.",
    ref: "참고: ",
    passive: "🤲 수동 치료 — 전문가가 해주는 치료",
    active: "🏃 능동 치료 — 내가 직접 하는 운동",
    warning: "🚨 이럴 땐 자가 관리 멈추고 병원으로!",
    interactive: "✨ 인터랙티브 버전에서 보기 (증상 체크 · 질환 비교)",
    home: "홈",
    disclaimer: "⚠️ 이 자료는 건강 정보 제공용이며 의사의 진단·치료를 대신하지 않습니다. 증상이 2주 이상 지속되거나 위 위험 신호에 해당하면 의료기관을 방문하세요.",
    dose: "⏱ ",
  },
  en: {
    site: "My Pain Manual",
    what: "📖 What is this condition?",
    why: "Why does it happen?",
    symptoms: "✅ Do you have these symptoms?",
    tests: "🔬 Self-observations you can do at home",
    testNote: "Go slowly and stay within a pain-free range. These responses are observations, not a diagnosis.",
    ref: "For reference: ",
    passive: "🤲 Hands-on care — provided by a professional",
    active: "🏃 Active care — exercises you do yourself",
    warning: "🚨 Stop self-care and see a doctor if…",
    interactive: "✨ Open the interactive version (symptom check · compare)",
    home: "Home",
    disclaimer: "⚠️ This material is for health information only and does not replace a doctor's diagnosis or treatment. If symptoms last more than 2 weeks or any red flag applies, see a medical professional.",
    dose: "⏱ ",
  },
};

const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const list = (arr) => arr.map((s) => `<li>${esc(s)}</li>`).join("\n        ");

function urlFor(id, lang) {
  return lang === "en" ? `${SITE}/en/condition/${id}/` : `${SITE}/condition/${id}/`;
}

function pageHTML(c, lang) {
  const s = STR[lang];
  const v = lang === "en" && CONTENT_EN[c.id] ? { ...c, ...CONTENT_EN[c.id] } : c;
  const cat = CATEGORIES[c.category];
  const title = `${v.name} | ${s.site}`;
  const canonical = urlFor(c.id, lang);
  const alt = urlFor(c.id, lang === "en" ? "ko" : "en");
  const showEng = lang !== "en" || v.name.toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9]+/g, " ").trim() !== c.eng.toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9]+/g, " ").trim();

  const tests = v.selfTests.map((t) => `
      <div class="test-card"><h3>🔍 ${esc(t.name)}</h3><p class="how">${esc(t.how)}</p><p class="positive"><strong>${s.ref}</strong>${esc(t.positive)}</p></div>`).join("");
  const passive = v.passive.map((t) => `
      <div class="therapy-card passive"><h3>🤲 ${esc(t.name)}</h3><p class="desc">${esc(t.desc)}</p></div>`).join("");
  const active = v.active.map((t) => `
      <div class="therapy-card active"><h3>🏃 ${esc(t.name)}</h3><p class="desc">${esc(t.how)}</p>${t.dose ? `<p class="dose">${s.dose}${esc(t.dose)}</p>` : ""}</div>`).join("");

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(v.summary)}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="${lang === "en" ? "ko" : "en"}" href="${alt}" />
  <link rel="alternate" hreflang="${lang}" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${urlFor(c.id, "ko")}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(v.summary)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE}/assets/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content="#1a73a7" />
  <link rel="icon" href="/assets/icon-192.png" />
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="logo">🩺 <span>${s.site}</span></a>
      <nav class="header-nav"><a href="/">${s.home}</a></nav>
    </div>
  </header>
  <main class="container" style="padding:32px 20px 64px;">
    <header class="condition-header">
      <span class="cat-label">${cat.icon} ${lang === "en" ? cat.en : cat.ko}</span>
      <h1>${esc(v.name)}</h1>
      ${showEng ? `<p class="eng-name">${esc(c.eng)}</p>` : ""}
      <p class="summary">${esc(v.summary)}</p>
    </header>

    <p><a href="/#/condition/${c.id}" style="display:inline-block;font-weight:700;color:var(--primary);">${s.interactive}</a></p>

    <section class="content-section">
      <h2>${s.what}</h2>
      ${v.description.map((p) => `<p class="lead">${esc(p)}</p>`).join("\n      ")}
      <h3 style="font-size:1.05rem;margin-top:18px;">${s.why}</h3>
      <ul class="check-list">
        ${list(v.causes)}
      </ul>
    </section>

    <section class="content-section">
      <h2>${s.symptoms}</h2>
      <ul class="check-list">
        ${list(v.symptoms)}
      </ul>
    </section>

    <section class="content-section">
      <h2>${s.tests}</h2>
      <p class="lead">${s.testNote}</p>${tests}
    </section>

    <section class="content-section">
      <h2>${s.passive}</h2>${passive}
    </section>

    <section class="content-section">
      <h2>${s.active}</h2>${active}
    </section>

    <section class="content-section warning-section">
      <h2>${s.warning}</h2>
      <ul class="check-list warning-list">
        ${list(v.warnings)}
      </ul>
    </section>

    <p class="print-footer" style="display:block;margin-top:28px;font-size:0.85rem;color:var(--text-light);">${s.disclaimer}</p>
  </main>
</body>
</html>
`;
}

/* ---------- 생성 ---------- */
let count = 0;
for (const c of CONDITIONS) {
  for (const lang of ["ko", "en"]) {
    const dir = lang === "en"
      ? path.join(ROOT, "en", "condition", c.id)
      : path.join(ROOT, "condition", c.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), pageHTML(c, lang));
    count++;
  }
}

const urlEntry = (loc, koHref, enHref) => `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="ko" href="${koHref}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${koHref}" />
  </url>`;

const entries = [urlEntry(`${SITE}/`, `${SITE}/`, `${SITE}/`)];
for (const c of CONDITIONS) {
  const ko = urlFor(c.id, "ko");
  const en = urlFor(c.id, "en");
  entries.push(urlEntry(ko, ko, en), urlEntry(en, ko, en));
}
fs.writeFileSync(
  path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`,
);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`정적 페이지 ${count}개 + sitemap.xml(${entries.length} URL) + robots.txt 생성 완료`);
