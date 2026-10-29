import { component$, Slot } from "@builder.io/qwik";

import { Hills } from "~/platform/scenery/Hills";

interface PageHeaderProps {
  title: string;
  /** One sentence under the title; for longer openings, pass paragraphs in the `body` slot */
  intro?: string;
  /**
   * `row`: the default slot sits at the far end of the title line (a button).
   * `split`: a two-column opening with the default slot as the second column (a portrait).
   * `compact`: one line of title with the intro beside it and no hills, for pages whose content
   * should start on the first screen (the blog).
   */
  layout?: "row" | "split" | "compact";
}

/**
 * The opening of an inner page: a big title, a few words, and hills along the bottom.
 */
export const PageHeader = component$<PageHeaderProps>(({ title, intro, layout = "row" }) => {
  if (layout === "compact") {
    return (
      <header class="wrap flex flex-wrap items-end justify-between gap-x-10 gap-y-3 pt-10 md:pt-12">
        <h1 class="text-[clamp(38px,5vw,60px)] leading-none tracking-[-0.02em]">{title}</h1>
        {intro !== undefined && (
          <p class="max-w-[34em] text-lg leading-relaxed text-ink-sky">{intro}</p>
        )}
        <Slot />
      </header>
    );
  }
  return (
    <header class={["relative", layout === "row" ? "pb-[120px]" : "pb-[130px]"]}>
      <div
        class={[
          "wrap",
          layout === "row"
            ? "flex flex-wrap items-end justify-between gap-6 pt-14 md:pt-[88px]"
            : "grid items-center gap-12 pt-14 md:pt-20 lg:grid-cols-[7fr_5fr]",
        ]}
      >
        <div class={["flex flex-col gap-[22px]", layout === "row" && "max-w-[860px]"]}>
          <h1 class="text-[clamp(48px,7vw,96px)] leading-[0.98] tracking-[-0.025em] text-balance">
            {title}
          </h1>
          {intro !== undefined && (
            <p class="max-w-[34em] text-lg leading-relaxed text-ink-sky md:text-xl">{intro}</p>
          )}
          <Slot name="body" />
        </div>
        <Slot />
      </div>
      <Hills class="h-[120px]" />
    </header>
  );
});
