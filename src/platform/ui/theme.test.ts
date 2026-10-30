import { describe, expect, test } from "bun:test";

import { currentTheme, isTheme, nextTheme } from "./theme";

describe("theme", () => {
  test("follows the system until a choice is stored", () => {
    expect(currentTheme(null, false)).toBe("afternoon");
    expect(currentTheme(null, true)).toBe("dusk");
    expect(currentTheme("garbage", true)).toBe("dusk");
    expect(currentTheme("afternoon", true)).toBe("afternoon");
    expect(currentTheme("dusk", false)).toBe("dusk");
  });

  test("the switch goes to the other hour", () => {
    expect(nextTheme(null, false)).toBe("dusk");
    expect(nextTheme(null, true)).toBe("afternoon");
    expect(nextTheme("dusk", false)).toBe("afternoon");
  });

  test("only the two hours count as a theme", () => {
    expect(isTheme("dusk")).toBe(true);
    expect(isTheme("dark")).toBe(false);
    expect(isTheme(undefined)).toBe(false);
  });
});
