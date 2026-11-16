import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { OUT, allFiles, allHtmlFiles, loadPage } from './helpers.mjs';
import { services } from '../../src/content/services.js';

const GONE = ['swiper', 'framer-motion', 'react-icons', 'tailwindcss', 'autoprefixer'];

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(js|jsx|css)$/.test(entry.name) ? [full] : [];
  });
}

test('old dependencies are gone', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  for (const name of GONE) assert.ok(!(name in { ...pkg.dependencies, ...pkg.devDependencies }), name);
  for (const file of sourceFiles('src')) {
    const src = readFileSync(file, 'utf8');
    for (const name of [...GONE, '@tailwind']) assert.ok(!src.includes(name), `${file} mentions ${name}`);
  }
  for (const f of ['tailwind.config.js', 'postcss.config.mjs', 'src/sections', 'public/images/hero', join(OUT, 'images/hero')]) assert.ok(!existsSync(f), f);
});

test('no page hides content with an inline style or uses a Tailwind palette class', () => {
  for (const file of allHtmlFiles()) {
    const html = readFileSync(file, 'utf8');
    assert.doesNotMatch(html, /style="[^"]*opacity:\s*0(?![.\d])/, file);
    assert.doesNotMatch(html, /class="[^"]*\b(?:bg|text|from|to|via|border)-(?:blue|purple|red|pink|green|yellow|orange|indigo|gray|teal)-\d{2,3}\b/, file);
  }
});

test('no client JavaScript carries the service page copy', () => {
  const chunks = allFiles().filter((f) => f.endsWith('.js'));
  assert.ok(chunks.length > 0);
  const copy = services.flatMap((s) => [s.metaDescription, s.faqs[0].question]);
  for (const file of chunks) {
    const js = readFileSync(file, 'utf8');
    for (const needle of copy) assert.ok(!js.includes(needle), `${file} contains "${needle}"`);
  }
});

test('home ships less JavaScript than before the redesign', () => {
  const { html } = loadPage('/');
  const srcs = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1].split('?')[0]))];
  const bytes = srcs.reduce((n, s) => n + statSync(join(OUT, s)).size, 0);
  assert.ok(bytes < 745092, `home references ${bytes} bytes of script; it was 745092 before`);
});
