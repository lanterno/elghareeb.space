import { ArrowRightIcon, Button, SectionHeading } from "~/platform/ui";

import { latestPosts } from "../queries";
import { visiblePosts } from "../repository";
import { PostCard } from "./PostCard";

import type { JSXOutput } from "@builder.io/qwik";

/** The newest posts, for the home page. Nothing at all until there is a post to show. */
export const LatestWriting = (): JSXOutput | null => {
  const latest = latestPosts(visiblePosts, 3);
  if (latest.length === 0) return null;
  return (
    <section
      aria-labelledby="writing-title"
      class="wrap flex flex-col gap-[30px] pt-20 md:pt-[110px]"
    >
      <SectionHeading
        id="writing-title"
        title="Written down."
        size="lg"
        lede="Notes on identity, climate software and the craft — written as I go."
        ledeClass="max-w-[26em] text-lg"
      />
      {/* However many there are, they fill the row: one spans it, two or three share it */}
      <ul class={["grid gap-[18px] md:grid-cols-2", latest.length === 3 && "lg:grid-cols-3"]}>
        {latest.map((post) => (
          <PostCard key={post.slug} post={post} wide={latest.length === 1} />
        ))}
      </ul>
      <Button href="/blog/" variant="panel" class="gap-2.5 self-start">
        All posts
        <ArrowRightIcon />
      </Button>
    </section>
  );
};
