import test from 'node:test';
import assert from 'node:assert/strict';
import { services } from '../../src/content/services.js';
import { homeIntro } from '../../src/content/pages.js';

const slugs = services.map((s) => s.slug);
const sentences = (text) => (text.match(/[.!?](\s|$)/g) || []).length;

function strings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

for (const s of services) {
  test(`content shape: ${s.slug}`, () => {
    assert.equal(s.overview.length, 2, 'overview paragraphs');
    assert.ok(s.included.length >= 4 && s.included.length <= 6, `included: ${s.included.length}`);
    assert.equal(s.approach.length, 4, 'approach steps');
    assert.ok(s.faqs.length >= 4 && s.faqs.length <= 6, `faqs: ${s.faqs.length}`);
  });

  test(`FAQ answers are 2-4 sentences: ${s.slug}`, () => {
    for (const faq of s.faqs) {
      assert.ok(faq.question.trim().endsWith('?'), faq.question);
      const n = sentences(faq.answer);
      assert.ok(n >= 2 && n <= 4, `${n} sentences: ${faq.answer}`);
    }
  });

  test(`related services are 2 distinct valid slugs: ${s.slug}`, () => {
    assert.equal(s.related.length, 2);
    assert.equal(new Set(s.related).size, 2);
    for (const r of s.related) {
      assert.ok(slugs.includes(r), `unknown slug ${r}`);
      assert.notEqual(r, s.slug);
    }
  });
}

test('homeIntro defines the entity', () => {
  assert.ok(homeIntro.startsWith('Infyta is an IT solutions company in Azimpur, Dhaka, Bangladesh.'), homeIntro);
});

test('no invented numbers or banned claims in service copy or homeIntro', () => {
  const all = [...strings(services), homeIntro];
  for (const str of all) {
    assert.doesNotMatch(str, /\b\d+\s*\+/, str);
    assert.doesNotMatch(
      str,
      /\b(the best|#1|number one|award|leading|guarantee[ds]?|24\/7|clients served|projects completed|years of experience)\b/i,
      str,
    );
  }
});
