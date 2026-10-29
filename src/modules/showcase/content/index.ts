import * as v from "valibot";

import { assertValid } from "~/platform/kernel";

import { ProjectGroupSchema, ProjectSchema } from "../model";
import { projectGroups, projects, projectsIntro } from "./projects";

export { projectGroups, projects, projectsIntro };

export function validateShowcaseContent(): void {
  assertValid(
    "showcase",
    v.pipe(
      v.object({
        projects: v.array(ProjectSchema),
        projectGroups: v.array(ProjectGroupSchema),
        projectsIntro: v.string(),
      }),
      v.check(
        ({ projects: list }) => new Set(list.map((project) => project.slug)).size === list.length,
        "Project slugs must be unique"
      ),
      v.check(
        ({ projects: list, projectGroups: groups }) =>
          list.every(
            (project) => project.group === "featured" || groups.some((g) => g.id === project.group)
          ),
        "Every project group needs a title"
      )
    ),
    { projects, projectGroups, projectsIntro }
  );
}

if (import.meta.env.SSR) validateShowcaseContent();
