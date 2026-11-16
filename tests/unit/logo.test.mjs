import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { logoPaths } from '../../src/components/logo-paths.js';

const ink = readFileSync('public/images/infyta-logo.svg', 'utf8');
const reversed = readFileSync('public/images/infyta-logo-reversed.svg', 'utf8');

test('logo files are outlines and need no font', () => {
  for (const svg of [ink, reversed]) {
    assert.doesNotMatch(svg, /<text|font-family|<style/);
    assert.match(svg, /viewBox="-2 -4 205 125"/);
  }
  assert.match(ink, /fill="#1F2C62"/i);
  assert.match(reversed, /fill="#FFFFFF"/i);
});
test('no-tagline logo files are outlines, shorter, and need no font', () => {
  const inkShort = readFileSync('public/images/infyta-logo-notagline.svg', 'utf8');
  const reversedShort = readFileSync('public/images/infyta-logo-reversed-notagline.svg', 'utf8');
  for (const svg of [inkShort, reversedShort]) {
    assert.doesNotMatch(svg, /<text|font-family|<style/);
    assert.match(svg, /viewBox="-2 -4 205 112"/);
    assert.equal(svg.includes(logoPaths.tagline), false);
  }
  assert.match(inkShort, /fill="#1F2C62"/i);
  assert.match(reversedShort, /fill="#FFFFFF"/i);
});
test('path data', () => {
  assert.equal(logoPaths.word.length, 6);
  assert.deepEqual(logoPaths.word.map((g) => g.accent), [false, false, false, true, false, false]);
  assert.equal(logoPaths.tiles.length, 3);
  for (const d of [logoPaths.wall, logoPaths.floor, logoPaths.tagline, ...logoPaths.tiles, ...logoPaths.word.map((g) => g.d)]) assert.match(d, /^M[\d\s.,MLQCZHV-]+$/i);
});
test('brand images', async () => {
  const size = async (f) => { const m = await sharp(f).metadata(); return [m.width, m.height]; };
  assert.deepEqual(await size('src/app/icon.png'), [512, 512]);
  assert.deepEqual(await size('src/app/apple-icon.png'), [180, 180]);
  assert.deepEqual(await size('src/app/opengraph-image.png'), [1200, 630]);
  assert.equal((await size('public/images/infyta-logo.png'))[0], 1200);
});
