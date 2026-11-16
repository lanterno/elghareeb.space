import { site } from "./site";
import {
  type Crumb,
  type PersonDetails,
  type SoftwareDescription,
  structuredDataScript,
} from "./structured-data";

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
  /** What the author does, for the structured data of the pages that say so */
  person?: PersonDetails;
  /** The page is about the author (the About page) */
  profile?: boolean;
  /** The open-source project the page is about */
  software?: Omit<SoftwareDescription, "name">;
}

/**
 * The trail from the home page to a page below a section ("/projects/x/" → Home › Projects › x),
 * named by the navigation. Top-level pages have none: search results show their URL as it is.
 */
export function breadcrumbFor(path: string, title: string): Crumb[] | undefined {
  const [section, ...rest] = path.split("/").filter((segment) => segment !== "");
  if (section === undefined || rest.length === 0) return undefined;
  const sectionPath = `/${section}/`;
  const sectionItem = site.nav.find((item) => item.href === sectionPath);
  if (sectionItem === undefined) return undefined;
  return [
    { name: site.nav[0].label, url: new URL("/", site.url).href },
    { name: sectionItem.label, url: new URL(sectionPath, site.url).href },
    { name: title, url: new URL(path, site.url).href },
  ];
}

/**
 * Title, description, canonical link, the Open Graph card and the structured data for one page.
 * X (Twitter) reads the Open Graph tags, so only the card type is set for it.
 */
export function pageHead({
  title,
  description,
  path,
  bare,
  article,
  person,
  profile,
  software,
}: PageHeadOptions): DocumentHeadValue {
  const url = new URL(path, site.url).href;
  const image = new URL(site.ogImage.path, site.url).href;
  const fullTitle = bare === true ? title : `${title}${site.titleSuffix}`;
  const breadcrumb = breadcrumbFor(path, title);

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
      { name: "author", content: site.author },
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
    scripts: [
      {
        key: "structured-data",
        props: { type: "application/ld+json" },
        script: structuredDataScript({
          title: fullTitle,
          description,
          url,
          ...(article === undefined ? {} : { article: { headline: title, ...article } }),
          ...(person === undefined ? {} : { person }),
          ...(profile === undefined ? {} : { profile }),
          ...(software === undefined ? {} : { software: { name: title, ...software } }),
          ...(breadcrumb === undefined ? {} : { breadcrumb }),
        }),
      },
    ],
  };
}
