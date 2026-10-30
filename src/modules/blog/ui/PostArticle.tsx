import { component$, useStyles$ } from "@builder.io/qwik";

import { postBySlug } from "../queries";
import { visiblePosts } from "../repository";
import { PostMeta } from "./PostMeta";
import prose from "./prose.css?inline";
import { TableOfContents } from "./TableOfContents";

/**
 * The whole post on one reading panel that spans the page column: the title and its date as the
 * first lines, then the text, with the contents beside it on a wide screen and folded above it on
 * a narrow one. No separate header, so the text starts on the first screen.
 *
 * Takes the slug rather than the post: a post carries its compiled content function, which can't
 * cross a `component$` boundary as a prop.
 */
export const PostArticle = component$<{ slug: string }>(({ slug }) => {
  useStyles$(prose);
  const post = postBySlug(visiblePosts, slug);
  if (post === undefined) return null;
  return (
    <article class="wrap pt-6 md:pt-8" data-track-read>
      <div
        data-tone={post.tone}
        class="grid gap-x-12 rounded-panel bg-panel px-5 py-7 shadow-raised sm:px-8 md:px-12 md:py-10 lg:grid-cols-[minmax(0,1fr)_200px] xl:px-14"
      >
        {/* The title is the first line of the post; the date and tags share its row when there's room */}
        <header class="mb-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-ink/9 pb-5 md:mb-8 lg:col-span-2">
          <h1 class="text-[clamp(28px,3.4vw,46px)] leading-[1.1] tracking-[-0.02em] text-balance">
            {post.title}
          </h1>
          <PostMeta post={post} />
        </header>

        <div class="min-w-0">
          <TableOfContents headings={post.headings} variant="folded" />
          <div class="prose">
            <post.Content />
          </div>
        </div>

        {/* Beside the text on a wide screen, where it can stay in view while reading */}
        <aside class="hidden lg:block">
          <div class="sticky top-8">
            <TableOfContents headings={post.headings} variant="aside" />
          </div>
        </aside>
      </div>
    </article>
  );
});
