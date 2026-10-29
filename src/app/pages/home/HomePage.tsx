import { component$ } from "@builder.io/qwik";

import { useGitHubActivity } from "~/modules/activity";
import { LatestWriting } from "~/modules/blog";
import { SkillsMarquee } from "~/modules/career";
import { pageHead } from "~/platform/seo";
import { ClosingScene } from "~/platform/ui";

import { Hero } from "./Hero";
import { ShortVersion } from "./ShortVersion";

import type { DocumentHead } from "@builder.io/qwik-city";

/** The home page composes the career, showcase, activity and blog modules. Its loader comes from activity. */
export { useGitHubActivity };

export default component$(() => {
  const gitHubActivity = useGitHubActivity();
  return (
    <>
      <Hero />
      <SkillsMarquee />
      <ShortVersion activity={gitHubActivity.value} />
      <LatestWriting />
      <ClosingScene
        eyebrow="The day’s almost done. Your project isn’t."
        title="Let’s build something people can trust."
        body="Digital identity, climate software or IoT — if it has to be right, I’d like to hear about it."
      />
    </>
  );
});

export const head: DocumentHead = pageHead({
  title: "Ahmed Elghareeb | Staff Software Engineer",
  bare: true,
  description:
    "Staff Software Engineer at Resilio, building climate accountability software. Before that, three years on Switzerland’s digital identity at EPFL’s Center for Digital Trust. Open to collaborate on digital identity, climate and IoT.",
  path: "/",
});
