import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "favicon.svg", "hero.jpg"],
        manifest: false, // Use existing manifest.json in public
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}"],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
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
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
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

    // Development server configuration
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },

    // Preview server configuration
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },

    // Build optimizations
    build: {
      // Target modern browsers for smaller bundles
      target: "es2022",

      // Minification settings
      minify: "esbuild" as const,

      // CSS code splitting
      cssCodeSplit: true,

      // Chunk size warnings
      chunkSizeWarningLimit: 500,

      // Note: Qwik handles chunk splitting automatically via its optimizer
      // Don't use manualChunks as it conflicts with Qwik's build process
    },

    // Optimizations for dependencies
    optimizeDeps: {
      // Pre-bundle these dependencies for faster dev startup
      include: ["valibot"],
    },

    // CSS configuration
    css: {
      // Enable CSS modules
      modules: {
        localsConvention: "camelCase" as const,
      },
    },
  };
});
