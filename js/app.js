/* ============================================================
   내 통증 사용설명서 / My Pain Manual — SPA 라우터 & 렌더러 (ko/en)
   ============================================================ */

/* ---------- 언어 상태 ---------- */
const LANG_KEY = "mtm_lang";
function detectLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "ko" || saved === "en") return saved;
  } catch (e) {}
  const nav = (navigator.language || "ko").toLowerCase();
  return nav.startsWith("en") ? "en" : "ko";
}
let LANG = detectLang();

/* ---------- UI 문자열 (ko/en) ---------- */
const I18N = {
  ko: {
    site_title: "내 통증 사용설명서",
    title_suffix: "근골격계 질환 40 가이드",
    default_desc:
      "거북목부터 족저근막염까지, 가장 흔한 근골격계 질환 40가지. 증상 체크·자가 평가·수동 치료·운동 처방까지 스스로 통증의 원인을 찾고 해결하세요.",
    nav_home: "홈", nav_all: "전체 질환", nav_guide: "이용 안내",
    lang_toggle: "EN", lang_aria: "Switch to English",
    foot_disclaimer:
      "⚠️ 이 전자책은 건강 정보 제공을 목적으로 하며, 의사의 진단과 치료를 대신할 수 없습니다. 통증이 심하거나 오래 지속되면 반드시 의료기관을 방문하세요.",
    foot_copyright:
      "© 2026 내 통증 사용설명서 · 재활 트레이닝 & 스포츠의학 기반 자가 관리 가이드",
    hero_title: '내 통증, 원인을 알면<br /><span>스스로 해결</span>할 수 있습니다',
    hero_intro:
      '동네 병원에서 가장 자주 만나는 근골격계 질환 <strong>40가지</strong>를 고등학생도 이해할 수 있는 쉬운 말로 풀었습니다. 증상을 체크하고, 간단한 자가 평가로 원인을 좁히고, 수동 치료와 능동 치료(운동)로 직접 관리해 보세요.',
    search_ph: "증상이나 질환 이름으로 검색 (예: 팔꿈치 바깥쪽 통증)",
    search_ph_short: "증상이나 질환 이름으로 검색",
    search_btn: "검색",
    search_hint: '예시: "아침에 첫발 디딜 때 발뒤꿈치", "어깨 들 때 통증", "손 저림"',
    pick_title: "📍 아픈 부위를 선택하세요",
    pick_sub: "그림에서 아픈 곳을 누르거나, 오른쪽 목록에서 골라도 됩니다.",
    bodymap_aria: "아픈 부위를 그림에서 선택",
    bodymap_hint: "그림에서 아픈 부위를 누르세요",
    figure_aria: "인체 그림",
    how_title: "🧭 이렇게 사용하세요",
    steps: [
      { h: "증상 체크", p: "내 증상과 비슷한 항목이 몇 개나 되는지 체크리스트로 확인합니다." },
      { h: "자가 평가", p: "집에서 할 수 있는 간단한 검사로 의심 질환을 좁혀 봅니다." },
      { h: "수동 치료 이해", p: "병원·치료실에서 받게 되는 도수치료, 물리치료가 무엇인지 알아봅니다." },
      { h: "능동 치료 실천", p: "핵심은 운동! 단계별 운동으로 통증의 뿌리를 해결합니다." },
    ],
    all_title: "📚 전체 질환 40가지",
    all_sub: "전체 목록에서 바로 찾아볼 수도 있습니다.",
    all_link: "전체 40개 질환 모두 보기 →",
    fav_title: "⭐ 내 즐겨찾기",
    fav_sub: "관심 있는 질환을 모아 두었습니다. 별을 다시 누르면 해제됩니다.",
    recent_title: "🕒 최근 본 질환",
    cat_count: (n) => `${n}개 질환`,
    bc_all: "전체 질환", bc_guide: "이용 안내", bc_search: "검색",
    cat_suffix: (n) => `질환 (${n}개)`,
    all_h: (n) => `📚 전체 질환 ${n}가지`,
    fav_on: "즐겨찾기 됨", fav_off: "즐겨찾기",
    print_btn: "🖨 인쇄 / PDF로 저장",
    video_link: "▶ 영상으로 보기",
    toc: ["어떤 질환인가요?", "증상 체크", "자가 평가", "수동 치료", "능동 치료(운동)", "병원에 가야 할 때"],
    sec_what: "📖 어떤 질환인가요?",
    sec_why: "왜 생기나요?",
    sec_symptoms: "✅ 이런 증상이 있나요?",
    symptoms_lead: '해당하는 항목을 <strong>눌러서 체크</strong>해 보세요. <strong>3개 이상</strong>이면 이 질환일 가능성이 높습니다.',
    sec_tests: "🔬 집에서 해보는 자가 평가",
    tests_lead: "아프지 않은 범위에서 천천히 해보세요. 검사 중 통증이 심해지면 바로 멈춥니다.",
    sec_passive: "🤲 수동 치료", badge_passive: "전문가가 해주는 치료",
    passive_lead: "병원이나 치료실에서 받게 되는 치료입니다. 통증을 빠르게 줄여 운동할 수 있는 몸 상태를 만들어 줍니다.",
    sec_active: "🏃 능동 치료", badge_active: "내가 직접 하는 운동",
    active_lead: "진짜 회복은 여기서 시작됩니다. 통증이 0~3점(10점 만점) 수준에서 머무는 강도로, 꾸준히 하는 것이 핵심입니다.",
    coach: "코치의 한마디:",
    sec_warning: "🚨 이럴 땐 자가 관리 멈추고 병원으로!",
    print_footer: "⚠️ 이 자료는 건강 정보 제공용이며 의사의 진단·치료를 대신하지 않습니다. 증상이 2주 이상 지속되거나 위 위험 신호에 해당하면 의료기관을 방문하세요. · 내 통증 사용설명서",
    prev_label: "← 이전 질환", next_label: "다음 질환 →",
    search_h: "🔎 검색 결과",
    search_found: (q, n) => `"<strong>${q}</strong>" 관련 질환 ${n}개를 찾았습니다.`,
    search_empty: (q) => `"<strong>${q}</strong>"에 맞는 질환을 찾지 못했습니다.<br/>"팔꿈치", "저림", "무릎 앞쪽"처럼 부위나 느낌으로 검색해 보세요.`,
    sr_high: (n) => `체크한 증상이 <strong>${n}개</strong>입니다. 이 질환일 <strong>가능성이 높습니다.</strong> 아래의 자가 평가와 능동 치료(운동)를 살펴보고, "🚨 병원에 가야 할 때" 항목에 해당하지 않는지도 꼭 확인하세요.`,
    sr_low: (n) => `체크한 증상이 <strong>${n}개</strong>입니다. 가능성을 단정하긴 이릅니다. 다른 항목도 천천히 살펴보고, 증상이 애매하면 다른 질환 페이지도 함께 확인해 보세요.`,
    guide_h: "📘 이용 안내",
    notfound: "페이지를 찾을 수 없습니다.",
    go_home: "홈으로 돌아가기",
    yt_suffix: "재활운동",
  },
  en: {
    site_title: "My Pain Manual",
    title_suffix: "A Guide to 40 Musculoskeletal Conditions",
    default_desc:
      "From forward head posture to plantar fasciitis — the 40 most common musculoskeletal conditions. Check your symptoms, run simple self-tests, and manage your pain with hands-on and active (exercise) care.",
    nav_home: "Home", nav_all: "All Conditions", nav_guide: "Guide",
    lang_toggle: "한국어", lang_aria: "한국어로 전환",
    foot_disclaimer:
      "⚠️ This e-book is for health information only and is not a substitute for a doctor's diagnosis or treatment. If your pain is severe or persistent, please see a medical professional.",
    foot_copyright:
      "© 2026 My Pain Manual · A self-care guide based on rehab training & sports medicine",
    hero_title: 'Know the cause of your pain,<br />and you can <span>solve it yourself</span>',
    hero_intro:
      'The <strong>40 most common</strong> musculoskeletal conditions seen at local clinics, explained in plain language anyone can follow. Check your symptoms, narrow down the cause with simple self-tests, and take charge with hands-on and active (exercise) care.',
    search_ph: "Search by symptom or condition (e.g. pain on the outer elbow)",
    search_ph_short: "Search by symptom or condition",
    search_btn: "Search",
    search_hint: 'Try: "heel pain on the first morning step", "pain lifting the arm", "tingling hand"',
    pick_title: "📍 Pick where it hurts",
    pick_sub: "Tap a body part on the figure, or choose from the list.",
    bodymap_aria: "Select the painful area on the figure",
    bodymap_hint: "Tap the painful area on the figure",
    figure_aria: "Human body figure",
    how_title: "🧭 How to use this",
    steps: [
      { h: "Check symptoms", p: "Use the checklist to see how many of your symptoms match." },
      { h: "Self-assess", p: "Narrow down the likely condition with simple at-home tests." },
      { h: "Understand hands-on care", p: "Learn what manual therapy and physical therapy at the clinic involve." },
      { h: "Do the exercises", p: "Exercise is key — step-by-step movements fix the root of the pain." },
    ],
    all_title: "📚 All 40 Conditions",
    all_sub: "You can also browse the full list directly.",
    all_link: "See all 40 conditions →",
    fav_title: "⭐ My Favorites",
    fav_sub: "Conditions you've saved. Tap the star again to remove.",
    recent_title: "🕒 Recently Viewed",
    cat_count: (n) => `${n} conditions`,
    bc_all: "All Conditions", bc_guide: "Guide", bc_search: "Search",
    cat_suffix: (n) => `(${n} conditions)`,
    all_h: (n) => `📚 All ${n} Conditions`,
    fav_on: "Saved", fav_off: "Save",
    print_btn: "🖨 Print / Save as PDF",
    video_link: "▶ Watch videos",
    toc: ["What is it?", "Symptoms", "Self-tests", "Hands-on care", "Exercises", "When to see a doctor"],
    sec_what: "📖 What is this condition?",
    sec_why: "Why does it happen?",
    sec_symptoms: "✅ Do you have these symptoms?",
    symptoms_lead: '<strong>Tap to check</strong> the items that apply. <strong>3 or more</strong> means this condition is likely.',
    sec_tests: "🔬 Self-tests you can do at home",
    tests_lead: "Go slowly and stay within a pain-free range. Stop right away if pain gets worse.",
    sec_passive: "🤲 Hands-on care", badge_passive: "Care a professional provides",
    passive_lead: "Treatments you receive at a clinic. They quickly reduce pain so your body is ready to exercise.",
    sec_active: "🏃 Active care", badge_active: "Exercises you do yourself",
    active_lead: "Real recovery starts here. Keep the intensity where pain stays at 0–3 out of 10, and do it consistently.",
    coach: "Coach's tip:",
    sec_warning: "🚨 Stop self-care and see a doctor if…",
    print_footer: "⚠️ This material is for health information only and does not replace a doctor's diagnosis or treatment. If symptoms last more than 2 weeks or any red flag above applies, see a medical professional. · My Pain Manual",
    prev_label: "← Previous", next_label: "Next →",
    search_h: "🔎 Search results",
    search_found: (q, n) => `Found ${n} condition(s) related to "<strong>${q}</strong>".`,
    search_empty: (q) => `No conditions matched "<strong>${q}</strong>".<br/>Try searching by area or feeling, like "elbow", "tingling", or "front of knee".`,
    sr_high: (n) => `You checked <strong>${n}</strong> symptom(s). This condition is <strong>likely.</strong> Review the self-tests and exercises below, and make sure none of the "🚨 When to see a doctor" items apply.`,
    sr_low: (n) => `You checked <strong>${n}</strong> symptom(s). It's too early to be sure. Look through the other items, and if your symptoms are vague, check related condition pages too.`,
    guide_h: "📘 How to use this guide",
    notfound: "Page not found.",
    go_home: "Back to home",
    yt_suffix: "rehab exercise",
  },
};

function T(key) {
  const v = (I18N[LANG] && I18N[LANG][key] !== undefined) ? I18N[LANG][key] : I18N.ko[key];
  return v;
}

/* ---------- 카테고리 (ko/en) ---------- */
const CATEGORIES = [
  { id: "neck", icon: "🦒", name: "목", desc: "거북목, 목 디스크, 뒷목·어깨 결림 등 목 주변 통증",
    name_en: "Neck", desc_en: "Forward head, neck disc, stiff neck & shoulders, and more" },
  { id: "shoulder", icon: "🏋️", name: "어깨", desc: "날개뼈 운동이상증, 충돌증후군, 오십견 등 어깨 통증",
    name_en: "Shoulder", desc_en: "Scapular dyskinesis, impingement, frozen shoulder, and more" },
  { id: "elbow-hand", icon: "✋", name: "팔꿈치 · 손목 · 손", desc: "테니스 엘보, 손목터널증후군, 방아쇠 수지 등",
    name_en: "Elbow · Wrist · Hand", desc_en: "Tennis elbow, carpal tunnel, trigger finger, and more" },
  { id: "back", icon: "🧍", name: "허리 · 골반", desc: "허리 디스크, 협착증, 천장관절·이상근 문제 등",
    name_en: "Lower Back · Pelvis", desc_en: "Disc, stenosis, SI joint & piriformis issues, and more" },
  { id: "hip", icon: "🦵", name: "엉덩이 · 허벅지", desc: "고관절 충돌, 대전자 통증, 햄스트링 부상 등",
    name_en: "Hip · Thigh", desc_en: "FAI, trochanteric pain, hamstring injuries, and more" },
  { id: "knee", icon: "🦿", name: "무릎", desc: "러너스 니, 점퍼스 니, 장경인대, 관절염 등",
    name_en: "Knee", desc_en: "Runner's/jumper's knee, IT band, arthritis, and more" },
  { id: "foot", icon: "🦶", name: "발목 · 발", desc: "발목 염좌, 족저근막염, 아킬레스건염 등",
    name_en: "Ankle · Foot", desc_en: "Sprains, plantar fasciitis, Achilles tendon, and more" },
];
function catName(cat) { return LANG === "en" ? cat.name_en : cat.name; }
function catDesc(cat) { return LANG === "en" ? cat.desc_en : cat.desc; }

const CONDITIONS = window.ALL_CONDITIONS || [];
const CONTENT_EN = window.CONTENT_EN || {};

/* 현재 언어에 맞는 질환 내용 뷰 (영어 없으면 한국어로 폴백) */
function view(c) {
  if (LANG === "en" && CONTENT_EN[c.id]) return Object.assign({}, c, CONTENT_EN[c.id]);
  return c;
}

const app = document.getElementById("app");

/* ---------- 유틸 ---------- */
function catOf(id) { return CATEGORIES.find((c) => c.id === id); }
function conditionsIn(catId) { return CONDITIONS.filter((c) => c.category === catId); }

function esc(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[m]));
}

/* 운동 영상 검색 링크 — 특정 URL 대신 YouTube 검색으로 연결 */
function ytSearch(exerciseName) {
  const clean = String(exerciseName).replace(/\([^)]*\)/g, "").trim();
  return "https://www.youtube.com/results?search_query=" + encodeURIComponent(`${clean} ${T("yt_suffix")}`);
}

/* ---------- 제목/공유 메타 ---------- */
function setMeta(title, desc) {
  const suffix = `${T("site_title")} — ${T("title_suffix")}`;
  const fullTitle = title ? `${title} — ${T("site_title")}` : suffix;
  document.title = fullTitle;
  const d = desc || T("default_desc");
  const map = {
    'meta[name="description"]': d,
    'meta[property="og:title"]': fullTitle,
    'meta[property="og:description"]': d,
    'meta[name="twitter:title"]': fullTitle,
    'meta[name="twitter:description"]': d,
  };
  for (const sel in map) {
    const el = document.querySelector(sel);
    if (el) el.setAttribute("content", map[sel]);
  }
  setMetaUrl();
}
function setMetaUrl() {
  ensureMeta('meta[property="og:url"]', "property", "og:url").setAttribute("content", location.href);
  const origin = location.origin && location.origin !== "null" ? location.origin : "";
  if (origin) {
    document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach((el) => {
      const v = el.getAttribute("content");
      if (v && !/^https?:\/\//.test(v)) el.setAttribute("content", origin + "/" + v.replace(/^\//, ""));
    });
  }
}
function ensureMeta(selector, attr, val) {
  let el = document.querySelector(selector);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, val); document.head.appendChild(el); }
  return el;
}

/* ---------- 로컬 저장소 (즐겨찾기 · 최근 본 질환) ---------- */
const Store = {
  KEY_FAV: "mtm_favorites", KEY_RECENT: "mtm_recent", MAX_RECENT: 6,
  _read(key) {
    try { const v = JSON.parse(localStorage.getItem(key)); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
  },
  _write(key, arr) { try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) {} },
  favorites() { return this._read(this.KEY_FAV).filter((id) => CONDITIONS.some((c) => c.id === id)); },
  isFavorite(id) { return this._read(this.KEY_FAV).includes(id); },
  toggleFavorite(id) {
    const favs = this._read(this.KEY_FAV);
    const i = favs.indexOf(id);
    if (i === -1) favs.unshift(id); else favs.splice(i, 1);
    this._write(this.KEY_FAV, favs);
    return i === -1;
  },
  recents() { return this._read(this.KEY_RECENT).filter((id) => CONDITIONS.some((c) => c.id === id)); },
  pushRecent(id) {
    let r = this._read(this.KEY_RECENT).filter((x) => x !== id);
    r.unshift(id); r = r.slice(0, this.MAX_RECENT);
    this._write(this.KEY_RECENT, r);
  },
};

/* ---------- 헤더/푸터 등 정적 영역 언어 적용 ---------- */
function applyChrome() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = T(el.getAttribute("data-i18n"));
  });
  const logo = document.getElementById("logoText");
  if (logo) logo.textContent = T("site_title");
  const tgl = document.getElementById("langToggle");
  if (tgl) { tgl.textContent = T("lang_toggle"); tgl.setAttribute("aria-label", T("lang_aria")); }
  const disc = document.getElementById("footDisclaimer");
  if (disc) disc.textContent = T("foot_disclaimer");
  const cp = document.getElementById("footCopyright");
  if (cp) cp.textContent = T("foot_copyright");
}

/* ---------- 통증 부위 그림 ---------- */
function bodyMapHTML() {
  const labels = LANG === "en"
    ? { neck: "Neck (forward head, disc, stiff neck)", shoulder: "Shoulder (rotator cuff, frozen shoulder)",
        back: "Lower back & pelvis (disc, stenosis)", "elbow-hand": "Elbow/wrist/hand (tennis elbow, carpal tunnel)",
        hip: "Hip & thigh (FAI, hamstring)", knee: "Knee (runner's/jumper's knee, arthritis)",
        foot: "Ankle & foot (sprain, plantar fasciitis, Achilles)" }
    : { neck: "목 (거북목·목 디스크·담 결림)", shoulder: "어깨 (회전근개·오십견·충돌증후군)",
        back: "허리·골반 (디스크·협착증·요통)", "elbow-hand": "팔꿈치·손목·손 (테니스엘보·손목터널)",
        hip: "엉덩이·허벅지 (고관절·햄스트링)", knee: "무릎 (러너스니·점퍼스니·관절염)",
        foot: "발목·발 (염좌·족저근막염·아킬레스)" };
  const zone = (cat, shapes) => `
    <g class="bm-zone" data-cat="${cat}" role="button" tabindex="0" aria-label="${labels[cat]}">
      <title>${labels[cat]}</title>${shapes}
    </g>`;
  return `
  <div class="bodymap" aria-label="${T("bodymap_aria")}">
    <svg viewBox="0 0 280 580" role="group" aria-label="${T("figure_aria")}">
      ${zone("neck", `<circle cx="140" cy="48" r="32"/><rect x="126" y="78" width="28" height="20" rx="6"/>`)}
      ${zone("shoulder", `<ellipse cx="98" cy="116" rx="28" ry="19"/><ellipse cx="182" cy="116" rx="28" ry="19"/>`)}
      ${zone("back", `<rect x="110" y="100" width="60" height="118" rx="16"/>`)}
      ${zone("elbow-hand", `
        <rect x="64" y="112" width="20" height="74" rx="10"/><rect x="66" y="180" width="17" height="74" rx="9"/><circle cx="74" cy="266" r="13"/>
        <rect x="196" y="112" width="20" height="74" rx="10"/><rect x="197" y="180" width="17" height="74" rx="9"/><circle cx="206" cy="266" r="13"/>`)}
      ${zone("hip", `<path d="M108 214 H172 L168 262 H112 Z"/><rect x="115" y="258" width="24" height="74" rx="11"/><rect x="141" y="258" width="24" height="74" rx="11"/>`)}
      ${zone("knee", `<ellipse cx="127" cy="346" rx="15" ry="17"/><ellipse cx="153" cy="346" rx="15" ry="17"/>`)}
      ${zone("foot", `
        <rect x="117" y="362" width="20" height="96" rx="9"/><rect x="143" y="362" width="20" height="96" rx="9"/>
        <path d="M117 456 H137 L141 478 H113 Z"/><path d="M143 456 H163 L167 478 H139 Z"/>`)}
    </svg>
    <p class="bm-hint">${T("bodymap_hint")}</p>
  </div>`;
}

/* ---------- 개인화 영역 ---------- */
function personalSectionsHTML() {
  const favIds = Store.favorites();
  const recentIds = Store.recents().filter((id) => !favIds.includes(id));
  let html = "";
  const listOf = (ids) => ids.map((id) => CONDITIONS.find((c) => c.id === id)).filter(Boolean).map(itemHTML).join("");
  if (favIds.length) {
    html += `<h2 class="section-title">${T("fav_title")}</h2>
      <p class="section-sub">${T("fav_sub")}</p>
      <div class="condition-list">${listOf(favIds)}</div>`;
  }
  if (recentIds.length) {
    html += `<h2 class="section-title">${T("recent_title")}</h2>
      <div class="condition-list">${listOf(recentIds)}</div>`;
  }
  return html;
}

/* ---------- 페이지: 홈 ---------- */
function renderHome() {
  const catCards = CATEGORIES.map((cat) => {
    const n = conditionsIn(cat.id).length;
    return `
      <a class="category-card" href="#/category/${cat.id}">
        <div class="cat-icon">${cat.icon}</div>
        <h3>${catName(cat)}</h3>
        <p>${catDesc(cat)}</p>
        <span class="cat-count">${T("cat_count")(n)}</span>
      </a>`;
  }).join("");

  const steps = T("steps").map((s, i) => `
      <div class="step"><span class="step-num">${i + 1}</span><h4>${s.h}</h4><p>${s.p}</p></div>`).join("");

  app.innerHTML = `
    <section class="hero">
      <h1>${T("hero_title")}</h1>
      <p>${T("hero_intro")}</p>
      <form class="search-box" onsubmit="event.preventDefault(); location.hash='#/search/'+encodeURIComponent(this.q.value);">
        <input name="q" type="text" placeholder="${esc(T("search_ph"))}" />
        <button type="submit">${T("search_btn")}</button>
      </form>
      <p class="search-hint">${T("search_hint")}</p>
    </section>

    ${personalSectionsHTML()}

    <h2 class="section-title">${T("pick_title")}</h2>
    <p class="section-sub">${T("pick_sub")}</p>
    <div class="bodymap-layout">
      ${bodyMapHTML()}
      <div class="category-grid">${catCards}</div>
    </div>

    <h2 class="section-title">${T("how_title")}</h2>
    <div class="steps">${steps}</div>

    <h2 class="section-title">${T("all_title")}</h2>
    <p class="section-sub">${T("all_sub")}</p>
    <div class="condition-list">${CONDITIONS.slice(0, 6).map(itemHTML).join("")}</div>
    <p style="text-align:center; margin-top:18px;">
      <a href="#/all" style="color:var(--primary); font-weight:700;">${T("all_link")}</a>
    </p>
  `;
}

/* ---------- 페이지: 카테고리 ---------- */
function renderCategory(catId) {
  const cat = catOf(catId);
  if (!cat) return renderNotFound();
  const list = conditionsIn(catId);
  app.innerHTML = `
    <nav class="breadcrumb"><a href="#/">${T("nav_home")}</a> › ${catName(cat)}</nav>
    <h1 class="section-title" style="margin-top:0;">${cat.icon} ${catName(cat)} ${T("cat_suffix")(list.length)}</h1>
    <p class="section-sub">${catDesc(cat)}</p>
    <div class="condition-list">${list.map(itemHTML).join("")}</div>
  `;
}

/* ---------- 페이지: 전체 목록 ---------- */
function renderAll() {
  const sections = CATEGORIES.map((cat) => {
    const list = conditionsIn(cat.id);
    if (!list.length) return "";
    return `<h2 class="section-title">${cat.icon} ${catName(cat)}</h2>
      <div class="condition-list">${list.map(itemHTML).join("")}</div>`;
  }).join("");
  app.innerHTML = `
    <nav class="breadcrumb"><a href="#/">${T("nav_home")}</a> › ${T("bc_all")}</nav>
    <h1 class="section-title" style="margin-top:0;">${T("all_h")(CONDITIONS.length)}</h1>
    ${sections}
  `;
}

function itemHTML(c) {
  const v = view(c);
  return `
    <a class="condition-item" href="#/condition/${c.id}">
      <div>
        <h3>${v.name}<span class="eng">${c.eng}</span></h3>
        <p>${v.summary}</p>
      </div>
      <span class="arrow">›</span>
    </a>`;
}

/* ---------- 페이지: 질환 상세 ---------- */
function renderCondition(id) {
  const c = CONDITIONS.find((x) => x.id === id);
  if (!c) return renderNotFound();
  Store.pushRecent(c.id);
  const fav = Store.isFavorite(c.id);
  const v = view(c);
  const cat = catOf(c.category);
  const list = conditionsIn(c.category);
  const idx = list.indexOf(c);
  const prev = list[idx - 1];
  const next = list[idx + 1];

  const descHTML = v.description.map((p) => `<p class="lead">${p}</p>`).join("");
  const causesHTML = v.causes.map((s) => `<li>${s}</li>`).join("");
  const symptomsHTML = v.symptoms.map((s, i) => `
    <li class="symptom-check" data-idx="${i}" role="button" tabindex="0" aria-pressed="false">
      <span class="sc-box" aria-hidden="true"></span><span class="sc-text">${s}</span>
    </li>`).join("");
  const testsHTML = v.selfTests.map((t) => `
    <div class="test-card"><h4>🔍 ${t.name}</h4><p class="how">${t.how}</p><p class="positive">${t.positive}</p></div>`).join("");
  const passiveHTML = v.passive.map((t) => `
    <div class="therapy-card passive"><h4>🤲 ${t.name}</h4><p class="desc">${t.desc}</p></div>`).join("");
  const activeHTML = v.active.map((t) => `
    <div class="therapy-card active">
      <h4>🏃 ${t.name}</h4>
      <p class="desc">${t.how}</p>
      <div class="card-bottom">
        ${t.dose ? `<span class="dose">⏱ ${t.dose}</span>` : "<span></span>"}
        <a class="video-link no-print" href="${ytSearch(t.name)}" target="_blank" rel="noopener noreferrer">${T("video_link")}</a>
      </div>
    </div>`).join("");
  const warningsHTML = v.warnings.map((s) => `<li>${s}</li>`).join("");
  const toc = T("toc");

  app.innerHTML = `
    <nav class="breadcrumb no-print">
      <a href="#/">${T("nav_home")}</a> › <a href="#/category/${cat.id}">${catName(cat)}</a> › ${v.name}
    </nav>

    <header class="condition-header">
      <span class="cat-label">${cat.icon} ${catName(cat)}</span>
      <h1>${v.name}</h1>
      <p class="eng-name">${c.eng}</p>
      <p class="summary">${v.summary}</p>
    </header>

    <div class="detail-actions no-print">
      <button type="button" class="action-btn fav-btn ${fav ? "is-fav" : ""}" data-fav="${c.id}" aria-pressed="${fav}">
        <span class="star">${fav ? "★" : "☆"}</span>
        <span class="fav-label">${fav ? T("fav_on") : T("fav_off")}</span>
      </button>
      <button type="button" class="action-btn print-btn" data-print="1">${T("print_btn")}</button>
    </div>

    <nav class="toc-chips no-print">
      <a href="#sec-what">${toc[0]}</a>
      <a href="#sec-symptoms">${toc[1]}</a>
      <a href="#sec-tests">${toc[2]}</a>
      <a href="#sec-passive">${toc[3]}</a>
      <a href="#sec-active">${toc[4]}</a>
      <a href="#sec-warning">${toc[5]}</a>
    </nav>

    <section class="content-section" id="sec-what">
      <h2>${T("sec_what")}</h2>
      ${descHTML}
      <h2 style="font-size:1.05rem; margin-top:18px;">${T("sec_why")}</h2>
      <ul class="check-list cause-list">${causesHTML}</ul>
    </section>

    <section class="content-section" id="sec-symptoms">
      <h2>${T("sec_symptoms")}</h2>
      <p class="lead">${T("symptoms_lead")}</p>
      <ul class="check-list symptom-checklist" data-total="${v.symptoms.length}">${symptomsHTML}</ul>
      <div class="symptom-result" id="symptom-result" hidden></div>
    </section>

    <section class="content-section" id="sec-tests">
      <h2>${T("sec_tests")}</h2>
      <p class="lead">${T("tests_lead")}</p>
      ${testsHTML}
    </section>

    <section class="content-section" id="sec-passive">
      <h2>${T("sec_passive")} <span class="badge badge-passive">${T("badge_passive")}</span></h2>
      <p class="lead">${T("passive_lead")}</p>
      ${passiveHTML}
    </section>

    <section class="content-section" id="sec-active">
      <h2>${T("sec_active")} <span class="badge badge-active">${T("badge_active")}</span></h2>
      <p class="lead">${T("active_lead")}</p>
      ${activeHTML}
      ${v.note ? `<div class="note"><strong>${T("coach")}</strong> ${v.note}</div>` : ""}
    </section>

    <section class="content-section warning-section" id="sec-warning">
      <h2>${T("sec_warning")}</h2>
      <ul class="check-list warning-list">${warningsHTML}</ul>
    </section>

    <p class="print-only print-footer">${T("print_footer")}</p>

    <nav class="detail-nav no-print">
      ${prev ? `<a href="#/condition/${prev.id}"><span class="nav-label">${T("prev_label")}</span>${view(prev).name}</a>` : "<span style='flex:1'></span>"}
      ${next ? `<a class="next" href="#/condition/${next.id}"><span class="nav-label">${T("next_label")}</span>${view(next).name}</a>` : "<span style='flex:1'></span>"}
    </nav>
  `;
}

/* ---------- 페이지: 검색 ---------- */
function renderSearch(query) {
  const q = decodeURIComponent(query || "").trim();
  const terms = q.split(/\s+/).filter(Boolean);
  let results = [];
  if (terms.length) {
    results = CONDITIONS.map((c) => {
      const v = view(c);
      const haystack = [
        v.name, c.name, c.eng, v.summary,
        v.description.join(" "), v.symptoms.join(" "), v.causes.join(" "),
      ].join(" ").toLowerCase();
      const score = terms.reduce((acc, t) => acc + (haystack.includes(t.toLowerCase()) ? 1 : 0), 0);
      return { c, score };
    }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score).map((r) => r.c);
  }
  app.innerHTML = `
    <nav class="breadcrumb"><a href="#/">${T("nav_home")}</a> › ${T("bc_search")}</nav>
    <h1 class="section-title" style="margin-top:0;">${T("search_h")}</h1>
    <form class="search-box" style="margin:0 0 18px;" onsubmit="event.preventDefault(); location.hash='#/search/'+encodeURIComponent(this.q.value);">
      <input name="q" type="text" value="${esc(q)}" placeholder="${esc(T("search_ph_short"))}" />
      <button type="submit">${T("search_btn")}</button>
    </form>
    ${results.length
      ? `<p class="search-result-info">${T("search_found")(esc(q), results.length)}</p>
         <div class="condition-list">${results.map(itemHTML).join("")}</div>`
      : `<div class="empty-state"><div class="big">🤔</div><p>${T("search_empty")(esc(q))}</p></div>`}
  `;
}

/* ---------- 페이지: 이용 안내 ---------- */
const GUIDE_HTML = {
  ko: `
    <section class="content-section guide-section">
      <h2>이 전자책은 무엇인가요?</h2>
      <p class="lead">동네 정형외과·재활의학과에서 가장 자주 진단되는 근골격계 질환 40가지를, 재활 트레이닝과 스포츠의학 관점에서 정리한 자가 관리 가이드입니다. 어려운 의학 용어 대신 일상 언어로 설명하고, 모든 질환을 같은 구조로 정리했습니다.</p>
      <h3>각 질환 페이지의 구성</h3>
      <ul>
        <li><strong>어떤 질환인가요?</strong> — 질환의 정체와 생기는 이유를 비유로 쉽게 설명합니다.</li>
        <li><strong>증상 체크</strong> — 내 증상과 비교해 볼 수 있는 체크리스트입니다.</li>
        <li><strong>자가 평가</strong> — 병원에서 쓰는 검사를 집에서 안전하게 해볼 수 있도록 바꾼 것입니다.</li>
        <li><strong>수동 치료</strong> — 도수치료, 물리치료처럼 <em>전문가가 나에게 해주는</em> 치료입니다.</li>
        <li><strong>능동 치료</strong> — <em>내가 직접 하는</em> 운동입니다. 재발을 막는 진짜 치료의 핵심입니다.</li>
        <li><strong>병원에 가야 할 때</strong> — 자가 관리로 버티면 안 되는 위험 신호(red flag)입니다.</li>
      </ul>
      <h3>운동할 때 지킬 3가지 원칙</h3>
      <ul>
        <li><strong>통증 3점 규칙</strong> — 운동 중 통증이 10점 만점에 3점을 넘으면 강도를 낮추거나 멈춥니다.</li>
        <li><strong>다음 날 확인</strong> — 운동 다음 날 통증이 전보다 심해졌다면 양을 절반으로 줄입니다.</li>
        <li><strong>꾸준함이 강도보다 중요</strong> — 일주일에 한 번 빡세게보다, 매일 조금씩이 훨씬 효과적입니다.</li>
      </ul>
      <h3>꼭 기억하세요</h3>
      <ul>
        <li>이 가이드는 정보 제공용이며, 의사의 진단·치료를 대신하지 않습니다.</li>
        <li>증상이 2주 이상 지속되거나 점점 심해지면 의료기관을 방문하세요.</li>
        <li>각 질환의 "🚨 병원에 가야 할 때" 항목에 해당하면 자가 관리를 멈추고 진료를 받으세요.</li>
      </ul>
    </section>`,
  en: `
    <section class="content-section guide-section">
      <h2>What is this e-book?</h2>
      <p class="lead">A self-care guide to the 40 musculoskeletal conditions most often diagnosed at local orthopedic and rehab clinics, written from a rehab-training and sports-medicine perspective. It uses everyday language instead of difficult medical jargon, and organizes every condition the same way.</p>
      <h3>How each condition page is structured</h3>
      <ul>
        <li><strong>What is it?</strong> — Explains what the condition is and why it happens, using simple analogies.</li>
        <li><strong>Symptoms</strong> — A checklist to compare against your own symptoms.</li>
        <li><strong>Self-tests</strong> — Clinic exams adapted so you can try them safely at home.</li>
        <li><strong>Hands-on care</strong> — Treatments a <em>professional provides to you</em>, like manual and physical therapy.</li>
        <li><strong>Active care</strong> — Exercises <em>you do yourself</em> — the real key to preventing recurrence.</li>
        <li><strong>When to see a doctor</strong> — Red flags where you should stop self-care.</li>
      </ul>
      <h3>3 rules for exercising</h3>
      <ul>
        <li><strong>The "pain 3" rule</strong> — If pain during exercise goes above 3 out of 10, lower the intensity or stop.</li>
        <li><strong>Check the next day</strong> — If pain is worse the morning after, cut the amount in half.</li>
        <li><strong>Consistency beats intensity</strong> — A little every day works far better than one hard session a week.</li>
      </ul>
      <h3>Please remember</h3>
      <ul>
        <li>This guide is for information only and does not replace a doctor's diagnosis or treatment.</li>
        <li>If symptoms last more than 2 weeks or keep getting worse, see a medical professional.</li>
        <li>If any "🚨 When to see a doctor" item applies, stop self-care and get examined.</li>
      </ul>
    </section>`,
};
function renderGuide() {
  app.innerHTML = `
    <nav class="breadcrumb"><a href="#/">${T("nav_home")}</a> › ${T("bc_guide")}</nav>
    <h1 class="section-title" style="margin-top:0;">${T("guide_h")}</h1>
    ${GUIDE_HTML[LANG] || GUIDE_HTML.ko}
  `;
}

function renderNotFound() {
  app.innerHTML = `
    <div class="empty-state"><div class="big">🧐</div>
      <p>${T("notfound")}</p>
      <p><a href="#/" style="color:var(--primary); font-weight:700;">${T("go_home")}</a></p>
    </div>`;
}

/* ---------- 라우터 ---------- */
function route() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const [, page, param] = hash.split("/");
  window.scrollTo(0, 0);
  applyChrome();

  if (!page) { renderHome(); return setMeta(null, T("default_desc")); }
  if (page === "all") { renderAll(); return setMeta(T("all_title").replace(/^📚\s*/, "")); }
  if (page === "guide") { renderGuide(); return setMeta(T("nav_guide")); }
  if (page === "category" && param) {
    renderCategory(param);
    const cat = catOf(param);
    return setMeta(cat ? catName(cat) : null, cat ? catDesc(cat) : null);
  }
  if (page === "condition" && param) {
    renderCondition(param);
    const c = CONDITIONS.find((x) => x.id === param);
    if (c) { const v = view(c); return setMeta(v.name, v.summary); }
    return setMeta(null);
  }
  if (page === "search") { renderSearch(param || ""); return setMeta(T("bc_search")); }
  renderNotFound();
  setMeta(T("notfound"));
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", () => { applyChrome(); route(); });

/* 언어 토글 */
function toggleLang() {
  LANG = LANG === "ko" ? "en" : "ko";
  try { localStorage.setItem(LANG_KEY, LANG); } catch (e) {}
  route();
}

/* ---------- 증상 체크리스트 ---------- */
function toggleSymptom(li) {
  const checked = li.getAttribute("aria-pressed") === "true";
  li.setAttribute("aria-pressed", checked ? "false" : "true");
  li.classList.toggle("checked", !checked);
  updateSymptomResult(li.closest(".symptom-checklist"));
}
function updateSymptomResult(listEl) {
  if (!listEl) return;
  const total = Number(listEl.dataset.total) || listEl.children.length;
  const count = listEl.querySelectorAll('.symptom-check[aria-pressed="true"]').length;
  const result = document.getElementById("symptom-result");
  if (!result) return;
  if (count === 0) { result.hidden = true; return; }
  result.hidden = false;
  const level = count >= 3 ? "high" : "low";
  const msg = count >= 3 ? T("sr_high")(count) : T("sr_low")(count);
  result.className = "symptom-result " + level;
  result.innerHTML = `<span class="sr-count">${count} / ${total}</span> ${msg}`;
}

/* ---------- 이벤트 위임 ---------- */
app.addEventListener("click", (e) => {
  const li = e.target.closest(".symptom-check");
  if (li && app.contains(li)) { toggleSymptom(li); return; }

  const favBtn = e.target.closest("[data-fav]");
  if (favBtn) {
    const id = favBtn.getAttribute("data-fav");
    const added = Store.toggleFavorite(id);
    favBtn.classList.toggle("is-fav", added);
    favBtn.setAttribute("aria-pressed", String(added));
    favBtn.querySelector(".star").textContent = added ? "★" : "☆";
    favBtn.querySelector(".fav-label").textContent = added ? T("fav_on") : T("fav_off");
    return;
  }
  if (e.target.closest("[data-print]")) { window.print(); return; }

  const zone = e.target.closest("[data-cat]");
  if (zone) location.hash = "#/category/" + zone.getAttribute("data-cat");
});
app.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const li = e.target.closest(".symptom-check");
  if (li && app.contains(li)) { e.preventDefault(); toggleSymptom(li); return; }
  const zone = e.target.closest("[data-cat]");
  if (zone) { e.preventDefault(); location.hash = "#/category/" + zone.getAttribute("data-cat"); }
});

/* 헤더 언어 토글 버튼 */
document.addEventListener("click", (e) => {
  if (e.target.closest("#langToggle")) { e.preventDefault(); toggleLang(); }
});

/* ---------- 맨 위로 버튼 ---------- */
const topBtn = document.createElement("button");
topBtn.className = "back-top";
topBtn.textContent = "↑";
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
document.body.appendChild(topBtn);
window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 600);
});

/* ---------- 서비스 워커 ---------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
