import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";

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
        <RouterHead />
      </head>
      <body lang="en" class="bg-sky font-sans text-ink antialiased">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
