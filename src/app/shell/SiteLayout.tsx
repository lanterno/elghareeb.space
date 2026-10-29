import { component$, Slot } from "@builder.io/qwik";

import { Clouds } from "~/platform/scenery";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/** The sky, the floating nav, the page and the footer: what every page shares. */
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

      <Footer />
    </div>
  );
});
