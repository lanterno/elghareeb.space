import { component$ } from "@builder.io/qwik";

interface HillsProps {
  /** Green afternoon hills under a page header, or dark ones in the dusk scene */
  time?: "afternoon" | "dusk";
  /** Sets the height; the hills stretch to fill it */
  class?: string;
}

const fills = {
  afternoon: ["fill-hill-far", "fill-hill-mid", "fill-hill-near"],
  dusk: ["fill-dusk-hill-far", "fill-dusk-hill-mid", "fill-dusk-hill-near"],
} as const;

/** Three rolling hills along the bottom edge of the nearest positioned parent. */
export const Hills = component$<HillsProps>(({ time = "afternoon", class: className }) => {
  const [far, mid, near] = fills[time];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      class={["pointer-events-none absolute inset-x-0 bottom-0 block w-full", className]}
    >
      <path class={far} d="M0 90 C 240 30, 480 40, 720 80 S 1140 30, 1440 70 L1440 200 L0 200 Z" />
      <path
        class={mid}
        d="M0 140 C 260 90, 560 100, 820 130 S 1220 96, 1440 120 L1440 200 L0 200 Z"
      />
      <path
        class={near}
        d="M0 176 C 320 140, 660 150, 940 170 S 1280 150, 1440 160 L1440 200 L0 200 Z"
      />
    </svg>
  );
});
