import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";

import { RouterHead } from "./app/shell/RouterHead";
import globalStyles from "./platform/design/global.css?inline";

export default component$(() => {
  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <meta name="color-scheme" content="light" />
        {/* --color-sky-top in global.css; a meta tag can't read CSS */}
        <meta name="theme-color" content="#8cc1e2" />
        <RouterHead />
      </head>
      <body class="bg-sky font-sans text-ink antialiased">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
