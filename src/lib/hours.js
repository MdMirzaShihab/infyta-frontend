import { site } from '../content/site.js';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const toMinutes = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));

// '09:00' -> '9 AM', '18:00' -> '6 PM', '09:30' -> '9:30 AM'. With suffix false: '9', '6', '9:30'.
function clock(hhmm, suffix = true) {
  const h24 = Number(hhmm.slice(0, 2));
  const m = hhmm.slice(3, 5);
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  const base = m === '00' ? String(h) : `${h}:${m}`;
  return suffix ? `${base} ${h24 < 12 ? 'AM' : 'PM'}` : base;
}

// The only place that reads a clock. Always Asia/Dhaka.
export function dhakaNow(d = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dhaka',
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'long',
    })
      .formatToParts(d)
      .map((p) => [p.type, p.value]),
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    day: DAY_NAMES.indexOf(parts.weekday),
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

// Date string plus n days, by UTC arithmetic on the date alone (no local clock).
function shiftDate(date, n) {
  const [y, m, d] = date.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return { date: t.toISOString().slice(0, 10), day: t.getUTCDay() };
}

const isWorking = (hours, day, date, closedDates) =>
  hours.days.includes(DAY_NAMES[day]) && !closedDates.includes(date);

// Next open day after `now.date`: 'tomorrow' or a weekday name.
function nextOpenWord(now, hours, closedDates) {
  for (let i = 1; i <= 14; i += 1) {
    const next = shiftDate(now.date, i);
    if (isWorking(hours, next.day, next.date, closedDates)) return i === 1 ? 'tomorrow' : DAY_NAMES[next.day];
  }
  return 'soon';
}

export function openStatus(now, hours = site.hours, closedDates = site.closedDates) {
  const opens = clock(hours.opens);
  const closes = clock(hours.closes);
  const closedToday = closedDates.includes(now.date);
  const workingToday = hours.days.includes(DAY_NAMES[now.day]);

  if (!closedToday && workingToday) {
    if (now.minutes >= toMinutes(hours.opens) && now.minutes < toMinutes(hours.closes)) {
      return { open: true, short: `Open now, until ${closes}`, long: `Open now. Closes at ${closes}.` };
    }
    if (now.minutes < toMinutes(hours.opens)) {
      return { open: false, short: `Closed, opens ${opens}`, long: `Closed now. Opens today at ${opens}.` };
    }
  }
  const when = nextOpenWord(now, hours, closedDates);
  if (closedToday) {
    return { open: false, short: 'Closed today', long: `Closed today. Opens ${when} at ${opens}.` };
  }
  return { open: false, short: `Closed, opens ${when} ${opens}`, long: `Closed now. Opens ${when} at ${opens}.` };
}

// Seven cells, Saturday to Friday, for the week containing now.date.
export function weekCells(now, hours = site.hours, closedDates = site.closedDates) {
  const offset = now ? (now.day + 1) % 7 : -1;
  const hoursText = `${clock(hours.opens, false)} to ${clock(hours.closes, false)}`;
  return Array.from({ length: 7 }, (_, i) => {
    const day = (6 + i) % 7;
    const date = now ? shiftDate(now.date, i - offset).date : null;
    const off = !hours.days.includes(DAY_NAMES[day]) || (date !== null && closedDates.includes(date));
    return {
      day,
      label: DAY_NAMES[day].slice(0, 3),
      text: off ? 'Closed' : hoursText,
      off,
      today: i === offset,
    };
  });
}
