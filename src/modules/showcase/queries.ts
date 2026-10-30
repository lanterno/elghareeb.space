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

export function projectBySlug(
  slug: string,
  list: readonly Project[] = projects
): Project | undefined {
  return list.find((project) => project.slug === slug);
}

/** Every project but the one named, in page order, for "more in the open" */
export function otherProjects(
  slug: string,
  list: readonly Project[] = projects
): readonly Project[] {
  return list.filter((project) => project.slug !== slug);
}

/** A project's own page */
export function projectPath(project: Pick<Project, "slug">): string {
  return `/projects/${project.slug}/`;
}
