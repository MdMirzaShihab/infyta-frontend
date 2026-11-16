import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

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
