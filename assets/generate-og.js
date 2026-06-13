/* OG 이미지(1200x630 PNG) 생성기 — 순수 Node(zlib)만 사용, 외부 의존성 없음.
   카카오톡 등 SVG를 렌더링하지 않는 플랫폼까지 커버하기 위해 라스터(PNG)로 생성한다.
   실행: node assets/generate-og.js  →  assets/og-image.png */
const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

const W = 1200, H = 630;

// 브랜드 색 (css/style.css의 --primary-dark ~ --primary 계열)
const top = [17, 88, 127];     // #11587f
const bot = [26, 115, 167];    // #1a73a7
const white = [255, 255, 255];

function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
function mix(c1, c2, t) { return [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)]; }

// 픽셀 버퍼 (RGB)
const px = Buffer.alloc(W * H * 3);
function set(x, y, c) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 3;
  px[i] = c[0]; px[i + 1] = c[1]; px[i + 2] = c[2];
}

// 1) 대각선 그라데이션 배경
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const t = (x / W + y / H) / 2;
    set(x, y, mix(top, bot, t));
  }
}

// 2) 둥근 사각형 헬퍼 (반투명 흰 패널 느낌은 단순 합성으로)
function fillRect(x0, y0, w, h, c, alpha = 1) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      const i = (y * W + x) * 3;
      px[i] = lerp(px[i], c[0], alpha);
      px[i + 1] = lerp(px[i + 1], c[1], alpha);
      px[i + 2] = lerp(px[i + 2], c[2], alpha);
    }
  }
}

// 3) 의료 십자가 (흰색) — 좌측에 배치
const cx = 250, cy = H / 2;     // 중심
const arm = 70;                  // 팔 두께 절반
const len = 150;                 // 팔 길이 절반
// 살짝 큰 반투명 원형 배경
function fillDisc(ccx, ccy, r, c, alpha = 1) {
  for (let y = ccy - r; y <= ccy + r; y++) {
    for (let x = ccx - r; x <= ccx + r; x++) {
      const dx = x - ccx, dy = y - ccy;
      if (dx * dx + dy * dy <= r * r) {
        const i = (y * W + x) * 3;
        if (i < 0 || i >= px.length) continue;
        px[i] = lerp(px[i], c[0], alpha);
        px[i + 1] = lerp(px[i + 1], c[1], alpha);
        px[i + 2] = lerp(px[i + 2], c[2], alpha);
      }
    }
  }
}
fillDisc(cx, cy, 210, white, 0.12);
fillRect(cx - arm, cy - len, arm * 2, len * 2, white);   // 세로 막대
fillRect(cx - len, cy - arm, len * 2, arm * 2, white);   // 가로 막대

// 4) 하단 강조 바
fillRect(0, H - 14, W, 14, [232, 89, 12]); // accent

// ---- PNG 인코딩 ----
function png(width, height, rgb) {
  // 각 행 앞에 filter 바이트(0) 추가
  const raw = Buffer.alloc(height * (1 + width * 3));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 3)] = 0;
    rgb.copy(raw, y * (1 + width * 3) + 1, y * width * 3, (y + 1) * width * 3);
  }
  const comp = zlib.deflateSync(raw, { level: 9 });

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(td) >>> 0, 0);
    return Buffer.concat([len, td, crc]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 2;   // color type 2 = truecolor RGB
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", comp),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// CRC32 (PNG 표준)
const crcTable = (() => {
  const t = new Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ 0xffffffff;
}

const out = png(W, H, px);
fs.writeFileSync(path.join(__dirname, "og-image.png"), out);
console.log("✅ assets/og-image.png 생성 완료 (" + out.length + " bytes)");
