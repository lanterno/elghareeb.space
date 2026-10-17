import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { mkdirSync, rmSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * vite-imagetools (behind Qwik's `?jsx` image imports) re-encodes any image it
 * restores from its cache, which changes the file's hash. The client build runs
 * first and fills the cache, so the SSR build would then point the HTML at
 * images the client build never emitted. Starting every build with an empty
 * cache keeps both builds encoding fresh, and fresh encodes are identical.
 */
function freshImageCache(): Plugin {
  const dir = "./node_modules/.cache/imagetools";
  return {
    name: "fresh-image-cache",
    apply: "build",
    buildStart() {
      rmSync(dir, { recursive: true, force: true });
      mkdirSync(dir, { recursive: true });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      freshImageCache(),
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "favicon.svg"],
        manifest: false,
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff,woff2}"],
          globIgnores: ["**/hero.jpg"],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "gstatic-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
    ],
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
