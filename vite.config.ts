import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { mkdirSync, rmSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
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
    plugins: [freshImageCache(), qwikCity(), qwikVite(), tsconfigPaths()],
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
