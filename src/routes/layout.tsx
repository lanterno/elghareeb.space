import { component$, Slot } from "@builder.io/qwik";

import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "~/components/icons";
import { Navbar } from "~/components/navbar/Navbar";
import { personalInfo } from "~/data/portfolio";

import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <div class="min-h-screen relative noise-bg bg-cream-50 text-ink-900 selection:bg-accent-emerald selection:text-white flex flex-col justify-between">
      {/* Subtle background ambient mesh */}
      <div class="fixed inset-0 pattern-grid-swiss opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]" />

      {/* Atmospheric Soft Gradient Orbs */}
      <div class="fixed top-12 left-1/4 -translate-x-1/2 w-[550px] h-[350px] bg-accent-emerald/5 rounded-full blur-3xl pointer-events-none" />
      <div class="fixed top-1/3 right-10 w-[450px] h-[450px] bg-accent-amber/5 rounded-full blur-3xl pointer-events-none" />
      <div class="fixed bottom-10 left-10 w-[500px] h-[350px] bg-accent-sky/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Dynamic Navbar */}
      <Navbar />

      {/* Main Content Area with top padding for navbar */}
      <div class="relative z-10 pt-20 md:pt-24 flex-1">
        <Slot />
      </div>

      {/* Elevated Footer */}
      <footer class="relative z-10 py-16 mt-28 border-t border-cream-300/70 bg-cream-100/60 backdrop-blur-sm">
        <div class="max-w-6xl mx-auto px-6">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-ink-100">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="w-2.5 h-2.5 rounded-full bg-accent-emerald animate-pulse"></span>
                <h3 class="font-serif text-2xl text-ink-950 font-normal">Ahmed Elghareeb</h3>
              </div>
              <p class="text-sm text-ink-500 max-w-md">
                Staff Software Engineer & Climate Technologist. Based in Renens / Lausanne, Switzerland.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono bg-cream-50 border border-ink-200/80 rounded-xl text-ink-700 hover:text-ink-950 hover:border-ink-400 transition-all shadow-xs"
              >
                <GitHubIcon />
                <span>GitHub</span>
                <ArrowUpRightIcon />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono bg-cream-50 border border-ink-200/80 rounded-xl text-ink-700 hover:text-ink-950 hover:border-ink-400 transition-all shadow-xs"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
                <ArrowUpRightIcon />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono bg-ink-900 rounded-xl text-cream-50 hover:bg-ink-800 transition-all shadow-xs"
              >
                <MailIcon />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-ink-400">
            <p>
              © {String(new Date().getFullYear())} Ahmed Elghareeb · Engineered with{" "}
              <a
                href="https://qwik.dev"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent-emerald hover:underline font-semibold"
              >
                Qwik
              </a>{" "}
              &amp; Tailwind CSS.
            </p>
            <a
              href="#overview"
              class="hover:text-ink-900 transition-colors flex items-center gap-1 group"
            >
              <span>Back to Top</span>
              <span class="group-hover:-translate-y-0.5 transition-transform">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
});
