/**
 * Data colours. Each organisation, field and project carries one tone so it reads as the same
 * thing everywhere on the site. A tone is applied with `data-tone`, and everything inside then
 * uses the `tone`, `tone-ink` and `tone-tint` colours (see design/theme.css).
 */
export const tones = ["blue", "teal", "orange", "lavender", "coral"] as const;

export type Tone = (typeof tones)[number];
