import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { OUT } from './helpers.mjs';
import { allPaths } from '../../src/content/pages.js';

const read = (name) => readFileSync(join(OUT, name), 'utf8');

test('_redirects has exactly the 3 service redirects', () => {
  const lines = read('_redirects')
    .split('\n')
    .map((l) => l.trim().replace(/\s+/g, ' '))
    .filter(Boolean);
  assert.deepEqual(lines, [
    '/services/training-certification /services 301',
    '/services/mobile-applications /services/software-development 301',
    '/services/cloud-services /services/server-cloud-solutions 301',
  ]);
});

test('every redirect target is a real route', () => {
  const paths = allPaths();
  for (const line of read('_redirects').split('\n').map((l) => l.trim()).filter(Boolean)) {
    const [from, to] = line.split(/\s+/);
    assert.ok(paths.includes(to), `${to} is not in allPaths()`);
    assert.ok(!paths.includes(from), `${from} should not be a live route`);
  }
});

test('_headers contains the required blocks verbatim', () => {
  const headers = read('_headers');
  const blocks = [
    'https://:project.pages.dev/*\n  X-Robots-Tag: noindex',
    '/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable',
    '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin',
  ];
  for (const block of blocks) assert.ok(headers.includes(block), `missing block:\n${block}`);
});

test('404.html is exported so unknown paths return 404', () => {
  assert.match(read('404.html'), /Page not found/);
});
