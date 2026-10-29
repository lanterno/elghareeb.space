import { formatDay } from "~/platform/kernel";
import { Chip } from "~/platform/ui";

import { tags } from "../content/tags";

import type { Post } from "../model";
import type { JSXOutput } from "@builder.io/qwik";

/** When a post was published (and updated), and its tags as toned chips. */
export const PostMeta = ({ post }: { post: Post }): JSXOutput => (
  <div class="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-ink-muted">
    <p>
      <time dateTime={post.published}>{formatDay(post.published)}</time>
      {post.updated !== undefined && (
        <>
          {" "}
          · updated <time dateTime={post.updated}>{formatDay(post.updated)}</time>
        </>
      )}
    </p>
    <ul class="flex flex-wrap gap-2">
      {post.tags.map((tag) => (
        <Chip key={tag} variant="tone" tone={tags[tag].tone}>
          {tags[tag].label}
        </Chip>
      ))}
    </ul>
  </div>
);
