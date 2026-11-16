import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLlmsTxt } from '../../src/lib/llms.js';
import { site } from '../../src/content/site.js';
import { publicEmails } from '../../src/content/email.js';
import { services } from '../../src/content/services.js';

test('llms.txt structure and facts', () => {
  const t = buildLlmsTxt();
  assert.match(t, /^# Infyta\n\n> /);
  for (const part of [site.address.display, site.phone.display, '## Services', '## Company', '## Contact']) {
    assert.ok(t.includes(part), part);
  }
  for (const s of services) assert.ok(t.includes(`[${s.name}](https://infyta.com/services/${s.slug})`), s.slug);
  for (const e of publicEmails()) assert.ok(t.includes(e), e);
  for (const s of services) assert.ok(t.includes(s.metaDescription), `${s.slug} metaDescription`);
});

test('llms.txt emails follow the flag in both states', () => {
  const off = buildLlmsTxt({ ...site, domainEmailActive: false });
  assert.ok(off.includes('infytaofficial@gmail.com'));
  assert.ok(!off.includes('info@infyta.com'));
  const on = buildLlmsTxt({ ...site, domainEmailActive: true });
  assert.ok(on.includes('info@infyta.com') && on.includes('infytaofficial@gmail.com'));
});
