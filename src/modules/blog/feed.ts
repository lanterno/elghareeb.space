import { tags } from "./content/tags";

/** The RSS feed, rendered from the posts. Pure, so it is tested with fixtures. */
import type { Post } from "./model";

interface FeedSite {
  readonly title: string;
  readonly description: string;
  /** The site's origin, without a trailing slash */
  readonly url: string;
}

const escape = (text: string): string =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** "Sat, 10 Jan 2026 00:00:00 GMT": RSS wants RFC 822 dates */
const rfc822 = (isoDate: string): string => new Date(`${isoDate}T00:00:00Z`).toUTCString();

export const feedPath = "/blog/rss.xml";

export function renderFeed(posts: readonly Post[], site: FeedSite): string {
  const newest = posts[0];
  const items = posts.map((post) => {
    const url = `${site.url}/blog/${post.slug}/`;
    const categories = post.tags
      .map((tag) => `      <category>${escape(tags[tag].label)}</category>`)
      .join("\n");
    return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.published)}</pubDate>
      <description>${escape(post.description)}</description>
${categories}
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.title)}</title>
    <link>${site.url}/blog/</link>
    <atom:link href="${site.url}${feedPath}" rel="self" type="application/rss+xml" />
    <description>${escape(site.description)}</description>
    <language>en</language>
${newest === undefined ? "" : `    <lastBuildDate>${rfc822(newest.published)}</lastBuildDate>\n`}${items.join("\n")}
  </channel>
</rss>
`;
}
