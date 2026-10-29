/**
 * Valibot building blocks for the modules' content models. Content is checked against them while
 * the site is built, so a mistyped date or link fails the build rather than the page.
 */
import * as v from "valibot";

import { tones } from "./tone";

export const UrlSchema = v.pipe(v.string(), v.url());

export const IsoDateSchema = v.pipe(v.string(), v.isoDate());

export const YearMonthSchema = v.pipe(v.string(), v.regex(/^\d{4}-(0[1-9]|1[0-2])$/));

/** A day when known, otherwise the month */
export const CalendarPointSchema = v.union([IsoDateSchema, YearMonthSchema]);

export const YearSchema = v.pipe(v.string(), v.regex(/^\d{4}$/));

/** URL-safe and stable: "archetype-pal" */
export const SlugSchema = v.pipe(v.string(), v.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/));

export const ToneSchema = v.picklist(tones);

/** A link into this site ("/projects/") or out of it */
export const HrefSchema = v.union([v.pipe(v.string(), v.startsWith("/")), UrlSchema]);

/** Throws a readable error when content doesn't match its model */
export function assertValid(what: string, schema: v.GenericSchema, value: unknown): void {
  const result = v.safeParse(schema, value);
  if (!result.success) {
    throw new Error(`The ${what} content has a mistake:\n${v.summarize(result.issues)}`);
  }
}
