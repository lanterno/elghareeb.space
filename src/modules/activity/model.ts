/** The Activity context: public GitHub contributions over the last year. */

export interface ContributionWeek {
  /** The Sunday the week starts on */
  readonly firstDay: string;
  readonly count: number;
}

export interface ContributionCalendar {
  readonly total: number;
  /** Oldest first; the last one is the current, unfinished week */
  readonly weeks: readonly ContributionWeek[];
}
