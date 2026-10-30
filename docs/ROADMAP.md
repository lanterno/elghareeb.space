# Roadmap

What is still open. The plans that produced the current architecture and the blog are in the git
history (`git log --all -- docs/history`).

## When there is a reason

- **CSS delivery.** The global stylesheet is inlined into every page; once the blog multiplies
  them, measure whether a cached `<link>` wins.

## When there are words for it

- **LifePete and Transparium.** They are named on the home page but have no page of their own;
  the projects module can take a product once there is a story to tell about it.
- **The stats page at dusk.** `/stats` has its own stylesheet and stays light.

## Blog, on demand

Each is a small change inside `modules/blog`, for when a real post needs it: tag pages, series and
related posts, per-post link-preview images, reading time, search, pagination past ~20 posts.
