# Roadmap

What is still open. The plans that produced the current architecture and the blog are in the git
history (`git log --all -- docs/history`).

## Decisions waiting

1. **One deploy target.** GitHub Pages serves the domain and gets a GitHub token for the
   contribution card for free; the Cloudflare Worker `personal-site` also deploys on every push.
   Pick one and delete the other's config (`deploy.yml` + `public/CNAME`, or `wrangler.jsonc`).
2. **A content check.** The C4DT role is full-time until April 2026 and the Resilio role full-time
   from December 2025: five months of overlap on the Work page.

## When there is a reason

- **Navbar on the Popover API.** The phone menu's document-wide click listener (`useOnDocument` in
  `app/shell/Navbar.tsx`) makes the first click on any page load that chunk.
- **CSS delivery.** The global stylesheet is inlined into every page; once the blog multiplies
  them, measure whether a cached `<link>` wins.
- **`@types/bun`** to replace `src/types/bun-test.d.ts`, the next time the lockfile is updated.
- **Validate the feed** once with the W3C validator and a reader.

## Blog, on demand

Each is a small change inside `modules/blog`, for when a real post needs it: tag pages, series and
related posts, per-post link-preview images, reading time, search, pagination past ~20 posts.
