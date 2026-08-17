import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

import { CheckIcon, ClockIcon, CopyIcon } from "~/components/icons";
import { personalInfo } from "~/data/portfolio";

export const Navbar = component$(() => {
  const swissTime = useSignal<string>("");
  const isCopied = useSignal<boolean>(false);
  const isMobileMenuOpen = useSignal<boolean>(false);

  // Update Swiss time live on client
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const updateTime = (): void => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Zurich",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        swissTime.value = formatter.format(now);
      } catch {
        swissTime.value = "";
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const copyEmail = $(async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 2500);
    } catch {
      // Fallback
      isCopied.value = false;
    }
  });

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Experience", href: "#experience" },
    { label: "Focus", href: "#focus" },
    { label: "Projects", href: "#projects" },
    { label: "Toolkit", href: "#toolkit" },
    { label: "Background", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header class="fixed top-4 left-0 right-0 z-50 px-4 max-w-6xl mx-auto pointer-events-none">
      <nav class="pointer-events-auto glass-nav rounded-2xl px-4 lg:px-6 py-3 flex items-center justify-between transition-all duration-300">
        {/* Left: Brand Monogram & Status */}
        <a
          href="#overview"
          class="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-accent-emerald rounded-lg"
        >
          <div class="w-8 h-8 rounded-full bg-ink-900 text-cream-50 flex items-center justify-center font-serif text-sm font-semibold group-hover:scale-105 transition-transform">
            AE
          </div>
          <div class="flex flex-col">
            <span class="font-medium text-ink-900 text-sm tracking-tight group-hover:text-accent-emerald transition-colors">
              Ahmed Elghareeb
            </span>
            <span class="text-[11px] font-mono text-ink-500 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span>
              Staff Eng · Climate Tech
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav Links */}
        <div class="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              class="px-3 py-1.5 text-xs font-medium text-ink-600 hover:text-ink-900 hover:bg-cream-200/60 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Swiss Time & Quick Action */}
        <div class="flex items-center gap-2">
          {/* Swiss Time Badge (Desktop) */}
          <div class="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-cream-100 border border-ink-200/50 rounded-lg text-[11px] font-mono text-ink-600">
            <ClockIcon />
            <span>CH:</span>
            <span class="font-semibold text-ink-800 tabular-nums">
              {swissTime.value !== "" ? swissTime.value : "12:00:00"}
            </span>
            <span class="text-ink-400">CET</span>
          </div>

          {/* Copy Email Button */}
          <button
            onClick$={copyEmail}
            title={`Copy ${personalInfo.email}`}
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-ink-900 hover:bg-ink-800 text-cream-50 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            {isCopied.value ? (
              <>
                <CheckIcon />
                <span class="font-mono text-[11px] text-accent-emerald">Copied!</span>
              </>
            ) : (
              <>
                <CopyIcon />
                <span class="hidden sm:inline">Copy Email</span>
                <span class="sm:hidden">Email</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick$={() => {
              isMobileMenuOpen.value = !isMobileMenuOpen.value;
            }}
            aria-label="Toggle Navigation Menu"
            class="md:hidden p-1.5 text-ink-700 hover:text-ink-900 hover:bg-cream-200/70 rounded-lg transition-colors cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen.value ? (
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen.value && (
        <div class="pointer-events-auto md:hidden mt-2 p-3 glass-nav rounded-2xl border border-ink-200/60 shadow-xl flex flex-col gap-1 animate-fade-in">
          <div class="px-3 py-1.5 flex items-center justify-between text-xs font-mono text-ink-500 border-b border-ink-100 pb-2 mb-1">
            <span class="flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span>
              Lausanne, Switzerland
            </span>
            <span class="tabular-nums font-semibold text-ink-800">
              {swissTime.value !== "" ? swissTime.value : "12:00:00"} CET
            </span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick$={() => {
                isMobileMenuOpen.value = false;
              }}
              class="px-3 py-2 text-sm font-medium text-ink-700 hover:text-ink-900 hover:bg-cream-200/70 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
});
