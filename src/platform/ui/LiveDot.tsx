import type { ClassList, JSXOutput } from "@builder.io/qwik";

interface LiveDotProps {
  /** Pulse its ring outwards (respects reduced motion) */
  pulse?: boolean;
  /** Size, and `[--dot:…]` / `[--dot-ring:…]` to recolour or resize the ring */
  class?: ClassList;
}

/** The small green "live" dot: something is happening right now. */
export const LiveDot = ({
  pulse = false,
  class: className = "h-2.5 w-2.5",
}: LiveDotProps): JSXOutput => (
  <span aria-hidden="true" class={["live-dot", className, pulse && "motion-safe:animate-live"]} />
);
