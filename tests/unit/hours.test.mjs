import test from 'node:test';
import assert from 'node:assert/strict';
import { dhakaNow, openStatus, weekCells } from '../../src/lib/hours.js';

const HOURS = { days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '18:00' };
// 2026-11-16 is a Monday. day: 0 Sunday … 6 Saturday.
const at = (date, day, hhmm) => ({ date, day, minutes: +hhmm.slice(0, 2) * 60 + +hhmm.slice(3) });
const status = (now, closed = []) => openStatus(now, HOURS, closed);

test('dhakaNow converts any instant to Dhaka time (UTC+6)', () => {
  assert.deepEqual(dhakaNow(new Date('2026-11-16T10:30:00Z')), { date: '2026-11-16', day: 1, minutes: 990 });
  assert.deepEqual(dhakaNow(new Date('2026-11-16T19:00:00Z')), { date: '2026-11-17', day: 2, minutes: 60 });
});
test('open during working hours', () => {
  assert.deepEqual(status(at('2026-11-16', 1, '10:00')), { open: true, short: 'Open now, until 6 PM', long: 'Open now. Closes at 6 PM.' });
  assert.equal(status(at('2026-11-16', 1, '09:00')).open, true);
  assert.equal(status(at('2026-11-16', 1, '17:59')).open, true);
});
test('before opening on a working day', () => {
  assert.deepEqual(status(at('2026-11-16', 1, '08:00')), { open: false, short: 'Closed, opens 9 AM', long: 'Closed now. Opens today at 9 AM.' });
});
test('after closing, next working day is tomorrow', () => {
  assert.deepEqual(status(at('2026-11-16', 1, '18:00')), { open: false, short: 'Closed, opens tomorrow 9 AM', long: 'Closed now. Opens tomorrow at 9 AM.' });
  assert.equal(status(at('2026-11-21', 6, '18:00')).short, 'Closed, opens tomorrow 9 AM');
});
test('Thursday evening and Friday', () => {
  assert.deepEqual(status(at('2026-11-19', 4, '19:00')), { open: false, short: 'Closed, opens Saturday 9 AM', long: 'Closed now. Opens Saturday at 9 AM.' });
  assert.equal(status(at('2026-11-20', 5, '12:00')).short, 'Closed, opens tomorrow 9 AM');
});
test('a listed closed date is never open', () => {
  const s = status(at('2026-11-16', 1, '10:00'), ['2026-11-16']);
  assert.deepEqual(s, { open: false, short: 'Closed today', long: 'Closed today. Opens tomorrow at 9 AM.' });
});
test('closed dates back to back, running into Friday', () => {
  const closed = ['2026-11-18', '2026-11-19'];
  assert.equal(status(at('2026-11-18', 3, '10:00'), closed).long, 'Closed today. Opens Saturday at 9 AM.');
  assert.equal(status(at('2026-11-17', 2, '19:00'), closed).long, 'Closed now. Opens Saturday at 9 AM.');
});
test('week strip starts on Saturday and marks today and closures', () => {
  const cells = weekCells(at('2026-11-16', 1, '10:00'), HOURS, ['2026-11-17']);
  assert.deepEqual(cells.map((c) => c.label), ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  assert.deepEqual(cells.map((c) => c.text), ['9 to 6', '9 to 6', '9 to 6', 'Closed', '9 to 6', '9 to 6', 'Closed']);
  assert.deepEqual(cells.filter((c) => c.today).map((c) => c.label), ['Mon']);
  assert.deepEqual(cells.filter((c) => c.off).map((c) => c.label), ['Tue', 'Fri']);
  assert.equal(weekCells(null, HOURS, ['2026-11-17']).filter((c) => c.today || c.text === 'Closed').length, 1);
});
