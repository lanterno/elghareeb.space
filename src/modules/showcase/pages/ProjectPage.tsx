import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  Link,
  type RequestHandler,
  type StaticGenerateHandler,
  useLocation,
} from "@builder.io/qwik-city";

import { pageHead } from "~/platform/seo";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  Button,
  Chip,
  ClosingScene,
  CodeIcon,
  ExternalLink,
  PageHeader,
  SectionHeading,
} from "~/platform/ui";

import { projects } from "../content";
import { otherProjects, projectBySlug, projectPath } from "../queries";
import { ProjectCard } from "../ui/ProjectCard";

import type { StoryLink } from "../model";
import type { JSXOutput } from "@builder.io/qwik";

/** One place to go on from here: the code, the live thing, what it builds on */
const WhereToLook = ({ item }: { item: StoryLink }): JSXOutput => {
  const content = (
    <>
      <span class="flex flex-1 flex-col gap-0.5">
        <span class="text-base font-bold">{item.label}</span>
        <span class="text-sm text-ink-muted">{item.note}</span>
      </span>
      <span class="text-tone-ink">
        {item.href.startsWith("/") ? <ArrowRightIcon /> : <ArrowUpRightIcon />}
      </span>
    </>
  );
  const classes =
    "flex items-center gap-4 rounded-tile bg-panel p-4 text-ink shadow-hair transition-transform hover:-translate-y-0.5";
  return (
    <li>
      {item.href.startsWith("/") ? (
        <Link href={item.href} class={classes}>
          {content}
        </Link>
      ) : (
        <ExternalLink href={item.href} class={classes}>
          {content}
        </ExternalLink>
      )}
    </li>
  );
};

/** /projects/<slug>/ — one project: what it is, my part in it, where to look, the others */
export default component$(() => {
  const location = useLocation();
  const project = projectBySlug(location.params["slug"] ?? "");
  if (project === undefined) return null;
  const { story } = project;
  return (
    <>
      <div data-tone={project.tone}>
        <PageHeader title={project.name} intro={project.description}>
          <div q:slot="body" class="flex flex-col gap-4">
            <p class="text-[15px] font-bold text-tone-ink">{story.role}</p>
            <ul class="flex flex-wrap gap-2">
              {story.stack.map((item) => (
                <Chip key={item} variant="panel">
                  {item}
                </Chip>
              ))}
            </ul>
          </div>
          <Button href={project.link} variant="panel-compact">
            <CodeIcon />
            Open on GitHub
          </Button>
        </PageHeader>

        <article class="wrap grid gap-12 pt-20 md:pt-[100px] lg:grid-cols-[7fr_4fr] lg:gap-16">
          <div class="flex flex-col gap-12">
            {story.chapters.map((chapter, i) => {
              const id = `${project.slug}-chapter-${String(i)}`;
              return (
                <section key={chapter.title} aria-labelledby={id} class="flex flex-col gap-4">
                  <h2
                    id={id}
                    class="text-[clamp(28px,3.2vw,40px)] leading-[1.1] tracking-[-0.02em]"
                  >
                    {chapter.title}
                  </h2>
                  {chapter.paragraphs.map((paragraph) => (
                    <p key={paragraph} class="max-w-[40em] text-[17px] leading-[1.75]">
                      {paragraph}
                    </p>
                  ))}
                </section>
              );
            })}
          </div>
          <aside
            aria-label="Where to look"
            class="flex flex-col gap-3 self-start lg:sticky lg:top-6"
          >
            <p class="text-sm font-bold text-ink-muted">Where to look</p>
            <ul class="flex flex-col gap-3">
              {story.links.map((item) => (
                <WhereToLook key={item.href} item={item} />
              ))}
            </ul>
          </aside>
        </article>
      </div>

      <section aria-labelledby="more-title" class="wrap flex flex-col gap-[22px] pt-24">
        <SectionHeading
          id="more-title"
          title="More in the open."
          size="sm"
          lede="The rest of what I’ve built where anyone can read it."
        />
        <ul class="grid gap-[18px] lg:grid-cols-3">
          {otherProjects(project.slug).map((other) => (
            <ProjectCard key={other.slug} project={other} />
          ))}
        </ul>
      </section>

      <ClosingScene
        title="Want to build the next one together?"
        body="Open-source, research or a product with real stakes — I’d like to hear about it."
      />
    </>
  );
});

/** An unknown slug is a 404, in development as in the built site */
export const onGet: RequestHandler = ({ params, error }) => {
  if (projectBySlug(params["slug"] ?? "") === undefined) {
    throw error(404, "There is no such project");
  }
};

/** Tells the static build which projects to render */
export const onStaticGenerate: StaticGenerateHandler = () => ({
  params: projects.map((project) => ({ slug: project.slug })),
});

export const head: DocumentHead = ({ params }) => {
  const project = projectBySlug(params["slug"] ?? "");
  if (project === undefined) return { title: "Project not found" };
  return pageHead({
    title: project.name,
    description: project.description,
    path: projectPath(project),
  });
};
