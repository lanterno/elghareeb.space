import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <div class="min-h-screen relative noise-bg">
      {/* Subtle background pattern */}
      <div class="fixed inset-0 pattern-dots opacity-30 pointer-events-none" />
      
      {/* Gradient orbs */}
      <div class="fixed top-20 -left-32 w-96 h-96 bg-accent-emerald/10 rounded-full blur-3xl pointer-events-none" />
      <div class="fixed bottom-20 -right-32 w-96 h-96 bg-accent-sky/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main content */}
      <div class="relative z-10">
        <Slot />
      </div>

      {/* Footer */}
      <footer class="relative z-10 py-12 mt-20 border-t border-ink-100">
        <div class="max-w-5xl mx-auto px-6 text-center">
          <p class="text-ink-400 text-sm font-mono">
            © {new Date().getFullYear()} Ahmed Elghareeb · Built with{" "}
            <a
              href="https://qwik.dev"
              target="_blank"
              rel="noopener noreferrer"
              class="text-accent-emerald hover:underline"
            >
              Qwik
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
});

