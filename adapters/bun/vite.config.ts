import { bunServerAdapter } from "@builder.io/qwik-city/adapters/bun-server/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";

import baseConfig from "../../vite.config";

// Type assertion needed due to Vite version mismatch between qwik-city's bundled vite and project vite
export default extendConfig(baseConfig as Parameters<typeof extendConfig>[0], () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["@qwik-city-plan"],
      },
    },
    plugins: [
      bunServerAdapter({
        ssg: {
          include: ["/*"],
          origin: "https://elghareeb.space",
        },
      }),
    ],
  };
});
