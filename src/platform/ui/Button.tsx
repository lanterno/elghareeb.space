import { Link } from "@builder.io/qwik-city";

import { ExternalLink } from "./ExternalLink";

import type { ClassList, JSXChildren, JSXOutput } from "@builder.io/qwik";

/**
 * The pill buttons. One sunlit button per scene is the rule: `sun` by day and `dusk` in the
 * closing scene; the others are quiet.
 */
export type ButtonVariant =
  | "sun"
  | "panel"
  | "panel-compact"
  | "ink"
  | "ink-compact"
  | "dusk"
  | "wash";

const variants: Record<ButtonVariant, string> = {
  sun: "min-h-14 gap-2.5 bg-sun px-7 text-base text-ink shadow-sun transition-transform hover:-translate-y-0.5",
  panel: "min-h-14 bg-panel/94 px-[26px] text-base text-ink transition-colors hover:bg-panel",
  "panel-compact":
    "min-h-[52px] gap-2.5 bg-panel/94 px-6 text-[15px] text-ink transition-colors hover:bg-panel",
  ink: "min-h-[52px] gap-2.5 bg-ink px-6 text-[15px] text-panel",
  "ink-compact": "min-h-10 bg-ink px-[18px] text-sm text-panel",
  dusk: "min-h-[58px] gap-2.5 bg-dusk-sun px-[30px] text-base text-ink shadow-dusk-sun transition-transform hover:-translate-y-0.5",
  wash: "min-h-11 gap-2 bg-wash/16 px-5 text-sm transition-colors hover:bg-wash/28",
};

interface ButtonProps {
  /** "#talk" stays on the page, "/work/" navigates within the site, anything else leaves it */
  href: string;
  variant: ButtonVariant;
  class?: ClassList;
  /** Names the interaction the event beacon reports for a click on this button */
  "data-track"?: string;
  children?: JSXChildren;
}

export const Button = ({
  href,
  variant,
  class: className,
  children,
  ...rest
}: ButtonProps): JSXOutput => {
  const classes: ClassList = [
    "inline-flex items-center rounded-full font-bold",
    variants[variant],
    className,
  ];
  if (href.startsWith("#")) {
    return (
      <a href={href} class={classes} {...rest}>
        {children}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link href={href} class={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <ExternalLink href={href} class={classes} {...rest}>
      {children}
    </ExternalLink>
  );
};
