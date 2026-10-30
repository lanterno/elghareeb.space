# Writing a post

Copy `src/modules/blog/posts/_template` to `src/modules/blog/posts/<slug>/`. The folder name is the
URL (`/blog/<slug>/`), so don't rename it once the post is published.

## Frontmatter

```markdown
---
title: Measuring what the cloud costs the sky
description: One sentence; it stands alone on the list and in feed readers.
published: 2026-03-14 # a future date schedules the post: the daily rebuild publishes it that day
updated: 2026-04-02 # optional, not before published; shown and sent to search engines
tags: [climate, software] # from content/tags.ts; the first one sets the post's colour
draft: true # kept out of builds but visible in `bun run dev`; remove when ready
---
```

The build validates this and names the post and field on failure, so CI blocks a broken post.
Tags are a small fixed set; to add one, add a line to `content/tags.ts`.

## What the markdown turns into

- `##` and `###` headings make the table of contents (shown from three `##` up) and get anchors.
  Don't write a `#` heading: the title is the `h1`.
- Code blocks are highlighted at build time; no JavaScript ships for it.
- Images sit in the post's folder and are written as plain markdown. They come out as lazy-loaded
  WebP at several widths; the title becomes a caption: `![What it shows](./fig.png "Caption")`.
- Quotes are set in the post's colour.
- Internal links are paths (`/work/`), external ones full URLs.
- A post that needs a component is `index.mdx` instead; everything above still applies.

## Checking

Drafts are visible in `bun run dev`. The draft `style-guide` post exercises every element the
reading design covers; if something in your post looks wrong, add the case there first. Remove
`draft: true` (or set the `published` date) and open a PR. On merge the post is in the list, the
sitemap and `/blog/rss.xml`.
