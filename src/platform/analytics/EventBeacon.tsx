import type { JSXOutput } from "@builder.io/qwik";

/**
 * Reports a few interactions to `/api/event` (see `worker/index.ts`), without cookies or
 * identifiers and not at all for visitors who ask not to be tracked:
 *
 * - `outbound`: a click on a link to another site, with where it leads. A `data-track="name"` on
 *   the link or an ancestor names the event instead, so one call to action can be told apart.
 * - `read`: half of, then all of, the element marked `data-track-read` has scrolled past.
 *
 * One plain script for the whole site; nothing here needs Qwik's runtime.
 */
export const EventBeacon = (): JSXOutput => {
  if (!import.meta.env.PROD) return null;
  return <script dangerouslySetInnerHTML={script} />;
};

const script = `(() => {
  const nav = navigator;
  if (nav.doNotTrack === "1" || nav.globalPrivacyControl) return;
  const send = (event) => {
    const body = JSON.stringify({ p: location.pathname, ...event });
    if (!nav.sendBeacon("/api/event", body)) {
      fetch("/api/event", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  };

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (!link) return;
    const url = new URL(link.href, location.href);
    const named = link.closest("[data-track]");
    if (named) send({ n: named.dataset.track, t: url.origin + url.pathname });
    else if (url.host !== location.host) send({ n: "outbound", t: url.origin + url.pathname });
  });

  const reading = document.querySelector("[data-track-read]");
  if (!reading) return;
  let next = 50;
  const check = () => {
    const box = reading.getBoundingClientRect();
    const seen = Math.round(((innerHeight - box.top) / box.height) * 100);
    while (next <= 100 && seen >= next) {
      send({ n: "read", v: next });
      next += 50;
    }
    if (next > 100) removeEventListener("scroll", check);
  };
  addEventListener("scroll", check, { passive: true });
})();`;
