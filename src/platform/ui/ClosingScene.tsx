import { component$ } from "@builder.io/qwik";

import { Hills } from "~/platform/scenery/Hills";
import { site } from "~/platform/seo";

import { Button } from "./Button";
import { ArrowRightIcon } from "./icons";

interface ClosingSceneProps {
  /** Quiet line above the title */
  eyebrow?: string;
  title: string;
  body: string;
}

/**
 * The dusk that ends every page: one invitation and the one sunlit button on that part of the
 * page. It reaches both edges of the screen, and the footer's ground continues below its hills.
 * The nav's "Let’s talk" jumps here.
 */
export const ClosingScene = component$<ClosingSceneProps>(({ eyebrow, title, body }) => (
  <section id="talk" aria-labelledby="talk-title" class="scroll-mt-6 pt-24 md:pt-[110px]">
    <div class="sky-dusk relative overflow-hidden rounded-t-scene pb-[160px] pt-12 text-dusk-ink md:pb-[170px] md:pt-16">
      <div
        aria-hidden="true"
        class="sun-glow-dusk absolute -bottom-[240px] right-[calc(50%-820px)] h-[480px] w-[680px] rounded-full"
      />
      <div class="wrap relative grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
        <div class="flex flex-col gap-4">
          {eyebrow !== undefined && <p class="text-[15px] font-bold text-dusk-muted">{eyebrow}</p>}
          <h2
            id="talk-title"
            class="text-[clamp(38px,5vw,68px)] leading-[1.02] tracking-[-0.03em] text-balance"
          >
            {title}
          </h2>
        </div>
        <div class="flex flex-col items-start gap-4">
          <p class="text-[17px] leading-relaxed text-dusk-muted">{body}</p>
          <Button href={site.social.linkedin.url} variant="dusk">
            Write to me on LinkedIn
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
      <Hills time="dusk" class="h-[140px]" />
    </div>
  </section>
));
