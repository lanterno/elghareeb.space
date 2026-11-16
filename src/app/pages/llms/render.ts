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

export interface LlmsContent {
  name: string;
  /** One line under the name: what the author does now */
  summary: string;
  /** A short paragraph on the author */
  about: string;
  pages: readonly LlmsLink[];
  projects: readonly LlmsLink[];
  posts: readonly LlmsLink[];
  elsewhere: readonly LlmsLink[];
}

const line = ({ title, url, description }: LlmsLink): string =>
  `- [${title}](${url}): ${description}`;

const section = (heading: string, links: readonly LlmsLink[]): string[] =>
  links.length === 0 ? [] : [`## ${heading}`, "", ...links.map(line), ""];

export function renderLlms(content: LlmsContent): string {
  return [
    `# ${content.name}`,
    "",
    `> ${content.summary}`,
    "",
    content.about,
    "",
    ...section("Pages", content.pages),
    ...section("Projects", content.projects),
    ...section("Writing", content.posts),
    ...section("Elsewhere", content.elsewhere),
  ].join("\n");
}
