import { describe, expect, test } from "bun:test";

import { projects, validateShowcaseContent } from "./content";
import {
  featuredProjects,
  otherProjects,
  projectBySlug,
  projectCount,
  projectPath,
  projectsInGroup,
} from "./queries";

describe("showcase content", () => {
  test("matches its model", () => {
    expect(() => {
      validateShowcaseContent();
    }).not.toThrow();
  });

  test("one featured project, the rest in the identity group", () => {
    expect(featuredProjects()).toHaveLength(1);
    expect(projectsInGroup("identity")).toHaveLength(projectCount() - 1);
  });

  test("the intro's counts match the projects", () => {
    // "Three of these four": the intro is prose, so this guards it by hand
    expect(projectCount(projects)).toBe(4);
    expect(projectsInGroup("identity")).toHaveLength(3);
  });
});

describe("project pages", () => {
  test("a project is found by its slug, and only by its slug", () => {
    expect(projectBySlug("crypto-wasm")?.name).toBe("crypto-wasm");
    expect(projectBySlug("crypto-wasm-ts")?.name).toBe("crypto-wasm-ts");
    expect(projectBySlug("nope")).toBeUndefined();
  });

  test("the other projects leave out the one on the page", () => {
    const others = otherProjects("archetype-pal");
    expect(others).toHaveLength(projectCount() - 1);
    expect(others.map((project) => project.slug)).not.toContain("archetype-pal");
  });

  test("every project's page is under /projects/", () => {
    for (const project of projects) {
      expect(projectPath(project)).toBe(`/projects/${project.slug}/`);
    }
  });

  test("the stories only point inside the site at pages that exist", () => {
    const paths = new Set(projects.map(projectPath));
    for (const project of projects) {
      for (const link of project.story.links) {
        if (link.href.startsWith("/")) expect(paths.has(link.href)).toBe(true);
      }
    }
  });
});
