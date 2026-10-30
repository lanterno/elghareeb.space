import { $, component$ } from "@builder.io/qwik";

import { MoonIcon, SunIcon } from "./icons";
import { applyTheme, nextTheme, THEME_KEY } from "./theme";

/**
 * Switches the page between afternoon and dusk and remembers the choice. Shows the hour it would
 * switch to; the label says so for a screen reader.
 */
export const ThemeSwitch = component$(() => {
  const switchTheme = $(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch {
      // Private browsing may refuse storage; the switch still works for this page
    }
    const theme = nextTheme(stored, matchMedia("(prefers-color-scheme: dark)").matches);
    applyTheme(theme, document);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Then the choice lasts as long as the page
    }
  });

  return (
    <button
      type="button"
      onClick$={switchTheme}
      class="grid h-11 w-11 place-items-center rounded-full bg-wash/16 text-ink transition-colors hover:bg-wash/28"
    >
      <span class="dusk:hidden">
        <MoonIcon />
        <span class="sr-only">Switch to dusk</span>
      </span>
      <span class="hidden dusk:block">
        <SunIcon />
        <span class="sr-only">Switch to afternoon</span>
      </span>
    </button>
  );
});
