// Generates responsive WebP variants of the hero slides and the advisor photo (never upscales).
// Run: node scripts/resize-images.mjs   (outputs are committed)
import sharp from 'sharp';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const img = (p) => resolve(root, 'public/images', p);

const HERO = ['team', 'data', 'developer', 'network', 'padlock', 'holographic'];
const jobs = [
  ...HERO.map((name) => ({ src: `hero/${name}.webp`, base: `hero/${name}`, widths: [640, 1280, 1920] })),
  { src: 'team/chief-advisor.webp', base: 'team/chief-advisor', widths: [320, 640] },
];

for (const { src, base, widths } of jobs) {
  const { width: srcWidth } = await sharp(img(src)).metadata();
  for (const w of widths) {
    const info = await sharp(img(src))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(img(`${base}-${w}.webp`));
    const note = w > srcWidth ? ` (source is ${srcWidth}px wide, not upscaled)` : '';
    console.log(`${base}-${w}.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB${note}`);
  }
}
