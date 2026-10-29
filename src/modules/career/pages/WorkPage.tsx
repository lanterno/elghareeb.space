import { component$ } from "@builder.io/qwik";

import { pageHead } from "~/platform/seo";
import { ClosingScene, PageHeader } from "~/platform/ui";

import { Chapters } from "../ui/Chapters";
import { FieldTabs } from "../ui/FieldTabs";

import type { DocumentHead } from "@builder.io/qwik-city";

/** /work/ — the three fields of work, then every role as a chapter */
export default component$(() => (
  <>
    <PageHeader
      title="Work that has to be right."
      intro="A marketplace’s infrastructure, a country’s digital identity, a company’s environmental numbers. Here’s where I’ve been, and what I did there."
    />
    <FieldTabs />
    <Chapters />
    <ClosingScene
      title="Have something that has to be right?"
      body="I’m open to collaborating on digital identity, sustainability and IoT."
    />
  </>
));

export const head: DocumentHead = pageHead({
  title: "Work",
  description:
    "Digital identity at EPFL, climate accountability at Resilio, cloud systems at Back Market: where I’ve worked, and what I built there.",
  path: "/work/",
});
