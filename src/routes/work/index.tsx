import { component$ } from "@builder.io/qwik";

import { DomainTabs } from "~/components/domain-tabs/DomainTabs";
import { PageHeader } from "~/components/page-header/PageHeader";
import { pageHead } from "~/components/router-head/page-head";
import { TalkCard } from "~/components/talk-card/TalkCard";
import {
  experiences,
  experienceYears,
  formatDuration,
  formatPeriod,
  isCurrent,
} from "~/data/portfolio";
import { toneClasses } from "~/data/tones";

import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <PageHeader
        title="Work that has to be right."
        intro="A marketplace’s infrastructure, a country’s digital identity, a company’s environmental numbers. Here’s where I’ve been, and what I did there."
      />

      <DomainTabs />

      {/* Chapters */}
      <section
        aria-labelledby="chapters-title"
        class="wrap flex flex-col gap-7 pt-24 md:pt-[120px]"
      >
        <h2
          id="chapters-title"
          class="text-[clamp(36px,4.4vw,56px)] leading-none tracking-[-0.02em]"
        >
          Chapters.
        </h2>
        <ol class="flex flex-col border-b border-ink/9">
          {experiences.map((experience, index) => {
            const tone = toneClasses[experience.tone];
            const years = experienceYears(experience);
            return (
              <li
                key={experience.company}
                class={[
                  "grid gap-x-10 gap-y-4 py-9 md:grid-cols-[240px_minmax(0,1fr)]",
                  index === 0 ? "border-t-2 border-ink" : "border-t border-ink/9",
                ]}
              >
                <div class="flex flex-col gap-2">
                  <p
                    class={[
                      "font-display text-[52px] font-extrabold leading-none tracking-[-0.03em] tabular-nums md:text-[60px]",
                      tone.ink,
                    ]}
                  >
                    {years.from}
                    {years.to !== null && (
                      <span class="text-[22px] text-ink-muted"> → {years.to}</span>
                    )}
                  </p>
                  <p class="text-sm text-ink-muted">
                    {formatPeriod(experience)} · {formatDuration(experience)}
                  </p>
                  {isCurrent(experience) && (
                    <p
                      class={[
                        "self-start rounded-full px-3 py-1.5 text-[13px] font-bold",
                        tone.tint,
                        tone.ink,
                      ]}
                    >
                      Current
                    </p>
                  )}
                </div>
                <div class="flex min-w-0 flex-col gap-3">
                  <h3 class="text-2xl leading-tight md:text-[28px]">{experience.title}</h3>
                  <p class="text-base text-ink-muted">
                    {"companyUrl" in experience ? (
                      <a
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="font-bold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                      >
                        {experience.company}
                      </a>
                    ) : (
                      <span class="font-bold text-ink">{experience.company}</span>
                    )}{" "}
                    · {experience.location} · {experience.type}
                  </p>
                  <p class="max-w-[40em] text-[17px] leading-[1.75]">{experience.description}</p>
                  <ul class="flex flex-wrap gap-2 pt-1">
                    {experience.skills.map((skill) => (
                      <li key={skill} class="rounded-full bg-wash/16 px-3 py-1.5 text-[13px]">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <TalkCard
        title="Have something that has to be right?"
        body="I’m open to collaborating on digital identity, sustainability and IoT."
      />
    </>
  );
});

export const head: DocumentHead = pageHead({
  title: "Work | Ahmed Elghareeb",
  description:
    "Digital identity at EPFL, climate accountability at Resilio, cloud systems at Back Market: where I’ve worked, and what I built there.",
  path: "/work/",
});
