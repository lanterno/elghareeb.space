import { describe, expect, test } from "bun:test";

import { toContributionCalendar } from "./adapter";
import { busiestWeek, isCurrentWeek } from "./queries";

import type { ContributionCalendar } from "./model";

const calendar: ContributionCalendar = {
  total: 12,
  weeks: [
    { firstDay: "2026-01-04", count: 3 },
    { firstDay: "2026-01-11", count: 5 },
    { firstDay: "2026-01-18", count: 5 },
  ],
};

describe("busiestWeek", () => {
  test("picks the highest count, the latest on a tie", () => {
    expect(busiestWeek(calendar)?.firstDay).toBe("2026-01-18");
    const last = calendar.weeks[2];
    expect(last !== undefined && isCurrentWeek(calendar, last)).toBeTrue();
  });
  test("undefined without weeks", () => {
    expect(busiestWeek({ total: 0, weeks: [] })).toBeUndefined();
  });
});

describe("toContributionCalendar", () => {
  const response = {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: 7,
            weeks: [
              {
                firstDay: "2026-01-04",
                contributionDays: [{ contributionCount: 1 }, { contributionCount: 2 }],
              },
              { firstDay: "2026-01-11", contributionDays: [{ contributionCount: 4 }] },
            ],
          },
        },
      },
    },
  };

  test("sums each week's days", () => {
    expect(toContributionCalendar(response)).toEqual({
      total: 7,
      weeks: [
        { firstDay: "2026-01-04", count: 3 },
        { firstDay: "2026-01-11", count: 4 },
      ],
    });
  });

  test("rejects an answer with another shape", () => {
    expect(() => toContributionCalendar({ data: { user: null } })).toThrow();
  });
});
