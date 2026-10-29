import { site } from "./site";

import type { DocumentHeadValue } from "@builder.io/qwik-city";

interface PageHeadOptions {
  /** The page's own title; the site name is appended unless `bare` is set */
  title: string;
  description: string;
  /** The page's path, with its trailing slash (e.g. "/work/") */
  path: string;
  /** Keep the title as given (the home page's title already names the site) */
  bare?: boolean;
  /** A blog post rather than a page */
  article?: { published: string; updated?: string };
}

/**
 * Title, description, canonical link and the Open Graph card for one page. X (Twitter) reads the
 * Open Graph tags, so only the card type is set for it.
 */
export function pageHead({
  title,
  description,
  path,
  bare,
  article,
}: PageHeadOptions): DocumentHeadValue {
  const url = new URL(path, site.url).href;
  const image = new URL(site.ogImage.path, site.url).href;
  const fullTitle = bare === true ? title : `${title}${site.titleSuffix}`;

  const articleMeta =
    article === undefined
      ? []
      : [
          { property: "article:published_time", content: article.published },
          ...(article.updated === undefined
            ? []
            : [{ property: "article:modified_time", content: article.updated }]),
          { property: "article:author", content: site.author },
        ];

  return {
    title: fullTitle,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: article === undefined ? "website" : "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: String(site.ogImage.width) },
      { property: "og:image:height", content: String(site.ogImage.height) },
      { property: "og:image:alt", content: site.ogImage.alt },
      { property: "og:locale", content: site.locale },
      { property: "og:site_name", content: site.author },
      ...articleMeta,
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
