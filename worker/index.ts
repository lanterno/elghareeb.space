/**
 * The Worker in front of the static site. Every request is served from the built assets, with
 * the dates a page marked as live recounted for today (`live.ts`), except two: `POST /api/event`
 * stores one interaction in Analytics Engine (`event.ts` says what), and `GET /stats` shows them
 * to the owner (`stats.ts`).
 */
import { parseEvent } from "./event";
import { recounted } from "./live";
import { type StatsEnv, statsResponse } from "./stats";

interface Env extends StatsEnv {
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
    if (pathname === "/stats") return statsResponse(request, env);
    if (pathname !== "/api/event") return recounted(await env.ASSETS.fetch(request));
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
