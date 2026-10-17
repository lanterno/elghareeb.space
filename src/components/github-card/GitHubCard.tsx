import { component$ } from "@builder.io/qwik";

import { ArrowUpRightIcon, GitHubIcon } from "~/components/icons";
import { busiestWeek, type GitHubActivity } from "~/data/github";
import { formatDay, links, plural } from "~/data/portfolio";

interface GitHubCardProps {
  /** `null` when the build couldn't read the contribution calendar */
  activity: GitHubActivity | null;
}

function busiestLine(activity: GitHubActivity): string {
  const busiest = busiestWeek(activity);
  if (busiest === undefined || busiest.count === 0) return "Nothing public in the last year yet.";
  const count = plural(busiest.count, "contribution");
  if (busiest === activity.weeks.at(-1)) {
    return `This week is the busiest of the year, with ${count} so far.`;
  }
  return `The busiest was the week of ${formatDay(busiest.firstDay)}, with ${count}.`;
}

/** Square-root scale, so the quiet weeks stay visible beside a busy one */
function barHeight(count: number, max: number): string {
  if (count === 0) return "4%";
  return `${String(Math.max(10, Math.round(Math.sqrt(count / max) * 100)))}%`;
}

/**
 * Contributions per week over the last year: the total said first, then a
 * bar for each week.
 */
export const GitHubCard = component$<GitHubCardProps>(({ activity }) => {
  const max = activity === null ? 0 : Math.max(...activity.weeks.map((week) => week.count));
  const firstWeek = activity?.weeks[0];
  return (
    <section
      aria-labelledby="github-title"
      class="grid gap-y-5 rounded-card bg-panel p-[18px] shadow-hair sm:p-[26px] md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:grid-rows-[1fr_auto] md:items-end md:gap-x-10 md:gap-y-4"
    >
      <div class="flex flex-col gap-2.5">
        <h3
          id="github-title"
          class="inline-flex items-center gap-2 font-sans text-[13px] font-bold sm:text-sm"
        >
          <GitHubIcon />
          On GitHub
        </h3>
        {activity === null ? (
          <p class="text-base font-bold leading-snug">Most of what I build lives in the open.</p>
        ) : (
          <>
            <p class="font-display text-[32px] font-extrabold leading-[0.95] tracking-[-0.04em] tabular-nums sm:text-[52px]">
              {activity.total.toLocaleString("en-US")}
            </p>
            <p class="text-sm font-bold leading-snug sm:text-base">
              contributions in the last year
            </p>
            <p class="text-sm leading-relaxed text-ink-muted">{busiestLine(activity)}</p>
          </>
        )}
      </div>

      {/* Beside both the text and the button on wide screens, between them on phones */}
      {activity !== null && firstWeek !== undefined && (
        <div class="flex flex-col gap-2 md:col-start-2 md:row-span-2 md:row-start-1">
          <div
            role="img"
            aria-label={`Contributions per week over the last year. ${busiestLine(activity)}`}
            class="flex h-24 items-end gap-0.5 sm:gap-[3px] md:h-[132px]"
          >
            {activity.weeks.map((week) => (
              <span
                key={week.firstDay}
                title={`Week of ${formatDay(week.firstDay)}: ${plural(week.count, "contribution")}`}
                class={["min-w-0 flex-1 rounded-full", week.count === 0 ? "bg-wash/28" : "bg-leaf"]}
                style={{ height: barHeight(week.count, max) }}
              />
            ))}
          </div>
          <p aria-hidden="true" class="flex justify-between text-[13px] text-ink-muted">
            <span>{formatDay(firstWeek.firstDay)}</span>
            <span>This week</span>
          </p>
        </div>
      )}

      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-11 items-center gap-2 justify-self-start rounded-full bg-wash/16 px-5 text-sm font-bold transition-colors hover:bg-wash/28"
      >
        Follow on GitHub
        <ArrowUpRightIcon />
      </a>
    </section>
  );
});
