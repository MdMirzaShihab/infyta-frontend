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
for (const query of ['@media (prefers-reduced-motion: reduce)', '@media print']) {
  test(`${query}: the drawing is complete and still`, () => {
    const block = mediaBlock(query);
    for (const cls of ['.wire', '.rise', '.fade']) assert.ok(block.includes(cls), cls);
    assert.match(block, /animation:\s*none/);
    assert.match(block, /opacity:\s*1/);
    assert.match(block, /stroke-dasharray:\s*none/);
  });
}

for (const query of ['@media (prefers-reduced-motion: reduce)', '@media print']) {
  test(`${query}: only .wire loses its dashes (the internet link and boundary stay dashed)`, () => {
    const rules = mediaBlock(query).split('}').map((r) => r.split('{')).filter((r) => r.length === 2);
    const withNone = rules.filter(([, body]) => /stroke-dasharray:\s*none/.test(body));
    assert.ok(withNone.length > 0);
    for (const [selector] of withNone) assert.equal(selector.trim(), '.dwg .wire');
  });
}
test('every service has a drawing-to-row and a row-to-drawing highlight rule', () => {
  for (const { slug } of services) {
    assert.ok(css.includes(`main:has(.key__row[data-svc="${slug}"]:is(:hover,:focus-visible)) .dwg .svc[data-svc="${slug}"]`), `row to drawing: ${slug}`);
    assert.ok(css.includes(`main:has(.dwg .svc[data-svc="${slug}"]:is(:hover,:focus-visible)) .key__row[data-svc="${slug}"]`), `drawing to row: ${slug}`);
  }
});
