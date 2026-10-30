/**
 * The Worker in front of the static site. Every request is served from the built assets, except
 * `POST /api/event`, which stores one interaction in Analytics Engine; see `event.ts` for what
 * is stored. Read it back with the SQL API: `SELECT blob1 AS name, blob2 AS path, blob3 AS
 * target, count() FROM site_events WHERE timestamp > NOW() - INTERVAL '30' DAY GROUP BY ALL`.
 */
import { parseEvent } from "./event";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  EVENTS: {
    writeDataPoint(point: { indexes: string[]; blobs: string[]; doubles: number[] }): void;
  };
}

/** Cloudflare adds request metadata the standard `Request` type doesn't know about */
interface EdgeRequest extends Request {
  cf?: { country?: string };
}

export default {
  async fetch(request: EdgeRequest, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname !== "/api/event") return env.ASSETS.fetch(request);
    if (request.method !== "POST") {
      return new Response(null, { status: 405, headers: { allow: "POST" } });
    }
    const event = parseEvent(await request.text());
    if (event === undefined) return new Response(null, { status: 400 });
    env.EVENTS.writeDataPoint({
      indexes: [event.name],
      blobs: [event.name, event.path, event.target, request.cf?.country ?? ""],
      doubles: [event.value],
    });
    return new Response(null, { status: 204 });
  },
};
