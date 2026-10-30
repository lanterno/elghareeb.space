import { describe, expect, test } from "bun:test";

import { recounted } from "./live";

const on = (iso: string): Date => new Date(`${iso}T12:00:00Z`);
const html = (body: string): Response =>
  new Response(body, { headers: { "content-type": "text/html; charset=utf-8" } });

describe("recounted", () => {
  test("rewrites the texts for the day of the request", async () => {
    const page = html(
      '<span data-live-years="2014-07-15">9</span> yrs · ' +
        '<span data-live-duration="2025-12-07">1 month</span> · ' +
        '© <span data-live-year="">2025</span>'
    );
    expect(await recounted(page, on("2027-03-01")).text()).toBe(
      '<span data-live-years="2014-07-15">12</span> yrs · ' +
        '<span data-live-duration="2025-12-07">1 year 2 months</span> · ' +
        '© <span data-live-year="">2027</span>'
    );
  });

  test("drops what has ended and switches the place for Now while it is on", async () => {
    const page = (): Response =>
      html(
        '<div data-live-until="2026-11-12"><a data-live-until="2026-10-29">Cairo</a>' +
          '<a data-live-until="2026-11-12"><span data-live-during="2026-11-09/2026-11-12" hidden>Now</span>' +
          '<span data-live-outside="2026-11-09/2026-11-12">Lisbon</span></a></div>'
      );
    expect(await recounted(page(), on("2026-11-01")).text()).toBe(
      '<div data-live-until="2026-11-12">' +
        '<a data-live-until="2026-11-12"><span data-live-during="2026-11-09/2026-11-12" hidden="">Now</span>' +
        '<span data-live-outside="2026-11-09/2026-11-12">Lisbon</span></a></div>'
    );
    expect(await recounted(page(), on("2026-11-10")).text()).toBe(
      '<div data-live-until="2026-11-12">' +
        '<a data-live-until="2026-11-12"><span data-live-during="2026-11-09/2026-11-12">Now</span>' +
        '<span data-live-outside="2026-11-09/2026-11-12" hidden="">Lisbon</span></a></div>'
    );
    expect(await recounted(page(), on("2026-11-13")).text()).toBe("");
  });

  test("leaves anything that is not HTML alone", async () => {
    const json = new Response('{"data-live-year":""}', {
      headers: { "content-type": "application/json" },
    });
    const same = recounted(json, on("2027-01-01"));
    expect(same).toBe(json);
    expect(await same.text()).toBe('{"data-live-year":""}');
  });
});
