import {
  certifications,
  currentRole,
  education,
  experiences,
  organizations,
  skillGroups,
} from "~/modules/career";
import { projects } from "~/modules/showcase";
import { site } from "~/platform/seo";

import { renderResume } from "./render";

import type { RequestHandler } from "@builder.io/qwik-city";

/** /resume.json — written as a file by the static build */
export const onGet: RequestHandler = (event) => {
  event.headers.set("Content-Type", "application/json; charset=utf-8");
  event.send(
    200,
    renderResume({
      name: site.author,
      label: currentRole().title,
      url: site.url,
      summary: `${site.bio} ${site.availability}`,
      location: {
        city: site.home.locality,
        region: site.home.region,
        countryCode: site.home.country,
      },
      profiles: [
        { network: "GitHub", username: site.social.github.login, url: site.social.github.url },
        {
          network: "LinkedIn",
          username: site.social.linkedin.username,
          url: site.social.linkedin.url,
        },
      ],
      work: experiences.map((experience) => {
        const org: { name: string; fullName?: string; url: string } = organizations[experience.org];
        return {
          name: org.fullName ?? org.name,
          position: experience.title,
          url: org.url,
          location: experience.location,
          startDate: experience.start,
          endDate: experience.end,
          summary: experience.description,
          highlights: experience.skills,
        };
      }),
      education: education.map((item) => ({
        institution: item.institution,
        area: item.degree,
        startDate: String(item.from),
        endDate: String(item.to),
      })),
      certificates: certifications.map((item) => ({
        name: item.name,
        issuer: item.org,
        date: item.year,
      })),
      skills: skillGroups.map((group) => ({ name: group.category, keywords: group.items })),
      languages: site.languages,
      projects: projects.map((project) => ({
        name: project.name,
        description: project.description,
        url: project.link,
        roles: [project.story.role],
        keywords: project.story.stack,
      })),
    })
  );
};
