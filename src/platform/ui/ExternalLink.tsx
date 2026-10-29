import type { ClassList, JSXChildren, JSXOutput } from "@builder.io/qwik";

interface ExternalLinkProps {
  href: string;
  class?: ClassList;
  /** Lets a handful of elements be found by a script, e.g. the conference links */
  "data-last"?: string;
  style?: Record<string, string>;
  children?: JSXChildren;
}

/** A link to another site: opens in a new tab without handing it our window. */
export const ExternalLink = ({
  href,
  class: className,
  children,
  ...rest
}: ExternalLinkProps): JSXOutput => (
  <a href={href} target="_blank" rel="noopener noreferrer" class={className} {...rest}>
    {children}
  </a>
);
