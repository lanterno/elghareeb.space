import { component$ } from "@builder.io/qwik";

import { pageHead, site } from "~/platform/seo";
import { Button, ClosingScene, CodeIcon, PageHeader, SectionHeading } from "~/platform/ui";

import { projectGroups, projectsIntro } from "../content";
import { featuredProjects, projectsInGroup } from "../queries";
import { FeaturedProject } from "../ui/FeaturedProject";
import { ProjectCard } from "../ui/ProjectCard";

import type { DocumentHead } from "@builder.io/qwik-city";

/** /projects/ — the featured project, then each group as a row of cards */
export default component$(() => (
  <>
    <PageHeader title="Built in the open." intro={projectsIntro}>
      <Button href={site.social.github.url} variant="panel-compact">
        <CodeIcon />
        Everything on GitHub
      </Button>
    </PageHeader>

    {featuredProjects().map((project) => (
      <FeaturedProject key={project.slug} project={project} />
    ))}

    {projectGroups.map((group) => (
      <section
        key={group.id}
        aria-labelledby={`${group.id}-title`}
        class="wrap flex flex-col gap-[22px] pt-[72px]"
      >
        <SectionHeading
          id={`${group.id}-title`}
          title={group.title}
          size="sm"
          layout="stack"
          lede={group.lede}
          ledeClass="max-w-[38em] text-[17px]"
        />
        <ul class="grid gap-[18px] lg:grid-cols-3">
          {projectsInGroup(group.id).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ul>
      </section>
    ))}

    <ClosingScene
      title="Want to build the next one together?"
      body="Open-source, research or a product with real stakes — I’d like to hear about it."
    />
  </>
));

export const head: DocumentHead = pageHead({
  title: "Projects",
  description:
    "Open-source work: the archetype-pal rewrite for medieval manuscript research, and an identity trilogy from cryptographic primitives to Switzerland’s E-ID workshop.",
  path: "/projects/",
});
