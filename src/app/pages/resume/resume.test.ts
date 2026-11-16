import { describe, expect, test } from "bun:test";

import { renderResume, type ResumeInput } from "./render";

const input: ResumeInput = {
  name: "Ahmed Elghareeb",
  label: "Staff Software Engineer",
  url: "https://elghareeb.space",
  summary: "Engineer.",
  location: { city: "Chavannes-près-Renens", region: "Vaud", countryCode: "CH" },
  profiles: [{ network: "GitHub", username: "lanterno", url: "https://github.com/lanterno" }],
  work: [
    {
      name: "Resilio",
      position: "Staff Software Engineer",
      url: "https://resilio.tech",
      location: "Renens, Switzerland",
      startDate: "2025-12-07",
      endDate: null,
      summary: "Climate.",
      highlights: ["Python"],
    },
    {
      name: "Back Market",
      position: "Senior Software Engineer",
      url: "https://www.backmarket.com",
      location: "Paris, France",
      startDate: "2019-01",
      endDate: "2021-02",
      summary: "Cloud.",
      highlights: ["AWS"],
    },
  ],
  education: [],
  certificates: [],
  skills: [{ name: "Languages", keywords: ["Python"] }],
  languages: ["English", "French"],
  projects: [],
};

describe("renderResume", () => {
  const resume = JSON.parse(renderResume(input)) as Record<string, unknown>;

  test("names the JSON Resume schema and the author", () => {
    expect(resume["$schema"]).toContain("jsonresume/resume-schema");
    expect(resume["basics"]).toMatchObject({
      name: "Ahmed Elghareeb",
      label: "Staff Software Engineer",
      location: { city: "Chavannes-près-Renens", countryCode: "CH" },
    });
  });

  test("a current role has no end date; a past one keeps it", () => {
    const [current, past] = resume["work"] as Record<string, unknown>[];
    expect(current).not.toHaveProperty("endDate");
    expect(past?.["endDate"]).toBe("2021-02");
  });

  test("lists the languages and points at its own address", () => {
    expect(resume["languages"]).toEqual([{ language: "English" }, { language: "French" }]);
    expect(resume["meta"]).toEqual({ canonical: "https://elghareeb.space/resume.json" });
  });
});
