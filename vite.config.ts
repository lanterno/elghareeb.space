import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { freshImageCache } from "./src/platform/build/fresh-image-cache";
import { remarkLocalImages } from "./src/platform/build/remark-local-images";

export default defineConfig(() => {
  return {
    plugins: [
      freshImageCache(),
      qwikCity({
        // Routes are a thin manifest under app/; every page's code lives with its module
        routesDir: "src/app/routes",
        // Blog posts are markdown; images beside a post go through the same pipeline as the rest
        mdx: {
          remarkPlugins: [
            [remarkLocalImages, { sizes: "(min-width: 768px) 680px, calc(100vw - 80px)" }],
          ],
        },
      }),
      qwikVite(),
      tsconfigPaths(),
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
