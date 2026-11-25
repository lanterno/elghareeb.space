/**
 * `GET /api/sky`: the weather right now over Chavannes-près-Renens, for the meadow page to draw
 * over its painting. One reading from Open-Meteo's MeteoSwiss model (no key, no visitor data
 * sent), shaped down to what the scene needs and kept at the edge for twenty minutes, so the
 * upstream is asked a few times an hour however many people are watching. When it cannot be
 * read the answer is `204` and the page keeps the painting's own fair afternoon.
 */

/** Town level, as the site already says where I live */
const place = { latitude: 46.53, longitude: 6.57, name: "Chavannes-près-Renens" };

const source =
  "https://api.open-meteo.com/v1/forecast?" +
  `latitude=${String(place.latitude)}&longitude=${String(place.longitude)}` +
  "&models=meteoswiss_icon_ch1&timezone=Europe%2FZurich" +
  "&current=temperature_2m,weather_code,wind_speed_10m";

const keptSeconds = 1200;

export type SkyScene = "clear" | "cloudy" | "fog" | "rain" | "snow" | "storm";

export interface Sky {
  /** Which set of layers the scene draws */
  scene: SkyScene;
  /** How hard it rains or snows, 0 to 1; 0 when it does neither */
  intensity: number;
  /** In plain words, for the line under the painting */
  label: string;
  place: string;
  /** Degrees Celsius, rounded */
  temp: number;
  /** A multiplier for slant and drift: 1 when still, 3.5 at 40 km/h and above */
  wind: number;
}

/** WMO weather codes, as Open-Meteo reports them: [scene, words, intensity] */
const wmo: Record<number, readonly [SkyScene, string, number]> = {
  0: ["clear", "clear", 0],
  1: ["clear", "mostly clear", 0],
  2: ["cloudy", "partly cloudy", 0],
  3: ["cloudy", "overcast", 0],
  45: ["fog", "fog", 0],
  48: ["fog", "freezing fog", 0],
  51: ["rain", "light drizzle", 0.45],
  53: ["rain", "drizzle", 0.55],
  55: ["rain", "heavy drizzle", 0.7],
  56: ["rain", "freezing drizzle", 0.55],
  57: ["rain", "freezing drizzle", 0.7],
  61: ["rain", "light rain", 0.65],
  63: ["rain", "rain", 0.85],
  65: ["rain", "heavy rain", 1],
  66: ["rain", "freezing rain", 0.7],
  67: ["rain", "heavy freezing rain", 1],
  71: ["snow", "light snow", 0.5],
  73: ["snow", "snow", 0.8],
  75: ["snow", "heavy snow", 1],
  77: ["snow", "snow grains", 0.5],
  80: ["rain", "light showers", 0.6],
  81: ["rain", "showers", 0.85],
  82: ["rain", "violent showers", 1],
  85: ["snow", "snow showers", 0.6],
  86: ["snow", "heavy snow showers", 1],
  95: ["storm", "a thunderstorm", 1],
  96: ["storm", "a thunderstorm with hail", 1],
  99: ["storm", "a thunderstorm with hail", 1],
};

/** Open-Meteo's answer as the scene wants it, or `undefined` when it is not a reading */
export function shapeSky(raw: unknown): Sky | undefined {
  if (typeof raw !== "object" || raw === null || !("current" in raw)) return undefined;
  const current = raw.current;
  if (typeof current !== "object" || current === null) return undefined;
  const { temperature_2m, weather_code, wind_speed_10m } = current as Record<string, unknown>;
  if (typeof weather_code !== "number" || typeof temperature_2m !== "number") return undefined;
  // An unknown code reads as the nearest known one below it, so a new code degrades gently
  const known = Object.keys(wmo)
    .map(Number)
    .filter((code) => code <= weather_code);
  const entry = wmo[Math.max(0, ...known)];
  if (entry === undefined) return undefined;
  const kmh = typeof wind_speed_10m === "number" ? wind_speed_10m : 0;
  return {
    scene: entry[0],
    intensity: entry[2],
    label: entry[1],
    place: place.name,
    temp: Math.round(temperature_2m),
    wind: Math.round((1 + 2.5 * Math.min(Math.max(kmh - 10, 0) / 30, 1)) * 100) / 100,
  };
}

/** What the Worker needs from its runtime to keep a reading between requests */
export interface SkyRuntime {
  cache: {
    match(key: string): Promise<Response | undefined>;
    put(key: string, value: Response): Promise<void>;
  };
  fetch(url: string): Promise<Response>;
}

export async function skyResponse(runtime: SkyRuntime): Promise<Response> {
  const key = "https://elghareeb.space/api/sky";
  const kept = await runtime.cache.match(key);
  if (kept !== undefined) return kept;
  let sky: Sky | undefined;
  try {
    const upstream = await runtime.fetch(source);
    if (upstream.ok) sky = shapeSky(await upstream.json());
  } catch {
    sky = undefined;
  }
  if (sky === undefined) return new Response(null, { status: 204 });
  const response = new Response(JSON.stringify(sky), {
    headers: {
      "cache-control": `public, max-age=${String(keptSeconds)}`,
      "content-type": "application/json; charset=utf-8",
    },
  });
  await runtime.cache.put(key, response.clone());
  return response;
}
