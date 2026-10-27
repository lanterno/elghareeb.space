import { $, component$, sync$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import { ArrowRightIcon, ArrowUpRightIcon } from "~/components/icons";
import { type DomainId, domains } from "~/data/portfolio";
import { toneClasses } from "~/data/tones";

const domainIds = domains.map((domain) => domain.id);

/**
 * "Three worlds, one habit": one tab per domain, each with a promise, the
 * story behind it and where to look. Arrow keys, Home and End move between
 * tabs.
 */
export const DomainTabs = component$(() => {
  const selected = useSignal<DomainId>("identity");

  const select = $((id: DomainId) => {
    selected.value = id;
    document.getElementById(`tab-${id}`)?.focus();
  });

  const onKeyDown = $(async (event: KeyboardEvent) => {
    const index = domainIds.indexOf(selected.value);
    const last = domainIds.length - 1;
    const targets: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    const next = target === undefined ? undefined : domainIds[target];
    if (next !== undefined) await select(next);
  });

  return (
    <section aria-labelledby="worlds-title" class="wrap flex flex-col gap-7 pt-24">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 id="worlds-title" class="text-[clamp(36px,4.4vw,56px)] leading-none tracking-[-0.02em]">
          Three worlds, one habit.
        </h2>
        <div
          role="tablist"
          aria-label="Domains"
          onKeyDown$={[
            // Home and End would also scroll the page; only a sync$ handler runs in time to stop it
            sync$((event: KeyboardEvent) => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
                event.preventDefault();
              }
            }),
            onKeyDown,
          ]}
          class="flex flex-wrap gap-1.5 rounded-[30px] bg-panel/94 p-1.5 shadow-hair"
        >
          {domains.map((domain) => {
            const isSelected = selected.value === domain.id;
            return (
              <button
                key={domain.id}
                id={`tab-${domain.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected ? "true" : "false"}
                aria-controls={`panel-${domain.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick$={() => select(domain.id)}
                class={[
                  "inline-flex min-h-12 items-center gap-2.5 rounded-full px-[22px] text-[15px] transition-colors",
                  isSelected ? "bg-ink font-bold text-panel" : "text-ink hover:bg-wash/16",
                ]}
              >
                <span
                  aria-hidden="true"
                  class={["h-2.5 w-2.5 rounded-full", toneClasses[domain.tone].dot]}
                />
                {domain.label}
              </button>
            );
          })}
        </div>
      </div>

      {domains.map((domain) => {
        const tone = toneClasses[domain.tone];
        return (
          <div
            key={domain.id}
            id={`panel-${domain.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${domain.id}`}
            hidden={selected.value !== domain.id}
            class="grid gap-10 rounded-panel bg-panel p-7 shadow-raised md:p-12 lg:grid-cols-[6fr_5fr]"
          >
            <div class="flex flex-col gap-5">
              <p class={["text-sm font-bold", tone.ink]}>{domain.label}</p>
              <h3 class="text-[clamp(30px,3.4vw,44px)] leading-[1.08] tracking-[-0.02em] text-balance">
                {domain.headline}
              </h3>
              <p class="text-[17px] leading-[1.75] text-ink-muted">{domain.body}</p>
              <ul class="flex flex-wrap gap-2">
                {domain.skills.map((skill) => (
                  <li
                    key={skill}
                    class={[
                      "rounded-full px-[13px] py-[7px] text-[13px] font-bold",
                      tone.tint,
                      tone.ink,
                    ]}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div class="flex flex-col gap-3">
              <p class="text-sm font-bold text-ink-muted">Where to look</p>
              <ul class="flex flex-col gap-3">
                {domain.links.map((item) => {
                  const content = (
                    <>
                      <span class="flex flex-1 flex-col gap-0.5">
                        <span class="text-base font-bold">{item.label}</span>
                        <span class="text-sm text-ink-muted">{item.note}</span>
                      </span>
                      {item.external ? <ArrowUpRightIcon /> : <ArrowRightIcon />}
                    </>
                  );
                  const rowClass =
                    "flex items-center gap-4 rounded-tile bg-wash/16 px-5 py-[18px] text-ink transition-colors hover:bg-wash/28";
                  return (
                    <li key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          class={rowClass}
                        >
                          {content}
                        </a>
                      ) : (
                        <Link href={item.href} class={rowClass}>
                          {content}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </section>
  );
});
