import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { OUT, loadPage, jsonLdBlocks } from './helpers.mjs';
import { allPaths, pages } from '../../src/content/pages.js';
import { services } from '../../src/content/services.js';
import { absoluteUrl } from '../../src/content/site.js';
import { ALLOWED_CRAWLERS } from '../../src/lib/seo/crawlers.js';
import { buildLlmsTxt } from '../../src/lib/llms.js';

const norm = (u) => new URL(u).href;

function expected(path) {
  const s = services.find((x) => `/services/${x.slug}` === path);
  if (s) return { title: `${s.metaTitle} | Infyta`, description: s.metaDescription };
  const p = Object.values(pages).find((x) => x.path === path);
  return { title: p.absoluteTitle ? p.title : `${p.title} | Infyta`, description: p.description };
}

const meta = (doc, attr, key) => doc.querySelector(`meta[${attr}="${key}"]`)?.getAttribute('content');

function flatten(blocks) {
  return blocks.flatMap((b) => (b['@graph'] ? b['@graph'] : [b]));
}

for (const path of allPaths()) {
  test(`SEO: ${path}`, () => {
    const { html, doc } = loadPage(path);
    const exp = expected(path);
    assert.match(html, /<html lang="en"/);
    assert.equal(doc.querySelectorAll('h1').length, 1);
    assert.equal(doc.querySelector('title').text, exp.title);
    assert.equal(meta(doc, 'name', 'description'), exp.description);
    const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
    assert.ok(canonical, 'canonical missing');
    assert.equal(norm(canonical), norm(absoluteUrl(path)));
    assert.equal(norm(meta(doc, 'property', 'og:url')), norm(absoluteUrl(path)));
    assert.ok(meta(doc, 'property', 'og:title'));
    assert.equal(meta(doc, 'property', 'og:site_name'), 'Infyta');
    assert.ok(meta(doc, 'property', 'og:image')?.startsWith('https://infyta.com/'), 'og:image');
    assert.equal(meta(doc, 'name', 'twitter:card'), 'summary_large_image');
    assert.ok(doc.querySelector('link[rel="icon"]'), 'icon link');

    const blocks = jsonLdBlocks(doc);
    const all = flatten(blocks);
    const biz = all.find((n) => n['@type'] === 'LocalBusiness');
    assert.ok(biz, 'LocalBusiness missing');
    assert.equal(biz.telephone, '+8801318121558');
    const ofType = (t) => all.filter((n) => n['@type'] === t);

    if (path !== '/') {
      const bc = ofType('BreadcrumbList')[0];
      assert.ok(bc, 'BreadcrumbList missing');
      assert.equal(bc.itemListElement.at(-1).item, absoluteUrl(path));
    }
    if (path.startsWith('/services/')) {
      assert.ok(ofType('Service').some((n) => n['@id'] === absoluteUrl(path) + '#service'));
    }
    if (path === '/services') assert.equal(ofType('ItemList')[0]?.itemListElement.length, 5);
    if (path === '/team') assert.ok(ofType('Person').some((n) => n.name === 'Md. Arif'));
    if (path === '/about') assert.ok(ofType('AboutPage').length);
    if (path === '/contact') assert.ok(ofType('ContactPage').length);
  });
}

test('404.html is noindex', () => {
  const html = readFileSync(join(OUT, '404.html'), 'utf8');
  assert.match(html, /<meta name="robots" content="[^"]*noindex/);
});

test('_not-found.html is noindex', () => {
  const html = readFileSync(join(OUT, '_not-found.html'), 'utf8');
  assert.match(html, /<meta name="robots" content="[^"]*noindex/);
});

test('sitemap.xml lists exactly the site routes', () => {
  const xml = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => norm(m[1]));
  assert.equal(locs.length, 10);
  assert.deepEqual([...locs].sort(), allPaths().map((p) => norm(absoluteUrl(p))).sort());
});

test('robots.txt allows crawlers and points at sitemap', () => {
  const txt = readFileSync(join(OUT, 'robots.txt'), 'utf8');
  for (const ua of [...ALLOWED_CRAWLERS, '*']) {
    const esc = ua.replace(/[*]/g, '\\*');
    assert.match(txt, new RegExp(`^User-Agent: ${esc}$`, 'im'), ua);
  }
  assert.doesNotMatch(txt, /^Disallow:\s*\/\s*$/m);
  assert.ok(txt.includes('Sitemap: https://infyta.com/sitemap.xml'));
});

test('llms.txt matches buildLlmsTxt()', () => {
  assert.equal(readFileSync(join(OUT, 'llms.txt'), 'utf8'), buildLlmsTxt());
});
