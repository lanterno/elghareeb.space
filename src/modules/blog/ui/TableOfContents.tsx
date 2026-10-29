import type { Heading } from "../model";
import type { JSXOutput } from "@builder.io/qwik";

interface TableOfContentsProps {
  headings: readonly Heading[];
  /** `aside` for the column beside the text; `folded` for a closed list above it on small screens */
  variant: "aside" | "folded";
}

/** Sections of a post, from its h2 and h3 headings. Shown only when there is enough to list. */
export const TableOfContents = ({ headings, variant }: TableOfContentsProps): JSXOutput | null => {
  const items = headings.filter((heading) => heading.level === 2 || heading.level === 3);
  if (items.filter((heading) => heading.level === 2).length < 3) return null;

  const list = (
    <ol class="flex flex-col gap-0.5">
      {items.map((heading) => (
        <li key={heading.id} class={heading.level === 3 ? "pl-3" : undefined}>
          <a
            href={`#${heading.id}`}
            class="block rounded-[12px] px-3 py-1.5 leading-snug text-ink-sky transition-colors hover:bg-wash/16 hover:text-ink"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "folded") {
    return (
      <details class="mb-6 rounded-tile bg-wash/16 px-3 py-2 text-[15px] lg:hidden">
        <summary class="cursor-pointer px-3 py-1.5 font-bold text-ink">On this page</summary>
        <nav aria-label="On this page" class="pb-1 pt-1">
          {list}
        </nav>
      </details>
    );
  }
  return (
    <nav aria-label="On this page" class="flex flex-col gap-2 border-l border-ink/9 pl-3 text-sm">
      <p class="px-3 font-bold text-ink-muted">On this page</p>
      {list}
    </nav>
  );
};
