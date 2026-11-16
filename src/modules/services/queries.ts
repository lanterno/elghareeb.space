/** Where the services live on the site. */
import type { Service } from "./model";

export const servicesPath = "/work-with-me/";

/** A service's place on the Work with me page */
export function servicePath(service: Pick<Service, "id">): string {
  return `${servicesPath}#${service.id}`;
}
