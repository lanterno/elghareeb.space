import { Link } from "@builder.io/qwik-city";

import { type ContributionCalendar, GitHubCard } from "~/modules/activity";
import { currentRole, organizations, yearsOfExperience } from "~/modules/career";
import { projectCount } from "~/modules/showcase";
import { LiveDot, SectionHeading } from "~/platform/ui";

import type { JSXOutput } from "@builder.io/qwik";
import type { Tone } from "~/platform/kernel";

const role = currentRole();
const employer = organizations[role.org];

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
    tone: employer.tone,
    label: "Right now",
    figure: employer.name,
    line: "making environmental impact measurable",
    cta: "What I do there",
    live: true,
  },
  {
    href: "/projects/",
    tone: "coral",
    label: "Open source",
    figure: String(projectCount()),
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

interface ShortVersionProps {
  /** `null` when the build couldn't read GitHub */
  activity: ContributionCalendar | null;
}

/** Four doors into the rest of the site, and the GitHub card under them. */
export const ShortVersion = ({ activity }: ShortVersionProps): JSXOutput => (
  <section aria-labelledby="short-title" class="wrap flex flex-col gap-[30px] pt-20 md:pt-[110px]">
    <SectionHeading
      id="short-title"
      title="The short version."
      size="lg"
      lede="Identity, climate and scale — three domains where getting it wrong isn’t an option."
      ledeClass="max-w-[26em] text-lg"
    />
    <div class="flex flex-col gap-3 sm:gap-[18px]">
      <ul class="grid grid-cols-2 gap-3 sm:gap-[18px] lg:grid-cols-4">
        {tiles.map((tile) => (
          <li key={tile.label} data-tone={tile.tone ?? undefined}>
            <Link
              href={tile.href}
              class={[
                "flex h-full min-h-[200px] flex-col gap-2 rounded-tile p-[18px] text-ink transition-transform hover:-translate-y-1 sm:min-h-[240px] sm:gap-2.5 sm:rounded-card sm:p-[26px] lg:min-h-[280px]",
                tile.tone === null ? "bg-panel shadow-raised" : "bg-tone-tint",
              ]}
            >
              <span class="inline-flex items-center gap-2 text-[13px] font-bold text-tone-ink sm:text-sm">
                {tile.live && <LiveDot class="h-[9px] w-[9px] [--dot:var(--tone)]" />}
                {tile.label}
              </span>
              <span class="mt-auto font-display text-[32px] font-extrabold leading-[0.95] tracking-[-0.04em] text-tone-ink sm:text-[52px]">
                {tile.figure}
              </span>
              <span class="text-sm font-bold leading-snug sm:text-base">{tile.line}</span>
              <span class="text-[13px] font-bold text-tone-ink sm:text-sm">
                {tile.cta} <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <GitHubCard activity={activity} />
    </div>
  </section>
);
