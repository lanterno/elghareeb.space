/** The Services context: what the author offers as a freelancer, shown on the Work with me page. */
import * as v from "valibot";

import { HrefSchema, SlugSchema, ToneSchema } from "~/platform/kernel";

/** A page on the site (or elsewhere) that shows the author has done this before */
export const EvidenceSchema = v.object({
  label: v.string(),
  href: HrefSchema,
});

/** One kind of work the author takes on */
export const ServiceSchema = v.object({
  /** The section's anchor on the page: "digital-identity" */
  id: SlugSchema,
  title: v.string(),
  /** Two or three sentences: what the work is and where the author did it before */
  summary: v.string(),
  /** The words people search with, shown as chips */
  keywords: v.pipe(v.array(v.string()), v.minLength(1)),
  tone: ToneSchema,
  evidence: v.pipe(v.array(EvidenceSchema), v.minLength(1)),
});

/** One way an engagement can be shaped */
export const EngagementSchema = v.object({
  title: v.string(),
  description: v.string(),
});

/** A question someone asks before writing, answered in plain text */
export const QuestionSchema = v.object({
  question: v.string(),
  answer: v.string(),
});

export type Evidence = v.InferOutput<typeof EvidenceSchema>;
export type Service = v.InferOutput<typeof ServiceSchema>;
export type Engagement = v.InferOutput<typeof EngagementSchema>;
export type Question = v.InferOutput<typeof QuestionSchema>;
