import { mkdirSync, rmSync } from "node:fs";

import type { Plugin } from "vite";

/**
 * vite-imagetools (behind Qwik's `?jsx` image imports) re-encodes any image it restores from its
 * cache, which changes the file's hash. The client build runs first and fills the cache, so the
 * SSR build would then point the HTML at images the client build never emitted. Starting every
 * build with an empty cache keeps both builds encoding fresh, and fresh encodes are identical.
 */
export function freshImageCache(): Plugin {
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
