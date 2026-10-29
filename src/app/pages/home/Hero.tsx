import ImgHero from "~/media/hero.jpg?aspect=1:1&jsx";
import {
  AffiliationRows,
  ConferenceBalloons,
  currentRole,
  highlights,
  organizations,
  OrgMark,
} from "~/modules/career";
import { isoToday } from "~/platform/kernel";
import { HeroGround, SatelliteOrbit } from "~/platform/scenery";
import { ArrowRightIcon, Button, ExternalLink, LiveDot } from "~/platform/ui";

import type { JSXOutput } from "@builder.io/qwik";

/**
 * Where each highlight sits around the portrait on a desktop, and how it bobs: each pops in, then
 * bobs at its own pace so they never move in step (the second delay and duration are the bob's).
 */
const highlightPlaces = [
  { place: "lg:left-[-10px] lg:top-[70px]", motion: { animationDelay: "0.75s, 0s" } },
  {
    place: "lg:right-[-28px] lg:top-[63%]",
    motion: { animationDelay: "0.9s, -2.4s", animationDuration: "0.6s, 8.5s" },
  },
  {
    place: "lg:bottom-[60px] lg:left-[10px]",
    motion: { animationDelay: "1.05s, -4.8s", animationDuration: "0.6s, 10s" },
  },
] as const;

const role = currentRole();
const employer = organizations[role.org];

/** The opening scene: the promise, the portrait with its facts, the organisations and the ground. */
export const Hero = (): JSXOutput => {
  const today = isoToday();
  // Fills the screen below the 76/80px header, plus the 18px the skills band tucks under
  return (
    <section
      aria-labelledby="hero-title"
      class="relative flex min-h-[calc(100svh-58px)] flex-col justify-center pb-[150px] md:min-h-[calc(100svh-62px)] lg:pb-[130px]"
    >
      <div class="wrap grid items-center gap-6 pt-10 lg:grid-cols-[7fr_5fr] lg:gap-8 lg:pt-3">
        {/* Arrives in reading order; "trust." lands last */}
        <div class="@container flex min-w-0 flex-col gap-5 lg:gap-[clamp(16px,2.4svh,28px)]">
          <p class="inline-flex items-center gap-2.5 self-start rounded-full bg-panel/94 py-2 pl-3 pr-4 text-sm font-bold text-leaf-ink shadow-hair motion-safe:animate-rise">
            <LiveDot pulse />
            Open to collaborate on digital identity, climate and IoT
          </p>
          <h1
            id="hero-title"
            class="text-[clamp(52px,min(7.4vw,9.5svh,12.8cqi),104px)] leading-[0.98] tracking-[-0.025em] motion-safe:animate-rise"
            style={{ animationDelay: "70ms" }}
          >
            I build software people can{" "}
            <span class="inline-block -rotate-[2.5deg] rounded-[0.28em] bg-panel px-[0.18em] pb-[0.06em] shadow-raised motion-safe:animate-stamp">
              trust.
            </span>
          </h1>
          <p
            class="max-w-[30em] text-lg leading-relaxed text-ink-sky motion-safe:animate-rise md:text-xl"
            style={{ animationDelay: "140ms" }}
          >
            Staff Software Engineer at{" "}
            <ExternalLink href={employer.url} class="text-link">
              {employer.name}
            </ExternalLink>
            , building climate accountability software. Before that, three years on Switzerland’s
            digital identity at EPFL.
          </p>
          <div
            class="flex flex-wrap gap-3 motion-safe:animate-rise"
            style={{ animationDelay: "210ms" }}
          >
            <Button
              href="#talk"
              variant="sun"
              class="[&_svg]:transition-[translate] motion-safe:hover:[&_svg]:translate-x-[3px]"
            >
              Start a conversation
              <ArrowRightIcon />
            </Button>
            <Button href="/work/" variant="panel">
              See my work
            </Button>
          </div>
          <div
            class="grid grid-cols-[minmax(0,1fr)] gap-y-0.5 pt-1 motion-safe:animate-rise lg:grid-cols-[max-content_minmax(0,1fr)] lg:items-center lg:gap-x-3.5 lg:gap-y-1.5"
            style={{ animationDelay: "280ms" }}
          >
            <AffiliationRows />
          </div>
        </div>

        {/* Phones: a small portrait with the facts stacked beside it. Desktop: they float around it */}
        <div class="relative order-first flex items-center gap-3.5 lg:order-none lg:grid lg:min-h-[min(520px,62svh)] lg:place-items-center">
          <div
            aria-hidden="true"
            class="sun-glow absolute hidden h-[560px] w-[560px] rounded-full motion-safe:animate-glow lg:block"
          />
          <SatelliteOrbit />
          <ImgHero
            alt="Ahmed Elghareeb, smiling, in green glasses and a white shirt"
            loading="eager"
            sizes="(min-width: 1024px) 400px, 104px"
            class="relative aspect-square w-[104px] shrink-0 rounded-full border-[5px] border-panel object-cover shadow-raised motion-safe:animate-appear lg:w-[min(400px,46svh)] lg:border-[10px]"
          />
          <div class="flex min-w-0 flex-col items-start gap-1.5 lg:contents">
            {highlights.map((fact, i) => {
              const org = organizations[fact.org];
              const { place, motion } = highlightPlaces[i] ?? highlightPlaces[0];
              return (
                <ExternalLink
                  key={fact.label}
                  href={org.url}
                  data-tone={org.tone}
                  class={[
                    "inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-panel px-3 py-[7px] text-[13px] font-bold leading-[1.3] text-ink shadow-raised transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lifted motion-safe:animate-pop lg:absolute lg:gap-2.5 lg:px-[18px] lg:py-3 lg:text-sm lg:motion-safe:animate-pop-bob",
                    place,
                  ]}
                  style={motion}
                >
                  <OrgMark org={fact.org} class="h-[1.15em] text-tone-ink" />
                  {fact.label}
                </ExternalLink>
              );
            })}
          </div>
        </div>
      </div>

      <ConferenceBalloons today={today} />
      <HeroGround />
    </section>
  );
};
