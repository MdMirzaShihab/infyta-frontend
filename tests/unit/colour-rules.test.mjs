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
