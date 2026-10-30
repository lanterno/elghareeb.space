/**
 * The two hours of the day the site can be seen at. The stylesheet follows the system until a
 * choice is stored; `root.tsx` applies a stored choice before the first paint, and the nav's
 * switch (`ThemeSwitch`) stores the next one.
 */
export type Theme = "afternoon" | "dusk";

export const THEME_KEY = "theme";

/** The browser's theme colour at each hour: the top of the sky (theme.css) */
export const themeColors: Record<Theme, string> = { afternoon: "#8cc1e2", dusk: "#1a2446" };

export function isTheme(value: unknown): value is Theme {
  return value === "afternoon" || value === "dusk";
}

/** The hour showing now: the stored choice, else what the system asks for */
export function currentTheme(stored: unknown, systemDark: boolean): Theme {
  if (isTheme(stored)) return stored;
  return systemDark ? "dusk" : "afternoon";
}

/** What the switch changes to: the other hour */
export function nextTheme(stored: unknown, systemDark: boolean): Theme {
  return currentTheme(stored, systemDark) === "dusk" ? "afternoon" : "dusk";
}

/** Sets the hour on the document and keeps the browser's theme colour in step */
export function applyTheme(theme: Theme, doc: Document): void {
  doc.documentElement.dataset["theme"] = theme;
  for (const meta of doc.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    meta.content = themeColors[theme];
  }
}
