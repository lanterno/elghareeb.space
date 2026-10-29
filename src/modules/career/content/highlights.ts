import type { AffiliationRow, Highlight } from "../model";

/** The three facts around the portrait on the home page */
export const highlights = [
  { label: "Staff engineer · Resilio", org: "resilio" },
  { label: "Founder at lifepete.com", org: "lifePete" },
  { label: "Climatebase Fellow", org: "climatebase" },
] as const satisfies readonly Highlight[];

/** The organisation rows under the hero's introduction */
export const affiliations = [
  { label: "Also building at:", orgs: ["resilio", "transparium", "lifePete", "archetype"] },
  { label: "Built before:", orgs: ["c4dt", "backMarket"] },
] as const satisfies readonly AffiliationRow[];
