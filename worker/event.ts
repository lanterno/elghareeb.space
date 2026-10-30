/**
 * One interaction on the site, as the page's beacon reports it and as it is stored. The page
 * sends `{ n, p, t?, v? }`; nothing in it identifies a visitor, and the Worker adds only the
 * visitor's country.
 */
export interface SiteEvent {
  /** What happened: "outbound", "talk", "read" */
  name: string;
  /** The page it happened on */
  path: string;
  /** What it happened to: a link's destination, or "" */
  target: string;
  /** A number that goes with it: how far a post was read, or 1 */
  value: number;
}

const NAME = /^[a-z][a-z0-9-]{0,31}$/;
const MAX_BODY = 1024;
const MAX_FIELD = 200;

/** The event in a beacon body, or undefined when the body is not one we store. */
export function parseEvent(body: string): SiteEvent | undefined {
  if (body.length > MAX_BODY) return undefined;
  let raw: unknown;
  try {
    raw = JSON.parse(body);
  } catch {
    return undefined;
  }
  if (typeof raw !== "object" || raw === null) return undefined;
  const { n, p, t, v } = raw as Record<string, unknown>;
  if (typeof n !== "string" || !NAME.test(n)) return undefined;
  if (typeof p !== "string" || !p.startsWith("/") || p.length > MAX_FIELD) return undefined;
  if (t !== undefined && (typeof t !== "string" || t.length > MAX_FIELD)) return undefined;
  if (v !== undefined && (typeof v !== "number" || !Number.isFinite(v))) return undefined;
  return { name: n, path: p, target: t ?? "", value: v ?? 1 };
}
