/** Questions the pages ask of the Career content. Pure functions, tested in career.test.ts. */
import { type IsoDate, yearsSince } from "~/platform/kernel";

import { careerStart, conferences, experiences } from "./content";

import type { Conference, Experience } from "./model";

/** The role still going; the most recent one if, for a while, none is */
export function currentRole(list: readonly Experience[] = experiences): Experience {
  const current = list.find((experience) => experience.end === null) ?? list[0];
  if (current === undefined) throw new Error("There are no experiences");
  return current;
}

/** Whole years since the first job started, counted on the day the site was built */
export function yearsOfExperience(today: Date = new Date()): number {
  return yearsSince(careerStart, today);
}

/** Conferences that haven't ended yet, in date order */
export function upcomingConferences(
  today: IsoDate,
  list: readonly Conference[] = conferences
): readonly Conference[] {
  return list.filter((conference) => conference.last >= today);
}

/** Whether the conference is on right now */
export function isHappening(
  conference: Pick<Conference, "first" | "last">,
  today: IsoDate
): boolean {
  return conference.first <= today && today <= conference.last;
}
