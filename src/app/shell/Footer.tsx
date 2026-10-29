import { site } from "~/platform/seo";
import { ExternalLink, GitHubIcon, LinkedInIcon } from "~/platform/ui";

import type { JSXOutput } from "@builder.io/qwik";

const links = [
  { label: "GitHub", href: site.social.github.url, Icon: GitHubIcon },
  { label: "LinkedIn", href: site.social.linkedin.url, Icon: LinkedInIcon },
];

export const Footer = (): JSXOutput => (
  <footer class="wrap relative flex flex-wrap items-center justify-between gap-3 pb-8 pt-7 text-sm text-ink-muted">
    <p>
      © {String(new Date().getFullYear())} {site.author} · {site.location}
    </p>
    <ul class="flex gap-2">
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <ExternalLink
            href={href}
            class="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-ink hover:bg-wash/16"
          >
            <Icon />
            {label}
          </ExternalLink>
        </li>
      ))}
    </ul>
  </footer>
);
