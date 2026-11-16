import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { themeScript, saveTheme, THEME_KEY, THEME_COLORS } from '../../src/lib/theme-script.js';

function run(extra) {
  const root = { dataset: {} };
  const metas = [{ content: '' }, { content: '' }];
  const context = { document: { documentElement: root, querySelectorAll: () => metas }, ...extra };
  assert.doesNotThrow(() => vm.runInNewContext(themeScript, context));
  return { root, metas };
}
const storage = (v) => ({ localStorage: { getItem: (k) => (k === THEME_KEY ? v : null) } });

test('constants', () => {
  assert.equal(THEME_KEY, 'infyta-theme');
  assert.deepEqual(THEME_COLORS, { light: '#F4F6FA', dark: '#1F2C62' });
});
test('a stored choice sets data-theme and both theme-color metas', () => {
  for (const t of ['light', 'dark']) {
    const { root, metas } = run(storage(t));
    assert.equal(root.dataset.theme, t);
    assert.deepEqual(metas.map((m) => m.content), [THEME_COLORS[t], THEME_COLORS[t]]);
  }
});
test('nothing stored, or a junk value, leaves the device setting in charge', () => {
  for (const v of [null, '', 'blue', 'DARK']) assert.equal(run(storage(v)).root.dataset.theme, undefined);
});
test('storage that throws, or does not exist, changes nothing and does not throw', () => {
  assert.equal(run({ localStorage: { getItem() { throw new Error('denied'); } } }).root.dataset.theme, undefined);
  assert.equal(run({}).root.dataset.theme, undefined);
});
test('saveTheme stores the choice, and reports failure instead of throwing', () => {
  const kept = {};
  assert.equal(saveTheme('dark', () => ({ setItem: (k, v) => { kept[k] = v; } })), true);
  assert.deepEqual(kept, { [THEME_KEY]: 'dark' });
  assert.equal(saveTheme('dark', () => { throw new Error('storage is blocked'); }), false);
  assert.equal(saveTheme('dark', () => ({ setItem() { throw new Error('quota'); } })), false);
});
