# Architecture

A fully static site, rebuilt daily so dates, conferences, scheduled posts and the GitHub card stay
current. The code is organised by subject, not by file type: anything about one subject changes in
one folder, and a new subject is one new folder plus its route lines and a nav entry.

## The three layers

| Layer       | Contains                                                                                                                                                     | May import                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `platform/` | `kernel` (dates, `Period`, `Tone`, Valibot building blocks), `design` (tokens, tones, motion), `ui`, `scenery` (the drawings), `seo`, `build` (Vite plugins) | only itself                                            |
| `modules/`  | `career` (/work/), `showcase` (/projects/), `activity` (the GitHub card), `blog` (/blog/, posts, RSS)                                                        | `platform`; other modules **only** via `~/modules/<x>` |
| `app/`      | `routes` (one-line re-exports), `pages` (home, about, 404), `shell` (layout, navbar, footer, head)                                                           | everything, through public APIs                        |

ESLint enforces this (`no-restricted-imports` in `eslint.config.js`). Today no module imports
another; the shell reads one thing from the blog, the feed path for `<link rel="alternate">`.
`src/root.tsx` and `src/entry.ssr.tsx` stay at the top because Qwik looks for them there.

## A module

```
modules/<name>/
  index.ts        public API — the only path other code may import
  model.ts        Valibot schemas + inferred types; the domain's rules
  content/        the records, checked against the model during the build
  queries.ts      pure functions over the content (tested)
  adapter.ts      only when the outside world is involved (activity: GitHub)
  loader.ts       only when a page needs build-time data (re-exported by the route)
  repository.ts   only when the content is files (blog: the posts)
  ui/  pages/  <name>.test.ts
```

**Validation runs at build time, not in the browser.** Each `content/index.ts` runs its schemas
under `import.meta.env.SSR`, so a bad date or link fails the build and names the field, and
Valibot is tree-shaken out of the client. The blog does the same for every post's frontmatter.

**Routes are a manifest.** A route file is one line:
`export { WorkPage as default, workHead as head } from "~/modules/career";`. Qwik City still runs a
`routeLoader$`, `onGet`, `onStaticGenerate` or function `head` declared in a module, as long as the
route re-exports it (`modules/activity/loader.ts`, `modules/blog/pages`).

**`Organization` is a registry.** Experiences, hero facts and affiliation rows carry an `OrgId`;
name, URL and tone are looked up, so each organisation is described once. Anything derivable is
derived: the "Right now" tile and "since Dec 2025" from the current role, the project count from
the projects, a post's slug from its folder and its tone from its first tag.

## Where do I change…?

| Change                                  | Touch                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------- |
| A job, a conference, an organisation    | `modules/career/content/`                                                                   |
| A project                               | `modules/showcase/content/projects.ts`                                                      |
| A blog post, a tag                      | `modules/blog/posts/<slug>/`, `modules/blog/content/tags.ts` — see [WRITING.md](WRITING.md) |
| How a post reads                        | `modules/blog/ui/prose.css`, checked against the `style-guide` draft                        |
| The hero or the home page's tiles       | `app/pages/home/`                                                                           |
| Colours, radii, shadows, motion         | `platform/design/`                                                                          |
| The site's URL, name, nav, social links | `platform/seo/site.ts`                                                                      |
| Meta tags and the link-preview card     | `platform/seo/page-head.ts`                                                                 |

## Design system

- **Tokens** (`theme.css`) are the only palette; `--color-*: initial` removes Tailwind's defaults so
  nothing off-brand can be used.
- **Tones.** Each organisation, field, project and tag carries one of five tones. It is applied once
  with `data-tone="teal"`; everything inside uses `bg-tone`, `text-tone-ink`, `bg-tone-tint`. No
  lookup tables, no prop threading, and class names stay static for Tailwind to scan.
- **Motion** (`motion.css`) is always used through `motion-safe:`. Colours that keyframes animate
  are computed outside them in plain variables, because Lightning CSS silently drops a
  `@keyframes` block containing `color-mix()`.
- Components are plain functions unless they need state, tasks or a `Slot`; then `component$`.
- The blog's `prose.css` is built from the same tokens only, with Prism's token colours mapped to
  the five tones.

## Build quirks worth knowing

- `platform/build/fresh-image-cache.ts` empties vite-imagetools' cache before each build: restored
  images re-encode with a different hash, so the SSR HTML would point at files the client build
  never emitted.
- `platform/build/remark-local-images.ts` turns `![alt](./image.png)` in a post into the same
  optimised, lazy-loaded WebP `srcset` as the rest of the site. Without it, markdown images keep
  their path verbatim and the file is never copied.
- Dates are formatted by hand (`platform/kernel/dates.ts`), not with `Intl`, whose output depends
  on the runtime's ICU data ("Sept" on some). Every date is counted in UTC, because a local build
  after midnight in Zurich once mixed two days.

Deployment is described in [DEVELOPMENT.md](DEVELOPMENT.md).

## Decisions

| Decision                                 | Why                                                                                                                                                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Stay on Qwik City                        | Markdown, frontmatter, headings, highlighting and SSG are built in; the manifest pattern and module-owned posts were verified in a spike. Astro was rejected: it centralises pages the same way and would mean redrawing the scenery |
| Routes as re-exports                     | File-based routing wants to own pages; the manifest keeps each page with its module. If `[slug]` pages ever fight the framework, posts can move under `app/routes/blog/` and the rest stays put                                      |
| Tones as a CSS context                   | See Design system                                                                                                                                                                                                                    |
| Global CSS inlined into each page        | One fewer render-blocking request; revisit when the blog multiplies pages, after measuring                                                                                                                                           |
| Valibot at build time, `satisfies` in TS | Types come from the schemas; the build catches what types can't (formats, date order)                                                                                                                                                |
| A daily rebuild instead of runtime code  | The site stays static; experience years, role lengths, conference expiry and scheduled posts all follow from the build date                                                                                                          |
| Posts are `.md` folders named by slug    | The folder is the URL, so renaming after publishing is deliberate; `.mdx` for the rare post needing a component; images beside the post, never in `public/`, so they go through the image pipeline                                   |
| No pagination, no comments               | Paginate past ~20 posts; the closing card already routes conversation to LinkedIn                                                                                                                                                    |
