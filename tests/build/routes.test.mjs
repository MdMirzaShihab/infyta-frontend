import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'node-html-parser';
import { OUT, fileForPath, loadPage, allFiles, allHtmlFiles, visibleText } from './helpers.mjs';
import { allPaths } from '../../src/content/pages.js';
import { services } from '../../src/content/services.js';
import { site, publicEmails } from '../../src/content/site.js';

const FORBIDDEN = ['Lalbagh', 'Rasulbagh', '976843', '331586', 'training-certification', 'Training & Certification'];

const exported = allHtmlFiles().map((file) => {
  const html = readFileSync(file, 'utf8');
  return { file: relative(OUT, file), html, doc: parse(html, { blockTextElements: { script: true, style: false } }) };
});

test('every route in allPaths() is exported as an HTML file', () => {
  for (const path of allPaths()) assert.ok(existsSync(fileForPath(path)), `missing ${fileForPath(path)}`);
});

test('a 404.html page is exported', () => {
  assert.ok(existsSync(join(OUT, '404.html')));
});

test('every internal link points at a known route or an exported file', () => {
  const routes = new Set(allPaths());
  for (const { file, doc } of exported) {
    for (const a of doc.querySelectorAll('a[href^="/"]')) {
      const href = a.getAttribute('href').split(/[#?]/)[0] || '/';
      assert.ok(routes.has(href) || existsSync(join(OUT, href)), `${file}: broken link ${href}`);
    }
  }
});

test('tel: and mailto: links use only the published phone and emails', () => {
  const mailtos = publicEmails().map((e) => 'mailto:' + e);
  for (const { file, doc } of exported) {
    for (const a of doc.querySelectorAll('a[href^="tel:"]')) {
      assert.equal(a.getAttribute('href'), 'tel:+8801318121558', file);
    }
    for (const a of doc.querySelectorAll('a[href^="mailto:"]')) {
      assert.ok(mailtos.includes(a.getAttribute('href')), `${file}: ${a.getAttribute('href')}`);
    }
  }
});

test('home <nav> links to /services and all five service pages', () => {
  const { doc } = loadPage('/');
  const nav = doc.querySelector('nav');
  assert.ok(nav, 'no <nav> on /');
  assert.ok(nav.querySelector('a[href="/services"]'), 'nav lacks /services');
  for (const { slug } of services) {
    assert.ok(nav.querySelector(`a[href="/services/${slug}"]`), `nav lacks /services/${slug}`);
  }
});

test('home has a "Get Started" link to /contact', () => {
  const { doc } = loadPage('/');
  const links = doc.querySelectorAll('a[href="/contact"]');
  assert.ok(links.some((a) => a.textContent.includes('Get Started')));
});

test('no <button> contains an <a>', () => {
  for (const { file, doc } of exported) {
    for (const button of doc.querySelectorAll('button')) {
      assert.equal(button.querySelector('a'), null, `${file}: <button> wraps <a>`);
    }
  }
});

test('every page shows the address and phone number in its text', () => {
  for (const { file, html } of exported) {
    const text = visibleText(html);
    assert.ok(text.includes(site.address.display), `${file}: address missing`);
    assert.ok(text.includes(site.phone.display), `${file}: phone missing`);
  }
});

test('no page contains the old address, old phone numbers or the removed service', () => {
  for (const { file, html, doc } of exported) {
    const text = doc.textContent;
    for (const bad of FORBIDDEN) {
      assert.ok(!html.includes(bad) && !text.includes(bad), `${file}: contains ${bad}`);
    }
  }
});

test('the inactive domain email is not published anywhere', { skip: site.domainEmailActive }, () => {
  for (const file of allFiles().filter((f) => /\.(html|txt|xml)$/.test(f))) {
    assert.ok(!readFileSync(file, 'utf8').includes('info@infyta.com'), `${relative(OUT, file)} contains info@infyta.com`);
  }
});
