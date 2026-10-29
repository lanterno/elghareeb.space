import * as v from "valibot";

import { type IsoDate, IsoDateSchema, SlugSchema, type Tone } from "~/platform/kernel";

import { type TagId, tagIds, tags } from "./content/tags";

/**
 * The Blog context. A post is a markdown file in ./posts/<slug>/index.md; its frontmatter is
 * checked against the schema below while the site is built.
 */
import type { FunctionComponent } from "@builder.io/qwik";

const PostFrontmatterSchema = v.pipe(
  v.object({
    title: v.pipe(v.string(), v.minLength(1)),
    /** One sentence: the card, the search snippet and the feed all use it */
    description: v.pipe(v.string(), v.minLength(1)),
    published: IsoDateSchema,
    updated: v.optional(IsoDateSchema),
    /** The first tag sets the post's tone */
    tags: v.pipe(v.array(v.picklist(tagIds)), v.minLength(1)),
    /** Kept out of builds until removed; visible in `bun run dev` */
    draft: v.optional(v.boolean()),
  }),
  v.check(
    ({ published, updated }) => updated === undefined || updated >= published,
    "A post can't be updated before it was published"
  )
);

export interface Heading {
  readonly text: string;
  readonly id: string;
  readonly level: number;
}

/** What Qwik City's markdown compiler exports from a post file */
export interface PostModule {
  readonly default: FunctionComponent<Record<string, unknown>>;
  readonly frontmatter: unknown;
  readonly headings?: readonly Heading[];
}

export interface Post {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly published: IsoDate;
  readonly updated: IsoDate | undefined;
  readonly tags: readonly TagId[];
  readonly draft: boolean;
  readonly tone: Tone;
  readonly headings: readonly Heading[];
  readonly Content: PostModule["default"];
}

/** "./posts/hello-world/index.md" → "hello-world" */
export function slugFromPath(path: string): string {
  const match = /\/posts\/([^/]+)\/index\.mdx?$/.exec(path);
  const slug = match?.[1];
  if (slug === undefined) throw new Error(`Not a post path: ${path}`);
  return v.parse(SlugSchema, slug, { message: `"${slug}" is not a valid slug` });
}

/** A compiled post file as a Post; throws with the file's path when its frontmatter is wrong */
export function toPost(path: string, module: PostModule): Post {
  const slug = slugFromPath(path);
  const result = v.safeParse(PostFrontmatterSchema, module.frontmatter);
  if (!result.success) {
    throw new Error(`The post "${slug}" has a frontmatter mistake:\n${v.summarize(result.issues)}`);
  }
  const frontmatter = result.output;
  const firstTag = frontmatter.tags[0] ?? tagIds[0];
  if (firstTag === undefined) throw new Error("There are no tags");
  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    published: frontmatter.published,
    updated: frontmatter.updated,
    tags: frontmatter.tags,
    draft: frontmatter.draft ?? false,
    tone: tags[firstTag].tone,
    headings: module.headings ?? [],
    Content: module.default,
  };
}

/** Newest first; throws on two posts with the same slug */
export function toPosts(modules: Readonly<Record<string, PostModule>>): readonly Post[] {
  const posts = Object.entries(modules).map(([path, module]) => toPost(path, module));
  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug)) throw new Error(`Two posts share the slug "${post.slug}"`);
    slugs.add(post.slug);
  }
  return posts.toSorted((a, b) => b.published.localeCompare(a.published));
}
