/**
 * Type-safe environment variable handling with Valibot validation
 */
import * as v from "valibot";

// ============================================================================
// Environment Schema
// ============================================================================

const EnvSchema = v.object({
  /** Base URL for the site (used for canonical URLs, OG images, etc.) */
  PUBLIC_SITE_URL: v.optional(v.pipe(v.string(), v.url()), "https://elghareeb.space"),

  /** Node environment mode */
  NODE_ENV: v.optional(v.picklist(["development", "production", "test"]), "development"),

  /** Enable debug mode */
  DEBUG: v.optional(
    v.pipe(
      v.string(),
      v.transform((val) => val === "true" || val === "1")
    ),
    "false"
  ),
});

// ============================================================================
// Environment Type
// ============================================================================

export type Env = v.InferOutput<typeof EnvSchema>;

// ============================================================================
// Environment Access
// ============================================================================

let cachedEnv: Env | undefined;

/**
 * Get validated environment variables.
 * Caches the result after first validation.
 *
 * @throws {ValiError} If environment variables are invalid
 */
export function getEnv(): Env {
  if (cachedEnv !== undefined) {
    return cachedEnv;
  }

  // In Bun, use Bun.env; in other environments, use process.env
  // Using bracket notation because env objects have index signatures
  const rawEnv: Record<string, string | undefined> =
    typeof Bun !== "undefined" ? Bun.env : process.env;

  cachedEnv = v.parse(EnvSchema, {
    PUBLIC_SITE_URL: rawEnv["PUBLIC_SITE_URL"],
    NODE_ENV: rawEnv["NODE_ENV"],
    DEBUG: rawEnv["DEBUG"],
  });

  return cachedEnv;
}

/**
 * Check if running in development mode
 */
export function isDev(): boolean {
  return getEnv().NODE_ENV === "development";
}

/**
 * Check if running in production mode
 */
export function isProd(): boolean {
  return getEnv().NODE_ENV === "production";
}

/**
 * Check if debug mode is enabled
 */
export function isDebug(): boolean {
  return getEnv().DEBUG;
}

/**
 * Get the site URL (with trailing slash removed)
 */
export function getSiteUrl(): string {
  return getEnv().PUBLIC_SITE_URL.replace(/\/$/, "");
}
