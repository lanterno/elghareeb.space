import { component$, useSignal, useStyles$, useVisibleTask$ } from "@builder.io/qwik";

import { pageHead } from "~/platform/seo";
import { ClosingScene, SectionHeading } from "~/platform/ui";

import styles from "./meadow.css?inline";

import type { JSXOutput } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

/** The scene's own script (public/meadow/meadow.js) puts this on `window` */
interface MeadowScene {
  mount(host: HTMLElement): MeadowScene;
  play(): void;
  pause(): void;
  camera(view: { zoom: number; fx: number; fy: number }): void;
  hour(h: number): void;
}

declare global {
  interface Window {
    Meadow?: MeadowScene;
  }
}

/** Stops along the scroll: [progress, zoom, focus x, focus y], focus in fractions of the painting */
const cameraStops = [
  [0, 1, 0.62, 0.5],
  [0.14, 1.1, 0.6, 0.45],
  [0.3, 1.35, 0.84, 0.32],
  [0.46, 1.22, 0.5, 0.3],
  [0.62, 1.3, 0.48, 0.82],
  [0.8, 1.05, 0.62, 0.5],
  [1, 1, 0.6, 0.5],
] as const;

/** [progress, hour]: 0 is the afternoon, 0.33 golden hour, 0.66 dusk, 1 night */
const hourStops = [
  [0, 0],
  [0.28, 0],
  [0.42, 0.33],
  [0.6, 0.66],
  [0.78, 1],
  [1, 1],
] as const;

/** Where each chapter of the journey begins */
const chapterStarts = [0, 0.1, 0.3, 0.5, 0.7];

const chapters = [
  {
    hour: "Afternoon",
    title: "Everyone has somewhere to be.",
    body: "A rocket ship touches down on the castle’s pad and opens its door. The steam train halts at the station, the sheep wander off to graze, and a kid keeps a kite up over the lake.",
  },
  {
    hour: "Golden hour",
    title: "Something long in the sky.",
    body: "A jade dragon threads between the towers. Far off on the shore, a giant walks the hills with its visor lit. When the rocket ship leaves, a rider on a hoverboard races it up.",
  },
  {
    hour: "Dusk",
    title: "The lamps come on.",
    body: "The light goes warm, then violet. The windows fill with lamplight, and the fox spirit under the tree on the right keeps its three fires burning.",
  },
  {
    hour: "Night",
    title: "Fireflies over the meadow.",
    body: "Stars come out above the clouds and the moon rises. The clock on the tower keeps your time: it reads the hour from your own device.",
  },
];

const residents = [
  {
    id: "ship",
    name: "The rocket ship",
    line: "Lands on the castle’s pad once a minute, opens its door, and leaves the way it came.",
  },
  {
    id: "dragon",
    name: "The jade dragon",
    line: "Threads the towers in the afternoon, and is gone before the train comes back.",
  },
  {
    id: "mecha",
    name: "The giant on the shore",
    line: "Walks the far hills from one edge to the other. Its thrusters fire every twelve seconds.",
  },
  {
    id: "fox",
    name: "The fox spirit",
    line: "Sits under the tree on the right with three fox-fires circling it, brightest after dark.",
  },
  {
    id: "rider",
    name: "The hoverboard rider",
    line: "Waits for the rocket ship to lift off, then races it up past the windmill.",
  },
  {
    id: "train",
    name: "The steam train",
    line: "Two passes a minute, one each way, with a stop at the station by the library.",
  },
  {
    id: "airship",
    name: "The airship",
    line: "Patched in two colours, it drifts the length of the sky and slips behind the towers.",
  },
  {
    id: "flock",
    name: "The flock",
    line: "Nine sheep, two of them lambs, each with four favourite spots to graze.",
  },
] as const;

const notes = [
  {
    title: "Drawn in code",
    body: "Every roof tile, cloud and character is SVG written by a script, then painted by a headless browser. There is no hand-drawn file to open.",
  },
  {
    title: "Cut from one painting",
    body: "The castle and the foreground are lifted out of the painting with masks, so a dragon can pass behind a tower and the train behind the clock tower.",
  },
  {
    title: "Sixty seconds, exactly",
    body: "Each thing that moves is a function of the time, on a period that divides a minute. The scene comes back to where it started without a seam.",
  },
  {
    title: "Night from the same pixels",
    body: "The lit windows were picked out of the afternoon painting by their colour, so they can glow when the scroll brings the night.",
  },
];

const wallpapers = [
  { label: "MacBook", size: "3456 × 2234", file: "meadow-macbook-3456x2234.jpg", mb: "1.2" },
  { label: "4K display", size: "3840 × 2160", file: "meadow-4k-3840x2160.jpg", mb: "1.2" },
  { label: "5K display", size: "5120 × 2880", file: "meadow-5k-5120x2880.jpg", mb: "1.9" },
  { label: "Phone", size: "1290 × 2796", file: "meadow-phone-1290x2796.jpg", mb: "0.7" },
];

/** A value between stops, eased so the camera and the light never jerk at a stop */
function between(stops: readonly (readonly number[])[], p: number, i: number): number {
  const at = (k: number, j: number): number => stops[k]?.[j] ?? 0;
  let k = 0;
  while (k < stops.length - 2 && p > at(k + 1, 0)) k++;
  const u = Math.min(1, Math.max(0, (p - at(k, 0)) / (at(k + 1, 0) - at(k, 0))));
  const e = u * u * (3 - 2 * u);
  return at(k, i) + (at(k + 1, i) - at(k, i)) * e;
}

/** /meadow/ — a living painting, and a day that passes as you scroll */
export default component$(() => {
  useStyles$(styles);
  const journey = useSignal<HTMLElement>();
  const host = useSignal<HTMLElement>();

  // The scene draws itself in the browser, so it starts once the page is on screen
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$((task) => {
    const section = journey.value;
    const stage = host.value;
    if (section === undefined || stage === undefined) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scene: MeadowScene | undefined;
    let visible = true;

    const follow = (): void => {
      const box = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -box.top / (box.height - innerHeight)));
      let c = 0;
      while (c < chapterStarts.length - 1 && p >= (chapterStarts[c + 1] ?? 2)) c++;
      // Set by hand: a re-render here would take the scene's own nodes out of the host
      section.querySelectorAll<HTMLElement>("[data-chapter]").forEach((el) => {
        el.toggleAttribute("data-on", el.dataset["chapter"] === String(c));
      });
      if (scene === undefined) return;
      scene.camera({
        zoom: between(cameraStops, p, 1),
        fx: between(cameraStops, p, 2),
        fy: between(cameraStops, p, 3),
      });
      scene.hour(between(hourStops, p, 1));
    };

    const start = (): void => {
      if (window.Meadow === undefined) return;
      scene = window.Meadow.mount(stage);
      follow();
      if (!still && visible) scene.play();
    };

    const watch = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (scene === undefined || still) return;
      if (visible) scene.play();
      else scene.pause();
    });
    watch.observe(section);
    addEventListener("scroll", follow, { passive: true });

    if (window.Meadow !== undefined) start();
    else {
      const script = document.createElement("script");
      script.src = "/meadow/meadow.js";
      script.onload = start;
      document.head.append(script);
    }

    task.cleanup(() => {
      removeEventListener("scroll", follow);
      watch.disconnect();
      scene?.pause();
    });
  });

  return (
    <>
      {/* The journey: the scene stays on screen while a day goes by */}
      <section
        ref={journey}
        aria-labelledby="meadow-title"
        class="relative -mt-[76px] h-[640svh] md:-mt-[84px]"
      >
        <div ref={host} class="mw-host sticky top-0 h-svh w-full overflow-hidden bg-[#7fa857]">
          <div aria-hidden="true" class="mw-shade pointer-events-none absolute inset-0 z-[1]" />

          <div
            class="mw-card mw-title absolute z-[2] flex flex-col gap-4"
            data-chapter="0"
            data-on=""
          >
            <p class="text-[15px] font-bold text-leaf-ink">A living painting</p>
            <h1
              id="meadow-title"
              class="text-[clamp(48px,7vw,92px)] leading-[0.95] tracking-[-0.025em]"
            >
              The Meadow
            </h1>
            <p class="max-w-[30em] text-[17px] leading-relaxed text-ink-sky">
              A house on four iron legs stands in an alpine meadow above the lake. Everything in it
              moves, and all of it comes back around every sixty seconds.
            </p>
            <p class="mw-cue inline-flex items-center gap-2 text-sm font-bold text-ink-muted">
              <span aria-hidden="true" class="mw-cue-dot" />
              Scroll to watch the day go by
            </p>
          </div>

          {chapters.map((c, i) => (
            <div
              key={c.hour}
              class="mw-card mw-chapter absolute z-[2] flex flex-col gap-3"
              data-chapter={String(i + 1)}
            >
              <p class="text-[15px] font-bold text-leaf-ink">{c.hour}</p>
              <h2 class="text-[clamp(28px,3.2vw,40px)] leading-[1.05] tracking-[-0.02em] text-balance">
                {c.title}
              </h2>
              <p class="text-[16px] leading-relaxed text-ink-sky">{c.body}</p>
            </div>
          ))}

          <ol
            aria-label="Time of day"
            class="mw-hours absolute z-[2] hidden flex-col gap-3 md:flex"
          >
            {chapters.map((c, i) => (
              <li key={c.hour} data-chapter={String(i + 1)}>
                {c.hour}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The residents */}
      <section
        aria-labelledby="residents-title"
        class="wrap flex flex-col gap-8 pt-24 md:pt-[110px]"
      >
        <SectionHeading
          id="residents-title"
          title="Who lives here."
          lede="Eight regulars, each on their own schedule inside the same minute."
        />
        <ul class="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {residents.map((r) => (
            <li
              key={r.id}
              class="flex flex-col overflow-hidden rounded-card bg-panel shadow-raised"
            >
              <div aria-hidden="true" class={["mw-window", `mw-w-${r.id}`]}>
                <Portrait id={r.id} />
              </div>
              <div class="flex flex-col gap-2 p-6">
                <h3 class="text-xl">{r.name}</h3>
                <p class="text-[15px] leading-relaxed text-ink-sky">{r.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* How it moves */}
      <section aria-labelledby="how-title" class="wrap flex flex-col gap-8 pt-24 md:pt-[110px]">
        <SectionHeading
          id="how-title"
          title="How it moves."
          lede="No video and no game engine: one page of HTML that redraws itself on every frame."
        />
        <ul class="grid gap-[18px] sm:grid-cols-2">
          {notes.map((n, i) => (
            <li
              key={n.title}
              data-tone={(["teal", "orange", "lavender", "blue"] as const)[i]}
              class="flex flex-col gap-3 rounded-card bg-tone-tint p-[26px]"
            >
              <h3 class="text-xl text-tone-ink">{n.title}</h3>
              <p class="text-[16px] leading-relaxed text-ink-sky">{n.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Take it home */}
      <section aria-labelledby="take-title" class="wrap flex flex-col gap-8 pt-24 md:pt-[110px]">
        <SectionHeading
          id="take-title"
          title="Take it home."
          lede="The afternoon as a still, cut to the shape of your screen."
        />
        <ul class="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {wallpapers.map((w) => (
            <li key={w.file} class="flex flex-col gap-4 rounded-card bg-panel p-6 shadow-raised">
              <div class="flex flex-col gap-1">
                <h3 class="text-xl">{w.label}</h3>
                <p class="text-sm text-ink-muted tabular-nums">
                  {w.size} · {w.mb} MB
                </p>
              </div>
              <a
                href={`/meadow/wallpapers/${w.file}`}
                download
                data-track="wallpaper"
                class="inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-wash/16 px-5 text-sm font-bold text-ink transition-colors hover:bg-wash/28"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </section>

      <ClosingScene
        eyebrow="Thanks for staying till dark"
        title="Like the meadow?"
        body="Tell me what you would add to it, or what you are building."
      />
    </>
  );
});

/** The little scene on each resident's card: the same sprites the painting uses */
const Portrait = ({ id }: { id: string }): JSXOutput => {
  const src = (name: string): string => `/meadow/${name}.webp`;
  switch (id) {
    case "ship":
      return (
        <div class="mw-float">
          <img src={src("flame2")} alt="" width={40} height={70} class="mw-flame" />
          <img src={src("ship")} alt="" width={100} height={158} class="mw-ship-body" />
        </div>
      );
    case "dragon":
      return (
        <div class="mw-float mw-dragon-fly">
          <svg viewBox="0 0 220 90" class="mw-dragon-body">
            <path
              d="M10 60 C 40 20, 70 80, 100 45 S 150 20, 175 40"
              fill="none"
              stroke="#2b1d16"
              stroke-width="17"
              stroke-linecap="round"
            />
            <path
              d="M10 60 C 40 20, 70 80, 100 45 S 150 20, 175 40"
              fill="none"
              stroke="#4fb39a"
              stroke-width="14"
              stroke-linecap="round"
            />
            <path
              d="M12 62 C 42 24, 70 84, 101 49 S 150 25, 175 44"
              fill="none"
              stroke="#f3e7cf"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
          <img src={src("dhead")} alt="" width={60} height={38} class="mw-dragon-head" />
        </div>
      );
    case "mecha":
      return <div class="mw-mecha-walk" />;
    case "fox":
      return (
        <div class="mw-fox">
          <img src={src("foxtail")} alt="" width={18} height={42} class="mw-tail mw-tail-1" />
          <img src={src("foxtail")} alt="" width={18} height={42} class="mw-tail mw-tail-2" />
          <img src={src("foxtail")} alt="" width={18} height={42} class="mw-tail mw-tail-3" />
          <img src={src("fox")} alt="" width={28} height={46} class="mw-fox-body" />
          <span class="mw-orbit">
            <img src={src("foxfire")} alt="" width={16} height={22} />
            <img src={src("foxfire")} alt="" width={16} height={22} />
            <img src={src("foxfire")} alt="" width={16} height={22} />
          </span>
        </div>
      );
    case "rider":
      return <img src={src("surfer")} alt="" width={38} height={46} class="mw-rider" />;
    case "train":
      return (
        <div class="mw-train">
          <img src={src("car_gold")} alt="" width={84} height={48} />
          <img src={src("car_teal")} alt="" width={84} height={48} />
          <img src={src("tender")} alt="" width={40} height={42} />
          <img src={src("loco")} alt="" width={92} height={58} />
        </div>
      );
    case "airship":
      return (
        <img src={src("airship")} alt="" width={166} height={82} class="mw-float mw-airship" />
      );
    default:
      return (
        <div class="mw-flock">
          <span class="mw-sheep" />
          <span class="mw-sheep mw-lamb" />
        </div>
      );
  }
};

export const head: DocumentHead = pageHead({
  title: "The Meadow",
  description:
    "A living painting drawn in code: a walking house, a rocket ship, a dragon and a steam train in an alpine meadow, looping every sixty seconds from afternoon to night.",
  path: "/meadow/",
});
