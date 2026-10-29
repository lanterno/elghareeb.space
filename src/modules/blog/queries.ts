import type { Post } from "./model";
/** Questions the pages ask of the posts. Pure functions over a list, tested in blog.test.ts. */
import type { IsoDate } from "~/platform/kernel";

/** Posts the public can read on a given day: not drafts, and not scheduled for later */
export function publishedPosts(posts: readonly Post[], today: IsoDate): readonly Post[] {
  return posts.filter((post) => !post.draft && post.published <= today);
}

export function postBySlug(posts: readonly Post[], slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function latestPosts(posts: readonly Post[], count: number): readonly Post[] {
  return posts.slice(0, count);
}

/** The newer and the older neighbour of a post in a newest-first list */
export function neighbours(
  posts: readonly Post[],
  slug: string
): { newer: Post | undefined; older: Post | undefined } {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { newer: undefined, older: undefined };
  return { newer: posts[index - 1], older: posts[index + 1] };
}
