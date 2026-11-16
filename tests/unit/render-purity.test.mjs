import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'src';

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(js|jsx)$/.test(entry.name) ? [full] : [];
  });
}

test('no source file uses Math.random() or Date.now() (hydration safety)', () => {
  const offenders = sourceFiles(SRC).filter((file) => {
    const text = readFileSync(file, 'utf8');
    return text.includes('Math.random(') || text.includes('Date.now(');
  });
  assert.deepEqual(offenders, []);
});

test('the old src/pages directory is gone', () => {
  assert.equal(existsSync(join(SRC, 'pages')), false);
});
