import { projects } from "./content";

import type { Project, ProjectGroupId } from "./model";

export function featuredProjects(list: readonly Project[] = projects): readonly Project[] {
  return list.filter((project) => project.group === "featured");
}

export function projectsInGroup(
  group: ProjectGroupId,
  list: readonly Project[] = projects
): readonly Project[] {
  return list.filter((project) => project.group === group);
}

export function projectCount(list: readonly Project[] = projects): number {
  return list.length;
}
