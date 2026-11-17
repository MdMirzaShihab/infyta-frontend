import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPage } from './helpers.mjs';
import { services } from '../../src/content/services.js';
import { site } from '../../src/content/site.js';

const DETAIL = {
  'software-development': { label: 'Drawing: a web application and a mobile app sharing one database, linked to existing systems.', words: ['Web application', 'Mobile app', 'Database', 'SQL Server, MySQL, MongoDB', 'Existing systems'] },
  'network-infrastructure': { label: 'Drawing: internet link, router, firewall and switch feeding separate segments for cameras, guest Wi-Fi and staff.', words: ['Internet', 'Router', 'MikroTik', 'Firewall', 'Fortinet', 'Cameras', 'Guest Wi-Fi', 'Staff', 'CCTV', 'Office Wi-Fi', 'Workstations'] },
  'it-support-consultancy': { label: 'Drawing: an office with workstations, a server, an access point and a router inside one boundary.', words: ['Your office', 'Workstations', 'Servers', 'Office Wi-Fi', 'Router'] },
  'security-surveillance': { label: 'Drawing: cameras and a recorder, and a door terminal for access control and attendance, on their own network segment.', words: ['Switch', 'Cameras', 'CCTV cameras', 'Recorder', 'Access control', 'Biometric attendance'] },
  'server-cloud-solutions': { label: 'Drawing: a rack of servers, a host running virtual machines, and a link to the cloud.', words: ['Servers', 'Windows, Linux, Active Directory', 'Virtual machines', 'VMware, Hyper-V', 'Cloud', 'AWS, Azure, Google Cloud'] },
};

// Heading levels inside <main> never skip (h1 -> h3), and there is exactly one h1.
function assertHeadingOrder(main) {
  const levels = main.querySelectorAll('h1, h2, h3, h4, h5, h6').map((h) => Number(h.tagName.slice(1)));
  assert.equal(levels.filter((l) => l === 1).length, 1);
  assert.equal(levels[0], 1);
  levels.forEach((l, i) => { if (i) assert.ok(l <= levels[i - 1] + 1, `h${levels[i - 1]} followed by h${l}`); });
}

for (const s of services) {
  const { doc } = loadPage(`/services/${s.slug}`);
  const main = doc.querySelector('main');
  test(`${s.slug}: header`, () => {
    assert.equal(main.querySelector('h1').textContent.trim(), s.name);
    assert.ok(main.textContent.includes(s.heroSubtitle));
    assert.ok(main.querySelector('nav[aria-label="Breadcrumb"] a[href="/services"]'));
    assert.ok(main.querySelectorAll('a.btn[href="/contact"]').some((a) => a.textContent.trim() === 'Get Started Today'));
    assert.ok(main.querySelector('a[href="tel:+8801318121558"]') && main.querySelector(`a[href="${site.whatsappUrl}"]`));
  });
  test(`${s.slug}: detail drawing uses only approved labels`, () => {
    const svg = main.querySelector('figure svg.dwg--detail[role="img"]');
    assert.equal(svg.getAttribute('aria-label'), DETAIL[s.slug].label);
    const words = svg.querySelectorAll('text').map((t) => t.textContent.trim());
    assert.ok(words.length > 0);
    for (const w of words) assert.ok(DETAIL[s.slug].words.includes(w), `unexpected label "${w}"`);
  });
  test(`${s.slug}: detail drawing only uses symbols that exist in the page`, () => {
    const svg = main.querySelector('figure svg.dwg--detail');
    for (const u of svg.querySelectorAll('use')) {
      const id = u.getAttribute('href').replace(/^#/, '');
      assert.ok(doc.querySelector(`defs [id="${id}"]`), `missing symbol #${id}`);
    }
  });
  test(`${s.slug}: the drawing is the 3D kit, a picture with no links`, () => {
    const svg = main.querySelector('figure svg.dwg--detail');
    assert.ok(svg.classList.contains('dwg--iso'));
    assert.equal(svg.querySelectorAll('a, use, [tabindex]').length, 0);
    assert.ok(svg.querySelectorAll('polygon').length >= 12);
    // IT Support has no colour of its own: its equipment is drawn in the neutral faces.
    if (s.slug !== 'it-support-consultancy') assert.ok(svg.querySelectorAll(`[data-svc="${s.slug}"]`).length > 0, 'the page\'s own service is drawn in its colour');
  });
  test(`${s.slug}: the drawing uses every approved label`, () => {
    const words = main.querySelectorAll('figure svg.dwg--detail text').map((t) => t.textContent.trim());
    for (const w of DETAIL[s.slug].words) assert.ok(words.includes(w), `missing "${w}"`);
  });
  test(`${s.slug}: body sections`, () => {
    assert.equal(main.querySelectorAll('.spec li').length, s.included.length);
    const steps = main.querySelectorAll('section.inverse ol.steps > li');
    assert.equal(steps.length, 4);
    steps.forEach((li, i) => assert.equal(li.textContent.trim(), s.approach[i]));
    assert.equal(main.querySelectorAll('table.sched tbody tr').length, s.expertiseKeys.length);
    const faqs = main.querySelectorAll('details');
    assert.ok(faqs[0].hasAttribute('open'));
    assert.equal(faqs.filter((d) => d.hasAttribute('open')).length, 1);
    assert.deepEqual(main.querySelectorAll('a.key__row').map((a) => a.getAttribute('href')), s.related.map((r) => `/services/${r}`));
    assert.ok(main.textContent.includes('Ready to discuss your project?'));
  });
  test(`${s.slug}: heading levels do not skip`, () => assertHeadingOrder(main));
}

test('services index', () => {
  const main = loadPage('/services').doc.querySelector('main');
  assert.equal(main.querySelector('h1').textContent.trim(), 'Our Services');
  assert.ok(main.textContent.includes('Cutting-edge IT solutions designed to drive your business forward in the digital age.'));
  assert.deepEqual(main.querySelectorAll('a.key__row').map((a) => a.getAttribute('href')), services.map((s) => `/services/${s.slug}`));
  assert.ok(main.textContent.includes('Ready to transform your business with our expertise?'));
  assert.equal(main.querySelector('.endcta a.btn[href="/contact"]').textContent.trim(), 'Get a Free Consultation');
});

test('services index: heading levels do not skip', () => assertHeadingOrder(loadPage('/services').doc.querySelector('main')));
