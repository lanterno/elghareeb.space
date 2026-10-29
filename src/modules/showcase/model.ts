/** The Showcase context: open-source work, shown on the Projects page. */
import * as v from "valibot";

import { SlugSchema, ToneSchema, UrlSchema } from "~/platform/kernel";

/** `featured` gets the big card at the top; every other group is a row of cards with a title */
const projectGroupIds = ["featured", "identity"] as const;

export type ProjectGroupId = (typeof projectGroupIds)[number];

const ProjectGroupIdSchema = v.picklist(projectGroupIds);

export const ProjectSchema = v.object({
  /** Stable id, used in element ids: "archetype-pal" */
  slug: SlugSchema,
  name: v.string(),
  description: v.string(),
  link: UrlSchema,
  tags: v.array(v.string()),
  tone: ToneSchema,
  /** Short word set large on the project's cover */
  cover: v.string(),
  /** Where the project lives, shown above the cover word */
  source: v.string(),
  group: ProjectGroupIdSchema,
});

/** A titled row of project cards */
export const ProjectGroupSchema = v.object({
  id: ProjectGroupIdSchema,
  title: v.string(),
  lede: v.string(),
});

export type Project = v.InferOutput<typeof ProjectSchema>;
export type ProjectGroup = v.InferOutput<typeof ProjectGroupSchema>;
