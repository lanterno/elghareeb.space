/**
 * Recounts the dates a page marked `data-live-*` (src/platform/kernel/live.ts says which) for the
 * day of the request, streaming the HTML through unchanged otherwise. The arithmetic is the
 * kernel's own, so the Worker and the build count the same way.
 */
import {
  liveShowAttributes,
  liveShown,
  liveText,
  liveTextAttributes,
} from "../src/platform/kernel/live";

/** An HTML response with its live dates recounted; any other response untouched */
export function recounted(response: Response, today: Date = new Date()): Response {
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) return response;
  const rewriter = new HTMLRewriter();
  for (const name of liveTextAttributes) {
    rewriter.on(`[${name}]`, {
      element(el) {
        el.setInnerContent(liveText(name, el.getAttribute(name) ?? "", today));
      },
    });
  }
  for (const name of liveShowAttributes) {
    rewriter.on(`[${name}]`, {
      element(el) {
        const shown = liveShown(name, el.getAttribute(name) ?? "", today);
        if (name === "data-live-until") {
          if (!shown) el.remove();
        } else if (shown) {
          el.removeAttribute("hidden");
        } else {
          el.setAttribute("hidden", "");
        }
      },
    });
  }
  return rewriter.transform(response);
}
