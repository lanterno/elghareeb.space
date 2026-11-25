import { describe, expect, test } from "bun:test";

import { shapeSky, skyResponse, type SkyRuntime } from "./sky";

const reading = (code: number, wind = 5): unknown => ({
  current: { temperature_2m: 6.6, weather_code: code, wind_speed_10m: wind },
});

describe("shapeSky", () => {
  test("turns a reading into what the scene draws", () => {
    expect(shapeSky(reading(63))).toEqual({
      scene: "rain",
      intensity: 0.85,
      label: "rain",
      place: "Chavannes-près-Renens",
      temp: 7,
      wind: 1,
    });
    expect(shapeSky(reading(0))?.scene).toBe("clear");
    expect(shapeSky(reading(3))?.scene).toBe("cloudy");
    expect(shapeSky(reading(45))?.scene).toBe("fog");
    expect(shapeSky(reading(73))?.scene).toBe("snow");
    expect(shapeSky(reading(95))?.scene).toBe("storm");
  });

  test("reads an unknown code as the nearest known one below it", () => {
    expect(shapeSky(reading(64))?.label).toBe("rain");
    expect(shapeSky(reading(4))?.scene).toBe("cloudy");
  });

  test("scales the wind between still and a gale", () => {
    expect(shapeSky(reading(0, 0))?.wind).toBe(1);
    expect(shapeSky(reading(0, 25))?.wind).toBe(2.25);
    expect(shapeSky(reading(0, 90))?.wind).toBe(3.5);
  });

  test("rejects what is not a reading", () => {
    expect(shapeSky(null)).toBeUndefined();
    expect(shapeSky({})).toBeUndefined();
    expect(shapeSky({ current: null })).toBeUndefined();
    expect(shapeSky({ current: { temperature_2m: 5 } })).toBeUndefined();
    expect(shapeSky({ current: { temperature_2m: "5", weather_code: 0 } })).toBeUndefined();
  });
});

describe("skyResponse", () => {
  const runtime = (upstream: () => Promise<Response>): SkyRuntime & { asked: number } => {
    const kept = new Map<string, Response>();
    const self = {
      asked: 0,
      cache: {
        match: (key: string) => Promise.resolve(kept.get(key)?.clone()),
        put: (key: string, value: Response) => {
          kept.set(key, value);
          return Promise.resolve();
        },
      },
      fetch: () => {
        self.asked++;
        return upstream();
      },
    };
    return self;
  };

  test("asks upstream once and answers the next request from what it kept", async () => {
    const rt = runtime(() => Promise.resolve(Response.json(reading(71))));
    const first = await skyResponse(rt);
    expect(first.headers.get("cache-control")).toBe("public, max-age=1200");
    expect(((await first.json()) as { scene: string }).scene).toBe("snow");
    const second = await skyResponse(rt);
    expect(((await second.json()) as { scene: string }).scene).toBe("snow");
    expect(rt.asked).toBe(1);
  });

  test("answers 204 and keeps nothing when upstream fails", async () => {
    const down = runtime(() => Promise.resolve(new Response("no", { status: 502 })));
    expect((await skyResponse(down)).status).toBe(204);
    const broken = runtime(() => Promise.reject(new Error("offline")));
    expect((await skyResponse(broken)).status).toBe(204);
    const odd = runtime(() => Promise.resolve(Response.json({ hello: 1 })));
    expect((await skyResponse(odd)).status).toBe(204);
    expect((await skyResponse(odd)).status).toBe(204);
    expect(odd.asked).toBe(2);
  });
});
