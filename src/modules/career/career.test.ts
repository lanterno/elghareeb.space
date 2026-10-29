import { describe, expect, test } from "bun:test";

import { experiences, fields, organizations, validateCareerContent } from "./content";
import { currentRole, isHappening, upcomingConferences } from "./queries";

import type { Conference, Experience } from "./model";

const conference = (first: string, last: string): Conference => ({
  name: "Test",
  href: "https://example.com",
  place: "Somewhere",
  first,
  last,
  Logo: (() => null) as unknown as Conference["Logo"],
});

describe("career content", () => {
  test("matches its model", () => {
    expect(() => {
      validateCareerContent();
    }).not.toThrow();
  });

  test("every experience points at a registered organisation", () => {
    for (const experience of experiences) {
      expect(experience.org in organizations).toBeTrue();
    }
  });

  test("the climate field's first link follows the current role", () => {
    const climate = fields.find((field) => field.id === "climate");
    const role = currentRole();
    const first: { label: string; note: string } | undefined = climate?.links[0];
    expect(first?.label).toBe(organizations[role.org].name);
    expect(first?.note).toContain(role.title);
  });
});

describe("currentRole", () => {
  test("is the one without an end", () => {
    expect(currentRole().end).toBeNull();
  });
  test("falls back to the most recent when every role has ended", () => {
    const ended: Experience[] = experiences.map((experience) => ({
      ...experience,
      end: "2026-01",
    }));
    expect(currentRole(ended).org).toBe("resilio");
  });
});

describe("conferences", () => {
  const list = [conference("2026-10-25", "2026-10-29"), conference("2026-11-09", "2026-11-12")];

  test("upcoming keeps those that haven't ended", () => {
    expect(upcomingConferences("2026-10-01", list)).toHaveLength(2);
    expect(upcomingConferences("2026-10-29", list)).toHaveLength(2);
    expect(upcomingConferences("2026-10-30", list)).toHaveLength(1);
    expect(upcomingConferences("2026-11-13", list)).toHaveLength(0);
  });

  test("happening now is inclusive of both ends", () => {
    const c = conference("2026-10-25", "2026-10-29");
    expect(isHappening(c, "2026-10-24")).toBeFalse();
    expect(isHappening(c, "2026-10-25")).toBeTrue();
    expect(isHappening(c, "2026-10-29")).toBeTrue();
    expect(isHappening(c, "2026-10-30")).toBeFalse();
  });
});
