/**
 * Data colours. Each organisation, domain and project carries one tone so it
 * reads as the same thing everywhere on the site. Class names are spelled out
 * in full so Tailwind can find them.
 */
export const tones = ["blue", "teal", "orange", "lavender", "coral"] as const;

export type Tone = (typeof tones)[number];

interface ToneClasses {
  /** Small dot beside a name */
  readonly dot: string;
  /** Text on a panel or on the tone's own tint */
  readonly ink: string;
  /** Background fill for tiles, chips and covers */
  readonly tint: string;
}

export const toneClasses = {
  blue: { dot: "bg-blue", ink: "text-blue-ink", tint: "bg-blue-tint" },
  teal: { dot: "bg-teal", ink: "text-teal-ink", tint: "bg-teal-tint" },
  orange: { dot: "bg-orange", ink: "text-orange-ink", tint: "bg-orange-tint" },
  lavender: { dot: "bg-lavender", ink: "text-lavender-ink", tint: "bg-lavender-tint" },
  coral: { dot: "bg-coral", ink: "text-coral-ink", tint: "bg-coral-tint" },
} as const satisfies Record<Tone, ToneClasses>;
