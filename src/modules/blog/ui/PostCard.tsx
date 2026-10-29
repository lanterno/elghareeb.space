import { Link } from "@builder.io/qwik-city";

import { formatDay } from "~/platform/kernel";

import { tags } from "../content/tags";

import type { Post } from "../model";
import type { JSXOutput } from "@builder.io/qwik";

interface PostCardProps {
  post: Post;
  /** The newest post: spans the row, with its summary beside its date instead of under it */
  wide?: boolean;
}

/** One post in a list: its date and tags on the tone's tint, then the title and the summary. */
export const PostCard = ({ post, wide = false }: PostCardProps): JSXOutput => (
  <li data-tone={post.tone} class={wide ? "md:col-span-2 lg:col-span-3" : undefined}>
    <Link
      href={`/blog/${post.slug}/`}
      class={[
        "grid h-full overflow-hidden rounded-card bg-panel text-ink shadow-hair transition-transform hover:-translate-y-1",
        wide ? "md:grid-cols-[240px_minmax(0,1fr)]" : "grid-rows-[auto_1fr]",
      ]}
    >
      <span class={["flex flex-col gap-2 bg-tone-tint p-6", wide && "md:justify-center md:p-8"]}>
        <time dateTime={post.published} class="text-[13px] font-bold text-tone-ink">
          {formatDay(post.published)}
        </time>
        <span class="text-[13px] text-ink-muted">
          {post.tags.map((tag) => tags[tag].label).join(" · ")}
        </span>
      </span>
      <span class={["flex flex-col gap-2.5 p-6", wide && "md:justify-center md:gap-3 md:p-8"]}>
        <span
          class={[
            "font-display font-extrabold tracking-[-0.02em] text-balance",
            wide ? "text-[clamp(22px,2.4vw,32px)] leading-[1.1]" : "text-[22px] leading-[1.15]",
          ]}
        >
          {post.title}
        </span>
        <span
          class={[
            "flex-1 leading-[1.7] text-ink-muted",
            wide ? "text-base md:flex-none md:text-[17px]" : "text-[15px]",
          ]}
        >
          {post.description}
        </span>
        <span class="text-sm font-bold text-tone-ink">
          Read <span aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  </li>
);
