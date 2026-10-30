# Architecture

A static Qwik City site, organised by subject rather than by file type. `platform/` (kernel,
design, ui, scenery, seo, build plugins) imports only itself; `modules/` (career, showcase,
activity, blog) import `platform`, and each other only through `~/modules/<x>`; `app/` (routes,
pages, shell) imports everything through those public APIs. ESLint enforces this
(`no-restricted-imports` in `eslint.config.js`).

## A module

```
modules/<name>/
  index.ts        public API; the only path other code may import
  model.ts        Valibot schemas + inferred types
  content/        the records, checked against the model during the build
  queries.ts      pure functions over the content (tested)
  adapter.ts      only when the outside world is involved (activity: GitHub)
  loader.ts       only when a page needs build-time data (re-exported by the route)
  repository.ts   only when the content is files (blog: the posts)
  ui/  pages/
```

**Validation runs at build time.** Each `content/index.ts` runs its schemas under
`import.meta.env.SSR`, so a bad record fails the build and names the field, and Valibot is
tree-shaken out of the client. The blog does the same for every post's frontmatter.

**Routes are a manifest.** A route file is one line,
`export { WorkPage as default, workHead as head } from "~/modules/career";`. Qwik City still runs a
`routeLoader$`, `onGet`, `onStaticGenerate` or `head` declared in a module, as long as the route
re-exports it.

**Anything derivable is derived.** Organisations are described once and referenced by `OrgId`. The
"Right now" tile, "since Dec 2025", the project count, a post's slug and its colour are computed,
as are the years of experience and which conferences still show, from the build date.

## Design system

- **Tokens** (`theme.css`) are the only palette; `--color-*: initial` removes Tailwind's defaults so
  nothing off-brand can be used.
- **Tones.** Each organisation, field, project and tag carries one of five tones, applied once with
  `data-tone="teal"`; everything inside uses `bg-tone`, `text-tone-ink`, `bg-tone-tint`. No lookup
  tables, and class names stay static for Tailwind to scan.
- **Motion** (`motion.css`) is only ever used under `motion-safe:`. Colours that keyframes animate
  are computed outside them in plain variables, because Lightning CSS silently drops a `@keyframes`
  block containing `color-mix()`.

## Quirks

- `platform/build/fresh-image-cache.ts` empties vite-imagetools' cache before each build: restored
  images re-encode with a different hash, so the SSR HTML would point at files the client build
  never emitted.
- Dates are formatted by hand (`platform/kernel/dates.ts`), not with `Intl`, whose output depends
  on the runtime's ICU data ("Sept" on some). Every date is counted in UTC, because a local build
  after midnight in Zurich once mixed two days.

## Decisions

| Decision                              | Why                                                                                                                                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stay on Qwik City                     | Markdown, frontmatter, headings, highlighting and SSG are built in. Astro was rejected: it centralises pages the same way and would mean redrawing the scenery                                  |
| Routes as re-exports                  | File-based routing wants to own pages; the manifest keeps each page with its module. If `[slug]` pages ever fight the framework, posts can move under `app/routes/blog/` and the rest stays put |
| Global CSS inlined into each page     | One fewer render-blocking request; revisit when the blog multiplies pages, after measuring                                                                                                      |
| Posts are `.md` folders named by slug | The folder is the URL, so renaming after publishing is deliberate; images beside the post, never in `public/`, so they go through the image pipeline                                            |
| No pagination, no comments            | Paginate past ~20 posts; the closing card already routes conversation to LinkedIn                                                                                                               |
