import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync('src/styles/tokens.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function decls(selector) {
  const m = css.match(new RegExp(esc(selector) + '\\s*\\{([^}]*)\\}'));
  assert.ok(m, `no block for ${selector}`);
  return Object.fromEntries([...m[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((d) => [d[1], d[2].trim()]));
}
const root = decls(':root');
const darkAttr = decls(':root[data-theme="dark"]');
const darkMedia = decls(':root:not([data-theme="light"])');
const inverse = decls('.inverse');
const themes = {
  Paper: root,
  Blueprint: { ...root, ...darkAttr },
  'inverse band on Paper': { ...root, ...inverse },
  'inverse band on Blueprint': { ...root, ...darkAttr, ...inverse },
};
function value(scope, name, depth = 0) {
  assert.ok(depth < 8, `var() loop at ${name}`);
  const raw = scope[name];
  assert.ok(raw, `${name} is not defined`);
  const ref = raw.match(/^var\((--[\w-]+)\)$/);
  return ref ? value(scope, ref[1], depth + 1) : raw;
}
function rgba(str) {
  const hex = str.match(/^#([0-9a-f]{6})$/i);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)).concat(1);
  const m = str.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/);
  assert.ok(m, `unsupported colour: ${str}`);
  return [+m[1], +m[2], +m[3], +m[4]];
}
const over = ([r, g, b, a], [R, G, B]) => [r * a + R * (1 - a), g * a + G * (1 - a), b * a + B * (1 - a)];
const lum = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };

test('brand constants', () => {
  const want = { '--paper': '#F4F6FA', '--ink': '#1F2C62', '--ink-deep': '#172050', '--ink-lift': '#27367B', '--signal': '#3AC1C2', '--signal-deep': '#0B7378', '--amber': '#E9A23B' };
  for (const [k, v] of Object.entries(want)) assert.equal(root[k].toUpperCase(), v, k);
});
test('dark tokens are the same in the media query and under data-theme', () => {
  assert.deepEqual(darkMedia, darkAttr);
});
test('every token redefined for dark or inverse is first defined on :root', () => {
  for (const k of [...Object.keys(darkAttr), ...Object.keys(inverse)]) assert.ok(k in root, `${k} missing on :root`);
});
for (const [name, scope] of Object.entries(themes)) {
  test(`text contrast is at least 4.5:1: ${name}`, () => {
    const bg = rgba(value(scope, '--bg')).slice(0, 3);
    for (const token of ['--fg', '--fg2', '--accent']) {
      const r = ratio(over(rgba(value(scope, token)), bg), bg);
      assert.ok(r >= 4.5, `${token} on --bg is ${r.toFixed(2)}:1`);
    }
  });
}
