import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import { ArrowRightIcon } from "~/components/icons";
import { PageHeader } from "~/components/page-header/PageHeader";

import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => (
  <PageHeader
    title="This page isn’t here."
    intro="The link may be old, or the page may have moved."
  >
    <div class="flex flex-wrap gap-3">
      <Link
        href="/"
        class="inline-flex min-h-14 items-center gap-2.5 rounded-full bg-sun px-7 text-base font-bold text-ink shadow-sun transition-transform hover:-translate-y-0.5"
      >
        Go to the home page
        <ArrowRightIcon />
      </Link>
      <Link
        href="/work/"
        class="inline-flex min-h-14 items-center rounded-full bg-panel/94 px-[26px] text-base font-bold text-ink transition-colors hover:bg-panel"
      >
        See my work
      </Link>
    </div>
  </PageHeader>
));

export const head: DocumentHead = {
  title: "Page not found | Ahmed Elghareeb",
  meta: [{ name: "robots", content: "noindex" }],
};
