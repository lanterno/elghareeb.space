/**
 * Every post in ./posts, compiled by Qwik City's markdown pipeline and validated against the
 * model. Folders starting with "_" (the template) are skipped. This is the only file that knows
 * the posts are files, which keeps the model and the queries testable without Vite.
 */
import { isoToday } from "~/platform/kernel";

import { type Post, type PostModule, toPosts } from "./model";
import { publishedPosts } from "./queries";

const modules = import.meta.glob<PostModule>(
  ["./posts/*/index.md", "./posts/*/index.mdx", "!./posts/_*/**"],
  { eager: true }
);

const posts: readonly Post[] = toPosts(modules);

/**
 * The posts a visitor can see. Builds are public, so drafts and scheduled posts are left out;
 * `bun run dev` shows everything so a draft can be read while it is written.
 */
export const visiblePosts: readonly Post[] = import.meta.env.DEV
  ? posts
  : publishedPosts(posts, isoToday());
