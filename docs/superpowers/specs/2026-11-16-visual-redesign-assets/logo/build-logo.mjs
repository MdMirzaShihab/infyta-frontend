// Geometric redraw of the Infyta logo from measurements of the 200x119 raster.
// Usage: node build-logo.mjs <outDir>
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const f = (n) => Number(n.toFixed(2));
const pt = (p) => `${f(p[0])} ${f(p[1])}`;

// Polygon with per-corner radius, corners drawn as quadratic curves.
function rounded(points, radii) {
  const n = points.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n], p1 = points[i], p2 = points[(i + 1) % n];
    const r = Array.isArray(radii) ? radii[i] : radii;
    const v1 = [p0[0] - p1[0], p0[1] - p1[1]], v2 = [p2[0] - p1[0], p2[1] - p1[1]];
    const l1 = Math.hypot(...v1), l2 = Math.hypot(...v2);
    const ang = Math.acos((v1[0] * v2[0] + v1[1] * v2[1]) / (l1 * l2));
    const dist = Math.min(r / Math.tan(ang / 2), l1 / 2, l2 / 2);
    const a = [p1[0] + (v1[0] / l1) * dist, p1[1] + (v1[1] / l1) * dist];
    const b = [p1[0] + (v2[0] / l2) * dist, p1[1] + (v2[1] / l2) * dist];
    d += `${i ? 'L' : 'M'}${pt(a)}Q${pt(p1)} ${pt(b)}`;
  }
  return d + 'Z';
}

const K = 0.6; // isometric edge slope measured from the raster
// A tile: vertical sides, top/bottom edges rising to the right.
const tile = (x0, x1, yTopLeft, h, r) =>
  rounded([[x0, yTopLeft], [x1, yTopLeft - K * (x1 - x0)], [x1, yTopLeft - K * (x1 - x0) + h], [x0, yTopLeft + h]], r);

export const shapes = {
  wall: rounded([[0, 49.4], [55, 81.5], [55, 120.3], [0, 88.2]], [1.2, 3, 7, 1.2]),
  floor: rounded([[5.5, 47.5], [62.5, 13.3], [62.5, 52.6], [38, 67.3]], [1.6, 0, 0, 1.6]),
  t1: tile(25.5, 46.8, 24.9, 19.8, 3),
  t2: tile(51.5, 70.8, 9.3, 17.5, 3),
  t3: tile(51.5, 75.8, 31.2, 23.2, 3.4),
};

// variant: 'reversed' (white wordmark + floor, for navy grounds) or 'ink' (navy, for paper grounds)
export function logoSvg({ variant = 'reversed', tagline = true, id = 'il' } = {}) {
  const word = variant === 'reversed' ? '#ffffff' : '#1f2c62';
  const floor = variant === 'reversed' ? '#ffffff' : '#1f2c62';
  const h = tagline ? 125 : 112;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -4 205 ${h}" role="img" aria-label="Infyta">
  <defs>
    <linearGradient id="${id}-w" gradientUnits="userSpaceOnUse" x1="0" y1="50" x2="48" y2="108"><stop offset="0" stop-color="#14b9da"/><stop offset="1" stop-color="#212b60"/></linearGradient>
    <linearGradient id="${id}-t" gradientUnits="userSpaceOnUse" x1="70" y1="2" x2="45" y2="45"><stop offset="0" stop-color="#3cc4c4"/><stop offset="1" stop-color="#212b60"/></linearGradient>
    <mask id="${id}-m" maskUnits="userSpaceOnUse" x="-2" y="-4" width="205" height="130">
      <rect x="-2" y="-4" width="205" height="130" fill="#fff"/>
      <g fill="#000" transform="translate(2 4.2)"><path d="${shapes.t1}"/><path d="${shapes.t2}"/><path d="${shapes.t3}"/></g>
    </mask>
  </defs>
  <path d="${shapes.wall}" fill="url(#${id}-w)"/>
  <path d="${shapes.floor}" fill="${floor}" mask="url(#${id}-m)"/>
  <g fill="url(#${id}-t)"><path d="${shapes.t1}"/><path d="${shapes.t2}"/><path d="${shapes.t3}"/></g>
  <circle cx="67.4" cy="69.5" r="4.7" fill="${word}"/><circle cx="66.2" cy="70.2" r="3.8" fill="#14b9da"/>
  <text x="62.2" y="98" dx="-2 2.5 0 1 1.5 0.75" font-family="Montserrat, sans-serif" font-weight="800" font-size="42.5" letter-spacing="1.1" fill="${word}">ınf<tspan fill="#14b9da">y</tspan>ta</text>${tagline ? `
  <text x="63" y="117.2" font-family="'Barlow Semi Condensed', sans-serif" font-weight="500" font-size="9.8" textLength="136" lengthAdjust="spacingAndGlyphs" fill="${word}" opacity=".88">Engineering Tomorrow’s Tech Today</text>` : ''}
</svg>`;
}

// Only write files when run directly, never when imported by another script.
if (process.argv[1] === fileURLToPath(import.meta.url) && process.argv[2]) {
  const out = process.argv[2];
  writeFileSync(`${out}/infyta-logo-reversed.svg`, logoSvg({ variant: 'reversed', id: 'r' }));
  writeFileSync(`${out}/infyta-logo-ink.svg`, logoSvg({ variant: 'ink', id: 'k' }));
  writeFileSync(`${out}/shapes.json`, JSON.stringify(shapes, null, 1));
  console.log('written', Object.keys(shapes).join(', '));
}
