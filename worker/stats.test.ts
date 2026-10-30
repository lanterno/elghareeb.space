import { describe, expect, test } from "bun:test";

import { authorized, foldReading, renderStats } from "./stats";

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

describe("renderStats", () => {
  const data = {
    days: 7,
    totals: [{ name: "outbound", n: 3 }],
    outbound: [{ target: "https://github.com/lanterno/", page: "/", n: 3 }],
    talk: [],
    reading: [],
    countries: [{ country: "", n: 3 }],
  };

  test("shows the numbers and marks the chosen period", () => {
    const html = renderStats(data);
    expect(html).toContain("<b>3</b><span>interactions</span>");
    expect(html).toContain("<strong>7 days</strong>");
    expect(html).toContain('href="/stats?days=30"');
    expect(html).toContain("github.com/lanterno</td>");
    expect(html).toContain("unknown");
    expect(html).toContain("The closing button has not been pressed yet.");
  });

  test("escapes what came from the browser", () => {
    const html = renderStats({
      ...data,
      outbound: [{ target: "https://x.test/<script>", page: "/\"'", n: 1 }],
    });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&#60;script&#62;");
  });
});
