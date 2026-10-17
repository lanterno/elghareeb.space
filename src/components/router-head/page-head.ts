import type { DocumentHead } from "@builder.io/qwik-city";

const siteUrl = "https://elghareeb.space";

interface PageHeadOptions {
  title: string;
  description: string;
  /** The page's path, with its trailing slash (e.g. "/work/") */
  path: string;
}

/**
 * Title, description and the Open Graph and Twitter cards for one page.
 * RouterHead adds the canonical link from the current URL.
 */
export function pageHead({ title, description, path }: PageHeadOptions): DocumentHead {
  const url = new URL(path, siteUrl).href;
  const image = `${siteUrl}/hero.jpg`;

  return {
    title,
    meta: [
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Ahmed Elghareeb, Staff Software Engineer, Resilio, Digital Identity, E-ID, EPFL, C4DT, Climate Tech, Sustainable IT, Switzerland, Django, Python, Rust",
      },
      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Ahmed Elghareeb" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
  };
}
