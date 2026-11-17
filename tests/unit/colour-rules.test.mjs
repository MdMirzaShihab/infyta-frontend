import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { services } from '../../src/content/services.js';

const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(join(dir, e.name)) : /\.(js|jsx|css)$/.test(e.name) ? [join(dir, e.name)] : []));
const HEX_OK = ['src/styles/tokens.css', 'src/lib/theme-script.js', 'src/components/Logo.jsx'];

test('no colour value outside the token file, and no color-mix anywhere', () => {
  for (const f of files('src')) {
    const text = readFileSync(f, 'utf8');
    assert.ok(!text.includes('color-mix('), `${f} uses color-mix`);
    if (!HEX_OK.includes(f)) assert.doesNotMatch(text, /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-fA-F])/, `${f} has a hex colour`);
  }
});
test('every service has a block that maps its colour', () => {
  const css = readFileSync('src/styles/services.css', 'utf8');
  for (const { slug } of services) {
    const m = css.match(new RegExp(`\\[data-svc="${slug}"\\]\\s*\\{([^}]*)\\}`));
    assert.ok(m, `no block for ${slug}`);
    for (const t of ['--svc:', '--svc-line:', '--svc-wash:', '--svc-floor:', '--svc-top:', '--svc-left:', '--svc-right:', '--svc-chip:', '--svc-chip-fg:']) assert.ok(m[1].includes(t), `${slug} lacks ${t}`);
  }
});

test('slabs do not print, and the teal band keeps navy text', () => {
  const base = readFileSync('src/styles/base.css', 'utf8');
  assert.match(base.slice(base.indexOf('@media print')), /\.on-slab[^{]*\{[^}]*box-shadow:\s*none/);
  const reset = base.search(/@media print\{[^@]*\.on-slab,\.on-slab--lg\{box-shadow:none\}/);
  assert.ok(reset > base.indexOf('.on-slab{box-shadow:12px') && reset > base.indexOf('.on-slab--lg{box-shadow:16px'), 'print reset must follow the screen slab rules');
  const sections = readFileSync('src/styles/sections.css', 'utf8');
  const cta = sections.match(/\.band--cta\s*\{([^}]*)\}/);
  assert.ok(cta && /color:\s*var\(--ink\)/.test(cta[1]) && /--fg:\s*var\(--ink\)/.test(cta[1]));
});

test('step chips and .num print as an outline with dark text, after their screen rules', () => {
  for (const [file, screen, print] of [
    ['src/styles/sections.css', '.steps li::before{background:var(--svc-chip)', '@media print{.steps li::before{'],
    ['src/styles/base.css', '.num{display:inline-grid', '@media print{.num{'],
  ]) {
    const css = readFileSync(file, 'utf8');
    const p = css.indexOf(print);
    assert.ok(p > -1, `${file} lacks ${print}`);
    assert.ok(p > css.indexOf(screen), `${file}: print rule must follow the screen rule`);
    assert.match(css.slice(p, css.indexOf('}}', p)), /color:var\(--fg\)/);
  }
});

test('every flat symbol is used by a small drawing, and nothing uses a missing one', () => {
  const ids = (file, re) => [...readFileSync(file, 'utf8').matchAll(re)].map((m) => m[1]);
  const defined = new Set(ids('src/components/drawing/Symbols.jsx', /id="(d-[a-z-]+)"/g));
  const used = new Set(files('src/components').flatMap((f) => ids(f, /href="#(d-[a-z-]+)"/g)));
  assert.deepEqual([...defined].sort(), [...used].sort());
});
test('no style is left for the flat hero', () => {
  const css = readFileSync('src/styles/drawing.css', 'utf8');
  for (const dead of ['.dwg--wide', '.dwg--tall', '.wire', '.knock', '.flag', '.svc-line']) assert.ok(!css.includes(dead), dead);
});

test('the contact page headings carry the heading bar', () => {
  const sections = readFileSync('src/styles/sections.css', 'utf8');
  const bar = sections.split('}').find((r) => r.includes('.head h2::before'));
  assert.ok(bar && bar.split('{')[0].split(',').map((s) => s.trim()).includes('.cpage__h::before'));
});
test('"Limitless" prints in the text colour, after its screen rule', () => {
  const sections = readFileSync('src/styles/sections.css', 'utf8');
  const p = sections.search(/@media print\{h1 \.hl\{color:var\(--fg\)\}\}/);
  assert.ok(p > sections.indexOf('h1 .hl{color:var(--signal)}'));
});
test('the CTA band button keeps its dot visible on keyboard focus as on hover', () => {
  const sections = readFileSync('src/styles/sections.css', 'utf8');
  assert.ok(sections.includes('.band--cta .btn:not(.btn--ghost):is(:hover,:focus-visible)::before{background:var(--signal)}'));
});
