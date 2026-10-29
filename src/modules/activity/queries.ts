import type { ContributionCalendar, ContributionWeek } from "./model";

/** The week with the most contributions, the latest one on a tie */
export function busiestWeek(calendar: ContributionCalendar): ContributionWeek | undefined {
  return calendar.weeks.reduce<ContributionWeek | undefined>(
    (best, week) => (best === undefined || week.count >= best.count ? week : best),
    undefined
  );
}

/** Whether the busiest week is the one still going */
export function isCurrentWeek(calendar: ContributionCalendar, week: ContributionWeek): boolean {
  return week === calendar.weeks.at(-1);
}
