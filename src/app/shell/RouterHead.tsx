import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import display700 from "@fontsource/m-plus-rounded-1c/files/m-plus-rounded-1c-latin-700-normal.woff2?url";
import display800 from "@fontsource/m-plus-rounded-1c/files/m-plus-rounded-1c-latin-800-normal.woff2?url";
import body400 from "@fontsource/zen-maru-gothic/files/zen-maru-gothic-latin-400-normal.woff2?url";
import body700 from "@fontsource/zen-maru-gothic/files/zen-maru-gothic-latin-700-normal.woff2?url";

import { feedPath } from "~/modules/blog";
import { site } from "~/platform/seo";

/**
 * The document head: the page's title, meta tags and links from its `head` export, plus what
 * every page shares. The canonical link comes from `pageHead`, so pages without one (the 404)
 * don't claim a URL. The four Latin faces are preloaded, so they don't wait for the stylesheet
 * to be parsed; the subsets that only hold the arrow (fonts.css) load when a page shows one,
 * which is why Qwik's own preloading of every font is off in vite.config.ts.
 */

const fonts = [body400, body700, display700, display800];
export const RouterHead = component$(() => {
  const head = useDocumentHead();

  return (
    <>
      <title>{head.title}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {fonts.map((href) => (
        <link
          key={href}
          rel="preload"
          as="font"
          type="font/woff2"
          href={href}
          crossOrigin="anonymous"
        />
      ))}
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
