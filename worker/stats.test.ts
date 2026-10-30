import { describe, expect, test } from "bun:test";

import { authorized, foldReading, measure, name, renderStats, type StatsData } from "./stats";

import type { Traffic } from "./traffic";

const basic = (user: string, password: string): string => `Basic ${btoa(`${user}:${password}`)}`;

describe("authorized", () => {
  test("accepts the password with any user name", () => {
    expect(authorized(basic("ahmed", "open-sesame"), "open-sesame")).toBe(true);
    expect(authorized(basic("", "open-sesame"), "open-sesame")).toBe(true);
  });

  test("rejects a wrong or missing password", () => {
    expect(authorized(null, "open-sesame")).toBe(false);
    expect(authorized("Bearer abc", "open-sesame")).toBe(false);
    expect(authorized("Basic %%%", "open-sesame")).toBe(false);
    expect(authorized(basic("ahmed", "open-sesam"), "open-sesame")).toBe(false);
    expect(authorized(basic("ahmed", "open-sesame!"), "open-sesame")).toBe(false);
  });
});

describe("foldReading", () => {
  test("gives each post its half and full counts, most finished first", () => {
    expect(
      foldReading([
        { page: "/blog/a/", depth: 50, n: 10 },
        { page: "/blog/a/", depth: 100, n: 4 },
        { page: "/blog/b/", depth: 100, n: 6 },
        { page: "/blog/c/", depth: 50, n: 1 },
      ])
    ).toEqual([
      { page: "/blog/b/", half: 0, full: 6 },
      { page: "/blog/a/", half: 10, full: 4 },
      { page: "/blog/c/", half: 1, full: 0 },
    ]);
  });
});

describe("measure", () => {
  test("picks the unit that reads best", () => {
    expect(measure(702, false)).toBe("702 ms");
    expect(measure(3204, false)).toBe("3.2 s");
    expect(measure(0.0234, true)).toBe("0.02");
  });
});

const traffic: Traffic = {
  views: 12,
  visits: 9,
  byDay: [
    { date: "2026-10-29", views: 10, visits: 7 },
    { date: "2026-10-30", views: 2, visits: 2 },
  ],
  pages: [{ path: "/blog/a/", views: 8, visits: 6 }],
  referrers: [
    { name: "", n: 7 },
    { name: "news.ycombinator.com", n: 2 },
  ],
  countries: [{ name: "CH", n: 9 }],
  devices: [{ name: "desktop", n: 9 }],
  browsers: [{ name: "ChromeMobile", n: 9 }],
  systems: [{ name: "MacOSX", n: 9 }],
  vitals: [
    { name: "Largest Contentful Paint", p75: 3204, rating: "needs work", unitless: false },
    { name: "Interaction to Next Paint", unitless: false },
    { name: "Cumulative Layout Shift", p75: 0.02, rating: "good", unitless: true },
  ],
  answered: [
    { status: 404, n: 1412 },
    { status: 200, n: 658 },
  ],
  warnings: [],
};

describe("renderStats", () => {
  const data: StatsData = {
    days: 7,
    traffic,
    totals: [{ name: "outbound", n: 3 }],
    outbound: [{ target: "https://github.com/lanterno/", page: "/", n: 3 }],
    talk: [],
    reading: [],
  };

  test("shows the numbers and marks the chosen period", () => {
    const html = renderStats(data);
    expect(html).toContain("<b>12</b><span>page views</span>");
    expect(html).toContain("<b>3</b><span>interactions</span>");
    expect(html).toContain("<strong>7 days</strong>");
    expect(html).toContain('href="/stats?days=30">30 days</a>');
    expect(html).toContain('href="/stats?days=1">24 hours</a>');
    expect(html).toContain("github.com/lanterno</td>");
    expect(html).toContain("The closing button has not been pressed yet.");
  });

  test("draws a bar per day, scaled to the busiest", () => {
    const html = renderStats(data);
    expect(html).toContain('<i style="--h:100%" title="2026-10-29: 10 views, 7 visits">');
    expect(html).toContain('<i style="--h:20%" title="2026-10-30: 2 views, 2 visits">');
  });

  test("names things the way people say them and rates the vitals", () => {
    const html = renderStats(data);
    expect(html).toContain("typed the address, or no referrer");
    expect(html).toContain("Chrome (mobile)");
    expect(html).toContain("macOS");
    expect(name("iOS", "")).toBe("iOS");
    expect(name("SamsungInternet", "")).toBe("Samsung Internet");
    expect(html).toContain('class="tile needs-work"><b>3.2 s</b>');
    expect(html).toContain('class="tile "><b>–</b>');
    expect(html).toContain("not measured yet");
    expect(html).toContain("<b>2070</b> requests");
    expect(html).toContain("<b>1412</b> of them");
  });

  test("passes on what Cloudflare complained about", () => {
    const html = renderStats({ ...data, traffic: { ...traffic, warnings: ["quota <exceeded>"] } });
    expect(html).toContain("Cloudflare also said: quota &#60;exceeded&#62;");
  });

  test("says why when Cloudflare could not be asked", () => {
    const bare: StatsData = { ...data, trafficError: "budget depleted" };
    delete bare.traffic;
    const html = renderStats(bare);
    expect(html).toContain("Cloudflare could not be asked: budget depleted.");
    expect(html).toContain("<b>3</b><span>interactions</span>");
  });

  test("escapes what came from the browser", () => {
    const html = renderStats({
      ...data,
      outbound: [{ target: "https://x.test/<script>", page: "/\"'", n: 1 }],
      traffic: { ...traffic, pages: [{ path: "/<img onerror=x>", views: 1, visits: 1 }] },
    });
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
    expect(html).toContain("&#60;script&#62;");
  });
});
