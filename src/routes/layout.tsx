import { component$, Slot } from "@builder.io/qwik";

import { Clouds } from "~/components/clouds/Clouds";
import { GitHubIcon, LinkedInIcon } from "~/components/icons";
import { Navbar } from "~/components/navbar/Navbar";
import { links } from "~/data/portfolio";

import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <div class="sky-afternoon relative min-h-screen overflow-x-clip">
      <Clouds />

      <a
        href="#main"
        class="sr-only z-30 rounded-full bg-ink px-5 py-3 font-bold text-panel focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header class="wrap relative z-20 pt-4 md:pt-6">
        <Navbar />
      </header>

      <main id="main" class="relative z-10">
        <Slot />
      </main>

      <footer class="wrap relative flex flex-wrap items-center justify-between gap-3 pb-8 pt-7 text-sm text-ink-muted">
        <p>© {String(new Date().getFullYear())} Ahmed Elghareeb · Renens, Switzerland</p>
        <ul class="flex gap-2">
          <li>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-ink hover:bg-wash/16"
            >
              <GitHubIcon />
              GitHub
            </a>
          </li>
          <li>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-ink hover:bg-wash/16"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
});
