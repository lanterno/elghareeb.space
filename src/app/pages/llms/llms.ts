import { blogHead, feedPath, visiblePosts } from "~/modules/blog";
import { authorDetails, workHead } from "~/modules/career";
import { servicePath, services, servicesHead, servicesPath } from "~/modules/services";
import { projectPath, projects, projectsHead } from "~/modules/showcase";
import { site } from "~/platform/seo";

import { head as aboutHead } from "../about/AboutPage";
import { head as homeHead } from "../home/HomePage";
import { llmsDocuments } from "./documents";
import { type LlmsLink, renderLlms, renderLlmsFull } from "./render";

import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

const url = (path: string): string => new URL(path, site.url).href;

/** A page's description, read from its head so it is written once */
function descriptionOf(head: DocumentHead): string {
  const meta = typeof head === "function" ? [] : (head.meta ?? []);
  const description = meta.find((tag) => tag.name === "description")?.content;
  if (description === undefined) throw new Error("A page in /llms.txt has no description");
  return description;
}

const pageHeads: Record<string, DocumentHead> = {
  "/work/": workHead,
  "/projects/": projectsHead,
  "/about/": aboutHead,
  "/blog/": blogHead,
};

const pages: LlmsLink[] = [
  ...site.nav.flatMap((item) => {
    const head = pageHeads[item.href];
    return head === undefined
      ? []
      : [{ title: item.label, url: url(item.href), description: descriptionOf(head) }];
  }),
  { title: "Work with me", url: url(servicesPath), description: descriptionOf(servicesHead) },
];

const author = authorDetails();

/** The text of /llms.txt, which /llms-full.txt also opens with */
function llmsIndex(): string {
  return renderLlms({
    name: site.author,
    summary: descriptionOf(homeHead),
    about: [
      `${site.bio} ${site.availability}`,
      `Currently at ${author.worksFor.name} (${author.worksFor.url}).`,
      `Works in ${site.languages.join(", ")}.`,
      `Works on: ${site.knowsAbout.join(", ")}.`,
    ].join(" "),
    sections: [
      {
        heading: "Work with me",
        links: services.map((service) => ({
          title: service.title,
          url: url(servicePath(service)),
          description: service.summary,
        })),
      },
      { heading: "Pages", links: pages },
      {
        heading: "Projects",
        links: projects.map((project) => ({
          title: project.name,
          url: url(projectPath(project)),
          description: `${project.description} Code: ${project.link}`,
        })),
      },
      {
        heading: "Writing",
        links: visiblePosts.map((post) => ({
          title: post.title,
          url: url(`/blog/${post.slug}/`),
          description: `${post.description} (${post.published})`,
        })),
      },
      {
        heading: "Elsewhere",
        links: [
          {
            title: "GitHub",
            url: site.social.github.url,
            description: "Code and open-source work",
          },
          { title: "LinkedIn", url: site.social.linkedin.url, description: "Career and contact" },
          { title: "Blog feed", url: url(feedPath), description: "Every post, as RSS" },
        ],
      },
      {
        heading: "For agents",
        links: [
          {
            title: "llms-full.txt",
            url: url("/llms-full.txt"),
            description: "Every page and post on this site in full, as markdown",
          },
        ],
      },
    ],
  });
}

const plainText = "text/plain; charset=utf-8";

/** /llms.txt — written as a file by the static build */
export const onGet: RequestHandler = (event) => {
  event.headers.set("Content-Type", plainText);
  event.send(200, llmsIndex());
};

/** /llms-full.txt — the index, then every page and post in full */
export const onGetFull: RequestHandler = (event) => {
  event.headers.set("Content-Type", plainText);
  event.send(200, renderLlmsFull(llmsIndex(), llmsDocuments()));
};
