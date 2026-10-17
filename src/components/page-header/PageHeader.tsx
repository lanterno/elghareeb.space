import { component$, Slot } from "@builder.io/qwik";

import { Hills } from "~/components/hills/Hills";

interface PageHeaderProps {
  title: string;
  intro: string;
}

/**
 * The opening of an inner page: a big title, one sentence, and hills along
 * the bottom. Anything passed as children sits at the far end of the title row.
 */
export const PageHeader = component$<PageHeaderProps>(({ title, intro }) => (
  <header class="relative pb-[120px]">
    <div class="wrap flex flex-wrap items-end justify-between gap-6 pt-14 md:pt-[88px]">
      <div class="flex max-w-[860px] flex-col gap-[22px]">
        <h1 class="text-[clamp(48px,7vw,96px)] leading-[0.98] tracking-[-0.025em] text-balance">
          {title}
        </h1>
        <p class="max-w-[34em] text-lg leading-relaxed text-ink-sky md:text-xl">{intro}</p>
      </div>
      <Slot />
    </div>
    <Hills class="h-[120px]" />
  </header>
));
