import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLlmsTxt } from '../../src/lib/llms.js';
import { site } from '../../src/content/site.js';
import { services } from '../../src/content/services.js';

test('llms.txt structure and facts', () => {
  const t = buildLlmsTxt();
  assert.match(t, /^# Infyta\n\n> /);
  for (const part of [site.address.display, site.phone.display, 'infytaofficial@gmail.com', '## Services', '## Company', '## Contact']) {
    assert.ok(t.includes(part), part);
  }
  for (const s of services) assert.ok(t.includes(`[${s.name}](https://infyta.com/services/${s.slug})`), s.slug);
  assert.ok(!t.includes('info@infyta.com'));
});
