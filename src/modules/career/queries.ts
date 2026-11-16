/** Questions the pages ask of the Career content. Pure functions, tested in career.test.ts. */
import { type IsoDate, yearsSince } from "~/platform/kernel";

import {
  careerStart,
  certifications,
  conferences,
  education,
  experiences,
  organizations,
} from "./content";

import type { Conference, Experience, Organization } from "./model";
import type { PersonDetails } from "~/platform/seo";

/** The role still going; the most recent one if, for a while, none is */
export function currentRole(list: readonly Experience[] = experiences): Experience {
  const current = list.find((experience) => experience.end === null) ?? list[0];
  if (current === undefined) throw new Error("There are no experiences");
  return current;
}

/**
 * The author as the structured data names them on the pages about the work: the current role and
 * employer, the employers before it, the schools, and the fellowships (the certifications that
 * are not courses).
 */
export function authorDetails(list: readonly Experience[] = experiences): PersonDetails {
  const role = currentRole(list);
  const employer = organizations[role.org];
  return {
    jobTitle: role.title,
    worksFor: { name: employer.name, url: employer.url },
    alumniOf: education.map((school) => school.institution),
    formerEmployers: list
      .filter((experience) => experience.end !== null && experience.type !== "Fellowship")
      .map((experience) => {
        const org: Organization = organizations[experience.org];
        return { name: org.fullName ?? org.name, url: org.url };
      }),
    awards: certifications
      .filter((certification) => certification.name.includes("Fellow"))
      .map((certification) => certification.name),
  };
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
