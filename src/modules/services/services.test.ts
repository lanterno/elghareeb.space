import { describe, expect, test } from "bun:test";

import { site } from "~/platform/seo";

import { questions, services, validateServicesContent } from "./content";
import { servicePath, servicesPath } from "./queries";

describe("services content", () => {
  test("matches its model", () => {
    expect(() => {
      validateServicesContent();
    }).not.toThrow();
  });

  test("every claim points inside the site, at a page in a section of the navigation", () => {
    const sections = new Set<string>(site.nav.map((item) => item.href));
    for (const service of services) {
      for (const item of service.evidence) {
        expect(item.href).toStartWith("/");
        expect(item.href).toEndWith("/");
        const section = `/${item.href.split("/")[1] ?? ""}/`;
        expect(sections.has(section)).toBeTrue();
      }
    }
  });

  test("the first question says the author takes freelance work", () => {
    expect(questions[0].answer).toStartWith("Yes.");
  });

  test("the languages answer lists the site's languages in prose", () => {
    const answer = questions.find((item) => item.question.includes("languages"))?.answer;
    expect(answer).toBe("English, French and Arabic.");
  });
});

describe("servicePath", () => {
  test("a service is an anchor on the Work with me page", () => {
    expect(servicePath({ id: "digital-identity" })).toBe(`${servicesPath}#digital-identity`);
  });
});
