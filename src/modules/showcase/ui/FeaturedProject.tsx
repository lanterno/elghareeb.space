import { ArrowUpRightIcon, Button, Chip } from "~/platform/ui";

import type { Project } from "../model";
import type { JSXOutput } from "@builder.io/qwik";

/** The big two-column card: the cover word in the project's tone, then the story. */
export const FeaturedProject = ({ project }: { project: Project }): JSXOutput => (
  <section aria-labelledby={`featured-${project.slug}`} data-tone={project.tone} class="wrap pt-24">
    <article class="grid overflow-hidden rounded-panel bg-panel shadow-raised md:grid-cols-2">
      <div class="flex min-h-[260px] flex-col justify-between gap-6 bg-tone-tint p-8 md:min-h-[420px] md:p-10">
        <p class="self-start rounded-full bg-panel px-3.5 py-2 text-sm font-bold text-tone-ink">
          {project.source}
        </p>
        <p
          aria-hidden="true"
          class="font-display text-[clamp(52px,6.4vw,88px)] font-extrabold leading-[0.9] tracking-[-0.04em] break-words text-tone-ink"
        >
          {project.cover}
        </p>
      </div>
      <div class="flex flex-col justify-center gap-[18px] p-8 md:p-11">
        <h2 id={`featured-${project.slug}`} class="text-4xl leading-tight tracking-[-0.02em]">
          {project.name}
        </h2>
        <p class="text-lg leading-[1.7]">{project.description}</p>
        <ul class="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Chip key={tag} variant="wash">
              {tag}
            </Chip>
          ))}
        </ul>
        <Button href={project.link} variant="ink" class="mt-1.5 self-start">
          Open {project.name} on GitHub
          <ArrowUpRightIcon />
        </Button>
      </div>
    </article>
  </section>
);
