/**
 * `GET /stats`: the site's numbers in one place, for its owner. It sits behind HTTP Basic auth
 * whose password is the Worker secret `STATS_PASSWORD`. Traffic, devices and speed come from
 * Cloudflare Web Analytics (`traffic.ts`); what visitors did comes from the `site_events`
 * dataset the page beacon fills, read through the Analytics Engine SQL API. Both use the Worker
 * secret `CF_ANALYTICS_TOKEN` (Account Analytics: Read).
 */
import { type Count, loadTraffic, type Traffic, type TrafficEnv } from "./traffic";

export interface StatsEnv extends TrafficEnv {
  STATS_PASSWORD?: string;
}

export interface StatsData {
  days: number;
  /** Absent when Cloudflare could not be asked; `trafficError` then says why */
  traffic?: Traffic;
  trafficError?: string;
  /** Events by name */
  totals: Count[];
  /** Links to other sites that were followed, and from which page */
  outbound: { target: string; page: string; n: number }[];
  /** The closing scene's button, by page */
  talk: { page: string; n: number }[];
  /** Posts: how many readers passed the middle, how many reached the end */
  reading: { page: string; half: number; full: number }[];
}

/** The SQL API sends sums as numbers, but nothing promises it never sends a string */
type Num = number | string;

const PERIODS = [1, 7, 30] as const;
const DATASET = "site_events";

/** The response for `/stats`: a challenge, the page, or why there is no page. */
export async function statsResponse(request: Request, env: StatsEnv): Promise<Response> {
  if (env.STATS_PASSWORD === undefined || env.CF_ANALYTICS_TOKEN === undefined) {
    return new Response("Stats are not configured: set STATS_PASSWORD and CF_ANALYTICS_TOKEN.", {
      status: 503,
    });
  }
  if (!authorized(request.headers.get("authorization"), env.STATS_PASSWORD)) {
    return new Response("Who goes there?", {
      status: 401,
      headers: { "www-authenticate": 'Basic realm="stats", charset="UTF-8"' },
    });
  }
  const days = period(new URL(request.url).searchParams.get("days"));
  try {
    const data = await load(env, days);
    return new Response(renderStats(data), {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "private, no-store",
        "x-robots-tag": "noindex",
      },
    });
  } catch (error) {
    return new Response(`Could not read the events: ${reason(error)}`, { status: 502 });
  }
}

const reason = (error: unknown): string =>
  error instanceof Error ? error.message : "unknown error";

/** True when the Basic auth header carries the password, whatever the user name */
export function authorized(header: string | null, password: string): boolean {
  if (header?.startsWith("Basic ") !== true) return false;
  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return false;
  }
  return sameSecret(decoded.slice(decoded.indexOf(":") + 1), password);
}

/** Compares in constant time, so the response time says nothing about the password */
function sameSecret(given: string, expected: string): boolean {
  const a = new TextEncoder().encode(given);
  const b = new TextEncoder().encode(expected);
  if (a.byteLength !== b.byteLength) return false;
  let diff = 0;
  for (let i = 0; i < a.byteLength; i++) diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  return diff === 0;
}

function period(raw: string | null): number {
  const n = Number(raw);
  return (PERIODS as readonly number[]).includes(n) ? n : 30;
}

async function load(env: StatsEnv, days: number): Promise<StatsData> {
  const since = `timestamp > NOW() - INTERVAL '${String(days)}' DAY AND blob1 <> 'smoke-test'`;
  const run = <T>(select: string, where: string, tail: string): Promise<T[]> =>
    sql<T>(env, `SELECT ${select} FROM ${DATASET} WHERE ${since} ${where} ${tail}`);
  const [traffic, totals, outbound, talk, depths] = await Promise.all([
    loadTraffic(env, days).then(
      (t) => ({ traffic: t }),
      (error: unknown) => ({ trafficError: reason(error) })
    ),
    run<{ name: string; n: Num }>(
      "blob1 AS name, SUM(_sample_interval) AS n",
      "",
      "GROUP BY name ORDER BY n DESC"
    ),
    run<{ target: string; page: string; n: Num }>(
      "blob3 AS target, blob2 AS page, SUM(_sample_interval) AS n",
      "AND blob1 = 'outbound'",
      "GROUP BY target, page ORDER BY n DESC LIMIT 40"
    ),
    run<{ page: string; n: Num }>(
      "blob2 AS page, SUM(_sample_interval) AS n",
      "AND blob1 = 'talk'",
      "GROUP BY page ORDER BY n DESC"
    ),
    run<{ page: string; depth: Num; n: Num }>(
      "blob2 AS page, double1 AS depth, SUM(_sample_interval) AS n",
      "AND blob1 = 'read'",
      "GROUP BY page, depth"
    ),
  ]);
  return {
    days,
    ...traffic,
    totals: totals.map((r) => ({ name: r.name, n: Number(r.n) })),
    outbound: outbound.map((r) => ({ target: r.target, page: r.page, n: Number(r.n) })),
    talk: talk.map((r) => ({ page: r.page, n: Number(r.n) })),
    reading: foldReading(depths),
  };
}

async function sql<T>(env: StatsEnv, query: string): Promise<T[]> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/analytics_engine/sql`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${env.CF_ANALYTICS_TOKEN ?? ""}` },
      body: query,
    }
  );
  if (!response.ok) throw new Error(`the SQL API answered ${String(response.status)}`);
  const body = (await response.json()) as { data?: T[] };
  return body.data ?? [];
}

/** One row per post from the (page, depth, count) rows, most finished first */
export function foldReading(rows: { page: string; depth: Num; n: Num }[]): StatsData["reading"] {
  const byPage = new Map<string, { half: number; full: number }>();
  for (const row of rows) {
    const entry = byPage.get(row.page) ?? { half: 0, full: 0 };
    if (Number(row.depth) >= 100) entry.full += Number(row.n);
    else entry.half += Number(row.n);
    byPage.set(row.page, entry);
  }
  return [...byPage.entries()]
    .map(([page, counts]) => ({ page, ...counts }))
    .sort((a, b) => (b.full === a.full ? b.half - a.half : b.full - a.full));
}

const escape = (text: string): string =>
  text.replace(/[&<>"']/g, (c) => `&#${String(c.charCodeAt(0))};`);

/** Links are shown without the scheme and the trailing slash */
const short = (url: string): string => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Web Analytics' names for a few browsers and systems, as people say them */
const NAMES: Record<string, string> = {
  MacOSX: "macOS",
  ChromeMobile: "Chrome (mobile)",
  ChromeMobileiOS: "Chrome (iOS)",
  MobileSafari: "Safari (mobile)",
  MobileSafariUIWebView: "Safari (in an app)",
  FirefoxMobile: "Firefox (mobile)",
  SamsungInternet: "Samsung Internet",
};
export const name = (raw: string, empty: string): string =>
  raw === "" ? empty : (NAMES[raw] ?? raw.replace(/([a-z]{2})([A-Z])/g, "$1 $2"));

const label = (days: number): string => (days === 1 ? "24 hours" : `${String(days)} days`);

/** A timing in the unit that reads best: "702 ms", "3.2 s"; layout shift as a bare ratio */
export const measure = (p75: number, unitless: boolean): string =>
  unitless
    ? p75.toFixed(2)
    : p75 >= 1000
      ? `${(p75 / 1000).toFixed(1)} s`
      : `${String(Math.round(p75))} ms`;

const table = (head: string[], rows: string[][], empty: string): string =>
  rows.length === 0
    ? `<p class="empty">${escape(empty)}</p>`
    : `<table><thead><tr>${head.map((h, i) => `<th${i > 0 ? ' class="n"' : ""}>${escape(h)}</th>`).join("")}</tr></thead><tbody>${rows
        .map(
          (r) => `<tr>${r.map((c, i) => `<td${i > 0 ? ' class="n"' : ""}>${c}</td>`).join("")}</tr>`
        )
        .join("")}</tbody></table>`;

const counts = (title: string, rows: Count[], empty: string, nameOf = (n: string) => n): string =>
  `<div><h3>${escape(title)}</h3>${table(
    ["", "Visits"],
    rows.map((r) => [escape(nameOf(r.name)), String(r.n)]),
    empty
  )}</div>`;

function renderTraffic(data: StatsData): string {
  const t = data.traffic;
  if (t === undefined) {
    return `<section><h2>Traffic</h2><p class="empty">Cloudflare could not be asked: ${escape(data.trafficError ?? "unknown error")}.</p></section>`;
  }
  const peak = Math.max(1, ...t.byDay.map((d) => d.views));
  const bars =
    t.byDay.length < 2
      ? ""
      : `<div class="bars" role="img" aria-label="Page views per day">${t.byDay
          .map(
            (d) =>
              `<i style="--h:${String(Math.round((d.views / peak) * 100))}%" title="${d.date}: ${String(d.views)} views, ${String(d.visits)} visits"></i>`
          )
          .join("")}</div>`;
  const vitals = t.vitals
    .map(
      (v) =>
        `<div class="tile ${v.rating === undefined ? "" : v.rating.replace(" ", "-")}"><b>${
          v.p75 === undefined ? "–" : measure(v.p75, v.unitless)
        }</b><span>${escape(v.name)}</span><em>${escape(v.rating ?? "not measured yet")}</em></div>`
    )
    .join("");
  const answered = t.answered.reduce((sum, a) => sum + a.n, 0);
  const notFound = t.answered.filter((a) => a.status === 404).reduce((sum, a) => sum + a.n, 0);
  return `<section>
    <h2>Traffic</h2>
    <div class="tiles"><div class="tile sun"><b>${String(t.views)}</b><span>page views</span></div><div class="tile"><b>${String(t.visits)}</b><span>visits</span></div></div>
    ${bars}
  </section>
  <section>
    <h2>Pages</h2>
    ${table(
      ["Page", "Views", "Visits"],
      t.pages.map((p) => [escape(p.path), String(p.views), String(p.visits)]),
      "No page has been viewed yet."
    )}
  </section>
  <section class="pair">
    ${counts("Came from", t.referrers, "No visits yet.", (n) => name(n, "typed the address, or no referrer"))}
    ${counts("Country", t.countries, "No visits yet.", (n) => name(n, "unknown"))}
  </section>
  <section class="trio">
    ${counts("Device", t.devices, "No visits yet.", (n) => name(n, "unknown"))}
    ${counts("Browser", t.browsers, "No visits yet.", (n) => name(n, "unknown"))}
    ${counts("System", t.systems, "No visits yet.", (n) => name(n, "unknown"))}
  </section>
  <section>
    <h2>Speed</h2>
    <p class="lead">What three quarters of visitors got or better. Google wants the first three green.</p>
    <div class="tiles">${vitals}</div>
  </section>
  <section>
    <h2>Behind the scenes</h2>
    <p class="lead">The Worker answered <b>${String(answered)}</b> requests, crawlers and scanners included; <b>${String(notFound)}</b> of them asked for a page that does not exist.</p>
    ${table(
      ["Status", "Requests"],
      t.answered.map((a) => [String(a.status), String(a.n)]),
      "Nothing yet."
    )}
  </section>`;
}

export function renderStats(data: StatsData): string {
  const all = data.totals.reduce((sum, t) => sum + t.n, 0);
  const periods = PERIODS.map((d) =>
    d === data.days
      ? `<strong>${label(d)}</strong>`
      : `<a href="/stats?days=${String(d)}">${label(d)}</a>`
  ).join(" · ");
  const totals = data.totals
    .map((t) => `<div class="tile"><b>${String(t.n)}</b><span>${escape(t.name)}</span></div>`)
    .join("");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>How the site is doing</title>
<style>
  :root { --ink: #2b3a44; --muted: #5c6770; --panel: #fffdf7; --sun: #f2b233; --line: rgb(43 58 68 / 0.1);
    --good: #cfe9c9; --needs: #fbe1a6; --poor: #f6c7bd; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; padding: 40px 16px 80px; color: var(--ink);
    font: 16px/1.6 system-ui, sans-serif; background: linear-gradient(#8cc1e2, #e4f0f1 60%); }
  main { max-width: 860px; margin: 0 auto; display: grid; gap: 20px; }
  h1 { margin: 0; font-size: clamp(30px, 5vw, 44px); line-height: 1.05; letter-spacing: -0.02em; }
  .lead { margin: 6px 0 12px; color: var(--muted); }
  .lead a { color: var(--ink); }
  .lead b { color: var(--ink); }
  section { background: var(--panel); border-radius: 28px; padding: 22px 24px;
    box-shadow: 0 1px 2px rgb(0 0 0 / .06), 0 14px 36px rgb(43 58 68 / .12); }
  h2 { margin: 0 0 12px; font-size: 20px; }
  h3 { margin: 0 0 8px; font-size: 16px; }
  .pair, .trio { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
  .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
  .tile { border-radius: 18px; padding: 14px 16px; background: rgb(43 58 68 / 0.05); }
  .tile b { display: block; font-size: 30px; line-height: 1.1; }
  .tile span { color: var(--muted); font-size: 14px; }
  .tile em { display: block; font-style: normal; font-size: 13px; font-weight: 600; margin-top: 4px; }
  .tile.sun { background: var(--sun); }
  .tile.good { background: var(--good); }
  .tile.needs-work { background: var(--needs); }
  .tile.poor { background: var(--poor); }
  .bars { display: flex; align-items: flex-end; gap: 3px; height: 72px; margin-top: 16px; }
  .bars i { flex: 1; display: block; height: max(3px, var(--h)); background: var(--sun); border-radius: 3px 3px 0 0; }
  table { width: 100%; border-collapse: collapse; font-size: 15px; }
  th { text-align: left; color: var(--muted); font-weight: 600; font-size: 13px; padding: 0 0 8px; }
  td { padding: 8px 0; border-top: 1px solid var(--line); word-break: break-all; }
  td.n, th.n { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; padding-left: 12px; }
  .empty { margin: 0; color: var(--muted); }
  footer { color: var(--muted); font-size: 14px; }
</style>
</head>
<body>
<main>
  <header>
    <h1>How the site is doing</h1>
    <p class="lead">elghareeb.space over the last ${periods}.</p>
  </header>
  ${renderTraffic(data)}
  <section>
    <h2>What visitors did</h2>
    <div class="tiles"><div class="tile sun"><b>${String(all)}</b><span>interactions</span></div>${totals}</div>
  </section>
  <section>
    <h2>Links people followed</h2>
    ${table(
      ["Where to", "From", "Clicks"],
      data.outbound.map((r) => [escape(short(r.target)), escape(r.page), String(r.n)]),
      "No one has followed a link out yet."
    )}
  </section>
  <section>
    <h2>“Let’s talk”</h2>
    ${table(
      ["Page", "Clicks"],
      data.talk.map((r) => [escape(r.page), String(r.n)]),
      "The closing button has not been pressed yet."
    )}
  </section>
  <section>
    <h2>Reading</h2>
    ${table(
      ["Post", "Past the middle", "To the end"],
      data.reading.map((r) => [escape(r.page), String(r.half), String(r.full)]),
      "No post has been read yet."
    )}
  </section>
  <footer>Traffic and speed are measured by Cloudflare Web Analytics in visitors' browsers; interactions by this site's own beacon. Neither counts people who block scripts or ask not to be tracked.</footer>
</main>
</body>
</html>`;
}
