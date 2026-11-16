// Generates the brand PNGs from the vector logo in public/images/ (run node scripts/make-logo.mjs first).
// Run: node scripts/make-brand-images.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadFont, lineAt } from './lib/text-path.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const logo = (f) => readFileSync(resolve(root, 'public/images', f), 'utf8');
const out = (f) => resolve(root, 'src/app', f);
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const NAVY = '#1f2c62';
const FULL = '-2 -4 205 125';
// The mark alone: x from -2 to 78 at the full logo height, drawn from the no-tagline file so no
// tagline shows. (The 112-high no-tagline viewBox would cut off the bottom of the wall, at y 116.)
const MARK = '-2 -4 80 125';

// Renders `svg` through `viewBox`, scaled to fit inside maxW x maxH.
function render(svg, viewBox, maxW, maxH = Infinity) {
  const [, , vw, vh] = viewBox.split(' ').map(Number);
  const scale = Math.min(maxW / vw, maxH / vh);
  const sized = svg.replace(/viewBox="[^"]*"/, `viewBox="${viewBox}" width="${vw * scale}" height="${vh * scale}"`);
  return sharp(Buffer.from(sized)).png().toBuffer();
}

async function square(svg, size, pad, background, file) {
  const mark = await render(svg, MARK, size - pad * 2, size - pad * 2);
  await sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(out(file));
}

await sharp(await render(logo('infyta-logo.svg'), FULL, 1200)).png().toFile(resolve(root, 'public/images/infyta-logo.png'));
await square(logo('infyta-logo-notagline.svg'), 512, 40, TRANSPARENT, 'icon.png');
await square(logo('infyta-logo-reversed-notagline.svg'), 180, 24, NAVY, 'apple-icon.png');

const W = 1200, H = 630, LOGO_W = 480, LOGO_TOP = 100, BASELINE = 525;
const archivo = loadFont('@fontsource/archivo/files/archivo-latin-600-normal.woff');
const line = lineAt(archivo, 'IT Solutions in Dhaka, Bangladesh', 0, BASELINE, 40);
const ground = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  <path d="${line.d}" fill="#ffffff" transform="translate(${((W - line.width) / 2).toFixed(2)} 0)"/>
</svg>`;
const ogLogo = await render(logo('infyta-logo-reversed.svg'), FULL, LOGO_W);
const ogLogoW = (await sharp(ogLogo).metadata()).width;
await sharp(Buffer.from(ground))
  .composite([{ input: ogLogo, left: Math.round((W - ogLogoW) / 2), top: LOGO_TOP }])
  .png()
  .toFile(out('opengraph-image.png'));
writeFileSync(out('opengraph-image.alt.txt'), 'Infyta – IT Solutions in Dhaka, Bangladesh');
