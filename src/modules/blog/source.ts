/**
 * The posts as written, in markdown, for the readers that want text rather than a page
 * (/llms-full.txt). Kept apart from `repository.ts` so the raw files never reach a page's bundle.
 */
import { slugFromPath } from "./model";

const sources = import.meta.glob<string>(
  ["./posts/*/index.md", "./posts/*/index.mdx", "!./posts/_*/**"],
  { eager: true, query: "?raw", import: "default" }
);

/** A post's markdown without its frontmatter, or undefined when there is no such post */
export function postSource(slug: string): string | undefined {
  const entry = Object.entries(sources).find(([path]) => slugFromPath(path) === slug);
  return entry?.[1].replace(/^---\n[\s\S]*?\n---\n/, "").trim();
}
