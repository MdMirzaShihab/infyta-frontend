import test from 'node:test';
import assert from 'node:assert/strict';
import { splitHeadline } from '../../src/lib/headline.js';

test('splits the headline around one word', () => {
  assert.deepEqual(splitHeadline('Infyta – Limitless Tech Solutions', 'Limitless'), { before: 'Infyta – ', word: 'Limitless', after: ' Tech Solutions' });
});
test('returns null when the word is missing, so the caller prints the headline whole', () => {
  assert.equal(splitHeadline('Infyta Tech Solutions', 'Limitless'), null);
  assert.equal(splitHeadline('', 'Limitless'), null);
});
