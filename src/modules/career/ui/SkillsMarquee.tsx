import { component$ } from "@builder.io/qwik";

import { skillHighlights } from "../content";

/**
 * A tilted dark band of skills scrolling sideways. The list is drawn twice so
 * the loop is seamless; the copy is hidden from screen readers, and the band
 * stands still for people who ask for reduced motion.
 */
export const SkillsMarquee = component$(() => (
  <div class="relative -mt-[18px] -rotate-[1.6deg] scale-[1.04] overflow-hidden bg-ink py-4 text-panel md:py-[22px]">
    <div class="flex w-max motion-safe:animate-drift">
      {[false, true].map((isCopy) => (
        <ul
          key={String(isCopy)}
          aria-label={isCopy ? undefined : "Skills"}
          aria-hidden={isCopy ? "true" : undefined}
          class="flex items-center gap-[22px] whitespace-nowrap pr-[22px] font-display text-[22px] font-extrabold md:gap-[34px] md:pr-[34px] md:text-[30px]"
        >
          {skillHighlights.map((skill) => (
            <li
              key={skill.name}
              data-tone={skill.tone}
              class="flex items-center gap-[22px] md:gap-[34px]"
            >
              {skill.name}
              <span aria-hidden="true" class="h-2.5 w-2.5 rounded-full bg-tone" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
));
