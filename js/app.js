/* ============================================================
   내 통증 사용설명서 — SPA 라우터 & 렌더러
   ============================================================ */

const CATEGORIES = [
  { id: "neck", icon: "🦒", name: "목", desc: "거북목, 목 디스크, 뒷목·어깨 결림 등 목 주변 통증" },
  { id: "shoulder", icon: "🏋️", name: "어깨", desc: "날개뼈 운동이상증, 충돌증후군, 오십견 등 어깨 통증" },
  { id: "elbow-hand", icon: "✋", name: "팔꿈치 · 손목 · 손", desc: "테니스 엘보, 손목터널증후군, 방아쇠 수지 등" },
  { id: "back", icon: "🧍", name: "허리 · 골반", desc: "허리 디스크, 협착증, 천장관절·이상근 문제 등" },
  { id: "hip", icon: "🦵", name: "엉덩이 · 허벅지", desc: "고관절 충돌, 대전자 통증, 햄스트링 부상 등" },
  { id: "knee", icon: "🦿", name: "무릎", desc: "러너스 니, 점퍼스 니, 장경인대, 관절염 등" },
  { id: "foot", icon: "🦶", name: "발목 · 발", desc: "발목 염좌, 족저근막염, 아킬레스건염 등" },
];

const CONDITIONS = window.ALL_CONDITIONS || [];

const app = document.getElementById("app");

/* ---------- 유틸 ---------- */
function catOf(id) {
  return CATEGORIES.find((c) => c.id === id);
}

function conditionsIn(catId) {
  return CONDITIONS.filter((c) => c.category === catId);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[m]));
}

/* ---------- 페이지: 홈 ---------- */
function renderHome() {
  const catCards = CATEGORIES.map((cat) => {
    const n = conditionsIn(cat.id).length;
    return `
      <a class="category-card" href="#/category/${cat.id}">
        <div class="cat-icon">${cat.icon}</div>
        <h3>${cat.name}</h3>
        <p>${cat.desc}</p>
        <span class="cat-count">${n}개 질환</span>
      </a>`;
  }).join("");

  app.innerHTML = `
    <section class="hero">
      <h1>내 통증, 원인을 알면<br /><span>스스로 해결</span>할 수 있습니다</h1>
      <p>
        동네 병원에서 가장 자주 만나는 근골격계 질환 <strong>30가지</strong>를
        고등학생도 이해할 수 있는 쉬운 말로 풀었습니다.
        증상을 체크하고, 간단한 자가 평가로 원인을 좁히고,
        수동 치료와 능동 치료(운동)로 직접 관리해 보세요.
      </p>
      <form class="search-box" onsubmit="event.preventDefault(); location.hash='#/search/'+encodeURIComponent(this.q.value);">
        <input name="q" type="text" placeholder="증상이나 질환 이름으로 검색 (예: 팔꿈치 바깥쪽 통증)" />
        <button type="submit">검색</button>
      </form>
      <p class="search-hint">예시: "아침에 첫발 디딜 때 발뒤꿈치", "어깨 들 때 통증", "손 저림"</p>
    </section>

    <h2 class="section-title">📍 아픈 부위를 선택하세요</h2>
    <div class="category-grid">${catCards}</div>

    <h2 class="section-title">🧭 이렇게 사용하세요</h2>
    <div class="steps">
      <div class="step"><span class="step-num">1</span><h4>증상 체크</h4><p>내 증상과 비슷한 항목이 몇 개나 되는지 체크리스트로 확인합니다.</p></div>
      <div class="step"><span class="step-num">2</span><h4>자가 평가</h4><p>집에서 할 수 있는 간단한 검사로 의심 질환을 좁혀 봅니다.</p></div>
      <div class="step"><span class="step-num">3</span><h4>수동 치료 이해</h4><p>병원·치료실에서 받게 되는 도수치료, 물리치료가 무엇인지 알아봅니다.</p></div>
      <div class="step"><span class="step-num">4</span><h4>능동 치료 실천</h4><p>핵심은 운동! 단계별 운동으로 통증의 뿌리를 해결합니다.</p></div>
    </div>

    <h2 class="section-title">📚 전체 질환 30가지</h2>
    <p class="section-sub">전체 목록에서 바로 찾아볼 수도 있습니다.</p>
    <div class="condition-list">${CONDITIONS.slice(0, 6).map(itemHTML).join("")}</div>
    <p style="text-align:center; margin-top:18px;">
      <a href="#/all" style="color:var(--primary); font-weight:700;">전체 30개 질환 모두 보기 →</a>
    </p>
  `;
}

/* ---------- 페이지: 카테고리 ---------- */
function renderCategory(catId) {
  const cat = catOf(catId);
  if (!cat) return renderNotFound();
  const list = conditionsIn(catId);

  app.innerHTML = `
    <nav class="breadcrumb"><a href="#/">홈</a> › ${cat.name}</nav>
    <h1 class="section-title" style="margin-top:0;">${cat.icon} ${cat.name} 질환 (${list.length}개)</h1>
    <p class="section-sub">${cat.desc}</p>
    <div class="condition-list">${list.map(itemHTML).join("")}</div>
  `;
}

/* ---------- 페이지: 전체 목록 ---------- */
function renderAll() {
  const sections = CATEGORIES.map((cat) => {
    const list = conditionsIn(cat.id);
    if (!list.length) return "";
    return `
      <h2 class="section-title">${cat.icon} ${cat.name}</h2>
      <div class="condition-list">${list.map(itemHTML).join("")}</div>`;
  }).join("");

  app.innerHTML = `
    <nav class="breadcrumb"><a href="#/">홈</a> › 전체 질환</nav>
    <h1 class="section-title" style="margin-top:0;">📚 전체 질환 ${CONDITIONS.length}가지</h1>
    ${sections}
  `;
}

function itemHTML(c) {
  return `
    <a class="condition-item" href="#/condition/${c.id}">
      <div>
        <h3>${c.name}<span class="eng">${c.eng}</span></h3>
        <p>${c.summary}</p>
      </div>
      <span class="arrow">›</span>
    </a>`;
}

/* ---------- 페이지: 질환 상세 ---------- */
function renderCondition(id) {
  const c = CONDITIONS.find((x) => x.id === id);
  if (!c) return renderNotFound();
  const cat = catOf(c.category);
  const list = conditionsIn(c.category);
  const idx = list.indexOf(c);
  const prev = list[idx - 1];
  const next = list[idx + 1];

  const descHTML = c.description.map((p) => `<p class="lead">${p}</p>`).join("");

  const causesHTML = c.causes.map((s) => `<li>${s}</li>`).join("");
  const symptomsHTML = c.symptoms.map((s) => `<li>${s}</li>`).join("");

  const testsHTML = c.selfTests.map((t) => `
    <div class="test-card">
      <h4>🔍 ${t.name}</h4>
      <p class="how">${t.how}</p>
      <p class="positive">${t.positive}</p>
    </div>`).join("");

  const passiveHTML = c.passive.map((t) => `
    <div class="therapy-card passive">
      <h4>🤲 ${t.name}</h4>
      <p class="desc">${t.desc}</p>
    </div>`).join("");

  const activeHTML = c.active.map((t) => `
    <div class="therapy-card active">
      <h4>🏃 ${t.name}</h4>
      <p class="desc">${t.how}</p>
      ${t.dose ? `<span class="dose">⏱ ${t.dose}</span>` : ""}
    </div>`).join("");

  const warningsHTML = c.warnings.map((s) => `<li>${s}</li>`).join("");

  app.innerHTML = `
    <nav class="breadcrumb">
      <a href="#/">홈</a> › <a href="#/category/${cat.id}">${cat.name}</a> › ${c.name}
    </nav>

    <header class="condition-header">
      <span class="cat-label">${cat.icon} ${cat.name}</span>
      <h1>${c.name}</h1>
      <p class="eng-name">${c.eng}</p>
      <p class="summary">${c.summary}</p>
    </header>

    <nav class="toc-chips">
      <a href="#sec-what">어떤 질환인가요?</a>
      <a href="#sec-symptoms">증상 체크</a>
      <a href="#sec-tests">자가 평가</a>
      <a href="#sec-passive">수동 치료</a>
      <a href="#sec-active">능동 치료(운동)</a>
      <a href="#sec-warning">병원에 가야 할 때</a>
    </nav>

    <section class="content-section" id="sec-what">
      <h2>📖 어떤 질환인가요?</h2>
      ${descHTML}
      <h2 style="font-size:1.05rem; margin-top:18px;">왜 생기나요?</h2>
      <ul class="check-list cause-list">${causesHTML}</ul>
    </section>

    <section class="content-section" id="sec-symptoms">
      <h2>✅ 이런 증상이 있나요?</h2>
      <p class="lead">아래 항목 중 <strong>3개 이상</strong> 해당하면 이 질환일 가능성이 높습니다.</p>
      <ul class="check-list">${symptomsHTML}</ul>
    </section>

    <section class="content-section" id="sec-tests">
      <h2>🔬 집에서 해보는 자가 평가</h2>
      <p class="lead">아프지 않은 범위에서 천천히 해보세요. 검사 중 통증이 심해지면 바로 멈춥니다.</p>
      ${testsHTML}
    </section>

    <section class="content-section" id="sec-passive">
      <h2>🤲 수동 치료 <span class="badge badge-passive">전문가가 해주는 치료</span></h2>
      <p class="lead">병원이나 치료실에서 받게 되는 치료입니다. 통증을 빠르게 줄여 운동할 수 있는 몸 상태를 만들어 줍니다.</p>
      ${passiveHTML}
    </section>

    <section class="content-section" id="sec-active">
      <h2>🏃 능동 치료 <span class="badge badge-active">내가 직접 하는 운동</span></h2>
      <p class="lead">진짜 회복은 여기서 시작됩니다. 통증이 0~3점(10점 만점) 수준에서 머무는 강도로, 꾸준히 하는 것이 핵심입니다.</p>
      ${activeHTML}
      ${c.note ? `<div class="note"><strong>코치의 한마디:</strong> ${c.note}</div>` : ""}
    </section>

    <section class="content-section warning-section" id="sec-warning">
      <h2>🚨 이럴 땐 자가 관리 멈추고 병원으로!</h2>
      <ul class="check-list warning-list">${warningsHTML}</ul>
    </section>

    <nav class="detail-nav">
      ${prev ? `<a href="#/condition/${prev.id}"><span class="nav-label">← 이전 질환</span>${prev.name}</a>` : "<span style='flex:1'></span>"}
      ${next ? `<a class="next" href="#/condition/${next.id}"><span class="nav-label">다음 질환 →</span>${next.name}</a>` : "<span style='flex:1'></span>"}
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
      const haystack = [
        c.name, c.eng, c.summary,
        c.description.join(" "),
        c.symptoms.join(" "),
        c.causes.join(" "),
      ].join(" ").toLowerCase();
      const score = terms.reduce((acc, t) => acc + (haystack.includes(t.toLowerCase()) ? 1 : 0), 0);
      return { c, score };
    }).filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.c);
  }

  app.innerHTML = `
    <nav class="breadcrumb"><a href="#/">홈</a> › 검색</nav>
    <h1 class="section-title" style="margin-top:0;">🔎 검색 결과</h1>
    <form class="search-box" style="margin:0 0 18px;" onsubmit="event.preventDefault(); location.hash='#/search/'+encodeURIComponent(this.q.value);">
      <input name="q" type="text" value="${esc(q)}" placeholder="증상이나 질환 이름으로 검색" />
      <button type="submit">검색</button>
    </form>
    ${results.length
      ? `<p class="search-result-info">"<strong>${esc(q)}</strong>" 관련 질환 ${results.length}개를 찾았습니다.</p>
         <div class="condition-list">${results.map(itemHTML).join("")}</div>`
      : `<div class="empty-state">
           <div class="big">🤔</div>
           <p>"<strong>${esc(q)}</strong>"에 맞는 질환을 찾지 못했습니다.<br/>
           "팔꿈치", "저림", "무릎 앞쪽"처럼 부위나 느낌으로 검색해 보세요.</p>
         </div>`}
  `;
}

/* ---------- 페이지: 이용 안내 ---------- */
function renderGuide() {
  app.innerHTML = `
    <nav class="breadcrumb"><a href="#/">홈</a> › 이용 안내</nav>
    <h1 class="section-title" style="margin-top:0;">📘 이용 안내</h1>

    <section class="content-section guide-section">
      <h2>이 전자책은 무엇인가요?</h2>
      <p class="lead">
        동네 정형외과·재활의학과에서 가장 자주 진단되는 근골격계 질환 30가지를,
        재활 트레이닝과 스포츠의학 관점에서 정리한 자가 관리 가이드입니다.
        어려운 의학 용어 대신 일상 언어로 설명하고, 모든 질환을 같은 구조로 정리했습니다.
      </p>
      <h3>각 질환 페이지의 구성</h3>
      <ul>
        <li><strong>어떤 질환인가요?</strong> — 질환의 정체와 생기는 이유를 비유로 쉽게 설명합니다.</li>
        <li><strong>증상 체크</strong> — 내 증상과 비교해 볼 수 있는 체크리스트입니다.</li>
        <li><strong>자가 평가</strong> — 병원에서 쓰는 검사를 집에서 안전하게 해볼 수 있도록 바꾼 것입니다.</li>
        <li><strong>수동 치료</strong> — 도수치료, 물리치료처럼 <em>전문가가 나에게 해주는</em> 치료입니다. 통증을 줄여 운동할 준비를 만듭니다.</li>
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
    </section>
  `;
}

function renderNotFound() {
  app.innerHTML = `
    <div class="empty-state">
      <div class="big">🧐</div>
      <p>페이지를 찾을 수 없습니다.</p>
      <p><a href="#/" style="color:var(--primary); font-weight:700;">홈으로 돌아가기</a></p>
    </div>`;
}

/* ---------- 라우터 ---------- */
function route() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const [, page, param] = hash.split("/");

  window.scrollTo(0, 0);

  if (!page) return renderHome();
  if (page === "all") return renderAll();
  if (page === "guide") return renderGuide();
  if (page === "category" && param) return renderCategory(param);
  if (page === "condition" && param) return renderCondition(param);
  if (page === "search") return renderSearch(param || "");
  renderNotFound();
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", route);

/* ---------- 맨 위로 버튼 ---------- */
const topBtn = document.createElement("button");
topBtn.className = "back-top";
topBtn.textContent = "↑";
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
document.body.appendChild(topBtn);
window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 600);
});
