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
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#8cc1e2" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800&family=Zen+Maru+Gothic:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en" class="bg-sky font-sans text-ink antialiased">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
