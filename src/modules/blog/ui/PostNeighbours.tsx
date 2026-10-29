import { Link } from "@builder.io/qwik-city";

import { ArrowRightIcon } from "~/platform/ui";

import type { Post } from "../model";
import type { JSXOutput } from "@builder.io/qwik";

interface PostNeighboursProps {
  newer: Post | undefined;
  older: Post | undefined;
}

const Neighbour = ({ post, label }: { post: Post; label: string }): JSXOutput => (
  <li data-tone={post.tone} class="min-w-0 flex-1">
    <Link
      href={`/blog/${post.slug}/`}
      class="flex h-full items-center gap-4 rounded-tile bg-panel/94 px-5 py-[18px] text-ink shadow-hair transition-colors hover:bg-panel"
    >
      <span class="flex min-w-0 flex-1 flex-col gap-0.5">
        <span class="text-[13px] font-bold text-tone-ink">{label}</span>
        <span class="font-display text-base font-extrabold leading-snug">{post.title}</span>
      </span>
      <ArrowRightIcon />
    </Link>
  </li>
);

/** The posts either side of this one */
export const PostNeighbours = ({ newer, older }: PostNeighboursProps): JSXOutput | null => {
  if (newer === undefined && older === undefined) return null;
  return (
    <nav aria-label="More posts" class="wrap pt-6">
      <ul class="flex flex-col gap-3 sm:flex-row">
        {older !== undefined && <Neighbour post={older} label="Older" />}
        {newer !== undefined && <Neighbour post={newer} label="Newer" />}
      </ul>
    </nav>
  );
};
