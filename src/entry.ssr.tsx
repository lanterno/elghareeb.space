import { renderToStream, type RenderToStreamOptions } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";

import Root from "./root";

import type { RenderToStreamResult } from "@builder.io/qwik/server";

export default function (opts: RenderToStreamOptions): Promise<RenderToStreamResult> {
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    containerAttributes: {
      lang: "en",
      ...opts.containerAttributes,
    },
    serverData: {
      ...opts.serverData,
    },
  });
}
