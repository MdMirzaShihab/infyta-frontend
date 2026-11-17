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
  const want = { '--paper': '#F4F6FA', '--ink': '#1F2C62', '--ink-deep': '#172050', '--ink-lift': '#27367B', '--signal': '#3AC1C2', '--signal-deep': '#0B7378', '--amber': '#F5A623', '--amber-hover': '#FFB83D' };
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
// Printing drops backgrounds, so white line on navy would print white on white: print resets every theme to Paper.
test('print: every theme and inverse band prints with the Paper tokens', () => {
  const m = css.match(/@media print\s*\{\s*([^{]+)\{([^}]*)\}/);
  assert.ok(m, 'no @media print block');
  const selectors = m[1].split(',').map((s) => s.trim());
  for (const s of [':root', ':root[data-theme="dark"]', ':root:not([data-theme="light"])', '.inverse']) assert.ok(selectors.includes(s), `print does not reset ${s}`);
  const print = Object.fromEntries([...m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((d) => [d[1], d[2].trim()]));
  for (const k of new Set([...Object.keys(darkAttr), ...Object.keys(inverse)])) {
    if (k === '--inv-bg' || k === '--inv-panel') continue; // only used to build .inverse, which print resets directly
    assert.equal(print[k], root[k], `${k} in print`);
  }
  assert.match(m[2], /color-scheme:\s*light/);
});
const SERVICES = {
  Paper: {
    sw:  ['#F5A623', '#C27500', '#FEF3E2', '#FDEDD3', '#FCE7C4', '#FAD391', '#F8BD5C', '#FAD391'],
    net: ['#3AC1C2', '#0E8F93', '#E5F7F7', '#D8F3F3', '#CAEEEF', '#9DE0E1', '#6DD1D2', '#9DE0E1'],
    sec: ['#8A70F2', '#5E45CC', '#F0ECFD', '#E8E2FC', '#DFD8FB', '#C5B8F9', '#A895F5', '#C5B8F9'],
    srv: ['#4D8EF7', '#2563DB', '#E8F0FE', '#DBE8FD', '#CFE0FD', '#A6C7FB', '#7BABF9', '#A6C7FB'],
  },
  Blueprint: {
    sw:  ['#F5A623', '#F5A623', '#464257', '#6D5C5D', '#E09A29', '#AC7D38', '#7D6246', '#F5A623'],
    net: ['#3AC1C2', '#3AC1C2', '#244773', '#2D6593', '#37B2B8', '#318EA1', '#2B6E8C', '#3AC1C2'],
    sec: ['#A996FF', '#A996FF', '#383F7E', '#5357A8', '#9B8BEF', '#7A72CA', '#5C5BA7', '#A996FF'],
    srv: ['#6EA4FF', '#6EA4FF', '#2D427E', '#3F5BA8', '#6698EF', '#537BCA', '#4261A7', '#6EA4FF'],
  },
};
const PARTS = ['', '-line', '-wash', '-floor', '-top', '-left', '-right', '-chip'];
const OTHER = {
  Paper:     { '--band-alt': '#FFFFFF', '--it-wash': '#E2E4EB', '--dw-floor': '#FFFFFF', '--dw-wall-a': '#EEF1F8', '--dw-wall-b': '#E0E6F2', '--dw-n-top': '#FFFFFF', '--dw-n-left': '#E4E9F4', '--dw-n-right': '#CCD4E7', '--dw-base-b': '#4C5681' },
  Blueprint: { '--band-alt': '#1A2556', '--it-wash': '#47527E', '--dw-floor': '#27367B', '--dw-wall-a': '#243270', '--dw-wall-b': '#1C2860', '--dw-n-top': '#3A4A96', '--dw-n-left': '#2B3A80', '--dw-n-right': '#1B2759', '--dw-base-b': '#D2D5E0' },
};
const hexOf = (scope, name) => value(scope, name).toUpperCase();
for (const theme of ['Paper', 'Blueprint']) {
  test(`service and drawing tokens: ${theme}`, () => {
    for (const [p, vals] of Object.entries(SERVICES[theme])) PARTS.forEach((part, i) => assert.equal(hexOf(themes[theme], `--${p}${part}`), vals[i], `--${p}${part}`));
    for (const [k, v] of Object.entries(OTHER[theme])) assert.equal(hexOf(themes[theme], k), v, k);
  });
}
test('inside an inverse band, service tokens take their Blueprint values in both themes', () => {
  for (const name of ['inverse band on Paper', 'inverse band on Blueprint']) {
    for (const [p, vals] of Object.entries(SERVICES.Blueprint)) PARTS.forEach((part, i) => assert.equal(hexOf(themes[name], `--${p}${part}`), vals[i], `${name} --${p}${part}`));
    assert.equal(hexOf(themes[name], '--it-wash'), '#47527E');
  }
});
test('translucent tokens', () => {
  const want = { '--band-tint': 'rgba(58,193,194,.11)', '--tag-bg': 'rgba(58,193,194,.17)', '--tag-line': 'rgba(58,193,194,.62)', '--cta-fg2': 'rgba(31,44,98,.88)', '--cta-rule': 'rgba(31,44,98,.28)', '--amber-halo': 'rgba(245,166,35,.25)', '--btn-halo': 'rgba(31,44,98,.2)' };
  for (const [k, v] of Object.entries(want)) assert.equal(root[k].replace(/\s+/g, ''), v, k);
});
test('contrast: navy on every chip, on amber and on teal is at least 4.5:1', () => {
  const ink = rgba(root['--ink']).slice(0, 3);
  for (const [name, scope] of Object.entries(themes)) for (const p of ['sw', 'net', 'sec', 'srv']) {
    const r = ratio(ink, rgba(value(scope, `--${p}-chip`)).slice(0, 3));
    assert.ok(r >= 4.5, `${name} --${p}-chip: ${r.toFixed(2)}`);
  }
  for (const k of ['--amber', '--amber-hover', '--signal']) assert.ok(ratio(ink, rgba(root[k]).slice(0, 3)) >= 4.5, k);
  const teal = rgba(root['--signal']).slice(0, 3);
  assert.ok(ratio(over(rgba(root['--cta-fg2']), teal), teal) >= 4.5, '--cta-fg2 on --signal');
});
test('contrast: every service line on the sheet is at least 3:1', () => {
  for (const theme of ['Paper', 'Blueprint']) for (const p of ['sw', 'net', 'sec', 'srv']) {
    const r = ratio(rgba(value(themes[theme], `--${p}-line`)).slice(0, 3), rgba(value(themes[theme], '--sheet')).slice(0, 3));
    assert.ok(r >= 3, `${theme} --${p}-line: ${r.toFixed(2)}`);
  }
});
