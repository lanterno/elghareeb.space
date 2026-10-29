import { describe, expect, test } from "bun:test";

import { projects, validateShowcaseContent } from "./content";
import { featuredProjects, projectCount, projectsInGroup } from "./queries";

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
