/**
 * Dates that must stay right between builds. A page renders each with the build day's value and
 * a `data-live-*` attribute saying how to recount it; the Worker in front of the site
 * (worker/live.ts) recounts them on every request, so a quiet month never leaves a stale number
 * and a conference drops off the day after it ends. Without the Worker (a local preview) the
 * build day's values stand.
 */
import { type CalendarPoint, type IsoDate, isoToday, yearsSince } from "./dates";
import { formatDuration } from "./period";

/** The attributes a page may render; `live` below spells each one */
export type LiveAttribute =
  | "data-live-during"
  | "data-live-duration"
  | "data-live-outside"
  | "data-live-until"
  | "data-live-year"
  | "data-live-years";

export const live = {
  /** Whole years since a day: "9" */
  years: (start: IsoDate): Record<string, string> => ({ "data-live-years": start }),
  /** How long something still going has lasted: "10 months", "3 years 1 month" */
  duration: (start: CalendarPoint): Record<string, string> => ({ "data-live-duration": start }),
  /** The current year */
  year: { "data-live-year": "" } as Record<string, string>,
  /** Kept until the day ends, then removed */
  until: (last: IsoDate): Record<string, string> => ({ "data-live-until": last }),
  /** Shown only while the days last */
  during: (first: IsoDate, last: IsoDate): Record<string, string> => ({
    "data-live-during": `${first}/${last}`,
  }),
  /** Shown only outside the days */
  outside: (first: IsoDate, last: IsoDate): Record<string, string> => ({
    "data-live-outside": `${first}/${last}`,
  }),
};

export const liveTextAttributes = [
  "data-live-years",
  "data-live-duration",
  "data-live-year",
] as const;
export const liveShowAttributes = [
  "data-live-until",
  "data-live-during",
  "data-live-outside",
] as const;

/** What an element with one of `liveTextAttributes` says on `today` */
export function liveText(
  name: (typeof liveTextAttributes)[number],
  value: string,
  today: Date
): string {
  switch (name) {
    case "data-live-years":
      return String(yearsSince(value, today));
    case "data-live-duration":
      return formatDuration({ start: value, end: null }, today);
    case "data-live-year":
      return String(today.getUTCFullYear());
  }
}

/** Whether an element with one of `liveShowAttributes` shows on `today` */
export function liveShown(
  name: (typeof liveShowAttributes)[number],
  value: string,
  today: Date
): boolean {
  const day = isoToday(today);
  const [first = "", last = ""] = value.split("/");
  switch (name) {
    case "data-live-until":
      return day <= value;
    case "data-live-during":
      return first <= day && day <= last;
    case "data-live-outside":
      return day < first || last < day;
  }
}
