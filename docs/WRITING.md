# Writing a post

Posts are markdown files in the codebase. Adding one is: copy the template, write, open a PR.

## 1. Copy the template

```bash
cp -r src/modules/blog/posts/_template src/modules/blog/posts/my-post-slug
```

The folder name is the post's slug and its URL: `/blog/my-post-slug/`. Use lowercase words
joined by hyphens, and don't rename the folder once the post is published (that changes the URL).

## 2. Fill in the frontmatter

```markdown
---
title: Measuring what the cloud costs the sky
description: One sentence used on the card, in search results and in the RSS feed.
published: 2026-03-14
updated: 2026-04-02 # optional; only once you've changed something worth noting
tags: [climate, software] # at least one; the first sets the post's colour
draft: true # remove the line when the post is ready
---
```

| Field         | Rules                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `title`       | Required. Sentence case, like every title on the site.                                                               |
| `description` | Required. One sentence; it stands alone on the list and in feed readers.                                             |
| `published`   | Required, `YYYY-MM-DD`. A date in the future schedules the post: the site rebuilds daily, so it appears on that day. |
| `updated`     | Optional, `YYYY-MM-DD`, not before `published`. Shown next to the date and sent to search engines.                   |
| `tags`        | Required, one or more of the tags in `src/modules/blog/content/tags.ts`. The first tag gives the post its tone.      |
| `draft`       | Optional. `true` keeps the post out of builds; it still shows in `bun run dev`.                                      |

The build checks all of this. A wrong date, an unknown tag or a missing field fails
`bun run build` with a message naming the post and the field, and CI blocks the PR.

## 3. Write

Plain markdown, with GitHub-flavoured tables and task lists. What you get:

- **Headings** `##` and `###` become the table of contents (shown from three `##` sections up:
  beside the text on wide screens, folded above it on smaller ones) and get `#` anchors on hover.
  Don't use `#`: the title is the `h1`, the first line of the post.
- **Code blocks** with a language (` ```python `) are highlighted while the site is built; no
  JavaScript is sent for it. Inline code uses backticks.
- **Images** live in the post's folder and are written the usual way:
  `![What it shows](./diagram.png "An optional caption")`. They're converted to WebP at several
  sizes and lazy-loaded. Give every image an `alt` text that says what it shows; a title
  becomes a caption under it. PNG, JPEG and WebP sources all work.
- **Quotes** (`>`) are set apart in the post's colour. **Tables**, **lists** and horizontal rules
  (`---`) are styled.
- **Links** inside the site are written as paths (`/work/`), outside as full URLs.

For the rare post that needs a component, name the file `index.mdx` instead and import it; see
the [MDX docs](https://mdxjs.com/). Everything above still applies.

## 4. Check it

```bash
bun run dev
```

Open `http://localhost:5173/blog/my-post-slug/`. Drafts are visible here. The draft
`style-guide` post shows every element the design covers; if something in your post looks
wrong, add the case there first.

Then run the same checks as CI:

```bash
bun run build && bun test
```

## 5. Publish

Remove `draft: true` (or set `published` to the day you want), open a PR, merge. The site
deploys on merge, and the post is in the list, in the sitemap and in `/blog/rss.xml`.

## Tags

Tags are a small fixed set so they stay meaningful, each with a colour from the site's palette.
To add one, add a line to `src/modules/blog/content/tags.ts`; the build will then accept it.
