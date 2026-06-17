/* 서비스 워커 — 오프라인 지원 (앱 셸 + 질환 데이터 캐시)
   콘텐츠를 바꾸면 CACHE 버전을 올려 갱신을 강제한다. */
const CACHE = "mtm-v2";

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
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
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

  // SPA 내비게이션: 항상 캐시된 index.html 로 응답(오프라인에서도 앱이 뜨도록)
  if (req.mode === "navigate") {
    e.respondWith(
      caches.match("./index.html").then((cached) => cached || fetch(req))
    );
    return;
  }

  // 동일 출처 자원: 캐시 우선, 없으면 네트워크 후 캐시에 저장
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }).catch(() => cached);
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
