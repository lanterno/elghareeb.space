import ImgCairoWaterWeek from "~/media/cairo-water-week.png?jsx";
import ImgWebSummit from "~/media/web-summit.png?jsx";

import type { Conference } from "../model";

/** Each drops off the page the day after it ends */
export const conferences = [
  {
    name: "Cairo Water Week",
    href: "https://www.cairowaterweek.eg/",
    place: "Cairo",
    first: "2026-10-25",
    last: "2026-10-29",
    Logo: ImgCairoWaterWeek,
  },
  {
    name: "Web Summit",
    href: "https://websummit.com/",
    place: "Lisbon",
    first: "2026-11-09",
    last: "2026-11-12",
    Logo: ImgWebSummit,
  },
] as const satisfies readonly Conference[];
