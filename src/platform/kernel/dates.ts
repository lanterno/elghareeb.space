/**
 * Calendar dates as plain strings: an ISO day ("2025-12-07") or a year-month ("2025-12"). The
 * site is static, so "today" is the day of the last build, in UTC, and every date on the site
 * turns over together when it is rebuilt.
 *
 * Formatting is hand-written rather than `Intl`: its output must not depend on the ICU data of
 * whichever runtime builds the site ("Sep" here, "Sept" there).
 */

/** "2025-12-07" */
export type IsoDate = string;
/** "2025-12" */
export type YearMonth = string;
/** A day when known ("2025-12-07"), otherwise the month ("2025-12") */
export type CalendarPoint = string;

interface CalendarMonth {
  readonly year: number;
  /** 1–12 */
  readonly month: number;
}

interface CalendarDay extends CalendarMonth {
  readonly day: number;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function isDay(value: CalendarPoint): value is IsoDate {
  return value.length === 10;
}

/** Works on a day too: "2025-12-07" is in December 2025 */
export function toCalendarMonth(value: CalendarPoint): CalendarMonth {
  return { year: Number(value.slice(0, 4)), month: Number(value.slice(5, 7)) };
}

export function toCalendarDay(value: IsoDate): CalendarDay {
  return { ...toCalendarMonth(value), day: Number(value.slice(8, 10)) };
}

export function fromDate(date: Date): CalendarDay {
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

/** The build day as an ISO date, for comparing with content dates */
export function isoToday(today: Date = new Date()): IsoDate {
  return today.toISOString().slice(0, 10);
}

/** Whole months between two days: 7 Dec 2025 to 17 Oct 2026 is 10 */
export function completedMonths(from: CalendarDay, to: CalendarDay): number {
  return (to.year - from.year) * 12 + (to.month - from.month) - (to.day < from.day ? 1 : 0);
}

/** Months counted inclusively, the way LinkedIn does: September to November is three */
export function inclusiveMonths(from: CalendarMonth, to: CalendarMonth): number {
  return (to.year - from.year) * 12 + (to.month - from.month) + 1;
}

export function monthName({ month }: CalendarMonth): string {
  return monthNames[month - 1] ?? "";
}

/** "Dec 2025" */
export function formatMonth(value: CalendarPoint): string {
  const month = toCalendarMonth(value);
  return `${monthName(month)} ${String(month.year)}`;
}

/** "5 Apr 2026" */
export function formatDay(value: IsoDate): string {
  const day = toCalendarDay(value);
  return `${String(day.day)} ${monthName(day)} ${String(day.year)}`;
}

/** "25–29 Oct", "30 Oct – 2 Nov" or "4 Dec" */
export function formatDays(first: IsoDate, last: IsoDate): string {
  const from = toCalendarDay(first);
  const to = toCalendarDay(last);
  if (first === last) return `${String(to.day)} ${monthName(to)}`;
  if (from.month === to.month) return `${String(from.day)}–${String(to.day)} ${monthName(to)}`;
  return `${String(from.day)} ${monthName(from)} – ${String(to.day)} ${monthName(to)}`;
}

/** Whole years since a day, counted on the build day */
export function yearsSince(start: IsoDate, today: Date = new Date()): number {
  return Math.floor(completedMonths(toCalendarDay(start), fromDate(today)) / 12);
}
