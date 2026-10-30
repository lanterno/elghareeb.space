/**
 * `GET /stats`: what visitors did, for the site's owner. It sits behind HTTP Basic auth whose
 * password is the Worker secret `STATS_PASSWORD`, and reads the `site_events` dataset through
 * the Analytics Engine SQL API with the Worker secret `CF_ANALYTICS_TOKEN` (Account Analytics:
 * Read). Page views are not here: Cloudflare Web Analytics shows those.
 */

export interface StatsEnv {
  ACCOUNT_ID: string;
  STATS_PASSWORD?: string;
  CF_ANALYTICS_TOKEN?: string;
}

export interface StatsData {
  days: number;
  /** Events by name */
  totals: { name: string; n: number }[];
  /** Links to other sites that were followed, and from which page */
  outbound: { target: string; page: string; n: number }[];
  /** The closing scene's button, by page */
  talk: { page: string; n: number }[];
  /** Posts: how many readers passed the middle, how many reached the end */
  reading: { page: string; half: number; full: number }[];
  countries: { country: string; n: number }[];
}

/** The SQL API sends sums as numbers, but nothing promises it never sends a string */
type Num = number | string;

const PERIODS = [7, 30, 90] as const;
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
    const reason = error instanceof Error ? error.message : "unknown error";
    return new Response(`Could not read the events: ${reason}`, { status: 502 });
  }
}

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
  const [totals, outbound, talk, depths, countries] = await Promise.all([
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
    run<{ country: string; n: Num }>(
      "blob4 AS country, SUM(_sample_interval) AS n",
      "",
      "GROUP BY country ORDER BY n DESC LIMIT 12"
    ),
  ]);
  return {
    days,
    totals: totals.map((r) => ({ name: r.name, n: Number(r.n) })),
    outbound: outbound.map((r) => ({ target: r.target, page: r.page, n: Number(r.n) })),
    talk: talk.map((r) => ({ page: r.page, n: Number(r.n) })),
    reading: foldReading(depths),
    countries: countries.map((r) => ({ country: r.country, n: Number(r.n) })),
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

const table = (head: string[], rows: string[][], empty: string): string =>
  rows.length === 0
    ? `<p class="empty">${escape(empty)}</p>`
    : `<table><thead><tr>${head.map((h) => `<th>${escape(h)}</th>`).join("")}</tr></thead><tbody>${rows
        .map(
          (r) =>
            `<tr>${r.map((c, i) => `<td${i === r.length - 1 ? ' class="n"' : ""}>${c}</td>`).join("")}</tr>`
        )
        .join("")}</tbody></table>`;

export function renderStats(data: StatsData): string {
  const all = data.totals.reduce((sum, t) => sum + t.n, 0);
  const periods = PERIODS.map((d) =>
    d === data.days
      ? `<strong>${String(d)} days</strong>`
      : `<a href="/stats?days=${String(d)}">${String(d)} days</a>`
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
<title>What visitors did</title>
<style>
  :root { --ink: #2b3a44; --muted: #5c6770; --panel: #fffdf7; --sun: #f2b233; --line: rgb(43 58 68 / 0.1); }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; padding: 40px 16px 80px; color: var(--ink);
    font: 16px/1.6 system-ui, sans-serif; background: linear-gradient(#8cc1e2, #e4f0f1 60%); }
  main { max-width: 860px; margin: 0 auto; display: grid; gap: 20px; }
  h1 { margin: 0; font-size: clamp(30px, 5vw, 44px); line-height: 1.05; letter-spacing: -0.02em; }
  .lead { margin: 6px 0 0; color: var(--muted); }
  .lead a { color: var(--ink); }
  section { background: var(--panel); border-radius: 28px; padding: 22px 24px;
    box-shadow: 0 1px 2px rgb(0 0 0 / .06), 0 14px 36px rgb(43 58 68 / .12); }
  h2 { margin: 0 0 12px; font-size: 20px; }
  .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
  .tile { border-radius: 18px; padding: 14px 16px; background: rgb(43 58 68 / 0.05); }
  .tile b { display: block; font-size: 30px; line-height: 1.1; }
  .tile span { color: var(--muted); font-size: 14px; }
  .tile.sun { background: var(--sun); }
  table { width: 100%; border-collapse: collapse; font-size: 15px; }
  th { text-align: left; color: var(--muted); font-weight: 600; font-size: 13px; padding: 0 0 8px; }
  td { padding: 8px 0; border-top: 1px solid var(--line); word-break: break-all; }
  td.n, th:last-child { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .empty { margin: 0; color: var(--muted); }
</style>
</head>
<body>
<main>
  <header>
    <h1>What visitors did</h1>
    <p class="lead">Interactions on elghareeb.space over the last ${periods}. Page views and visitors are in Cloudflare Web Analytics.</p>
  </header>
  <section>
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
  <section>
    <h2>Countries</h2>
    ${table(
      ["Country", "Interactions"],
      data.countries.map((r) => [escape(r.country === "" ? "unknown" : r.country), String(r.n)]),
      "Nothing yet."
    )}
  </section>
</main>
</body>
</html>`;
}
