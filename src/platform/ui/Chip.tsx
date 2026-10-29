import type { JSXChildren, JSXOutput } from "@builder.io/qwik";
import type { Tone } from "~/platform/kernel";

/** A small rounded label in a list: a skill, a tag. `tone` takes its colours from the tone context. */
export type ChipVariant = "wash" | "panel" | "tone";

const variants: Record<ChipVariant, string> = {
  wash: "rounded-full bg-wash/16 px-3 py-1.5 text-[13px]",
  panel: "rounded-full bg-panel px-[13px] py-[7px] text-sm",
  tone: "rounded-full bg-tone-tint px-[13px] py-[7px] text-[13px] font-bold text-tone-ink",
};

interface ChipProps {
  variant: ChipVariant;
  /** Sets this chip's own tone; otherwise it inherits the tone around it */
  tone?: Tone;
  children?: JSXChildren;
}

export const Chip = ({ variant, tone, children }: ChipProps): JSXOutput => (
  <li data-tone={tone} class={variants[variant]}>
    {children}
  </li>
);
