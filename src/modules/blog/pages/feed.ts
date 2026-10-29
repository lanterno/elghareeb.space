import { site } from "~/platform/seo";

import { blogDescription } from "../content/blurb";
import { renderFeed } from "../feed";
import { visiblePosts } from "../repository";

import type { RequestHandler } from "@builder.io/qwik-city";

/** /blog/rss.xml — written as a file by the static build */
export const onGet: RequestHandler = (event) => {
  event.headers.set("Content-Type", "application/rss+xml; charset=utf-8");
  event.send(
    200,
    renderFeed(visiblePosts, {
      title: `${site.author} — Blog`,
      description: blogDescription,
      url: site.url,
    })
  );
};
