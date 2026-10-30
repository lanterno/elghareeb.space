/**
 * The schema.org description of a page, for search engines' rich results: the site, its author
 * and the page itself, a `BlogPosting` when it is a post. One JSON-LD graph per page.
 */
import { site } from "./site";

export interface PageDescription {
  /** The page's full title */
  title: string;
  description: string;
  /** The page's absolute URL */
  url: string;
  article?: { published: string; updated?: string };
  /** What the author does, when the page says so */
  person?: { jobTitle: string; worksFor: { name: string; url: string } };
}

const websiteId = `${site.url}/#website`;
const personId = `${site.url}/#person`;

export function structuredData({
  title,
  description,
  url,
  article,
  person,
}: PageDescription): object {
  const image = new URL(site.ogImage.path, site.url).href;
  const page =
    article === undefined
      ? {
          "@type": "WebPage",
          "@id": url,
          url,
          name: title,
          description,
          isPartOf: { "@id": websiteId },
          about: { "@id": personId },
        }
      : {
          "@type": "BlogPosting",
          "@id": url,
          mainEntityOfPage: url,
          headline: title,
          description,
          image,
          datePublished: article.published,
          dateModified: article.updated ?? article.published,
          author: { "@id": personId },
          publisher: { "@id": personId },
          isPartOf: { "@id": websiteId },
          inLanguage: "en",
        };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.author,
        publisher: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.author,
        url: site.url,
        image,
        sameAs: [site.social.github.url, site.social.linkedin.url],
        address: { "@type": "PostalAddress", addressLocality: "Renens", addressCountry: "CH" },
        ...(person === undefined
          ? {}
          : {
              jobTitle: person.jobTitle,
              worksFor: { "@type": "Organization", ...person.worksFor },
            }),
      },
      page,
    ],
  };
}

/** The graph as the text of a `<script type="application/ld+json">`, safe inside the element */
export function structuredDataScript(description: PageDescription): string {
  return JSON.stringify(structuredData(description)).replaceAll("<", "\\u003c");
}
