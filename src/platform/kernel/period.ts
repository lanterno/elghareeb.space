/**
 * A span of time with a start and, unless it is still going, an end: a role, a fellowship, a
 * course. A plain object, so Qwik can serialise it, with the functions beside it.
 */
import {
  type CalendarPoint,
  completedMonths,
  formatMonth,
  fromDate,
  inclusiveMonths,
  isDay,
  monthName,
  toCalendarDay,
  toCalendarMonth,
  type YearMonth,
} from "./dates";
import { plural } from "./format";

export interface Period {
  /** The day it started when known, otherwise the month */
  readonly start: CalendarPoint;
  /** `null` while it is still going */
  readonly end: YearMonth | null;
}

/** The big year on a chapter: { from: "2023", to: "26" }, { from: "2025", to: "now" } */
export interface YearSpan {
  readonly from: string;
  /** `null` when it started and ended in the same year */
  readonly to: string | null;
}

export function isCurrent(period: Period): boolean {
  return period.end === null;
}

/** "Dec 2025 – now", "Sep – Nov 2024" or "Apr 2023 – Apr 2026" */
export function formatPeriod(period: Period): string {
  const from = toCalendarMonth(period.start);
  if (period.end === null) return `${formatMonth(period.start)} – now`;
  const to = toCalendarMonth(period.end);
  if (from.year === to.year) return `${monthName(from)} – ${formatMonth(period.end)}`;
  return `${formatMonth(period.start)} – ${formatMonth(period.end)}`;
}

/**
 * How many months a period has lasted. A current one that started on a known day counts whole
 * months up to the build day. Otherwise months count inclusively, the way LinkedIn does.
 */
function months(period: Period, today: Date): number {
  if (period.end === null && isDay(period.start)) {
    return completedMonths(toCalendarDay(period.start), fromDate(today));
  }
  const to = period.end === null ? fromDate(today) : toCalendarMonth(period.end);
  return inclusiveMonths(toCalendarMonth(period.start), to);
}

/** "10 months" or "3 years 1 month" */
export function formatDuration(period: Period, today: Date = new Date()): string {
  const total = months(period, today);
  const years = Math.floor(total / 12);
  const rest = total % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(plural(years, "year"));
  if (rest > 0) parts.push(plural(rest, "month"));
  return parts.length > 0 ? parts.join(" ") : "under a month";
}

export function yearSpan(from: number, to: number | null): YearSpan {
  if (to === null) return { from: String(from), to: "now" };
  if (to === from) return { from: String(from), to: null };
  return { from: String(from), to: String(to).slice(2) };
}

export function periodYears(period: Period): YearSpan {
  return yearSpan(
    toCalendarMonth(period.start).year,
    period.end === null ? null : toCalendarMonth(period.end).year
  );
}
