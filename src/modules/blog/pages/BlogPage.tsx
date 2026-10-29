import { component$ } from "@builder.io/qwik";

import { pageHead } from "~/platform/seo";
import { ClosingScene, PageHeader } from "~/platform/ui";

import { blogDescription } from "../content/blurb";
import { visiblePosts } from "../repository";
import { PostCard } from "../ui/PostCard";

import type { DocumentHead } from "@builder.io/qwik-city";

/** /blog/ — every post a visitor can read, newest first */
export default component$(() => (
  <>
    <PageHeader
      layout="compact"
      title="Written down."
      intro="Notes on digital identity, climate software and the craft of building things that have to be right — written as I go."
    />

    <section aria-label="Posts" class="wrap pt-8 md:pt-10">
      {visiblePosts.length === 0 ? (
        <p class="rounded-card bg-panel px-8 py-10 text-center text-lg text-ink-muted shadow-hair">
          The first post is on its way.
        </p>
      ) : (
        <ul class="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post, index) => (
            <PostCard key={post.slug} post={post} wide={index === 0} />
          ))}
        </ul>
      )}
    </section>

    <ClosingScene
      title="Read something you’d build on?"
      body="If a post sparked an idea — or a disagreement — I’d like to hear it."
    />
  </>
));

export const head: DocumentHead = pageHead({
  title: "Blog",
  description: blogDescription,
  path: "/blog/",
});
