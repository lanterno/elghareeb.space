import { describe, expect, test } from "bun:test";

import { type Account, fillDays, foldTraffic } from "./traffic";

const from = new Date("2026-10-27T15:00:00Z");
const to = new Date("2026-10-30T15:00:00Z");

const account: Account = {
  total: [{ count: 12, sum: { visits: 9 } }],
  byDay: [
    { count: 10, sum: { visits: 7 }, dimensions: { date: "2026-10-28" } },
    { count: 2, sum: { visits: 2 }, dimensions: { date: "2026-10-30" } },
  ],
  pages: [{ count: 8, sum: { visits: 6 }, dimensions: { requestPath: "/" } }],
  referrers: [{ sum: { visits: 9 }, dimensions: { refererHost: "" } }],
  countries: [{ sum: { visits: 9 }, dimensions: { countryName: "CH" } }],
  devices: [{ sum: { visits: 9 }, dimensions: { deviceType: "desktop" } }],
  browsers: undefined,
  systems: [],
  vitals: [
    {
      quantiles: {
        largestContentfulPaintP75: 3204000,
        interactionToNextPaintP75: -1,
        cumulativeLayoutShiftP75: 0.02,
        timeToFirstByteP75: 702000,
        firstContentfulPaintP75: 4100000,
      },
    },
  ],
  answered: [
    { sum: { requests: 658 }, dimensions: { statusCode: 200 } },
    { sum: { requests: 1412 }, dimensions: { statusCode: 404 } },
  ],
};

describe("foldTraffic", () => {
  const traffic = foldTraffic(account, from, to);

  test("reads the totals, lists and missing groups", () => {
    expect(traffic.views).toBe(12);
    expect(traffic.visits).toBe(9);
    expect(traffic.pages).toEqual([{ path: "/", views: 8, visits: 6 }]);
    expect(traffic.referrers).toEqual([{ name: "", n: 9 }]);
    expect(traffic.browsers).toEqual([]);
    expect(traffic.systems).toEqual([]);
  });

  test("turns microseconds into milliseconds and rates each vital", () => {
    expect(traffic.vitals.map((v) => [v.p75, v.rating])).toEqual([
      [3204, "needs work"],
      [undefined, undefined],
      [0.02, "good"],
      [702, "good"],
      [4100, "poor"],
    ]);
    expect(traffic.vitals[2]?.unitless).toBe(true);
  });

  test("puts the busiest status first", () => {
    expect(traffic.answered).toEqual([
      { status: 404, n: 1412 },
      { status: 200, n: 658 },
    ]);
  });

  test("copes with an account that sent nothing", () => {
    const empty = foldTraffic(
      {
        total: undefined,
        byDay: undefined,
        pages: undefined,
        referrers: undefined,
        countries: undefined,
        devices: undefined,
        browsers: undefined,
        systems: undefined,
        vitals: undefined,
        answered: undefined,
      },
      from,
      to
    );
    expect(empty.views).toBe(0);
    expect(empty.byDay).toHaveLength(4);
    expect(empty.vitals.every((v) => v.p75 === undefined)).toBe(true);
  });
});

describe("fillDays", () => {
  test("gives every UTC day of the period a bar, empty ones included", () => {
    expect(fillDays([{ date: "2026-10-28", views: 10, visits: 7 }], from, to)).toEqual([
      { date: "2026-10-27", views: 0, visits: 0 },
      { date: "2026-10-28", views: 10, visits: 7 },
      { date: "2026-10-29", views: 0, visits: 0 },
      { date: "2026-10-30", views: 0, visits: 0 },
    ]);
  });
});
