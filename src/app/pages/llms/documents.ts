/**
 * The site's pages as markdown, for /llms-full.txt: built from the same records as the pages, so
 * an AI assistant reads what a visitor reads without parsing the HTML.
 */
import { postSource, visiblePosts } from "~/modules/blog";
import {
  certifications,
  education,
  experiences,
  organizations,
  skillGroups,
} from "~/modules/career";
import {
  engagements,
  questions,
  services,
  servicesIntro,
  servicesPath,
  workingFacts,
} from "~/modules/services";
import { projectPath, projects } from "~/modules/showcase";
import { formatPeriod } from "~/platform/kernel";
import { site } from "~/platform/seo";

import type { LlmsDocument } from "./render";

const url = (path: string): string => new URL(path, site.url).href;

const link = (label: string, href: string): string => `[${label}](${url(href)})`;

function workWithMe(): LlmsDocument {
  const body = [
    servicesIntro,
    "## What I can help with",
    ...services.map((service) =>
      [
        `### ${service.title}`,
        service.summary,
        `Keywords: ${service.keywords.join(", ")}.`,
        `Shown in: ${service.evidence.map((item) => link(item.label, item.href)).join(", ")}.`,
      ].join("\n\n")
    ),
    "## How we can work",
    engagements.map((item) => `- **${item.title}**: ${item.description}`).join("\n"),
    workingFacts.map((fact) => `- ${fact.label}: ${fact.value}`).join("\n"),
    "## Questions",
    ...questions.map((item) => `### ${item.question}\n\n${item.answer}`),
    `## Contact\n\nWrite on LinkedIn: ${site.social.linkedin.url}`,
  ];
  return { title: "Work with me", url: url(servicesPath), body: body.join("\n\n") };
}

function work(): LlmsDocument {
  const roles = experiences.map((experience) => {
    const org: { name: string; fullName?: string; url: string } = organizations[experience.org];
    return [
      `## ${experience.title} at ${org.fullName ?? org.name}`,
      `${formatPeriod(experience)} · ${experience.location} · ${experience.type} · ${org.url}`,
      experience.description,
      `Skills: ${experience.skills.join(", ")}.`,
    ].join("\n\n");
  });
  return { title: "Work", url: url("/work/"), body: roles.join("\n\n") };
}

function about(): LlmsDocument {
  const body = [
    `${site.bio} ${site.availability}`,
    `Languages: ${site.languages.join(", ")}.`,
    "## Education",
    education
      .map(
        (item) =>
          `- ${item.degree}, ${item.institution} (${String(item.from)}–${String(item.to)}). ${item.description}`
      )
      .join("\n"),
    "## Certifications and fellowships",
    certifications.map((item) => `- ${item.name}, ${item.org} (${item.year})`).join("\n"),
    "## Toolkit",
    skillGroups.map((group) => `- ${group.category}: ${group.items.join(", ")}`).join("\n"),
  ];
  return { title: "About", url: url("/about/"), body: body.join("\n\n") };
}

function projectDocuments(): LlmsDocument[] {
  return projects.map((project) => ({
    title: project.name,
    url: url(projectPath(project)),
    body: [
      project.description,
      `Role: ${project.story.role}. Built with: ${project.story.stack.join(", ")}. Code: ${project.link}`,
      ...project.story.chapters.map(
        (chapter) => `## ${chapter.title}\n\n${chapter.paragraphs.join("\n\n")}`
      ),
      "## Where to look",
      project.story.links
        .map((item) => `- ${link(item.label, item.href)}: ${item.note}`)
        .join("\n"),
    ].join("\n\n"),
  }));
}

function postDocuments(): LlmsDocument[] {
  return visiblePosts.map((post) => ({
    title: post.title,
    url: url(`/blog/${post.slug}/`),
    body: `Published ${post.published}${post.updated === undefined ? "" : `, updated ${post.updated}`}.\n\n${postSource(post.slug) ?? post.description}`,
  }));
}

/** Every page worth reading in full, in the order a reader would want them */
export function llmsDocuments(): LlmsDocument[] {
  return [workWithMe(), about(), work(), ...projectDocuments(), ...postDocuments()];
}
