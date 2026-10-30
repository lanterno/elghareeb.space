import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

import { feedPath } from "~/modules/blog";
import { site } from "~/platform/seo";

/**
 * The document head: the page's title, meta tags and links from its `head` export, plus what
 * every page shares. The canonical link comes from `pageHead`, so pages without one (the 404)
 * don't claim a URL.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();

  return (
    <>
      <title>{head.title}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${site.author} — Blog`}
        href={feedPath}
      />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.scripts.map((s) => (
        <script key={s.key} {...s.props} dangerouslySetInnerHTML={s.script} />
      ))}
    </>
  );
});
