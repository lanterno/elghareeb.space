/**
 * Cloudflare's own numbers for the site, read through the GraphQL Analytics API with the Worker
 * secret `CF_ANALYTICS_TOKEN` (Account Analytics: Read): what Web Analytics measured in visitors'
 * browsers (page views, visits, pages, referrers, countries, devices, Core Web Vitals), and what
 * the Worker answered, crawlers included. The account's plan caps a query at 32 days.
 */

export interface TrafficEnv {
  ACCOUNT_ID: string;
  /** The Web Analytics site tag of elghareeb.space, the `siteTag` dimension in GraphQL */
  WEB_ANALYTICS_SITE: string;
  CF_ANALYTICS_TOKEN?: string;
}

export interface Count {
  name: string;
  n: number;
}

export interface Vital {
  name: string;
  /** The 75th percentile in milliseconds (a ratio for layout shift); absent until measured */
  p75?: number;
  rating?: "good" | "needs work" | "poor";
  unitless: boolean;
}

export interface Traffic {
  views: number;
  visits: number;
  byDay: { date: string; views: number; visits: number }[];
  pages: { path: string; views: number; visits: number }[];
  /** `name` is the referring host, "" when the visitor typed the address or hid the referrer */
  referrers: Count[];
  countries: Count[];
  devices: Count[];
  browsers: Count[];
  systems: Count[];
  vitals: Vital[];
  /** Everything the Worker answered, by status code, crawlers and scanners included */
  answered: { status: number; n: number }[];
  /** What the GraphQL API complained about while still answering the rest */
  warnings: string[];
}

/** Google's thresholds for the 75th percentile; timings in milliseconds */
const VITALS = [
  { name: "Largest Contentful Paint", key: "largestContentfulPaintP75", good: 2500, poor: 4000 },
  { name: "Interaction to Next Paint", key: "interactionToNextPaintP75", good: 200, poor: 500 },
  { name: "Cumulative Layout Shift", key: "cumulativeLayoutShiftP75", good: 0.1, poor: 0.25 },
  { name: "Time to First Byte", key: "timeToFirstByteP75", good: 800, poor: 1800 },
  { name: "First Contentful Paint", key: "firstContentfulPaintP75", good: 1800, poor: 3000 },
] as const;

const QUERY = `query Stats($account: String!, $site: String!, $script: String!, $from: Time!) {
  viewer { accounts(filter: { accountTag: $account }) {
    total: rumPageloadEventsAdaptiveGroups(limit: 1, filter: { siteTag: $site, bot: 0, datetime_geq: $from }) {
      count sum { visits } }
    byDay: rumPageloadEventsAdaptiveGroups(limit: 40, orderBy: [date_ASC], filter: { siteTag: $site, bot: 0, datetime_geq: $from }) {
      count sum { visits } dimensions { date } }
    pages: rumPageloadEventsAdaptiveGroups(limit: 25, orderBy: [count_DESC], filter: { siteTag: $site, bot: 0, datetime_geq: $from }) {
      count sum { visits } dimensions { requestPath } }
    referrers: rumPageloadEventsAdaptiveGroups(limit: 15, orderBy: [sum_visits_DESC], filter: { siteTag: $site, bot: 0, datetime_geq: $from }) {
      sum { visits } dimensions { refererHost } }
    countries: rumPageloadEventsAdaptiveGroups(limit: 15, orderBy: [sum_visits_DESC], filter: { siteTag: $site, bot: 0, datetime_geq: $from }) {
      sum { visits } dimensions { countryName } }
    devices: rumPageloadEventsAdaptiveGroups(limit: 5, orderBy: [sum_visits_DESC], filter: { siteTag: $site, bot: 0, datetime_geq: $from }) {
      sum { visits } dimensions { deviceType } }
    browsers: rumPageloadEventsAdaptiveGroups(limit: 8, orderBy: [sum_visits_DESC], filter: { siteTag: $site, bot: 0, datetime_geq: $from }) {
      sum { visits } dimensions { userAgentBrowser } }
    systems: rumPageloadEventsAdaptiveGroups(limit: 8, orderBy: [sum_visits_DESC], filter: { siteTag: $site, bot: 0, datetime_geq: $from }) {
      sum { visits } dimensions { userAgentOS } }
    vitals: rumWebVitalsEventsAdaptiveGroups(limit: 1, filter: { siteTag: $site, bot: 0, datetime_geq: $from }) {
      quantiles { ${VITALS.map((v) => v.key).join(" ")} } }
    answered: workersAssetsRequestsAdaptiveGroups(limit: 20, filter: { scriptName: $script, datetime_geq: $from }) {
      sum { requests } dimensions { statusCode } }
  } }
}`;

/** One group of the GraphQL answer; which fields are present depends on the field asked */
export interface Group {
  count?: number;
  sum?: { visits?: number; requests?: number };
  dimensions?: Record<string, number | string | undefined>;
  quantiles?: Record<string, number | undefined>;
}

export type Account = Record<
  | "answered"
  | "browsers"
  | "byDay"
  | "countries"
  | "devices"
  | "pages"
  | "referrers"
  | "systems"
  | "total"
  | "vitals",
  Group[] | undefined
>;

export async function loadTraffic(env: TrafficEnv, days: number): Promise<Traffic> {
  const from = new Date(Date.now() - days * 86_400_000);
  const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.CF_ANALYTICS_TOKEN ?? ""}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        account: env.ACCOUNT_ID,
        site: env.WEB_ANALYTICS_SITE,
        script: "personal-site",
        from: from.toISOString(),
      },
    }),
  });
  if (!response.ok) throw new Error(`the GraphQL API answered ${String(response.status)}`);
  const body = (await response.json()) as {
    data?: { viewer?: { accounts?: Account[] } } | null;
    errors?: { message: string }[] | null;
  };
  const account = body.data?.viewer?.accounts?.[0];
  const warnings = (body.errors ?? []).map((e) => e.message);
  if (account === undefined) throw new Error(warnings[0] ?? "the GraphQL API sent no data");
  return { ...foldTraffic(account, from, new Date()), warnings };
}

/** The page's numbers from the GraphQL groups; every day of the period gets a bar, empty or not */
export function foldTraffic(account: Account, from: Date, to: Date): Traffic {
  const dim = (group: Group, name: string): string => String(group.dimensions?.[name] ?? "");
  const visits = (group: Group): number => group.sum?.visits ?? 0;
  const counts = (groups: Group[] | undefined, name: string): Count[] =>
    (groups ?? []).map((g) => ({ name: dim(g, name), n: visits(g) }));
  const total = account.total?.[0];
  const quantiles = account.vitals?.[0]?.quantiles ?? {};
  return {
    views: total?.count ?? 0,
    visits: total === undefined ? 0 : visits(total),
    byDay: fillDays(
      (account.byDay ?? []).map((g) => ({
        date: dim(g, "date"),
        views: g.count ?? 0,
        visits: visits(g),
      })),
      from,
      to
    ),
    pages: (account.pages ?? []).map((g) => ({
      path: dim(g, "requestPath"),
      views: g.count ?? 0,
      visits: visits(g),
    })),
    referrers: counts(account.referrers, "refererHost"),
    countries: counts(account.countries, "countryName"),
    devices: counts(account.devices, "deviceType"),
    browsers: counts(account.browsers, "userAgentBrowser"),
    systems: counts(account.systems, "userAgentOS"),
    vitals: VITALS.map((v) => vital(v, quantiles[v.key])),
    answered: (account.answered ?? [])
      .map((g) => ({ status: Number(dim(g, "statusCode")), n: g.sum?.requests ?? 0 }))
      .sort((a, b) => b.n - a.n),
    warnings: [],
  };
}

/** Timings arrive in microseconds and -1 means nothing was measured; layout shift is a ratio */
export function vital(spec: (typeof VITALS)[number], raw: number | undefined): Vital {
  const unitless = spec.good < 1;
  if (raw === undefined || raw < 0) return { name: spec.name, unitless };
  const p75 = unitless ? raw : raw / 1000;
  const rating = p75 <= spec.good ? "good" : p75 <= spec.poor ? "needs work" : "poor";
  return { name: spec.name, p75, rating, unitless };
}

/** One entry per UTC day from `from` to `to`, zero where Web Analytics has no group */
export function fillDays(rows: Traffic["byDay"], from: Date, to: Date): Traffic["byDay"] {
  const byDate = new Map(rows.map((r) => [r.date, r]));
  const days: Traffic["byDay"] = [];
  for (
    let t = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
    t <= to.getTime();
    t += 86_400_000
  ) {
    const date = new Date(t).toISOString().slice(0, 10);
    days.push(byDate.get(date) ?? { date, views: 0, visits: 0 });
  }
  return days;
}
