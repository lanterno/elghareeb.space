/**
 * Reads the contribution calendar from GitHub's GraphQL API while the site is built, and maps
 * the response to the module's own model so the API's shape stops here. The deploy workflow
 * passes its GITHUB_TOKEN and rebuilds daily, so the numbers are at most a day old.
 */
import * as v from "valibot";

import type { ContributionCalendar } from "./model";

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

/** The API's answer as the model; throws when the answer isn't what GitHub promises */
export function toContributionCalendar(response: unknown): ContributionCalendar {
  const calendar = v.parse(CalendarResponseSchema, response).data.user.contributionsCollection
    .contributionCalendar;
  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      firstDay: week.firstDay,
      count: week.contributionDays.reduce((sum, day) => sum + day.contributionCount, 0),
    })),
  };
}

/**
 * `null` without a token (a local build) or when GitHub can't be reached; the home page then
 * links to the profile without the chart.
 */
export async function fetchContributionCalendar(
  login: string,
  token: string | undefined
): Promise<ContributionCalendar | null> {
  if (token === undefined || token === "") return null;
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login } }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`GitHub answered ${String(response.status)}`);
    return toContributionCalendar(await response.json());
  } catch (error) {
    // eslint-disable-next-line no-console -- a build-time notice, so a missing chart isn't a mystery
    console.warn("Building without the GitHub chart:", error);
    return null;
  }
}
