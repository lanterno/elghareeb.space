import { component$ } from "@builder.io/qwik";

import { Hills } from "~/components/hills/Hills";
import { pageHead } from "~/components/router-head/page-head";
import { TalkCard } from "~/components/talk-card/TalkCard";
import { certifications, education, skills, yearSpan } from "~/data/portfolio";
import { toneClasses } from "~/data/tones";
import ImgPortrait from "~/media/hero.jpg?aspect=4:5&jsx";

import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <header class="relative pb-[130px]">
        <div class="wrap grid items-center gap-12 pt-14 md:pt-20 lg:grid-cols-[7fr_5fr]">
          <div class="flex flex-col gap-[22px]">
            <h1 class="text-[clamp(48px,7vw,96px)] leading-[0.98] tracking-[-0.025em]">
              Hi, I’m Ahmed.
            </h1>
            <p class="max-w-[30em] text-xl leading-relaxed md:text-[21px]">
              I’m a software engineer in Renens, Switzerland. I like the problems where the software
              has to be right — because money, identity or the planet depends on it.
            </p>
            <p class="max-w-[36em] text-[17px] leading-[1.8] text-ink-sky">
              Beyond code, I care about climate tech and sustainable IT. As a Climatebase Fellow I
              explored where technology meets sustainability in energy, transportation and
              agriculture, and I started a working group on Sustainable IT at EPFL.
            </p>
            <p class="max-w-[36em] text-[17px] leading-[1.8] text-ink-sky">
              I studied computer engineering at Mansoura University, then spent four years on an
              MITx MicroMasters in statistics and data science alongside work. Success is not a
              coincidence, and neither are good systems.
            </p>
          </div>
          <div class="relative grid place-items-center">
            <div
              aria-hidden="true"
              class="sun-glow absolute h-[420px] w-[420px] rounded-full lg:h-[520px] lg:w-[520px]"
            />
            <ImgPortrait
              alt="Ahmed Elghareeb, smiling, in green glasses and a white shirt"
              sizes="(min-width: 1024px) 380px, 80vw"
              class="relative aspect-[4/5] w-[min(380px,80vw)] rotate-2 rounded-[48px] border-[10px] border-panel object-cover shadow-raised"
            />
            <p class="absolute bottom-7 left-0 inline-flex items-center gap-2.5 rounded-full bg-panel px-[18px] py-3 text-sm font-bold text-leaf-ink shadow-raised">
              <span
                aria-hidden="true"
                class="h-2.5 w-2.5 rounded-full bg-leaf shadow-[0_0_0_4px_rgb(62_141_83/0.18)]"
              />
              Open to collaborate
            </p>
          </div>
        </div>
        <Hills class="h-[120px]" />
      </header>

      {/* Toolkit */}
      <section aria-labelledby="toolkit-title" class="wrap flex flex-col gap-6 pt-24">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="toolkit-title"
            class="text-[clamp(36px,4.4vw,56px)] leading-none tracking-[-0.02em]"
          >
            What I work with.
          </h2>
          <p class="max-w-[28em] text-[17px] leading-relaxed text-ink-sky">
            Python and Django for most backends; TypeScript and Rust where cryptography meets the
            browser.
          </p>
        </div>
        <ul class="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => {
            const tone = toneClasses[group.tone];
            return (
              <li
                key={group.category}
                class={["flex flex-col gap-4 rounded-card p-[26px]", tone.tint]}
              >
                <h3 class={["text-xl", tone.ink]}>{group.category}</h3>
                <ul class="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} class="rounded-full bg-panel px-[13px] py-[7px] text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Learning */}
      <section
        aria-labelledby="learning-title"
        class="wrap flex flex-col gap-6 pt-24 md:pt-[110px]"
      >
        <h2
          id="learning-title"
          class="text-[clamp(36px,4.4vw,56px)] leading-none tracking-[-0.02em]"
        >
          Still learning.
        </h2>
        <div class="grid gap-[18px] md:grid-cols-2">
          <ul class="rounded-card bg-panel px-8 py-2.5 shadow-hair">
            {education.map((item) => {
              const years = yearSpan(item.from, item.to);
              return (
                <li
                  key={item.institution}
                  class="flex gap-[22px] border-b border-ink/9 py-[26px] last:border-b-0"
                >
                  <p class="w-[92px] shrink-0 font-display text-[30px] font-extrabold leading-none text-ink-muted tabular-nums">
                    {years.from}
                    {years.to !== null && <span class="block text-lg">→ {years.to}</span>}
                  </p>
                  <div class="flex flex-col gap-1.5">
                    <h3 class="font-sans text-lg font-bold">{item.degree}</h3>
                    <p class="text-sm text-ink-muted">{item.institution}</p>
                    <p class="text-[15px] leading-[1.7]">{item.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <ul class="rounded-card bg-panel px-8 py-2.5 shadow-hair">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                class="flex items-center gap-[22px] border-b border-ink/9 py-6 last:border-b-0"
              >
                <p class="w-[92px] shrink-0 font-display text-[30px] font-extrabold leading-none text-ink-muted tabular-nums">
                  {cert.year}
                </p>
                <div class="flex flex-col gap-1">
                  <h3 class="font-sans text-[17px] font-bold">{cert.name}</h3>
                  <p class="text-sm text-ink-muted">{cert.org}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TalkCard
        title="Let’s talk."
        body="Digital identity, sustainability or IoT — LinkedIn is the quickest way to reach me."
      />
    </>
  );
});

export const head: DocumentHead = pageHead({
  title: "About | Ahmed Elghareeb",
  description:
    "Software engineer in Renens, Switzerland, drawn to problems where the software has to be right. Climatebase Fellow, MITx MicroMasters in statistics and data science.",
  path: "/about/",
});
