import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPage } from './helpers.mjs';
import { site } from '../../src/content/site.js';
import { about } from '../../src/content/about.js';
import { chiefAdvisor } from '../../src/content/team.js';

test('about', () => {
  const main = loadPage('/about').doc.querySelector('main');
  const text = main.textContent.replace(/\s+/g, ' ');
  assert.equal(main.querySelector('h1').textContent.trim(), 'About Infyta');
  for (const needle of [site.slogan, 'Our Vision', 'Our Mission', about.vision, about.mission, 'Infyta at a glance', 'Our Core Values', 'Meet Our Expert Team', 'The brilliant minds behind our innovative solutions']) assert.ok(text.includes(needle), needle);
  assert.deepEqual(about.values.map((v) => v.title), ['Collaboration', 'Global Mindset', 'Innovation', 'Agility', 'Integrity', 'Partnership']);
  for (const v of about.values) assert.ok(text.includes(v.title) && text.includes(v.desc), v.title);
  const glance = main.querySelector('dl.titleblock');
  assert.deepEqual(glance.querySelectorAll('dt').map((d) => d.textContent.trim()), ['What we do', 'Where we are', 'Services', 'Opening hours', 'Phone', 'Email']);
  assert.equal(main.querySelector('section.inverse a.btn[href="/team"]').textContent.trim(), 'View Our Team');
  assert.equal(main.querySelectorAll('svg, img').length, 0);
  assert.equal(main.querySelectorAll('h1').length, 1);
  assert.equal(main.querySelectorAll('h2').length, 5);
  assert.equal(main.querySelectorAll('.values h3').length, 6);
});

test('team', () => {
  const main = loadPage('/team').doc.querySelector('main');
  const text = main.textContent.replace(/\s+/g, ' ');
  assert.equal(main.querySelector('h1').textContent.trim(), 'Our Dream Team');
  for (const needle of ["The brilliant minds powering Infyta's innovative solutions", 'Our Chief Advisor', chiefAdvisor.name, chiefAdvisor.role, 'Key Highlights', 'Certifications', 'Our Core Expertise', 'Comprehensive IT solutions across multiple domains, delivered by certified professionals', ...chiefAdvisor.highlights, ...chiefAdvisor.certifications]) assert.ok(text.includes(needle), needle);
  assert.equal(main.querySelectorAll('table.sched tbody tr').length, 6);
  assert.equal(main.querySelector('section.inverse img').getAttribute('alt'), 'Md. Arif, Chief Advisor at Infyta');
  assert.equal(main.querySelector('section.inverse a[href="/team"]'), null);
  assert.equal(main.querySelectorAll('h1').length, 1);
});
