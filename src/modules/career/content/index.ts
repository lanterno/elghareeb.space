/**
 * The Career content, checked against the model while the site is built. A mistyped date or
 * link fails the build rather than the page; the browser skips the check, as it only ever gets
 * content that passed.
 */
import * as v from "valibot";

import { assertValid, IsoDateSchema } from "~/platform/kernel";

import {
  AffiliationRowSchema,
  CertificationSchema,
  ConferenceSchema,
  EducationSchema,
  ExperienceSchema,
  FieldOfWorkSchema,
  HighlightSchema,
  OrganizationSchema,
  OrgIdSchema,
  SkillGroupSchema,
  SkillHighlightSchema,
} from "../model";
import { conferences } from "./conferences";
import { careerStart, experiences } from "./experiences";
import { fields } from "./fields";
import { affiliations, highlights } from "./highlights";
import { certifications, education } from "./learning";
import { organizations } from "./organizations";
import { skillGroups, skillHighlights } from "./skills";

export {
  affiliations,
  careerStart,
  certifications,
  conferences,
  education,
  experiences,
  fields,
  highlights,
  organizations,
  skillGroups,
  skillHighlights,
};

export function validateCareerContent(): void {
  assertValid(
    "career",
    v.object({
      careerStart: IsoDateSchema,
      organizations: v.record(OrgIdSchema, OrganizationSchema),
      experiences: v.array(ExperienceSchema),
      fields: v.array(FieldOfWorkSchema),
      skillGroups: v.array(SkillGroupSchema),
      skillHighlights: v.array(SkillHighlightSchema),
      education: v.array(EducationSchema),
      certifications: v.array(CertificationSchema),
      conferences: v.array(ConferenceSchema),
      highlights: v.array(HighlightSchema),
      affiliations: v.array(AffiliationRowSchema),
    }),
    {
      careerStart,
      organizations,
      experiences,
      fields,
      skillGroups,
      skillHighlights,
      education,
      certifications,
      conferences,
      highlights,
      affiliations,
    }
  );
}

if (import.meta.env.SSR) validateCareerContent();
