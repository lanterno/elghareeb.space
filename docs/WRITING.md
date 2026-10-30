# Writing a post

Copy `src/modules/blog/posts/_template` to `src/modules/blog/posts/<slug>/`. The folder name is the
URL, so don't rename it once the post is out. Tags come from `content/tags.ts`, and the first one
sets the post's colour.

What the template doesn't show:

- A future `published` date hides the post until a build runs on or after it.
- `updated` is optional, may not precede `published`, and is shown and sent to search engines.
- `draft: true` keeps the post out of builds but visible in `bun run dev`.
- The table of contents is built from `##` and `###` and shown from three `##` up. Don't write a
  `#` heading: the title is the `h1`.
- Internal links are paths (`/work/`). A post that needs a component is `index.mdx`.

The draft `style-guide` post exercises every element the reading design covers; if something in
your post looks wrong, add the case there first.
