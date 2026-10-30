import { formatDuration, formatPeriod, isCurrent, live, periodYears } from "~/platform/kernel";
import { Chip, ExternalLink, SectionHeading } from "~/platform/ui";

import { experiences, organizations } from "../content";

import type { JSXOutput } from "@builder.io/qwik";

/** Every role, most recent first, with its years set large in the organisation's tone. */
export const Chapters = (): JSXOutput => (
  <section aria-labelledby="chapters-title" class="wrap flex flex-col gap-7 pt-24 md:pt-[120px]">
    <SectionHeading id="chapters-title" title="Chapters." />
    <ol class="flex flex-col border-b border-ink/9">
      {experiences.map((experience, index) => {
        const org = organizations[experience.org];
        const years = periodYears(experience);
        return (
          <li
            key={experience.org}
            data-tone={org.tone}
            class={[
              "grid gap-x-10 gap-y-4 py-9 md:grid-cols-[240px_minmax(0,1fr)]",
              index === 0 ? "border-t-2 border-ink" : "border-t border-ink/9",
            ]}
          >
            <div class="flex flex-col gap-2">
              <p class="font-display text-[52px] font-extrabold leading-none tracking-[-0.03em] text-tone-ink tabular-nums md:text-[60px]">
                {years.from}
                {years.to !== null && <span class="text-[22px] text-ink-muted"> → {years.to}</span>}
              </p>
              <p class="text-sm text-ink-muted">
                {formatPeriod(experience)} ·{" "}
                <span {...(isCurrent(experience) ? live.duration(experience.start) : {})}>
                  {formatDuration(experience)}
                </span>
              </p>
              {isCurrent(experience) && (
                <p class="self-start rounded-full bg-tone-tint px-3 py-1.5 text-[13px] font-bold text-tone-ink">
                  Current
                </p>
              )}
            </div>
            <div class="flex min-w-0 flex-col gap-3">
              <h3 class="text-2xl leading-tight md:text-[28px]">{experience.title}</h3>
              <p class="text-base text-ink-muted">
                <ExternalLink href={org.url} class="text-link">
                  {"fullName" in org ? org.fullName : org.name}
                </ExternalLink>{" "}
                · {experience.location} · {experience.type}
              </p>
              <p class="max-w-[40em] text-[17px] leading-[1.75]">{experience.description}</p>
              <ul class="flex flex-wrap gap-2 pt-1">
                {experience.skills.map((skill) => (
                  <Chip key={skill} variant="wash">
                    {skill}
                  </Chip>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  </section>
);
