# Blog roadmap

Status: **M1–M5 done**; M6 items remain on demand. `docs/WRITING.md` is the authoring guide.

The blog is one more vertical slice: `modules/blog`, owning its model, its posts, its queries, its
UI and its pages. Posts are **markdown files in the codebase** — one folder per post under
`src/modules/blog/posts/`. The rest of the site is touched in exactly three known places: two route
files and one nav entry.

## Feasibility — verified against this codebase (spike, then deleted)

| Concern                                                            | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Plain `.md` files (not only `.mdx`)                                | ✅ Qwik City compiles `.md`, `.mdx` and `.markdown`                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Posts living **inside the module**, not under `routes/`            | ✅ `import.meta.glob` over `modules/blog/posts/*/index.md` renders fine                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `/blog/[slug]/` as a one-line route re-export + `onStaticGenerate` | ✅ SSG emitted `dist/blog/hello-world/index.html`                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Syntax highlighting with **zero JavaScript**                       | ✅ built-in Prism runs at build time (`<span class="token keyword">`), only needs CSS                                                                                                                                                                                                                                                                                                                                                                                                            |
| Heading anchors and a table of contents                            | ✅ `#`-links injected; each post exports `headings` (text, id, level)                                                                                                                                                                                                                                                                                                                                                                                                                            |
| RSS                                                                | ✅ a `routes/blog/rss.xml` endpoint is written to `dist/blog/rss.xml` as a real file                                                                                                                                                                                                                                                                                                                                                                                                             |
| Sitemap                                                            | ✅ generated post pages appear automatically                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Scheduled publishing                                               | ✅ for free: the site already rebuilds daily, so a post with a future `published` date appears on its day                                                                                                                                                                                                                                                                                                                                                                                        |
| **Images beside a post**, written as plain `![alt](./diagram.png)` | ✅ with a ~60-line remark plugin (`platform/build/remark-local-images.ts`): the image is imported through Qwik's `?jsx` pipeline and comes out as WebP at several widths with a `srcset`, exactly like the site's other images. Works in the static build and in `bun run dev`; remote and absolute URLs are left alone. Without the plugin plain markdown images are **broken** (the path is kept verbatim and the file is never copied); the `.mdx` import form works but is clumsier to write |

Remaining small items, each pinned to a milestone below: the navbar's width with a fifth item on
phones (M2), and that a post's `<title>`/meta must come from our `pageHead` (the automatic
frontmatter→head only applies to route files — we set it ourselves anyway). Nothing unverified is
left on the critical path.

## Target shape

```
src/modules/blog/
  index.ts                       # public API: queries + PostCard (for a home-page teaser later)
  model.ts                       # PostFrontmatter schema + Post type + tag registry rules
  content/tags.ts                # tag → tone + label ("climate" → teal…), so tags match the site's tones
  posts/
    <slug>/index.md              # the post; the folder name is the slug and the URL
    <slug>/…                     # images and files belonging to the post
  repository.ts                  # import.meta.glob over posts/ → validated, sorted Post[]
  queries.ts                     # published(today) · byTag · latest(n) · previousAndNext(slug)
  ui/                            # PostCard · PostHeader · TableOfContents · prose.css
  pages/BlogPage.tsx             # /blog/ — the list
  pages/PostPage.tsx             # /blog/<slug>/ — one post (+ head + onStaticGenerate)
  blog.test.ts

src/app/routes/blog/index.tsx        → re-export from ~/modules/blog
src/app/routes/blog/[slug]/index.tsx → re-export from ~/modules/blog
src/app/routes/blog/rss.xml/index.ts → onGet, rendering from the module's queries
src/platform/seo/site.ts             → one nav entry: { label: "Blog", href: "/blog/" }
src/platform/build/remark-local-images.ts → plain markdown images → optimised Qwik images
vite.config.ts                       → qwikCity({ …, mdx: { remarkPlugins: [remarkLocalImages] } })
```

### A post

```markdown
---
title: Measuring what the cloud costs the sky
description: One sentence used on the card, in search results and in the RSS feed.
published: 2026-03-14
updated: 2026-04-02 # optional
tags: [climate, software] # first tag sets the post's tone
draft: true # optional; kept out of the build until removed
---

## The problem

Prose, `code`, quotes, and images kept beside the post:

![How the numbers flow](./flow.png "Optional caption")
```

Images live in the post's folder and are written in plain markdown. At build time they become
WebP at several widths with a `srcset` (the same pipeline as the portrait and the conference
logos), lazy-loaded, with their width and height set so the page doesn't jump.

Frontmatter is validated by Valibot during the build, exactly like the other modules' content: a
bad date, an unknown tag or a duplicate slug **fails `bun run build`** with a message naming the
field. CI already runs the build on every PR, so a broken post can't reach `main`.

## Design: the same language, applied to reading

No new colours, faces or shapes — the blog reuses the design system:

- **Pages open like every page**: `PageHeader` with the hills, and close with the dusk
  `ClosingScene` ("Read something you'd like to build on? Let's talk.").
- **The list** is a grid of `PostCard`s shaped like `ProjectCard`: a `bg-tone-tint` header area
  (date + tags) over a panel, title in the display face, the description, "Read →" in the tone's
  ink. A post's tone comes from its first tag via `content/tags.ts`, using `data-tone` like
  everything else.
- **The post body** sits on a `bg-panel rounded-panel shadow-raised` reading column (the featured
  project's panel), measure ~65ch, body in Zen Maru Gothic with the existing ink colours, headings
  in M PLUS Rounded.
- **`prose.css`** lives in the module (`ui/`), built only from `platform/design` tokens: links
  underlined `decoration-ink/30` like the rest of the site; blockquotes on `bg-wash/16`; inline
  code as small wash chips; **code blocks on the ink-dark band** (the SkillsMarquee's ground) with
  Prism token colours mapped to the five tones; heading anchors show a quiet `#` on hover.
- **Tags are `Chip`s**, `variant="tone"`.
- **Dates** go through `platform/kernel` (`formatDay`), so they read like every date on the site.

## Milestones

Each ships on its own; the site stays releasable after every one.

| #      | Milestone                     | Contents                                                                                                                                                                                                                                                                                                                                                    | Done when                                                                                                                                                                 |
| ------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **M1** | **Module skeleton** (S)       | `model.ts` (frontmatter schema, tag registry), `repository.ts` (glob → validate → sort, newest first; drafts and future dates excluded by `published(today)`), `queries.ts`, tests. `platform/build/remark-local-images.ts` wired into `vite.config.ts`, with a default `sizes` matching the reading column so browsers pick the right width. No pages yet. | `bun test` covers sorting, drafts, future dates, unknown tags and duplicate slugs; a bad fixture fails validation; a fixture post with a local image builds to a `srcset` |
| **M2** | **Pages and routes** (M)      | `BlogPage` (list), `PostPage` (renders the compiled markdown; `head` from frontmatter via `pageHead`; `onStaticGenerate`; 404 status for unknown slugs), the two route re-exports, the nav entry. Unstyled-but-on-brand: PageHeader, ClosingScene, PostCards. Check the navbar with five items on a phone.                                                  | `/blog/` and `/blog/<slug>/` build, appear in the sitemap, carry correct canonical/OG/article meta; boundary lint stays green                                             |
| **M3** | **Reading design** (M)        | `prose.css` from tokens; code-block theme on the ink band; heading-anchor styling; image and caption styling (rounded like the site's cards, `title` shown as a caption); `PostHeader` (title, date, tags, hills); `TableOfContents` from `headings` (desktop aside, only when ≥3 h2s); previous/next links.                                                | A long fixture post (every heading level, lists, quote, table, code, images) reads well at 375/768/1440px and in reduced motion                                           |
| **M4** | **Syndication and reach** (S) | `rss.xml` endpoint (full-feed description from frontmatter), feed `<link rel="alternate">` in the head, `article:published_time/modified_time` (already in `pageHead`). Optional: a "Recent writing" teaser on the home page via the module's public API.                                                                                                   | Feed validates (W3C validator); posts show the right dates in a reader                                                                                                    |
| **M5** | **Authoring workflow** (S)    | `docs/WRITING.md` (how to add a post, the frontmatter fields, the image rule, tags and their tones), a `posts/_template/` folder, drafts documented (visible in `bun run dev`, excluded from builds).                                                                                                                                                       | A new post is: copy the template, write, open a PR; CI proves it valid                                                                                                    |
| **M6** | **Later, on demand**          | Tag pages (`/blog/tag/<tag>/` — `onStaticGenerate` over the registry), series, related posts (`related:` slugs, validated to exist), per-post OG images, reading time, search.                                                                                                                                                                              | Each is its own small PR inside `modules/blog`                                                                                                                            |

Suggested order of PRs: M1+M2 together (the blog exists), then M3 (it reads beautifully), then
M4+M5 (it travels and it's easy to write for). M6 items only when a real post needs them.

## Decisions taken (veto here)

1. **URLs**: `/blog/<slug>/`, slug = the post's folder name, kebab-case, validated. Renaming a
   folder changes the URL — don't, after publishing.
2. **Format**: `.md` by default; `.mdx` is available for the rare post that needs a component.
3. **Tones**: a post is toned by its **first tag**, and tags map to tones in one registry, keeping
   the "one tone per thing" rule.
4. **Drafts and scheduling**: `draft: true` keeps a post out of builds; a future `published` date
   publishes it on that day via the existing daily rebuild.
5. **No pagination** until the list outgrows one page (~20 posts); no comments — the ClosingScene
   already routes conversation to LinkedIn.
6. **Images** are kept in the post's folder and written as plain markdown; the remark plugin
   does the rest. `public/` is not used for post images (no optimisation, no hashing), and the
   `.mdx` import form is reserved for posts that need a component anyway.
