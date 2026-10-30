import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";

import { RouterHead } from "./app/shell/RouterHead";
import globalStyles from "./platform/design/global.css?inline";
import { THEME_KEY, themeColors } from "./platform/ui";

/**
 * Applies a stored choice of hour before the first paint, so the page never flashes the other
 * one. The same logic as platform/ui/theme.ts, inlined because it must run before any module.
 */
const applyStoredTheme = `(()=>{try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==="afternoon"||t==="dusk"){document.documentElement.dataset.theme=t;var c=${JSON.stringify(themeColors)}[t];document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.content=c})}}catch(e){}})()`;

export default component$(() => {
  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {/* --color-sky-top at each hour (theme.css); a meta tag can't read CSS */}
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content={themeColors.afternoon}
        />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content={themeColors.dusk} />
        <script dangerouslySetInnerHTML={applyStoredTheme} />
        <RouterHead />
      </head>
      <body class="bg-sky font-sans text-ink antialiased">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
