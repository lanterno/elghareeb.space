import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";

import { RouterHead } from "./components/router-head/router-head";
import globalStyles from "./global.css?inline";

export default component$(() => {
  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Sora:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en" class="bg-cream-50 text-ink-900 antialiased">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
