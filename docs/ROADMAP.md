# Roadmap

What is still open. The plans that produced the current architecture and the blog are in the git
history (`git log --all -- docs/history`).

## Decisions waiting

1. **A content check.** The C4DT role is full-time until April 2026 and the Resilio role full-time
   from December 2025: five months of overlap on the Work page.

## When there is a reason

- **Navbar on the Popover API.** The phone menu's document-wide click listener (`useOnDocument` in
  `app/shell/Navbar.tsx`) makes the first click on any page load that chunk.
- **CSS delivery.** The global stylesheet is inlined into every page; once the blog multiplies
  them, measure whether a cached `<link>` wins.
- **`@types/bun`** to replace `src/types/bun-test.d.ts`, the next time the lockfile is updated.

## Analytics

- **A stats page.** The Worker records interactions in Analytics Engine but nothing shows them;
  a private page served by the same Worker, querying the SQL API with a read token kept as a
  Worker secret, would.

## Blog, on demand

Each is a small change inside `modules/blog`, for when a real post needs it: tag pages, series and
related posts, per-post link-preview images, reading time, search, pagination past ~20 posts.
