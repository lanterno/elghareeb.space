/**
 * My GitHub contribution calendar, read from GitHub's GraphQL API while the
 * site is built. The deploy workflow passes its GITHUB_TOKEN and rebuilds
 * daily, so the numbers are at most a day old.
 */
import * as v from "valibot";

const query = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              contributionCount
            }
          }
        }
      }
    }
  }
`;

const CalendarResponseSchema = v.object({
  data: v.object({
    user: v.object({
      contributionsCollection: v.object({
        contributionCalendar: v.object({
          totalContributions: v.number(),
          weeks: v.array(
            v.object({
              firstDay: v.pipe(v.string(), v.isoDate()),
              contributionDays: v.array(v.object({ contributionCount: v.number() })),
            })
          ),
        }),
      }),
    }),
  }),
});

export interface ContributionWeek {
  /** The Sunday the week starts on */
  readonly firstDay: string;
  readonly count: number;
}

export interface GitHubActivity {
  readonly total: number;
  /** Oldest first; the last one is the current, unfinished week */
  readonly weeks: readonly ContributionWeek[];
}

/**
 * `null` without a token (a local build) or when GitHub can't be reached;
 * the home page then links to the profile without the chart.
 */
export async function loadGitHubActivity(
  login: string,
  token: string | undefined
): Promise<GitHubActivity | null> {
  if (token === undefined || token === "") return null;
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login } }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`GitHub answered ${String(response.status)}`);
    const calendar = v.parse(CalendarResponseSchema, await response.json()).data.user
      .contributionsCollection.contributionCalendar;
    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) => ({
        firstDay: week.firstDay,
        count: week.contributionDays.reduce((sum, day) => sum + day.contributionCount, 0),
      })),
    };
  } catch (error) {
    // eslint-disable-next-line no-console -- a build-time notice, so a missing chart isn't a mystery
    console.warn("Building without the GitHub chart:", error);
    return null;
  }
}

/** The week with the most contributions, the latest one on a tie */
export function busiestWeek(activity: GitHubActivity): ContributionWeek | undefined {
  return activity.weeks.reduce<ContributionWeek | undefined>(
    (best, week) => (best === undefined || week.count >= best.count ? week : best),
    undefined
  );
}
