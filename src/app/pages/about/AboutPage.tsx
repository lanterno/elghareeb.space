import { component$ } from "@builder.io/qwik";

import ImgPortrait from "~/media/hero.jpg?aspect=4:5&jsx";
import { certifications, education, skillGroups } from "~/modules/career";
import { yearSpan } from "~/platform/kernel";
import { pageHead } from "~/platform/seo";
import { Chip, ClosingScene, LiveDot, PageHeader, SectionHeading } from "~/platform/ui";

import type { DocumentHead } from "@builder.io/qwik-city";

/** /about/ — who I am, the toolkit and what I keep learning */
export default component$(() => {
  return (
    <>
      <PageHeader title="Hi, I’m Ahmed." layout="split">
        <p q:slot="body" class="max-w-[30em] text-xl leading-relaxed md:text-[21px]">
          I build software with real-world stakes: the environmental footprint of IT at Resilio,
          Switzerland’s national E-ID at EPFL, and fintech and e-commerce at scale before that. At
          Resilio I lead the platform’s architecture, and by pairing AI agents with careful design,
          I push forward faster than ever before while maintaining the same quality or better.
        </p>
        <p q:slot="body" class="max-w-[36em] text-[17px] leading-[1.8] text-ink-sky">
          Beyond code, I care about climate tech and sustainable IT. As a Climatebase Fellow I
          explored where technology meets sustainability in energy, transportation and agriculture,
          and I started a working group on Sustainable IT at EPFL.
        </p>
        <p q:slot="body" class="max-w-[36em] text-[17px] leading-[1.8] text-ink-sky">
          I studied computer engineering at Mansoura University, then spent four years on an MITx
          MicroMasters in statistics and data science alongside work. Success is not a coincidence,
          and neither are good systems.
        </p>
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
            <LiveDot />
            Open to collaborate
          </p>
        </div>
      </PageHeader>

      {/* Toolkit */}
      <section aria-labelledby="toolkit-title" class="wrap flex flex-col gap-6 pt-24">
        <SectionHeading
          id="toolkit-title"
          title="What I work with."
          lede="Python and Django for most backends; TypeScript and Rust where cryptography meets the browser."
        />
        <ul class="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <li
              key={group.category}
              data-tone={group.tone}
              class="flex flex-col gap-4 rounded-card bg-tone-tint p-[26px]"
            >
              <h3 class="text-xl text-tone-ink">{group.category}</h3>
              <ul class="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Chip key={item} variant="panel">
                    {item}
                  </Chip>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Learning */}
      <section
        aria-labelledby="learning-title"
        class="wrap flex flex-col gap-6 pt-24 md:pt-[110px]"
      >
        <SectionHeading id="learning-title" title="Still learning." />
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

      <ClosingScene
        title="Let’s talk."
        body="Digital identity, sustainability or IoT — LinkedIn is the quickest way to reach me."
      />
    </>
  );
});

export const head: DocumentHead = pageHead({
  title: "About",
  description:
    "Software engineer in Renens, Switzerland, drawn to problems where the software has to be right. Climatebase Fellow, MITx MicroMasters in statistics and data science.",
  path: "/about/",
});
