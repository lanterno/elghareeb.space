import { Fragment, type JSXOutput } from "@builder.io/qwik";

import { ExternalLink } from "~/platform/ui";

import { affiliations, organizations } from "../content";
import { OrgMark } from "./OrgMark";

/** "Also building at: …", "Built before: …": each organisation with its mark, in its tone. */
export const AffiliationRows = (): JSXOutput => (
  <>
    {affiliations.map((row) => (
      <Fragment key={row.label}>
        <span class="mt-1.5 text-sm text-ink-sky lg:mt-0">{row.label}</span>
        <ul class="-ml-2.5 flex flex-wrap gap-x-0.5">
          {row.orgs.map((id) => {
            const org = organizations[id];
            return (
              <li key={id} data-tone={org.tone}>
                <ExternalLink
                  href={org.url}
                  class="inline-flex items-center gap-[7px] rounded-full px-2.5 py-[5px] font-display text-[15px] font-bold text-ink transition-colors hover:bg-panel/80 lg:text-[17px]"
                >
                  <OrgMark org={id} class={[org.markHeight, "text-tone-ink"]} />
                  {org.name}
                </ExternalLink>
              </li>
            );
          })}
        </ul>
      </Fragment>
    ))}
  </>
);
