import * as v from "valibot";

import {
  CalendarPointSchema,
  HrefSchema,
  IsoDateSchema,
  ToneSchema,
  UrlSchema,
  YearMonthSchema,
  YearSchema,
} from "~/platform/kernel";

/**
 * The Career context: where Ahmed has worked and what he works on. The schemas are the model's
 * rules; the content in ./content is checked against them while the site is built.
 */
import type { FunctionComponent, QwikIntrinsicElements } from "@builder.io/qwik";

/** Every organisation the site mentions. Adding one here requires its record and its logo mark. */
const orgIds = [
  "resilio",
  "c4dt",
  "backMarket",
  "climatebase",
  "archetype",
  "lifePete",
  "transparium",
] as const;

export type OrgId = (typeof orgIds)[number];

export const OrgIdSchema = v.picklist(orgIds);

export const OrganizationSchema = v.object({
  name: v.string(),
  /** When the short name isn't enough on its own, e.g. on the Work page */
  fullName: v.optional(v.string()),
  url: UrlSchema,
  tone: ToneSchema,
  /** The logo's height beside the name, which evens out the marks' shapes */
  markHeight: v.string(),
});

const employmentTypes = ["Full-time", "Part-time", "Contract", "Fellowship", "Permanent"] as const;

export const ExperienceSchema = v.object({
  org: OrgIdSchema,
  title: v.string(),
  type: v.picklist(employmentTypes),
  /** The day it started when I know it, otherwise the month */
  start: CalendarPointSchema,
  /** `null` while this is the current role */
  end: v.nullable(YearMonthSchema),
  location: v.string(),
  description: v.pipe(v.string(), v.minLength(1)),
  skills: v.array(v.string()),
});

export const fieldIds = ["identity", "climate", "scale"] as const;

/** A field of work: one of the "three worlds" on the Work page */
export const FieldOfWorkSchema = v.object({
  id: v.picklist(fieldIds),
  label: v.string(),
  tone: ToneSchema,
  headline: v.string(),
  body: v.string(),
  skills: v.array(v.string()),
  links: v.array(v.object({ label: v.string(), note: v.string(), href: HrefSchema })),
});

export const SkillGroupSchema = v.object({
  category: v.string(),
  items: v.array(v.string()),
  tone: ToneSchema,
});

/** One skill in the scrolling band on the home page */
export const SkillHighlightSchema = v.object({ name: v.string(), tone: ToneSchema });

export const EducationSchema = v.object({
  institution: v.string(),
  degree: v.string(),
  from: v.number(),
  to: v.number(),
  description: v.string(),
});

export const CertificationSchema = v.object({
  name: v.string(),
  org: v.string(),
  year: YearSchema,
});

export const ConferenceSchema = v.pipe(
  v.object({
    name: v.string(),
    href: UrlSchema,
    place: v.string(),
    first: IsoDateSchema,
    last: IsoDateSchema,
  }),
  v.check(({ first, last }) => first <= last, "A conference can't end before it starts")
);

/** A short fact about me, tied to an organisation: "Climatebase Fellow" */
export const HighlightSchema = v.object({ label: v.string(), org: OrgIdSchema });

/** A labelled row of organisations: "Also building at: …" */
export const AffiliationRowSchema = v.object({
  label: v.string(),
  orgs: v.array(OrgIdSchema),
});

export type Organization = v.InferOutput<typeof OrganizationSchema>;
export type Experience = v.InferOutput<typeof ExperienceSchema>;
export type FieldOfWork = v.InferOutput<typeof FieldOfWorkSchema>;
export type FieldId = FieldOfWork["id"];
export type SkillGroup = v.InferOutput<typeof SkillGroupSchema>;
export type SkillHighlight = v.InferOutput<typeof SkillHighlightSchema>;
export type Education = v.InferOutput<typeof EducationSchema>;
export type Certification = v.InferOutput<typeof CertificationSchema>;
export type Highlight = v.InferOutput<typeof HighlightSchema>;
export type AffiliationRow = v.InferOutput<typeof AffiliationRowSchema>;

/** What a `?jsx` image import gives: a component taking the usual <img> attributes */
type ImageComponent = FunctionComponent<
  Omit<QwikIntrinsicElements["img"], "src" | "width" | "height" | "srcSet">
>;

export type Conference = v.InferOutput<typeof ConferenceSchema> & { Logo: ImageComponent };
