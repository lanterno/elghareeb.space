import { describe, expect, test } from "bun:test";

import { breadcrumbFor, pageHead } from "./page-head";
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
        article: { headline: "How this site is built", published: "2026-10-29" },
      })
    );
    expect(post).toMatchObject({
      "@type": "BlogPosting",
      headline: "How this site is built",
      datePublished: "2026-10-29",
      dateModified: "2026-10-29",
      author: { "@id": "https://elghareeb.space/#person" },
    });
  });

  test("names the author's fields on every page, and schools and fellowships when given", () => {
    const [, bare] = graphOf(
      structuredData({ title: "Blog", description: "Posts.", url: "https://elghareeb.space/blog/" })
    );
    expect(bare?.["knowsAbout"]).toContain("Digital identity");
    expect(bare?.["description"]).toBeString();
    expect(bare?.["alumniOf"]).toBeUndefined();

    const [, person] = graphOf(
      structuredData({
        title: "About",
        description: "Me.",
        url: "https://elghareeb.space/about/",
        person: {
          jobTitle: "Staff Software Engineer",
          worksFor: { name: "Resilio", url: "https://resilio.tech" },
          alumniOf: ["Mansoura University"],
          awards: ["Climatebase Fellow, cohort 6"],
        },
      })
    );
    expect(person?.["alumniOf"]).toEqual([
      { "@type": "EducationalOrganization", name: "Mansoura University" },
    ]);
    expect(person?.["award"]).toEqual(["Climatebase Fellow, cohort 6"]);
  });

  test("the About page is a ProfilePage whose main entity is the author", () => {
    const [, , page] = graphOf(
      structuredData({
        title: "About",
        description: "Me.",
        url: "https://elghareeb.space/about/",
        profile: true,
      })
    );
    expect(page).toMatchObject({
      "@type": "ProfilePage",
      mainEntity: { "@id": "https://elghareeb.space/#person" },
    });
  });

  test("a project's page is about its code, which the author contributes to", () => {
    const [, , page, software] = graphOf(
      structuredData({
        title: "archetype-pal | Ahmed Elghareeb",
        description: "Manuscripts.",
        url: "https://elghareeb.space/projects/archetype-pal/",
        software: {
          name: "archetype-pal",
          codeRepository: "https://github.com/archetype-pal/backend",
          keywords: ["Django"],
        },
      })
    );
    expect(page?.["about"]).toEqual({
      "@id": "https://elghareeb.space/projects/archetype-pal/#software",
    });
    expect(software).toMatchObject({
      "@type": "SoftwareSourceCode",
      "@id": "https://elghareeb.space/projects/archetype-pal/#software",
      codeRepository: "https://github.com/archetype-pal/backend",
      contributor: { "@id": "https://elghareeb.space/#person" },
    });
  });

  test("a breadcrumb becomes a numbered list the page points to", () => {
    const [, , page, trail] = graphOf(
      structuredData({
        title: "x",
        description: "y",
        url: "https://elghareeb.space/blog/x/",
        breadcrumb: [
          { name: "Home", url: "https://elghareeb.space/" },
          { name: "Blog", url: "https://elghareeb.space/blog/" },
          { name: "x", url: "https://elghareeb.space/blog/x/" },
        ],
      })
    );
    expect(page?.["breadcrumb"]).toEqual({ "@id": "https://elghareeb.space/blog/x/#breadcrumb" });
    expect(trail?.["@type"]).toBe("BreadcrumbList");
    expect(trail?.["itemListElement"]).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://elghareeb.space/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://elghareeb.space/blog/" },
      { "@type": "ListItem", position: 3, name: "x", item: "https://elghareeb.space/blog/x/" },
    ]);
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

describe("breadcrumbFor", () => {
  test("names the section by the navigation and the page by its own title", () => {
    expect(breadcrumbFor("/projects/archetype-pal/", "archetype-pal")).toEqual([
      { name: "Home", url: "https://elghareeb.space/" },
      { name: "Projects", url: "https://elghareeb.space/projects/" },
      { name: "archetype-pal", url: "https://elghareeb.space/projects/archetype-pal/" },
    ]);
  });

  test("top-level pages and paths outside the navigation have none", () => {
    expect(breadcrumbFor("/", "Home")).toBeUndefined();
    expect(breadcrumbFor("/work/", "Work")).toBeUndefined();
    expect(breadcrumbFor("/stats/x/", "x")).toBeUndefined();
  });
});

describe("pageHead's structured data", () => {
  const graph = (head: ReturnType<typeof pageHead>): Record<string, unknown>[] =>
    graphOf(JSON.parse(head.scripts?.[0]?.script ?? "") as object);

  test("a post's headline is its own title, without the site name", () => {
    const [, , post] = graph(
      pageHead({
        title: "Written by AI",
        description: "A post.",
        path: "/blog/written/",
        article: { published: "2026-10-29" },
      })
    );
    expect(post?.["headline"]).toBe("Written by AI");
  });

  test("a project's code is named by the page's title", () => {
    const [, , , software] = graph(
      pageHead({
        title: "crypto-wasm",
        description: "Crypto.",
        path: "/projects/crypto-wasm/",
        software: { codeRepository: "https://github.com/x/y", keywords: ["Rust"] },
      })
    );
    expect(software?.["name"]).toBe("crypto-wasm");
  });
});
