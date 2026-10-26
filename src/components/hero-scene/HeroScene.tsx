import { component$, type JSXOutput } from "@builder.io/qwik";

import { nearHill } from "~/components/hills/Hills";

/**
 * Places a drawing on the hero's hills. `x` and `y` are in the 1440 × 200
 * drawing the Hills component stretches across the page; `y` is the height of
 * the ground at `x`, read off the hill curves.
 */
const at = (x: number, y: number): { left: string; bottom: string } => ({
  left: `${(x / 14.4).toFixed(2)}%`,
  bottom: `${((200 - y) / 2).toFixed(2)}%`,
});

/** Must match the height given to the hero's Hills */
const hillsBox = "pointer-events-none absolute inset-x-0 bottom-0 h-[110px] md:h-[190px]";

const catchFrame = "absolute bottom-0 left-0 w-full overflow-visible";

interface ArmProps {
  y: number;
  class: string;
}

/** One of the tower's two catch arms, held open until the ship is between them */
const Arm = ({ y, class: className }: ArmProps): JSXOutput => (
  <path
    class={["origin-right [transform-box:fill-box] md:motion-safe:animate-chopsticks", className]}
    d={`M9 ${String(y)}H-6.2`}
    stroke-width="1.3"
    stroke-linecap="round"
  />
);

/**
 * Starship coming back from space: it falls belly-first, flips upright, burns to slow down and is
 * caught by the launch tower's arms, then relaunches for the next catch. It sits behind the hero's
 * text, portrait and hills, so it passes behind them on the way down and the hill hides the tower's
 * footing. Phones show it already caught: their hero runs past the first screen, so the catch would
 * play out of sight.
 */
export const StarshipCatch = component$(() => (
  <div aria-hidden="true" class={[hillsBox, "-z-10"]}>
    {/* Centred on the ship, which hangs at x = 0 with the tower to its right */}
    <div class="absolute w-[max(29px,3.5vw)] -translate-x-[34.78%]" style={at(1290, 59.5)}>
      <svg viewBox="-8 -54 23 54" class={catchFrame}>
        <path
          class="stroke-ink-sky"
          d="M9.2 3V-50M12.8 3V-50M11 -50V-53.5"
          stroke-width="0.7"
          stroke-linecap="round"
          fill="none"
        />
        <path
          class="stroke-ink-sky"
          d="M9.2 0L12.8 -4L9.2 -8L12.8 -12L9.2 -16L12.8 -20L9.2 -24L12.8 -28L9.2 -32L12.8 -36L9.2 -40L12.8 -44L9.2 -48L12.8 -50"
          stroke-width="0.4"
          fill="none"
        />
        <Arm y={-39.4} class="stroke-ink-sky [--open:14deg]" />
        <rect class="fill-ink" x="8.4" y="-40.8" width="5.2" height="3.8" rx="0.6" />
      </svg>
      <svg viewBox="-8 -54 23 54" class={[catchFrame, "md:motion-safe:animate-catch"]}>
        <g transform="translate(0 -21)">
          <g class="origin-center [transform-box:fill-box] md:motion-safe:animate-flip">
            <g class="opacity-0 md:motion-safe:animate-burn">
              <g class="origin-top [transform-box:fill-box] motion-safe:animate-flicker">
                <path class="fill-coral" d="M-2 1C-2 4.6 -1 8 0 11C1 8 2 4.6 2 1Z" />
                <path class="fill-panel" d="M-0.9 1C-0.9 3 -0.4 4.8 0 6.2C0.4 4.8 0.9 3 0.9 1Z" />
              </g>
            </g>
            <rect class="fill-ink" x="-2" y="-0.4" width="4" height="1.4" rx="0.4" />
            <path
              class="fill-ink"
              d="M-2.5 -6.5L-4.6 -5V-0.8L-2.5 -0.4ZM2.5 -6.5L4.6 -5V-0.8L2.5 -0.4ZM-2.5 -23.4L-4 -22.4V-19.4L-2.5 -19ZM2.5 -23.4L4 -22.4V-19.4L2.5 -19Z"
            />
            <path
              class="fill-panel"
              d="M-2.5 0V-21C-2.5 -24.6 -1.3 -27.3 0 -28C1.3 -27.3 2.5 -24.6 2.5 -21V0Z"
            />
            {/* The heat shield's black tiles, on the side that faces down while it falls */}
            <path class="fill-ink" d="M-2.5 0V-21C-2.5 -24.6 -1.3 -27.3 0 -28V0Z" />
          </g>
        </g>
      </svg>
      <svg viewBox="-8 -54 23 54" class={catchFrame}>
        <Arm y={-38.2} class="stroke-ink [--open:-14deg]" />
      </svg>
    </div>
  </div>
));

interface TurbineProps {
  x: number;
  y: number;
  /** Seconds per turn, different for each turbine so they don't turn in step */
  period: number;
  class: string;
}

const Turbine = ({ x, y, period, class: className }: TurbineProps): JSXOutput => (
  <svg viewBox="-15 -15 30 39" class={["absolute -translate-x-1/2", className]} style={at(x, y)}>
    <path class="stroke-ink-sky" d="M0 0V24" stroke-width="1.8" stroke-linecap="round" />
    {/* The invisible circle centres the box on the hub, so the blades turn about it */}
    <g
      class="origin-center [transform-box:fill-box] motion-safe:animate-turbine"
      style={{ animationDuration: `${String(period)}s` }}
    >
      <circle r="14" fill="none" />
      {[14, 134, 254].map((angle) => (
        <ellipse
          key={angle}
          class="fill-ink-sky"
          cy="-7.4"
          rx="2.4"
          ry="6.6"
          transform={`rotate(${String(angle)})`}
        />
      ))}
    </g>
    <circle class="fill-ink-sky" r="2.5" />
    <circle class="fill-panel" r="1.1" />
  </svg>
);

interface PanelProps {
  /** Position in the row; panels stand one panel-width apart, however small the screen */
  i: number;
  y: number;
  glint?: boolean;
}

const Panel = ({ i, y, glint = false }: PanelProps): JSXOutput => (
  <svg
    viewBox="29.5 177 23 13.5"
    class="absolute w-[max(28px,3.8vw)] -translate-x-[45%] translate-y-[4%]"
    style={{ ...at(150, y), left: `calc(10.42% + ${String(i)} * max(28px, 3.8vw))` }}
  >
    <path
      class="stroke-ink-sky"
      d="M39.9 184.5V190M37.9 190h4"
      stroke-width="1.1"
      stroke-linecap="round"
      fill="none"
    />
    <path class="fill-blue-ink" d="M30 185.5h18l4-8H34z" />
    <path
      class="stroke-wash"
      d="M34.5 185.5l4-8M39 185.5l4-8M43.5 185.5l4-8M32 181.5h18"
      stroke-width="0.5"
      fill="none"
    />
    {glint && (
      <path
        class="fill-panel"
        d="M43.5 177.6L44.1 179.6L46.1 180.2L44.1 180.8L43.5 182.8L42.9 180.8L40.9 180.2L42.9 179.6Z"
      />
    )}
  </svg>
);

const windows = (left: number, count: number): JSXOutput[] =>
  Array.from({ length: count }, (_, i) => (
    <rect key={i} class="fill-panel" x={left + i * 4.5} y="193" width="2.9" height="2.6" rx="0.7" />
  ));

/** Catenary poles along the line, from the tunnel to past the right edge of the screen */
const poles = Array.from({ length: 12 }, (_, i) => 238 + i * 42);

/**
 * The viaduct carrying the line across the valley, in the Hills drawing. It runs into the ground,
 * and a copy of the near hill drawn over it hides that part.
 */
const viaduct = `M560 153.5H1440V200H560Z${Array.from({ length: 15 }, (_, i) => {
  const left = 604 + i * 56;
  return `M${String(left)} 200V166Q${String(left)} 159.5 ${String(left + 24)} 159.5Q${String(left + 48)} 159.5 ${String(left + 48)} 166V200Z`;
}).join("")}`;

/**
 * Solar panels, an electric train running from a tunnel across a viaduct and two wind turbines,
 * standing on the hills.
 */
export const HillsScene = component$(() => (
  <div aria-hidden="true" class={hillsBox}>
    <svg viewBox="0 0 1440 200" preserveAspectRatio="none" class="absolute inset-0 h-full w-full">
      <path class="fill-panel" fill-rule="evenodd" d={viaduct} />
      <path class="fill-hill-near" d={nearHill} />
    </svg>
    <Panel i={0} y={117.9} />
    <Panel i={1} y={112.8} glint />
    <Panel i={2} y={109.1} />

    <svg
      viewBox="146 179 152 27"
      class="absolute w-[max(130px,23vw)] translate-y-[16.7%] overflow-visible"
      style={at(340, 153)}
    >
      <path
        class="stroke-ink-sky"
        d={`M196 184.4${poles.map((x) => `Q${String(x - 21)} 185.6 ${String(x)} 184.4`).join("")}`}
        stroke-width="0.6"
        fill="none"
      />
      <path
        class="stroke-ink-sky"
        d={poles.map((x) => `M${String(x)} 202V181.2M${String(x)} 182h4.6`).join("")}
        stroke-width="1"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="fill-hill-near"
        d="M148 205C156 191 170 182.5 188 182.5C205 182.5 214 192 222 205Z"
      />
      <path class="fill-ink opacity-90" d="M182 202V193.5a7 7 0 0 1 14 0V202Z" />
      <radialGradient id="headlight">
        <stop offset="0" class="[stop-color:var(--color-dusk-sun)]" />
        <stop offset="1" class="[stop-color:var(--color-dusk-sun)]" stop-opacity="0" />
      </radialGradient>
      <ellipse
        class="opacity-0 motion-safe:animate-headlight"
        cx="189.5"
        cy="197"
        rx="6.5"
        ry="4.8"
        fill="url(#headlight)"
      />
      <clipPath id="tunnel-exit">
        <rect x="189" y="170" width="540" height="40" />
      </clipPath>
      <g clip-path="url(#tunnel-exit)">
        <path class="stroke-ink" d="M186 201.5H720" stroke-width="1" />
        <g class="motion-safe:animate-travel">
          <path
            class="stroke-ink"
            d="M248 191L251 188L248.5 185.2M246.5 185.2h4.5"
            stroke-width="0.8"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <rect class="fill-blue" x="188" y="191" width="24" height="9.5" rx="2.5" />
          <rect class="fill-blue" x="213.5" y="191" width="24" height="9.5" rx="2.5" />
          <path
            class="fill-blue"
            d="M239 193.5a2.5 2.5 0 0 1 2.5-2.5h14c3.5 0 6.5 4.2 6.5 9.5h-23z"
          />
          <path class="stroke-blue-ink" d="M188 199h74" stroke-width="1.6" />
          {windows(190.4, 5)}
          {windows(215.9, 5)}
          {windows(241.5, 3)}
          <path class="fill-panel" d="M255 193h1.6c1.6 0 3.2 1.1 4 2.6h-5.6z" />
        </g>
      </g>
      <path
        class="stroke-panel opacity-55"
        d="M180.6 202V193.5a8.4 8.4 0 0 1 16.8 0V202"
        stroke-width="1.2"
        fill="none"
      />
    </svg>

    <Turbine x={1120} y={68.4} period={10} class="w-[max(28px,3.75vw)] opacity-60" />
    <Turbine x={1395} y={64.9} period={6} class="hidden w-[6.25vw] md:block" />
  </div>
));

/**
 * A satellite circling the portrait on a dotted orbit. Phones' small portrait goes without. It
 * starts at 9 o'clock, so it never rests under the conferences at the hero's top right.
 */
export const SatelliteOrbit = component$(() => (
  <div
    aria-hidden="true"
    class="pointer-events-none absolute hidden h-[min(450px,54svh)] w-[min(450px,54svh)] -rotate-90 motion-safe:animate-orbit lg:block xl:h-[min(480px,57svh)] xl:w-[min(480px,57svh)]"
  >
    <span class="absolute inset-0 rounded-full border-2 border-dotted border-panel/70" />
    <svg
      viewBox="193.5 13.5 35 14.5"
      class="absolute left-1/2 top-0 w-[70px] -translate-x-1/2 -translate-y-1/2"
    >
      <rect class="fill-blue" x="194" y="20.5" width="12" height="5" rx="0.8" />
      <rect class="fill-blue" x="216" y="20.5" width="12" height="5" rx="0.8" />
      <path
        class="stroke-panel opacity-70"
        d="M197 20.5v5M200 20.5v5M203 20.5v5M219 20.5v5M222 20.5v5M225 20.5v5M194 23h12M216 23h12"
        stroke-width="0.4"
      />
      <path class="stroke-ink" d="M206 23h10" stroke-width="1" />
      <path class="stroke-ink" d="M211 19v-2.2" stroke-width="0.8" />
      <path class="fill-ink" d="M208.4 16.6a2.6 2.6 0 0 1 5.2 0z" />
      <rect class="fill-ink" x="207.5" y="19" width="7" height="8" rx="1.5" />
      <circle class="fill-blue motion-safe:animate-blink" cx="211" cy="23" r="1" />
    </svg>
  </div>
));
