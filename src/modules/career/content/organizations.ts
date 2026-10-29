import type { Organization, OrgId } from "../model";

/** The registry every other record points at by id, so each organisation is described once */
export const organizations = {
  resilio: {
    name: "Resilio",
    url: "https://resilio.tech",
    tone: "teal",
    markHeight: "h-[1em]",
  },
  c4dt: {
    name: "C4DT",
    fullName: "Center for Digital Trust (C4DT), EPFL",
    url: "https://c4dt.epfl.ch",
    tone: "blue",
    markHeight: "h-[0.8em]",
  },
  backMarket: {
    name: "Back Market",
    url: "https://www.backmarket.com",
    tone: "orange",
    markHeight: "h-[1em]",
  },
  climatebase: {
    name: "Climatebase",
    url: "https://climatebase.org",
    tone: "lavender",
    markHeight: "h-[1em]",
  },
  archetype: {
    name: "Archetype",
    url: "https://github.com/archetype-pal",
    tone: "coral",
    markHeight: "h-[1.05em]",
  },
  lifePete: {
    name: "LifePete",
    url: "https://lifepete.com",
    tone: "orange",
    markHeight: "h-[1em]",
  },
  transparium: {
    name: "Transparium",
    url: "https://transparium.com",
    tone: "blue",
    markHeight: "h-[0.8em]",
  },
} as const satisfies Record<OrgId, Organization>;
