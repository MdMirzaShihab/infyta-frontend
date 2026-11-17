import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { services } from '../../src/content/services.js';

const css = readFileSync('src/styles/drawing.css', 'utf8');
// Returns the text inside the first block opened by `@media <query> {`.
function mediaBlock(query) {
  const start = css.indexOf(query);
  assert.ok(start >= 0, `no ${query} block`);
  let depth = 0, i = css.indexOf('{', start);
  const from = i + 1;
  for (; i < css.length; i++) { if (css[i] === '{') depth++; if (css[i] === '}' && --depth === 0) break; }
  return css.slice(from, i);
}
const rules = css.replace(/\/\*[\s\S]*?\*\//g, '').split('}').map((r) => r.split('{')).filter((r) => r.length === 2).map(([s, b]) => [s.trim(), b.trim()]);

test('every service has a group highlight from the drawing and from its row, and marks its row', () => {
  for (const { slug: s } of services) {
    for (const sel of [
      `.dwg--hero:has(.svc[data-svc="${s}"]:is(:hover,:focus-visible)) :is(.piece,.svc):not([data-svc="${s}"])`,
      `main:has(.key__row[data-svc="${s}"]:is(:hover,:focus-visible)) .dwg--hero :is(.piece,.svc):not([data-svc="${s}"])`,
      `main:has(.dwg--hero .svc[data-svc="${s}"]:is(:hover,:focus-visible)) .key__row[data-svc="${s}"]`,
    ]) assert.ok(css.includes(sel), sel);
  }
});
test('nothing is dimmed without :has(), so the drawing is whole where :has() is missing', () => {
  const dim = rules.filter(([, body]) => /opacity:\s*\.24/.test(body));
  assert.ok(dim.length > 0);
  for (const [selector] of dim) assert.ok(selector.includes(':has('), selector);
});
test('keyboard focus shows on the pin', () => {
  assert.ok(rules.some(([s, b]) => s.includes('.svc:focus-visible') && s.includes('.ring') && /stroke:\s*var\(--accent\)/.test(b)));
});
test('dots travel twice on load, 1.5s a pass, after the fade', () => {
  // Hidden at rest everywhere; the timing sits in the @supports (offset-path) block (see the test below).
  const flow = rules.find(([s]) => s === '.dwg--hero .flow');
  assert.ok(flow);
  assert.match(flow[1], /opacity:\s*0/);
  assert.match(mediaBlock('@supports (offset-path'), /\.dwg--hero \.flow\s*\{[^}]*animation:\s*travel 1\.5s linear 1\.8s 2\b/);
});
for (const query of ['@media (prefers-reduced-motion: reduce)', '@media print']) {
  test(`${query}: the drawing is complete and still`, () => {
    const block = mediaBlock(query);
    assert.match(block, /\.dwg \.rise\s*\{[^}]*animation:\s*none[^}]*opacity:\s*1/);
    assert.match(block, /\.dwg \.flow\s*\{[^}]*display:\s*none/);
  });
}
test('below 720px the labels go and the pins grow', () => {
  const block = mediaBlock('@media (max-width:719px)');
  for (const cls of ['.lbl', '.lay', '.basetext']) assert.ok(block.includes(cls), cls);
  assert.match(block, /\.bub\s*\{[^}]*transform:\s*scale\(2\.3\)/);
  assert.match(block, /\.monly\s*\{[^}]*display:\s*inline/);
  // Hit lines scale with the drawing, so a cable's hit line never covers a grown pin however narrow the screen.
  assert.match(block, /\.hit--line\s*\{[^}]*vector-effect:\s*none/);
});
test('dots animate only where offset-path is supported, and stay hidden elsewhere', () => {
  const block = mediaBlock('@supports (offset-path');
  assert.match(block, /\.dwg--hero \.flow\s*\{\s*animation:\s*travel 1\.5s linear 1\.8s 2\b/);
  for (const { slug: s } of services) assert.ok(block.includes(`.piece[data-svc="${s}"] .flow`), s);
  const outside = css.replace(block, '');
  assert.ok(!/animation:\s*travel/.test(outside), 'a travel animation sits outside @supports');
  assert.ok(rules.some(([sel, b]) => sel === '.dwg--hero .flow' && /^opacity:\s*0;?$/.test(b)), 'the dot is hidden at rest everywhere');
});
