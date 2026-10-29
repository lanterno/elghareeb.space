import type { JSXChildren, JSXOutput } from "@builder.io/qwik";

const sizes = {
  sm: "text-[clamp(32px,3.6vw,44px)] leading-[1.05] tracking-[-0.02em]",
  md: "text-[clamp(36px,4.4vw,56px)] leading-none tracking-[-0.02em]",
  lg: "text-[clamp(38px,5vw,60px)] leading-none tracking-[-0.02em]",
} as const;

interface SectionHeadingProps {
  /** The section's `aria-labelledby` points here */
  id: string;
  title: string;
  size?: keyof typeof sizes;
  /** One sentence beside (or under) the title */
  lede?: string;
  /** Width and size of the lede, e.g. "max-w-[28em] text-[17px]" */
  ledeClass?: string;
  /** `row` puts the lede or children at the far end of the title line; `stack` puts them under it */
  layout?: "row" | "stack";
  /** Something other than a lede beside the title, e.g. a tab list */
  children?: JSXChildren;
}

/** A section's title, on its own or with a lede or controls beside it. */
export const SectionHeading = ({
  id,
  title,
  size = "md",
  lede,
  ledeClass = "max-w-[28em] text-[17px]",
  layout = "row",
  children,
}: SectionHeadingProps): JSXOutput => {
  const heading = (
    <h2 id={id} class={sizes[size]}>
      {title}
    </h2>
  );
  if (lede === undefined && children === undefined) return heading;
  return (
    <div
      class={
        layout === "row" ? "flex flex-wrap items-end justify-between gap-4" : "flex flex-col gap-2"
      }
    >
      {heading}
      {lede !== undefined && <p class={[ledeClass, "leading-relaxed text-ink-sky"]}>{lede}</p>}
      {children}
    </div>
  );
};
