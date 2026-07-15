/* 서비스 워커 — 오프라인 지원 (앱 셸 + 질환 데이터 캐시)
   내비게이션은 네트워크 우선, 자원은 stale-while-revalidate라
   배포만 하면 다음 방문(또는 그다음 방문)에 자동 갱신된다.
   CACHE 버전은 오래된 캐시 정리용으로만 올리면 된다. */
const CACHE = "mtm-v8";

const APP_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/data/neck.js",
  "./js/data/shoulder.js",
  "./js/data/elbow-hand.js",
  "./js/data/back.js",
  "./js/data/hip.js",
  "./js/data/knee.js",
  "./js/data/foot.js",
  "./js/data/extra.js",
  "./js/data/en/neck.js",
  "./js/data/en/shoulder.js",
  "./js/data/en/elbow-hand.js",
  "./js/data/en/back.js",
  "./js/data/en/hip.js",
  "./js/data/en/knee.js",
  "./js/data/en/foot.js",
  "./js/data/en/extra.js",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/illustrations/hero-pain-guide.webp",
  "./assets/illustrations/neck.webp",
  "./assets/illustrations/shoulder.webp",
  "./assets/illustrations/elbow-hand.webp",
  "./assets/illustrations/back.webp",
  "./assets/illustrations/hip.webp",
  "./assets/illustrations/knee.webp",
  "./assets/illustrations/foot.webp",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // SPA 내비게이션: 네트워크 우선(항상 최신 index.html), 오프라인이면 캐시
  if (req.mode === "navigate") {
    e.respondWith(
      fetch("./index.html").then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy));
        }
        return res;
      }).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // 동일 출처 자원: stale-while-revalidate — 캐시로 즉시 응답하되
  // 뒤에서 네트워크로 새 버전을 받아 캐시를 갱신(다음 방문에 반영)
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req).then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }).catch(() => cached || Response.error());
        return cached || network;
      })
    );
    return;
  }

  // 교차 출처(웹폰트 등): 네트워크 우선, 실패 시 런타임 캐시 사용
  e.respondWith(
    fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(req))
  );
});
