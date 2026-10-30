/** The Showcase context: open-source work, shown on the Projects page. */
import * as v from "valibot";

import { HrefSchema, SlugSchema, ToneSchema, UrlSchema } from "~/platform/kernel";

/** `featured` gets the big card at the top; every other group is a row of cards with a title */
const projectGroupIds = ["featured", "identity"] as const;

export type ProjectGroupId = (typeof projectGroupIds)[number];

const ProjectGroupIdSchema = v.picklist(projectGroupIds);

/** One place to go on from a project's page */
export const StoryLinkSchema = v.object({
  label: v.string(),
  note: v.string(),
  href: HrefSchema,
});

/** The project's own page: my part in it, what it is built with, the story in chapters */
export const StorySchema = v.object({
  /** In a few words: "Leading the rewrite, since July 2024" */
  role: v.string(),
  stack: v.pipe(v.array(v.string()), v.minLength(1)),
  chapters: v.pipe(
    v.array(
      v.object({
        title: v.string(),
        paragraphs: v.pipe(v.array(v.string()), v.minLength(1)),
      })
    ),
    v.minLength(1)
  ),
  /** "Where to look": the code, the live thing, what it builds on */
  links: v.pipe(v.array(StoryLinkSchema), v.minLength(1)),
});

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
  story: StorySchema,
});

/** A titled row of project cards */
export const ProjectGroupSchema = v.object({
  id: ProjectGroupIdSchema,
  title: v.string(),
  lede: v.string(),
});

export type Project = v.InferOutput<typeof ProjectSchema>;
export type Story = v.InferOutput<typeof StorySchema>;
export type StoryLink = v.InferOutput<typeof StoryLinkSchema>;
export type ProjectGroup = v.InferOutput<typeof ProjectGroupSchema>;
