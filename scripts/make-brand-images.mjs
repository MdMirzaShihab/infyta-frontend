// Generates src/app brand images from public/images/infyta-logo.png. Run: node scripts/make-brand-images.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const logo = resolve(root, 'public/images/infyta-logo.png');
const out = (f) => resolve(root, 'src/app', f);
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

async function resized(size, bg) {
  return sharp(logo).resize(size.w, size.h, { fit: 'contain', background: bg ?? TRANSPARENT }).png().toBuffer();
}

async function square(size, pad, bg, file) {
  const inner = await resized({ w: size - pad * 2, h: size - pad * 2 });
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: inner, gravity: 'center' }])
    .png()
    .toFile(out(file));
}

await square(512, 40, TRANSPARENT, 'icon.png');
await square(180, 24, '#1f2c62', 'apple-icon.png');

const W = 1200, H = 630;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#1f2c62"/><stop offset="1" stop-color="#3ac1c2"/>
  </linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="600" y="430" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="96" font-weight="700" fill="#ffffff">Infyta</text>
  <text x="600" y="500" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="40" fill="#ffffff">IT Solutions in Dhaka, Bangladesh</text>
</svg>`;
const logoBuf = await sharp(logo).resize(300, 179, { fit: 'inside' }).png().toBuffer();
await sharp(Buffer.from(svg))
  .composite([{ input: logoBuf, left: 450, top: 90 }])
  .png()
  .toFile(out('opengraph-image.png'));
writeFileSync(out('opengraph-image.alt.txt'), 'Infyta – IT Solutions in Dhaka, Bangladesh');
