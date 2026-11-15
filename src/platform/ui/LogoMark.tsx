import type { ClassList, JSXOutput } from "@builder.io/qwik";

interface LogoMarkProps {
  /** Size and corner radius of the tile */
  class?: ClassList;
}

/**
 * The site's mark: the lime square glasses, on a line that runs off the tile. The tile is a well,
 * so it stays dark at both hours and the lime keeps its contrast. `public/favicon.svg` is the
 * same drawing with the tile baked in.
 */
export const LogoMark = ({
  class: className = "h-9 w-9 rounded-[12px]",
}: LogoMarkProps): JSXOutput => (
  <span aria-hidden="true" class={["block shrink-0 overflow-hidden bg-well", className]}>
    <svg viewBox="0 0 120 120" class="block h-full w-full">
      <g class="fill-lime">
        <rect x="0" y="49" width="15" height="11" />
        <rect x="53" y="49" width="14" height="11" />
        <rect x="105" y="49" width="15" height="11" />
      </g>
      <g class="fill-none stroke-lime" stroke-width="5">
        <rect x="15" y="39" width="38" height="42" rx="10" />
        <rect x="67" y="39" width="38" height="42" rx="10" />
      </g>
      <circle cx="94" cy="51" r="4" class="fill-dusk-ink" />
    </svg>
  </span>
);
