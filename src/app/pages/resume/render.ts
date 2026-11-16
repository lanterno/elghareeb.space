/**
 * /resume.json: the CV in the JSON Resume format (jsonresume.org), which recruiting tools and AI
 * agents read without scraping the pages. Pure, so it is tested with fixtures; `resume.ts`
 * hands it the real content.
 */

export interface ResumeInput {
  name: string;
  label: string;
  url: string;
  summary: string;
  location: { city: string; region: string; countryCode: string };
  profiles: readonly { network: string; username: string; url: string }[];
  work: readonly {
    name: string;
    position: string;
    url: string;
    location: string;
    startDate: string;
    endDate: string | null;
    summary: string;
    highlights: readonly string[];
  }[];
  education: readonly { institution: string; area: string; startDate: string; endDate: string }[];
  certificates: readonly { name: string; issuer: string; date: string }[];
  skills: readonly { name: string; keywords: readonly string[] }[];
  languages: readonly string[];
  projects: readonly {
    name: string;
    description: string;
    url: string;
    roles: readonly string[];
    keywords: readonly string[];
  }[];
}

export function renderResume(input: ResumeInput): string {
  const resume = {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: input.name,
      label: input.label,
      url: input.url,
      summary: input.summary,
      location: input.location,
      profiles: input.profiles,
    },
    work: input.work.map(({ endDate, ...role }) => ({
      ...role,
      ...(endDate === null ? {} : { endDate }),
    })),
    education: input.education,
    certificates: input.certificates,
    skills: input.skills,
    languages: input.languages.map((language) => ({ language })),
    projects: input.projects,
    meta: { canonical: new URL("/resume.json", input.url).href },
  };
  return `${JSON.stringify(resume, null, 2)}\n`;
}
