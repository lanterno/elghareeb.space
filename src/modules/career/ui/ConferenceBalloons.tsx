import { formatDays, type IsoDate } from "~/platform/kernel";
import { ExternalLink, LiveDot } from "~/platform/ui";

import { isHappening, upcomingConferences } from "../queries";

import type { JSXOutput } from "@builder.io/qwik";

interface ConferenceBalloonsProps {
  /** The build day; conferences that have ended by then are left out */
  today: IsoDate;
}

/**
 * "Meet me at": the conferences ahead. Phones show them in a row under the hero's logos; on a
 * desktop they float like balloons in the sky, top right.
 */
export const ConferenceBalloons = ({ today }: ConferenceBalloonsProps): JSXOutput | null => {
  const ahead = upcomingConferences(today);
  if (ahead.length === 0) return null;
  return (
    <div class="wrap flex flex-wrap items-center gap-x-3.5 gap-y-2.5 pt-[22px] lg:absolute lg:right-6 lg:top-2 lg:z-10 lg:m-0 lg:w-auto lg:max-w-none lg:flex-nowrap lg:items-start lg:gap-[18px] lg:p-0">
      <span class="basis-full text-sm text-ink-sky lg:-mt-5 lg:basis-auto lg:self-center lg:rounded-full lg:bg-panel/94 lg:px-3 lg:py-1.5 lg:text-[13px] lg:font-bold lg:text-ink lg:shadow-hair">
        Meet me at
      </span>
      {ahead.map(({ Logo, ...conference }, i) => {
        const now = isHappening(conference, today);
        return (
          <ExternalLink
            key={conference.name}
            href={conference.href}
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
                {now && <LiveDot pulse class="h-2 w-2 [--dot-ring:3px]" />}
                {now ? "Now" : conference.place} · {formatDays(conference.first, conference.last)}
              </span>
            </span>
          </ExternalLink>
        );
      })}
      {/* The site is only rebuilt on push, so conferences that end in between are hidden here */}
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
  );
};
