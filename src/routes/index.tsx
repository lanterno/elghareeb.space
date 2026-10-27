import { component$, Fragment } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";

import { GitHubCard } from "~/components/github-card/GitHubCard";
import { HeroGround, SatelliteOrbit } from "~/components/hero-scene/HeroScene";
import { ArrowRightIcon } from "~/components/icons";
import { type Org, OrgMark } from "~/components/org-mark/OrgMark";
import { pageHead } from "~/components/router-head/page-head";
import { SkillsMarquee } from "~/components/skills-marquee/SkillsMarquee";
import { TalkCard } from "~/components/talk-card/TalkCard";
import { loadGitHubActivity } from "~/data/github";
import {
  conferences,
  formatDays,
  githubLogin,
  projects,
  yearsOfExperience,
} from "~/data/portfolio";
import { type Tone, toneClasses } from "~/data/tones";
import ImgHero from "~/media/hero.jpg?aspect=1:1&jsx";

import type { DocumentHead } from "@builder.io/qwik-city";

/**
 * Every organisation the hero links to. `mark` is the logo's height beside the name, which evens
 * out their shapes. EPFL's logo is its name, so its entry names only the lab.
 */
const orgs = {
  archetype: {
    name: "Archetype",
    href: "https://github.com/archetype-pal",
    tone: "coral",
    mark: "h-[1.05em]",
  },
  backMarket: {
    name: "Back Market",
    href: "https://www.backmarket.com",
    tone: "orange",
    mark: "h-[1em]",
  },
  climatebase: {
    name: "Climatebase",
    href: "https://climatebase.org",
    tone: "lavender",
    mark: "h-[1em]",
  },
  epfl: { name: "C4DT", href: "https://c4dt.epfl.ch", tone: "blue", mark: "h-[0.8em]" },
  lifePete: { name: "LifePete", href: "https://lifepete.com", tone: "orange", mark: "h-[1em]" },
  resilio: { name: "Resilio", href: "https://resilio.tech", tone: "teal", mark: "h-[1em]" },
  transparium: {
    name: "Transparium",
    href: "https://transparium.com",
    tone: "blue",
    mark: "h-[0.8em]",
  },
} as const satisfies Record<Org, { name: string; href: string; tone: Tone; mark: string }>;

/**
 * The three facts around the portrait. On a desktop each pops in, then bobs at its own pace so they
 * never move in step: the second delay and duration are the bob's.
 */
const facts = [
  {
    label: "Staff engineer · Resilio",
    org: "resilio",
    place: "lg:left-[-10px] lg:top-[70px]",
    motion: { animationDelay: "0.75s, 0s" },
  },
  {
    label: "Founder at lifepete.com",
    org: "lifePete",
    place: "lg:right-[-28px] lg:top-[63%]",
    motion: { animationDelay: "0.9s, -2.4s", animationDuration: "0.6s, 8.5s" },
  },
  {
    label: "Climatebase Fellow",
    org: "climatebase",
    place: "lg:bottom-[60px] lg:left-[10px]",
    motion: { animationDelay: "1.05s, -4.8s", animationDuration: "0.6s, 10s" },
  },
] as const satisfies readonly {
  label: string;
  org: Org;
  place: string;
  motion: { animationDelay: string; animationDuration?: string };
}[];

const orgRows = [
  { label: "Also building at:", orgs: ["resilio", "transparium", "lifePete", "archetype"] },
  { label: "Built before:", orgs: ["epfl", "backMarket"] },
] as const satisfies readonly { label: string; orgs: readonly Org[] }[];

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
    line: "in backend and DevOps, from startups to research labs",
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
  const today = new Date().toISOString().slice(0, 10);
  const conferencesAhead = conferences.filter((conference) => conference.last >= today);
  return (
    <>
      {/* Hero: fills the screen below the 76/80px header, plus the 18px the skills band tucks under */}
      <section
        aria-labelledby="hero-title"
        class="relative flex min-h-[calc(100svh-58px)] flex-col justify-center pb-[150px] md:min-h-[calc(100svh-62px)] lg:pb-[130px]"
      >
        <div class="wrap grid items-center gap-6 pt-10 lg:grid-cols-[7fr_5fr] lg:gap-8 lg:pt-3">
          {/* Arrives in reading order; "trust." lands last */}
          <div class="@container flex min-w-0 flex-col gap-5 lg:gap-[clamp(16px,2.4svh,28px)]">
            <p class="inline-flex items-center gap-2.5 self-start rounded-full bg-panel/94 py-2 pl-3 pr-4 text-sm font-bold text-leaf-ink shadow-hair motion-safe:animate-rise">
              <span
                aria-hidden="true"
                class="h-2.5 w-2.5 shrink-0 rounded-full bg-leaf shadow-[0_0_0_4px_rgb(62_141_83/0.18)] motion-safe:animate-live"
              />
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
              <a
                href={orgs.resilio.href}
                target="_blank"
                rel="noopener noreferrer"
                class="font-bold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                Resilio
              </a>
              , building climate accountability software. Before that, three years on Switzerland’s
              digital identity at EPFL.
            </p>
            <div
              class="flex flex-wrap gap-3 motion-safe:animate-rise"
              style={{ animationDelay: "210ms" }}
            >
              <a
                href="#talk"
                class="inline-flex min-h-14 items-center gap-2.5 rounded-full bg-sun px-7 text-base font-bold text-ink shadow-sun transition-transform hover:-translate-y-0.5 [&_svg]:transition-[translate] motion-safe:hover:[&_svg]:translate-x-[3px]"
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
            <div
              class="grid grid-cols-[minmax(0,1fr)] gap-y-0.5 pt-1 motion-safe:animate-rise lg:grid-cols-[max-content_minmax(0,1fr)] lg:items-center lg:gap-x-3.5 lg:gap-y-1.5"
              style={{ animationDelay: "280ms" }}
            >
              {orgRows.map((row) => (
                <Fragment key={row.label}>
                  <span class="mt-1.5 text-sm text-ink-sky lg:mt-0">{row.label}</span>
                  <ul class="-ml-2.5 flex flex-wrap gap-x-0.5">
                    {row.orgs.map((id) => {
                      const org = orgs[id];
                      return (
                        <li key={id}>
                          <a
                            href={org.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-[7px] rounded-full px-2.5 py-[5px] font-display text-[15px] font-bold text-ink transition-colors hover:bg-panel/80 lg:text-[17px]"
                          >
                            <OrgMark org={id} class={[org.mark, toneClasses[org.tone].ink]} />
                            {org.name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </Fragment>
              ))}
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
              {facts.map((fact) => (
                <a
                  key={fact.label}
                  href={orgs[fact.org].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class={[
                    "inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-panel px-3 py-[7px] text-[13px] font-bold leading-[1.3] text-ink shadow-raised transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lifted motion-safe:animate-pop lg:absolute lg:gap-2.5 lg:px-[18px] lg:py-3 lg:text-sm lg:motion-safe:animate-pop-bob",
                    fact.place,
                  ]}
                  style={fact.motion}
                >
                  <OrgMark
                    org={fact.org}
                    class={["h-[1.15em]", toneClasses[orgs[fact.org].tone].ink]}
                  />
                  {fact.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Phones: a row under the logos. Desktop: floating like balloons in the sky, top right */}
        {conferencesAhead.length > 0 && (
          <div class="wrap flex flex-wrap items-center gap-x-3.5 gap-y-2.5 pt-[22px] lg:absolute lg:right-6 lg:top-2 lg:z-10 lg:m-0 lg:w-auto lg:max-w-none lg:flex-nowrap lg:items-start lg:gap-[18px] lg:p-0">
            <span class="basis-full text-sm text-ink-sky lg:-mt-5 lg:basis-auto lg:self-center lg:rounded-full lg:bg-panel/94 lg:px-3 lg:py-1.5 lg:text-[13px] lg:font-bold lg:text-ink lg:shadow-hair">
              Meet me at
            </span>
            {conferencesAhead.map(({ Logo, ...conference }, i) => (
              <a
                key={conference.name}
                href={conference.href}
                target="_blank"
                rel="noopener noreferrer"
                data-last={conference.last}
                class={[
                  "group inline-flex items-center gap-2.5 text-ink motion-safe:animate-pop lg:flex-col lg:gap-0 lg:text-center lg:motion-safe:animate-pop-float",
                  i % 2 === 1 && "lg:mt-[30px]",
                ]}
                style={{
                  animationDelay: `${String(1200 + i * 150)}ms, ${String(-1 - i * 4)}s`,
                  animationDuration: `600ms, ${String(9 + i * 2)}s`,
                }}
              >
                <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-panel shadow-raised transition-[translate,box-shadow] duration-200 group-hover:-translate-y-[3px] group-hover:shadow-lifted lg:h-[60px] lg:w-[60px]">
                  <Logo alt="" sizes="40px" class="block h-auto w-[62%]" />
                </span>
                <span class="flex flex-col text-[13px] leading-[1.3] lg:relative lg:-mt-1.5 lg:items-center lg:rounded-[14px] lg:bg-panel/94 lg:px-3 lg:pb-[7px] lg:pt-1.5 lg:text-xs lg:shadow-hair">
                  <strong class="font-bold">{conference.name}</strong>
                  <span class="inline-flex items-center gap-1.5 text-ink-sky">
                    {conference.first <= today && (
                      <span
                        aria-hidden="true"
                        class="h-2 w-2 shrink-0 rounded-full bg-leaf shadow-[0_0_0_3px_rgb(62_141_83/0.18)] motion-safe:animate-live"
                      />
                    )}
                    {conference.first <= today ? "Now" : conference.place} ·{" "}
                    {formatDays(conference.first, conference.last)}
                  </span>
                </span>
              </a>
            ))}
            {/* If the daily rebuild stops running, conferences that have ended since still disappear */}
            <script
              dangerouslySetInnerHTML={`(() => {
                const today = new Date().toISOString().slice(0, 10);
                const list = document.currentScript.parentElement;
                const links = [...list.querySelectorAll("[data-last]")];
                links.forEach((link) => { link.hidden = link.dataset.last < today; });
                list.hidden = links.every((link) => link.hidden);
              })()`}
            />
          </div>
        )}
        <HeroGround />
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
