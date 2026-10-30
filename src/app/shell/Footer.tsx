import { site } from "~/platform/seo";
import { ExternalLink, GitHubIcon, LinkedInIcon } from "~/platform/ui";

import type { JSXOutput } from "@builder.io/qwik";

const links = [
  { label: "GitHub", href: site.social.github.url, Icon: GitHubIcon },
  { label: "LinkedIn", href: site.social.linkedin.url, Icon: LinkedInIcon },
];

/** The ground under the closing scene's hills, reaching both edges like the scene above it. */
export const Footer = (): JSXOutput => (
  <footer class="bg-dusk-hill-near text-dusk-muted">
    <div class="wrap flex flex-wrap items-center justify-between gap-3 pb-8 pt-5 text-sm">
      <p>
        © {String(new Date().getFullYear())} {site.author} · {site.location}
      </p>
      <ul class="flex gap-2">
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <ExternalLink
              href={href}
              class="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-dusk-ink hover:bg-panel/10"
            >
              <Icon />
              {label}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);
