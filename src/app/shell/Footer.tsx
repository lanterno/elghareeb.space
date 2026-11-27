import { Link } from "@builder.io/qwik-city";

import { servicesPath } from "~/modules/services";
import { live } from "~/platform/kernel";
import { site } from "~/platform/seo";
import { ExternalLink, GitHubIcon, LinkedInIcon } from "~/platform/ui";

import type { JSXOutput } from "@builder.io/qwik";

const links = [
  { label: "GitHub", href: site.social.github.url, Icon: GitHubIcon },
  { label: "LinkedIn", href: site.social.linkedin.url, Icon: LinkedInIcon },
];

const pill =
  "inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-dusk-ink hover:bg-panel/10";

/** The ground under the closing scene's hills, reaching both edges like the scene above it. */
export const Footer = (): JSXOutput => (
  <footer class="bg-dusk-hill-near text-dusk-muted">
    <div class="wrap flex flex-wrap items-center justify-between gap-3 pb-8 pt-5 text-sm">
      <p>
        © <span {...live.year}>{String(new Date().getFullYear())}</span> {site.author} ·{" "}
        {site.location}
      </p>
      <ul class="flex flex-wrap gap-2">
        <li>
          <Link href={servicesPath} class={pill}>
            Work with me
          </Link>
        </li>
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <ExternalLink href={href} class={pill}>
              <Icon />
              {label}
            </ExternalLink>
          </li>
        ))}
        <li>
          <ExternalLink href={site.ecoScore.url} class={pill}>
            {/* The letter tile from Greenoco's kit, with dark ink so the letter stays readable */}
            <span
              aria-hidden="true"
              class="grid h-5 w-5 place-items-center rounded-md bg-eco font-display text-xs font-extrabold leading-none text-on-sun"
            >
              {site.ecoScore.grade}
            </span>
            <span>
              Eco-score <span class="sr-only">{site.ecoScore.grade} </span>by {site.ecoScore.by}
            </span>
          </ExternalLink>
        </li>
      </ul>
    </div>
  </footer>
);
