// Isometric geometry for the 3D-style drawings. Pure functions: no React, no DOM.
export const K = 40;
export const PH = 0.14; // island height
const A = (K * Math.sqrt(3)) / 2;
const B = K / 2;
const r1 = (n) => Math.round(n * 10) / 10;

export const projector = (ox, oy) => (x, y, z = 0) => [r1(ox + (x - y) * A), r1(oy + (x + y) * B - z * K)];
export const pts = (a) => a.map((p) => p.join(',')).join(' ');
export const pathD = (a) => 'M' + a.map((p) => p.join(' ')).join('L');

// The +y face (left), the +x face (right), the top, and the six-point outline.
export function boxFaces(P, x, y, z, w, d, h) {
  return {
    left: [P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)],
    right: [P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)],
    top: [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)],
    hull: [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y, z), P(x + w, y + d, z), P(x, y + d, z), P(x, y + d, z + h)],
  };
}

export const faceY = (P, Y) => (x, z) => P(x, Y, z);
export const faceX = (P, X) => (y, z) => P(X, y, z);

export function cylinder(P, x, y, z, r, h) {
  const [cx, cy] = P(x, y, z);
  const hh = h * K;
  const rx = r1(r * K * 1.2247);
  const ry = r1(r * K * 0.7071);
  const ty = r1(cy - hh);
  const l = r1(cx - rx);
  const rr = r1(cx + rx);
  const arc = (yy) => `M${l} ${yy}A${rx} ${ry} 0 0 0 ${rr} ${yy}`;
  return {
    cx, cy, rx, ry, ty,
    body: `M${l} ${ty}V${cy}A${rx} ${ry} 0 0 0 ${rr} ${cy}V${ty}Z`,
    bands: arc(r1(ty + hh * 0.36)) + arc(r1(ty + hh * 0.68)),
    hull: [[l, r1(ty - ry)], [rr, r1(ty - ry)], [rr, r1(cy + ry)], [l, r1(cy + ry)]],
  };
}
