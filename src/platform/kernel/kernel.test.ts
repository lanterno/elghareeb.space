import { describe, expect, test } from "bun:test";

import { formatDay, formatDays, formatMonth, isoToday, yearsSince } from "./dates";
import { plural } from "./format";
import { live, liveShown, liveText } from "./live";
import { formatDuration, formatPeriod, isCurrent, periodYears, yearSpan } from "./period";

const on = (iso: string): Date => new Date(`${iso}T12:00:00Z`);

describe("plural", () => {
  test("singular and plural", () => {
    expect(plural(1, "month")).toBe("1 month");
    expect(plural(3, "month")).toBe("3 months");
    expect(plural(0, "contribution")).toBe("0 contributions");
  });
  test("groups thousands", () => {
    expect(plural(1234, "contribution")).toBe("1,234 contributions");
  });
});

describe("formatDay / formatDays", () => {
  test("single day", () => {
    expect(formatDay("2026-04-05")).toBe("5 Apr 2026");
  });
  test("ranges", () => {
    expect(formatDays("2026-10-25", "2026-10-29")).toBe("25–29 Oct");
    expect(formatDays("2026-10-30", "2026-11-02")).toBe("30 Oct – 2 Nov");
    expect(formatDays("2026-12-04", "2026-12-04")).toBe("4 Dec");
  });
});

describe("formatPeriod", () => {
  test("current role", () => {
    expect(formatPeriod({ start: "2025-12-07", end: null })).toBe("Dec 2025 – now");
  });
  test("same year", () => {
    expect(formatPeriod({ start: "2024-09", end: "2024-11" })).toBe("Sep – Nov 2024");
  });
  test("across years", () => {
    expect(formatPeriod({ start: "2023-04", end: "2026-04" })).toBe("Apr 2023 – Apr 2026");
  });
});

describe("formatDuration", () => {
  test("current role with a known start day counts completed months", () => {
    expect(formatDuration({ start: "2025-12-07", end: null }, on("2026-10-17"))).toBe("10 months");
    expect(formatDuration({ start: "2025-12-07", end: null }, on("2026-10-06"))).toBe("9 months");
  });
  test("finished roles count months inclusively, like LinkedIn", () => {
    expect(formatDuration({ start: "2024-09", end: "2024-11" })).toBe("3 months");
    expect(formatDuration({ start: "2023-04", end: "2026-04" })).toBe("3 years 1 month");
    expect(formatDuration({ start: "2019-01", end: "2021-02" })).toBe("2 years 2 months");
  });
  test("exact years", () => {
    expect(formatDuration({ start: "2020-01", end: "2020-12" })).toBe("1 year");
  });
  test("under a month", () => {
    expect(formatDuration({ start: "2026-10-01", end: null }, on("2026-10-20"))).toBe(
      "under a month"
    );
  });
});

describe("yearsSince", () => {
  test("whole years since a day", () => {
    expect(yearsSince("2014-07-15", on("2026-07-14"))).toBe(11);
    expect(yearsSince("2014-07-15", on("2026-07-15"))).toBe(12);
  });
});

describe("isoToday / formatMonth", () => {
  test("today in UTC", () => {
    expect(isoToday(new Date("2026-10-17T23:30:00Z"))).toBe("2026-10-17");
  });
  test("month of a day or a month", () => {
    expect(formatMonth("2025-12-07")).toBe("Dec 2025");
    expect(formatMonth("2024-09")).toBe("Sep 2024");
  });
});

describe("yearSpan / periodYears / isCurrent", () => {
  test("year spans", () => {
    expect(yearSpan(2023, 2026)).toEqual({ from: "2023", to: "26" });
    expect(yearSpan(2025, null)).toEqual({ from: "2025", to: "now" });
    expect(yearSpan(2024, 2024)).toEqual({ from: "2024", to: null });
  });
  test("from a span", () => {
    expect(periodYears({ start: "2025-12-07", end: null })).toEqual({
      from: "2025",
      to: "now",
    });
    expect(isCurrent({ start: "2025-12-07", end: null })).toBeTrue();
    expect(isCurrent({ start: "2024-09", end: "2024-11" })).toBeFalse();
  });
});

describe("live", () => {
  test("recounts the texts on the given day", () => {
    expect(liveText("data-live-years", "2014-07-15", on("2026-10-30"))).toBe("12");
    expect(liveText("data-live-years", "2014-07-15", on("2027-07-14"))).toBe("12");
    expect(liveText("data-live-years", "2014-07-15", on("2027-07-15"))).toBe("13");
    expect(liveText("data-live-duration", "2025-12-07", on("2026-10-30"))).toBe("10 months");
    expect(liveText("data-live-duration", "2025-12-07", on("2029-01-07"))).toBe("3 years 1 month");
    expect(liveText("data-live-year", "", on("2027-01-01"))).toBe("2027");
  });

  test("keeps an element until its last day ends", () => {
    expect(liveShown("data-live-until", "2026-11-12", on("2026-11-12"))).toBe(true);
    expect(liveShown("data-live-until", "2026-11-12", on("2026-11-13"))).toBe(false);
  });

  test("shows 'during' only within the days, and 'outside' only beyond them", () => {
    const days = "2026-11-09/2026-11-12";
    expect(liveShown("data-live-during", days, on("2026-11-08"))).toBe(false);
    expect(liveShown("data-live-during", days, on("2026-11-09"))).toBe(true);
    expect(liveShown("data-live-during", days, on("2026-11-12"))).toBe(true);
    expect(liveShown("data-live-during", days, on("2026-11-13"))).toBe(false);
    expect(liveShown("data-live-outside", days, on("2026-11-08"))).toBe(true);
    expect(liveShown("data-live-outside", days, on("2026-11-10"))).toBe(false);
    expect(liveShown("data-live-outside", days, on("2026-11-13"))).toBe(true);
  });

  test("the attributes the pages render match what is recounted", () => {
    expect(live.years("2014-07-15")).toEqual({ "data-live-years": "2014-07-15" });
    expect(live.during("2026-11-09", "2026-11-12")).toEqual({
      "data-live-during": "2026-11-09/2026-11-12",
    });
  });
});
