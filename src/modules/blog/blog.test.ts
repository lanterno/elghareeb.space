import { describe, expect, test } from "bun:test";

import { renderFeed } from "./feed";
import { type PostModule, slugFromPath, toPost, toPosts } from "./model";
import { latestPosts, neighbours, postBySlug, publishedPosts } from "./queries";

const Content: PostModule["default"] = () => null;

const module = (frontmatter: Record<string, unknown>): PostModule => ({
  default: Content,
  frontmatter,
  headings: [{ text: "Intro", id: "intro", level: 2 }],
});

const good = {
  title: "Hello",
  description: "The first post.",
  published: "2026-01-10",
  tags: ["climate", "software"],
};

describe("slugFromPath", () => {
  test("takes the folder name", () => {
    expect(slugFromPath("./posts/hello-world/index.md")).toBe("hello-world");
    expect(slugFromPath("./posts/hello-world/index.mdx")).toBe("hello-world");
  });
  test("rejects folder names that aren't slugs", () => {
    expect(() => slugFromPath("./posts/Hello World/index.md")).toThrow("not a valid slug");
    expect(() => slugFromPath("./posts/readme.md")).toThrow("Not a post path");
  });
});

describe("toPost", () => {
  test("reads the frontmatter and derives the tone from the first tag", () => {
    const post = toPost("./posts/hello/index.md", module(good));
    expect(post.slug).toBe("hello");
    expect(post.tone).toBe("teal");
    expect(post.draft).toBeFalse();
    expect(post.updated).toBeUndefined();
    expect(post.headings).toHaveLength(1);
  });
  test("names the post and the field when the frontmatter is wrong", () => {
    expect(() => toPost("./posts/hello/index.md", module({ ...good, published: "soon" }))).toThrow(
      'The post "hello"'
    );
    expect(() => toPost("./posts/hello/index.md", module({ ...good, tags: [] }))).toThrow("tags");
    expect(() =>
      toPost("./posts/hello/index.md", module({ ...good, tags: ["cooking"] }))
    ).toThrow();
    expect(() =>
      toPost("./posts/hello/index.md", module({ ...good, updated: "2025-12-31" }))
    ).toThrow("updated before");
  });
});

describe("toPosts", () => {
  test("sorts newest first", () => {
    const posts = toPosts({
      "./posts/old/index.md": module({ ...good, published: "2025-06-01" }),
      "./posts/new/index.md": module({ ...good, published: "2026-02-01" }),
      "./posts/mid/index.md": module({ ...good, published: "2025-12-24" }),
    });
    expect(posts.map((post) => post.slug)).toEqual(["new", "mid", "old"]);
  });
  test("refuses two posts with one slug", () => {
    expect(() =>
      toPosts({
        "./posts/same/index.md": module(good),
        "./posts/same/index.mdx": module(good),
      })
    ).toThrow('share the slug "same"');
  });
});

describe("queries", () => {
  const posts = toPosts({
    "./posts/draft/index.md": module({ ...good, published: "2026-03-01", draft: true }),
    "./posts/future/index.md": module({ ...good, published: "2026-09-01" }),
    "./posts/a/index.md": module({ ...good, published: "2026-02-01", tags: ["identity"] }),
    "./posts/b/index.md": module({ ...good, published: "2026-01-01" }),
  });

  test("published hides drafts and scheduled posts", () => {
    expect(publishedPosts(posts, "2026-02-15").map((post) => post.slug)).toEqual(["a", "b"]);
    expect(publishedPosts(posts, "2026-09-01").map((post) => post.slug)).toEqual([
      "future",
      "a",
      "b",
    ]);
  });

  test("by slug, latest", () => {
    expect(postBySlug(posts, "a")?.title).toBe("Hello");
    expect(postBySlug(posts, "nope")).toBeUndefined();
    expect(latestPosts(publishedPosts(posts, "2026-02-15"), 1).map((post) => post.slug)).toEqual([
      "a",
    ]);
  });

  test("neighbours in a newest-first list", () => {
    const visible = publishedPosts(posts, "2026-02-15");
    expect(neighbours(visible, "a").newer).toBeUndefined();
    expect(neighbours(visible, "a").older?.slug).toBe("b");
    expect(neighbours(visible, "b").newer?.slug).toBe("a");
    expect(neighbours(visible, "nope")).toEqual({ newer: undefined, older: undefined });
  });
});

describe("renderFeed", () => {
  const posts = toPosts({
    "./posts/a/index.md": module({ ...good, title: "Tom & Jerry <3", published: "2026-02-01" }),
    "./posts/b/index.md": module({ ...good, published: "2026-01-01", tags: ["identity"] }),
  });
  const feed = renderFeed(posts, {
    title: "Blog",
    description: "Notes",
    url: "https://example.com",
  });

  test("is RSS 2.0 with one item per post, newest first", () => {
    expect(
      feed.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"')
    ).toBeTrue();
    expect(feed.indexOf("<link>https://example.com/blog/a/</link>")).toBeGreaterThan(0);
    expect(feed.indexOf("<link>https://example.com/blog/a/</link>")).toBeLessThan(
      feed.indexOf("<link>https://example.com/blog/b/</link>")
    );
  });

  test("escapes text and formats dates for RSS", () => {
    expect(feed).toContain("<title>Tom &amp; Jerry &lt;3</title>");
    expect(feed).toContain("<pubDate>Sun, 01 Feb 2026 00:00:00 GMT</pubDate>");
    expect(feed).toContain("<category>Digital identity</category>");
    expect(feed).toContain("<lastBuildDate>Sun, 01 Feb 2026 00:00:00 GMT</lastBuildDate>");
  });

  test("an empty feed is still valid", () => {
    expect(renderFeed([], { title: "B", description: "D", url: "https://e.com" })).toContain(
      "<channel>"
    );
  });
});
