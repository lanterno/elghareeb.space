import { component$ } from "@builder.io/qwik";

import { ArrowUpRightIcon, CodeIcon } from "~/components/icons";
import { PageHeader } from "~/components/page-header/PageHeader";
import { pageHead } from "~/components/router-head/page-head";
import { TalkCard } from "~/components/talk-card/TalkCard";
import { links, projects } from "~/data/portfolio";
import { toneClasses } from "~/data/tones";

import type { DocumentHead } from "@builder.io/qwik-city";

const featured = projects.filter((project) => project.featured);
const others = projects.filter((project) => !project.featured);

export default component$(() => {
  return (
    <>
      <PageHeader
        title="Built in the open."
        intro="Three of these four answer one question: how do you prove who you are without giving yourself away? The fourth helps historians read the Middle Ages."
      >
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-panel/94 px-6 text-[15px] font-bold text-ink transition-colors hover:bg-panel"
        >
          <CodeIcon />
          Everything on GitHub
        </a>
      </PageHeader>

      {/* What I'm leading now */}
      {featured.map((project) => {
        const tone = toneClasses[project.tone];
        return (
          <section
            key={project.name}
            aria-labelledby={`featured-${project.cover}`}
            class="wrap pt-24"
          >
            <article class="grid overflow-hidden rounded-panel bg-panel shadow-raised md:grid-cols-2">
              <div
                class={[
                  "flex min-h-[260px] flex-col justify-between gap-6 p-8 md:min-h-[420px] md:p-10",
                  tone.tint,
                ]}
              >
                <p
                  class={[
                    "self-start rounded-full bg-panel px-3.5 py-2 text-sm font-bold",
                    tone.ink,
                  ]}
                >
                  {project.source}
                </p>
                <p
                  aria-hidden="true"
                  class={[
                    "font-display text-[clamp(52px,6.4vw,88px)] font-extrabold leading-[0.9] tracking-[-0.04em] break-words",
                    tone.ink,
                  ]}
                >
                  {project.cover}
                </p>
              </div>
              <div class="flex flex-col justify-center gap-[18px] p-8 md:p-11">
                <h2
                  id={`featured-${project.cover}`}
                  class="text-4xl leading-tight tracking-[-0.02em]"
                >
                  {project.name}
                </h2>
                <p class="text-lg leading-[1.7]">{project.description}</p>
                <ul class="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} class="rounded-full bg-wash/16 px-3 py-1.5 text-[13px]">
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-1.5 inline-flex min-h-[52px] items-center gap-2.5 self-start rounded-full bg-ink px-6 text-[15px] font-bold text-panel"
                >
                  Open {project.name} on GitHub
                  <ArrowUpRightIcon />
                </a>
              </div>
            </article>
          </section>
        );
      })}

      {/* The identity trilogy */}
      <section aria-labelledby="trilogy-title" class="wrap flex flex-col gap-[22px] pt-[72px]">
        <div class="flex flex-col gap-2">
          <h2
            id="trilogy-title"
            class="text-[clamp(32px,3.6vw,44px)] leading-[1.05] tracking-[-0.02em]"
          >
            The identity trilogy.
          </h2>
          <p class="max-w-[38em] text-[17px] leading-relaxed text-ink-sky">
            From the cryptographic primitives up to a workshop anyone can follow.
          </p>
        </div>
        <ul class="grid gap-[18px] lg:grid-cols-3">
          {others.map((project) => {
            const tone = toneClasses[project.tone];
            return (
              <li key={project.name}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-full flex-col overflow-hidden rounded-card bg-panel text-ink shadow-hair transition-transform hover:-translate-y-1"
                >
                  <span class={["flex h-[200px] flex-col justify-between p-6", tone.tint]}>
                    <span class={["text-[13px] font-bold", tone.ink]}>{project.source}</span>
                    <span
                      aria-hidden="true"
                      class={[
                        "font-display text-[56px] font-extrabold leading-none tracking-[-0.03em]",
                        tone.ink,
                      ]}
                    >
                      {project.cover}
                    </span>
                  </span>
                  <span class="flex flex-1 flex-col gap-2.5 p-6">
                    <span class="font-display text-[19px] font-extrabold">{project.name}</span>
                    <span class="flex-1 text-[15px] leading-[1.7] text-ink-muted">
                      {project.description}
                    </span>
                    <span class="text-[13px] text-ink-muted">{project.tags.join(" · ")}</span>
                    <span class={["text-sm font-bold", tone.ink]}>
                      Open on GitHub <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <TalkCard
        title="Want to build the next one together?"
        body="Open-source, research or a product with real stakes — I’d like to hear about it."
      />
    </>
  );
});

export const head: DocumentHead = pageHead({
  title: "Projects | Ahmed Elghareeb",
  description:
    "Open-source work: the archetype-pal rewrite for medieval manuscript research, and an identity trilogy from cryptographic primitives to Switzerland’s E-ID workshop.",
  path: "/projects/",
});
