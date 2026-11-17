import test from 'node:test';
import assert from 'node:assert/strict';
import { projector, pts, pathD, boxFaces, faceX, faceY, cylinder, K, PH } from '../../src/lib/iso.js';

const P = projector(440, 168);
test('projection', () => {
  assert.deepEqual([P(0, 0), P(12, 0), P(0, 10), P(12, 10), P(0, 0, 2.6), P(12, 10, -0.78)], [[440, 168], [855.7, 408], [93.6, 368], [509.3, 608], [440, 64], [509.3, 639.2]]);
  assert.equal(K, 40); assert.equal(PH, 0.14);
});
test('box faces and outline', () => {
  const b = boxFaces(P, 0.95, 0.35, 0.14, 1.6, 1, 2.45);
  assert.deepEqual(b.left, [[426.1, 110.4], [481.6, 142.4], [481.6, 240.4], [426.1, 208.4]]);
  assert.deepEqual(b.right, [[516.2, 122.4], [481.6, 142.4], [481.6, 240.4], [516.2, 220.4]]);
  assert.deepEqual(b.top, [[460.8, 90.4], [516.2, 122.4], [481.6, 142.4], [426.1, 110.4]]);
  assert.deepEqual(b.hull, [[460.8, 90.4], [516.2, 122.4], [516.2, 220.4], [481.6, 240.4], [426.1, 208.4], [426.1, 110.4]]);
});
test('faces, strings and cylinder', () => {
  assert.deepEqual(faceY(P, 0)(12, 2.6), P(12, 0, 2.6));
  assert.deepEqual(faceX(P, 0)(10, 2.6), P(0, 10, 2.6));
  assert.equal(pts([[1, 2], [3.5, 4]]), '1,2 3.5,4');
  assert.equal(pathD([[1, 2], [3.5, 4]]), 'M1 2L3.5 4');
  const c = cylinder(P, 5.1, 1.0, 0.14, 0.44, 1.05);
  assert.deepEqual([c.cx, c.cy, c.rx, c.ry, c.ty], [582, 284.4, 21.6, 12.4, 242.4]);
  assert.match(c.body, /^M560\.4 242\.4V284\.4A21\.6 12\.4 0 0 0 603\.6 284\.4V242\.4Z$/);
  assert.equal(c.hull.length, 4);
});
