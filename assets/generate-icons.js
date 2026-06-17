/* PWA 아이콘 생성기 — 순수 Node(zlib), 외부 의존성 없음.
   실행: node assets/generate-icons.js  →  icon-192.png, icon-512.png, maskable-512.png */
const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

const top = [26, 115, 167];   // #1a73a7
const bot = [17, 88, 127];    // #11587f
const white = [255, 255, 255];

function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
function mix(c1, c2, t) { return [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)]; }

const crcTable = (() => {
  const t = new Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
function crc32(buf) { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return c ^ 0xffffffff; }

function png(W, H, px) {
  const raw = Buffer.alloc(H * (1 + W * 3));
  for (let y = 0; y < H; y++) { raw[y * (1 + W * 3)] = 0; px.copy(raw, y * (1 + W * 3) + 1, y * W * 3, (y + 1) * W * 3); }
  const comp = zlib.deflateSync(raw, { level: 9 });
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
    const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td) >>> 0, 0);
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk("IHDR", ihdr), chunk("IDAT", comp), chunk("IEND", Buffer.alloc(0))]);
}

// size: 한 변 픽셀, crossScale: 십자가 크기 비율(0~1), radius: 둥근 모서리 비율
function makeIcon(size, crossScale) {
  const px = Buffer.alloc(size * size * 3);
  const set = (x, y, c) => { const i = (y * size + x) * 3; px[i]=c[0]; px[i+1]=c[1]; px[i+2]=c[2]; };
  // 대각선 그라데이션 배경
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++)
      set(x, y, mix(top, bot, (x / size + y / size) / 2));

  // 중앙 흰색 의료 십자가
  const cx = size / 2, cy = size / 2;
  const len = size * crossScale / 2;     // 팔 길이 절반
  const arm = len * 0.42;                 // 팔 두께 절반
  const fillRect = (x0, y0, w, h) => {
    for (let y = Math.round(y0); y < y0 + h; y++)
      for (let x = Math.round(x0); x < x0 + w; x++)
        if (x >= 0 && y >= 0 && x < size && y < size) set(x, y, white);
  };
  fillRect(cx - arm, cy - len, arm * 2, len * 2); // 세로
  fillRect(cx - len, cy - arm, len * 2, arm * 2); // 가로
  return png(size, size, px);
}

const out = (name, buf) => { fs.writeFileSync(path.join(__dirname, name), buf); console.log("✅ " + name + " (" + buf.length + " bytes)"); };

out("icon-192.png", makeIcon(192, 0.62));
out("icon-512.png", makeIcon(512, 0.62));
// maskable: 안전영역 고려해 십자가를 더 작게(중앙 60% 안)
out("maskable-512.png", makeIcon(512, 0.46));
