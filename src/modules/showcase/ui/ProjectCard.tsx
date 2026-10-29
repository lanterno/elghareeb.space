import { ExternalLink } from "~/platform/ui";

import type { Project } from "../model";
import type { JSXOutput } from "@builder.io/qwik";

/** One project in a row: its cover on the tone's tint, then the short version. */
export const ProjectCard = ({ project }: { project: Project }): JSXOutput => (
  <li data-tone={project.tone}>
    <ExternalLink
      href={project.link}
      class="flex h-full flex-col overflow-hidden rounded-card bg-panel text-ink shadow-hair transition-transform hover:-translate-y-1"
    >
      <span class="flex h-[200px] flex-col justify-between bg-tone-tint p-6">
        <span class="text-[13px] font-bold text-tone-ink">{project.source}</span>
        <span
          aria-hidden="true"
          class="font-display text-[56px] font-extrabold leading-none tracking-[-0.03em] text-tone-ink"
        >
          {project.cover}
        </span>
      </span>
      <span class="flex flex-1 flex-col gap-2.5 p-6">
        <span class="font-display text-[19px] font-extrabold">{project.name}</span>
        <span class="flex-1 text-[15px] leading-[1.7] text-ink-muted">{project.description}</span>
        <span class="text-[13px] text-ink-muted">{project.tags.join(" · ")}</span>
        <span class="text-sm font-bold text-tone-ink">
          Open on GitHub <span aria-hidden="true">→</span>
        </span>
      </span>
    </ExternalLink>
  </li>
);
