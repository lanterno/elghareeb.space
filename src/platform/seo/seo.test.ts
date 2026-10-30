import { describe, expect, test } from "bun:test";

import { pageHead } from "./page-head";
import { structuredData, structuredDataScript } from "./structured-data";

interface Graph {
  "@graph": Record<string, unknown>[];
}

const graphOf = (data: object): Record<string, unknown>[] => (data as Graph)["@graph"];

describe("structuredData", () => {
  test("describes the site, its author and a page", () => {
    const [website, person, page] = graphOf(
      structuredData({
        title: "Work | Ahmed Elghareeb",
        description: "Every role.",
        url: "https://elghareeb.space/work/",
      })
    );
    expect(website?.["@type"]).toBe("WebSite");
    expect(person?.["@type"]).toBe("Person");
    expect(person?.["sameAs"]).toEqual([
      "https://github.com/lanterno",
      "https://linkedin.com/in/ahmedelghareeb",
    ]);
    expect(person?.["jobTitle"]).toBeUndefined();
    expect(page).toMatchObject({
      "@type": "WebPage",
      url: "https://elghareeb.space/work/",
      name: "Work | Ahmed Elghareeb",
    });
  });

  test("gives the author a job when the page says so", () => {
    const [, person] = graphOf(
      structuredData({
        title: "Ahmed",
        description: "Home",
        url: "https://elghareeb.space/",
        person: {
          jobTitle: "Staff Software Engineer",
          worksFor: { name: "Resilio", url: "https://resilio.tech" },
        },
      })
    );
    expect(person?.["jobTitle"]).toBe("Staff Software Engineer");
    expect(person?.["worksFor"]).toEqual({
      "@type": "Organization",
      name: "Resilio",
      url: "https://resilio.tech",
    });
  });

  test("a post is a BlogPosting with its dates", () => {
    const [, , post] = graphOf(
      structuredData({
        title: "How this site is built | Ahmed Elghareeb",
        description: "With an agent.",
        url: "https://elghareeb.space/blog/how/",
        article: { published: "2026-10-29" },
      })
    );
    expect(post).toMatchObject({
      "@type": "BlogPosting",
      headline: "How this site is built | Ahmed Elghareeb",
      datePublished: "2026-10-29",
      dateModified: "2026-10-29",
      author: { "@id": "https://elghareeb.space/#person" },
    });
  });

  test("the script cannot close its own tag", () => {
    const script = structuredDataScript({
      title: "</script><script>alert(1)",
      description: "x",
      url: "https://elghareeb.space/",
    });
    expect(script).not.toContain("</script>");
    expect(JSON.parse(script)).toBeObject();
  });
});

describe("pageHead", () => {
  test("carries the structured data as a JSON-LD script", () => {
    const head = pageHead({ title: "About", description: "Me.", path: "/about/" });
    const [script] = head.scripts ?? [];
    expect(script?.props).toEqual({ type: "application/ld+json" });
    expect(JSON.parse(script?.script ?? "")).toMatchObject({ "@context": "https://schema.org" });
    expect(head.links).toEqual([{ rel: "canonical", href: "https://elghareeb.space/about/" }]);
  });
});
