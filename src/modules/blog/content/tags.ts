import type { Tone } from "~/platform/kernel";

/**
 * The tags a post may carry, each with the tone it lends to the post. A post's first tag sets
 * its tone, so the registry keeps the site's rule of one tone per thing.
 */
export const tags = {
  identity: { label: "Digital identity", tone: "blue" },
  climate: { label: "Climate", tone: "teal" },
  software: { label: "Software", tone: "orange" },
  "sustainable-it": { label: "Sustainable IT", tone: "lavender" },
  research: { label: "Research", tone: "coral" },
} as const satisfies Record<string, { label: string; tone: Tone }>;

export type TagId = keyof typeof tags;

export const tagIds = Object.keys(tags) as readonly TagId[];
