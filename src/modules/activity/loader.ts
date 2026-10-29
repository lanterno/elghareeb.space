import { routeLoader$ } from "@builder.io/qwik-city";

import { site } from "~/platform/seo";

import { fetchContributionCalendar } from "./adapter";

/**
 * Runs while the site is built, so visitors never wait on GitHub. Declared here with the rest of
 * the module and re-exported by the home route (see app/routes/index.tsx), which is what Qwik
 * City needs to run it.
 */
// eslint-disable-next-line qwik/loader-location -- re-exported from the route manifest
export const useGitHubActivity = routeLoader$(({ env }) =>
  fetchContributionCalendar(site.social.github.login, env.get("GITHUB_TOKEN"))
);
