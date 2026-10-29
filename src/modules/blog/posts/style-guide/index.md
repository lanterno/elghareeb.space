---
title: The style guide, as a post
description: Every kind of thing a post can contain, so the reading design can be checked in one place. A draft, so it never ships.
published: 2026-01-01
updated: 2026-01-02
tags: [software, climate]
draft: true
---

This post exists to exercise the reading design. It is a draft, so it shows in `bun run dev` and
never in a build. If something in a real post looks wrong, add the case here first.

## Text

A paragraph with **bold**, _italic_, `inline code`, a [link to the Work page](/work/) and an
[external link](https://qwik.dev). Then a second sentence, long enough to wrap on a phone and
to show the measure of the column on a wide screen, because line length is most of what makes
long-form text pleasant to read.

> A quote, set apart. Something someone said that is worth keeping — or a warning, when the
> post needs one.

### A third-level heading

- A list item
- Another, with `code` in it
- A third one that runs long enough to wrap onto a second line so the hanging indent is visible

1. Ordered lists too
2. With a few steps
3. And a last one

#### Fourth level, rarely used

A short paragraph under it.

## Code

Inline code looks like `assertValid("career", schema, content)`. Blocks are highlighted at build
time, with no JavaScript:

```python
def completed_months(start: date, today: date) -> int:
    """Whole months between two days: 7 Dec 2025 to 17 Oct 2026 is 10."""
    months = (today.year - start.year) * 12 + (today.month - start.month)
    return months - 1 if today.day < start.day else months
```

```ts
export function plural(count: number, unit: string): string {
  return `${count.toLocaleString("en-US")} ${unit}${count === 1 ? "" : "s"}`;
}
```

```bash
bun install
bun run dev
```

## Images

An image kept beside the post, written in plain markdown, with a caption:

![Rolling hills under an afternoon sky](./hills.png "The hills, as the site draws them")

And one inline ![small hills](./hills.png) inside a sentence.

## Tables

| Check | Result     |
| ----- | ---------- |
| Types | ✅ clean   |
| Lint  | ✅ clean   |
| Build | ✅ 5 pages |

## The end

A horizontal rule closes a section:

---

And the last paragraph says goodbye.
