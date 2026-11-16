import { describe, expect, test } from "bun:test";

import { renderLlms } from "./render";

const content = {
  name: "Ahmed Elghareeb",
  summary: "Staff Software Engineer at Resilio.",
  about: "Software engineer in Renens.",
  pages: [{ title: "Work", url: "https://elghareeb.space/work/", description: "Every role." }],
  projects: [
    {
      title: "archetype-pal",
      url: "https://elghareeb.space/projects/archetype-pal/",
      description: "Manuscripts.",
    },
  ],
  posts: [],
  elsewhere: [{ title: "GitHub", url: "https://github.com/lanterno", description: "Code" }],
};

describe("renderLlms", () => {
  test("starts with the name and a quoted summary, as llmstxt.org asks", () => {
    const [title, , summary, , about] = renderLlms(content).split("\n");
    expect(title).toBe("# Ahmed Elghareeb");
    expect(summary).toBe("> Staff Software Engineer at Resilio.");
    expect(about).toBe("Software engineer in Renens.");
  });

  test("lists each link under its section as a markdown link with its description", () => {
    const text = renderLlms(content);
    expect(text).toContain("## Pages\n\n- [Work](https://elghareeb.space/work/): Every role.\n");
    expect(text).toContain(
      "## Projects\n\n- [archetype-pal](https://elghareeb.space/projects/archetype-pal/): Manuscripts.\n"
    );
  });

  test("leaves out a section with nothing in it", () => {
    expect(renderLlms(content)).not.toContain("## Writing");
  });
});
