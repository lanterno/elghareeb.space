import { component$ } from "@builder.io/qwik";

import { ArrowRightIcon, Button, ClosingScene, PageHeader } from "~/platform/ui";

import type { DocumentHead } from "@builder.io/qwik-city";

/** 404 — a way back to the home page or the work, and the same dusk as every other page */
export default component$(() => (
  <>
    <PageHeader
      title="This page isn’t here."
      intro="The link may be old, or the page may have moved."
    >
      <div class="flex flex-wrap gap-3">
        <Button href="/" variant="sun">
          Go to the home page
          <ArrowRightIcon />
        </Button>
        <Button href="/work/" variant="panel">
          See my work
        </Button>
      </div>
    </PageHeader>

    <ClosingScene
      title="Looking for something that was here?"
      body="Tell me what you expected to find and I’ll point you to it, or put it back."
    />
  </>
));

/** No canonical link: this page has no URL of its own */
export const head: DocumentHead = {
  title: "Page not found | Ahmed Elghareeb",
  meta: [{ name: "robots", content: "noindex" }],
};
