/**
 * /llms.txt (llmstxt.org): the site as an AI assistant would want to read it, in markdown. Who
 * the author is, each page, project and post with one line on what it holds, and where else to
 * find the author. Pure, so it is tested with fixtures; `llms.ts` hands it the real content.
 */

export interface LlmsLink {
  title: string;
  /** Absolute URL */
  url: string;
  description: string;
}

/** A titled list of links: "Pages", "Projects" */
export interface LlmsSection {
  heading: string;
  links: readonly LlmsLink[];
}

export interface LlmsContent {
  name: string;
  /** One line under the name: what the author does now */
  summary: string;
  /** A short paragraph on the author */
  about: string;
  /** In the order they are listed; a section with no links is left out */
  sections: readonly LlmsSection[];
}

const line = ({ title, url, description }: LlmsLink): string =>
  `- [${title}](${url}): ${description}`;

const section = ({ heading, links }: LlmsSection): string[] =>
  links.length === 0 ? [] : [`## ${heading}`, "", ...links.map(line), ""];

export function renderLlms(content: LlmsContent): string {
  return [
    `# ${content.name}`,
    "",
    `> ${content.summary}`,
    "",
    content.about,
    "",
    ...content.sections.flatMap(section),
  ].join("\n");
}
