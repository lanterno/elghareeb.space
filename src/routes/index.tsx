import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";

import { GitHubCard } from "~/components/github-card/GitHubCard";
import { Hills } from "~/components/hills/Hills";
import { ArrowRightIcon } from "~/components/icons";
import { pageHead } from "~/components/router-head/page-head";
import { SkillsMarquee } from "~/components/skills-marquee/SkillsMarquee";
import { TalkCard } from "~/components/talk-card/TalkCard";
import { loadGitHubActivity } from "~/data/github";
import { githubLogin, projects, yearsOfExperience } from "~/data/portfolio";
import { type Tone, toneClasses } from "~/data/tones";
import ImgHero from "~/media/hero.jpg?aspect=1:1&jsx";

import type { DocumentHead } from "@builder.io/qwik-city";

const floatingChips = [
  {
    label: "Staff engineer · Resilio",
    tone: "teal",
    place: "left-[-10px] top-[70px] hidden lg:inline-flex",
    delay: "",
  },
  {
    label: "3 years on Swiss E-ID",
    tone: "blue",
    place: "right-0 bottom-3 inline-flex lg:right-[-16px] lg:top-[210px] lg:bottom-auto",
    delay: "[animation-delay:-2s]",
  },
  {
    label: "Climatebase Fellow",
    tone: "lavender",
    place: "left-[10px] bottom-[60px] hidden lg:inline-flex",
    delay: "[animation-delay:-4s]",
  },
] as const satisfies readonly { label: string; tone: Tone; place: string; delay: string }[];

const builtAt = ["Resilio", "EPFL · C4DT", "Back Market", "Climatebase"] as const;

interface Tile {
  href: string;
  /** `null` for a plain panel that isn't tied to one organisation */
  tone: Tone | null;
  label: string;
  figure: string;
  line: string;
  cta: string;
  live: boolean;
}

const tiles: readonly Tile[] = [
  {
    href: "/work/",
    tone: null,
    label: "Experience",
    figure: `${String(yearsOfExperience())} yrs`,
    line: "building software, from startups to research labs",
    cta: "Read the chapters",
    live: false,
  },
  {
    href: "/work/",
    tone: "teal",
    label: "Right now",
    figure: "Resilio",
    line: "making environmental impact measurable",
    cta: "What I do there",
    live: true,
  },
  {
    href: "/projects/",
    tone: "coral",
    label: "Open source",
    figure: String(projects.length),
    line: "projects built in the open",
    cta: "See the projects",
    live: false,
  },
  {
    href: "/about/",
    tone: "lavender",
    label: "Climatebase · 2024",
    figure: "Fellow",
    line: "climate tech and sustainable IT",
    cta: "More about me",
    live: false,
  },
];

/** Runs while the site is built, so visitors never wait on GitHub */
export const useGitHubActivity = routeLoader$(({ env }) =>
  loadGitHubActivity(githubLogin, env.get("GITHUB_TOKEN"))
);

export default component$(() => {
  const gitHubActivity = useGitHubActivity();
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" class="relative pb-[150px]">
        <div class="wrap grid items-center gap-8 pt-10 md:pt-[72px] lg:grid-cols-[7fr_5fr]">
          <div class="flex min-w-0 flex-col gap-7">
            <p class="inline-flex items-center gap-2.5 self-start rounded-full bg-panel/94 py-2 pl-3 pr-4 text-sm font-bold text-leaf-ink shadow-hair">
              <span
                aria-hidden="true"
                class="h-2.5 w-2.5 shrink-0 rounded-full bg-leaf shadow-[0_0_0_4px_rgb(62_141_83/0.18)]"
              />
              Open to collaborate on digital identity, climate and IoT
            </p>
            <h1
              id="hero-title"
              class="text-[clamp(52px,7.4vw,104px)] leading-[0.98] tracking-[-0.025em]"
            >
              I build software people can{" "}
              <span class="inline-block -rotate-[2.5deg] rounded-[0.28em] bg-panel px-[0.18em] pb-[0.06em] shadow-raised">
                trust.
              </span>
            </h1>
            <p class="max-w-[30em] text-lg leading-relaxed text-ink-sky md:text-xl">
              Staff Software Engineer at{" "}
              <a
                href="https://resilio.tech"
                target="_blank"
                rel="noopener noreferrer"
                class="font-bold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                Resilio
              </a>
              , building climate accountability software. Before that, three years on Switzerland’s
              digital identity at EPFL.
            </p>
            <div class="flex flex-wrap gap-3">
              <a
                href="#talk"
                class="inline-flex min-h-14 items-center gap-2.5 rounded-full bg-sun px-7 text-base font-bold text-ink shadow-sun transition-transform hover:-translate-y-0.5"
              >
                Start a conversation
                <ArrowRightIcon />
              </a>
              <Link
                href="/work/"
                class="inline-flex min-h-14 items-center rounded-full bg-panel/94 px-[26px] text-base font-bold text-ink transition-colors hover:bg-panel"
              >
                See my work
              </Link>
            </div>
            <div class="flex flex-wrap items-center gap-x-[26px] gap-y-2.5 pt-2 text-ink-sky">
              <span class="text-sm">Built at</span>
              <ul class="contents">
                {builtAt.map((name) => (
                  <li key={name} class="font-display text-[19px] font-extrabold">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div class="relative order-first grid min-h-[290px] place-items-center lg:order-none lg:min-h-[520px]">
            <div
              aria-hidden="true"
              class="sun-glow absolute h-[340px] w-[340px] rounded-full lg:h-[560px] lg:w-[560px]"
            />
            <ImgHero
              alt="Ahmed Elghareeb, smiling, in green glasses and a white shirt"
              loading="eager"
              sizes="(min-width: 1024px) 400px, 230px"
              class="relative aspect-square w-[230px] rounded-full border-8 border-panel object-cover shadow-raised lg:w-[400px] lg:border-[10px]"
            />
            {floatingChips.map((chip) => (
              <span
                key={chip.label}
                class={[
                  "absolute items-center gap-2.5 rounded-full bg-panel px-[18px] py-3 text-sm font-bold shadow-raised motion-safe:animate-bob",
                  chip.place,
                  chip.delay,
                ]}
              >
                <span
                  aria-hidden="true"
                  class={["h-2.5 w-2.5 rounded-full", toneClasses[chip.tone].dot]}
                />
                {chip.label}
              </span>
            ))}
          </div>
        </div>
        <Hills class="h-[110px] md:h-[190px]" />
      </section>

      <SkillsMarquee />

      {/* The short version: four doors into the rest of the site */}
      <section
        aria-labelledby="short-title"
        class="wrap flex flex-col gap-[30px] pt-20 md:pt-[110px]"
      >
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 id="short-title" class="text-[clamp(38px,5vw,60px)] leading-none tracking-[-0.02em]">
            The short version.
          </h2>
          <p class="max-w-[26em] text-lg leading-relaxed text-ink-sky">
            Identity, climate and scale — three domains where getting it wrong isn’t an option.
          </p>
        </div>
        <div class="flex flex-col gap-3 sm:gap-[18px]">
          <ul class="grid grid-cols-2 gap-3 sm:gap-[18px] lg:grid-cols-4">
            {tiles.map((tile) => {
              const ink = tile.tone === null ? "text-ink" : toneClasses[tile.tone].ink;
              return (
                <li key={tile.label}>
                  <Link
                    href={tile.href}
                    class={[
                      "flex h-full min-h-[200px] flex-col gap-2 rounded-tile p-[18px] text-ink transition-transform hover:-translate-y-1 sm:min-h-[240px] sm:gap-2.5 sm:rounded-card sm:p-[26px] lg:min-h-[280px]",
                      tile.tone === null ? "bg-panel shadow-raised" : toneClasses[tile.tone].tint,
                    ]}
                  >
                    <span
                      class={[
                        "inline-flex items-center gap-2 text-[13px] font-bold sm:text-sm",
                        ink,
                      ]}
                    >
                      {tile.live && tile.tone !== null && (
                        <span
                          aria-hidden="true"
                          class={[
                            "h-[9px] w-[9px] rounded-full shadow-[0_0_0_4px_rgb(46_156_148/0.2)]",
                            toneClasses[tile.tone].dot,
                          ]}
                        />
                      )}
                      {tile.label}
                    </span>
                    <span
                      class={[
                        "mt-auto font-display text-[32px] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-[52px]",
                        ink,
                      ]}
                    >
                      {tile.figure}
                    </span>
                    <span class="text-sm font-bold leading-snug sm:text-base">{tile.line}</span>
                    <span class={["text-[13px] font-bold sm:text-sm", ink]}>
                      {tile.cta} <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <GitHubCard activity={gitHubActivity.value} />
        </div>
      </section>

      <TalkCard
        eyebrow="The day’s almost done. Your project isn’t."
        title="Let’s build something people can trust."
        body="Digital identity, climate software or IoT — if it has to be right, I’d like to hear about it."
      />
    </>
  );
});

export const head: DocumentHead = pageHead({
  title: "Ahmed Elghareeb | Staff Software Engineer",
  description:
    "Staff Software Engineer at Resilio, building climate accountability software. Before that, three years on Switzerland’s digital identity at EPFL’s Center for Digital Trust. Open to collaborate on digital identity, climate and IoT.",
  path: "/",
});
