import { $, component$, sync$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  Chip,
  ExternalLink,
  SectionHeading,
} from "~/platform/ui";

import { fields } from "../content";

import type { FieldId } from "../model";

const fieldIds = fields.map((field) => field.id);

/**
 * "Three worlds, one habit": one tab per field of work, each with a promise, the story behind it
 * and where to look. Arrow keys, Home and End move between tabs.
 */
export const FieldTabs = component$(() => {
  const selected = useSignal<FieldId>("identity");

  const select = $((id: FieldId) => {
    selected.value = id;
    document.getElementById(`tab-${id}`)?.focus();
  });

  const onKeyDown = $(async (event: KeyboardEvent) => {
    const index = fieldIds.indexOf(selected.value);
    const last = fieldIds.length - 1;
    const targets: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    const next = target === undefined ? undefined : fieldIds[target];
    if (next !== undefined) await select(next);
  });

  return (
    <section aria-labelledby="worlds-title" class="wrap flex flex-col gap-7 pt-24">
      <SectionHeading id="worlds-title" title="Three worlds, one habit.">
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
          {fields.map((field) => {
            const isSelected = selected.value === field.id;
            return (
              <button
                key={field.id}
                id={`tab-${field.id}`}
                data-tone={field.tone}
                type="button"
                role="tab"
                aria-selected={isSelected ? "true" : "false"}
                aria-controls={`panel-${field.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick$={() => select(field.id)}
                class={[
                  "inline-flex min-h-12 items-center gap-2.5 rounded-full px-[22px] text-[15px] transition-colors",
                  isSelected ? "bg-ink font-bold text-panel" : "text-ink hover:bg-wash/16",
                ]}
              >
                <span aria-hidden="true" class="h-2.5 w-2.5 rounded-full bg-tone" />
                {field.label}
              </button>
            );
          })}
        </div>
      </SectionHeading>

      {fields.map((field) => {
        return (
          <div
            key={field.id}
            id={`panel-${field.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${field.id}`}
            hidden={selected.value !== field.id}
            data-tone={field.tone}
            class="grid gap-10 rounded-panel bg-panel p-7 shadow-raised md:p-12 lg:grid-cols-[6fr_5fr]"
          >
            <div class="flex flex-col gap-5">
              <p class="text-sm font-bold text-tone-ink">{field.label}</p>
              <h3 class="text-[clamp(30px,3.4vw,44px)] leading-[1.08] tracking-[-0.02em] text-balance">
                {field.headline}
              </h3>
              <p class="text-[17px] leading-[1.75] text-ink-muted">{field.body}</p>
              <ul class="flex flex-wrap gap-2">
                {field.skills.map((skill) => (
                  <Chip key={skill} variant="tone">
                    {skill}
                  </Chip>
                ))}
              </ul>
            </div>
            <div class="flex flex-col gap-3">
              <p class="text-sm font-bold text-ink-muted">Where to look</p>
              <ul class="flex flex-col gap-3">
                {field.links.map((item) => {
                  const external = !item.href.startsWith("/");
                  const content = (
                    <>
                      <span class="flex flex-1 flex-col gap-0.5">
                        <span class="text-base font-bold">{item.label}</span>
                        <span class="text-sm text-ink-muted">{item.note}</span>
                      </span>
                      {external ? <ArrowUpRightIcon /> : <ArrowRightIcon />}
                    </>
                  );
                  const rowClass =
                    "flex items-center gap-4 rounded-tile bg-wash/16 px-5 py-[18px] text-ink transition-colors hover:bg-wash/28";
                  return (
                    <li key={item.href}>
                      {external ? (
                        <ExternalLink href={item.href} class={rowClass}>
                          {content}
                        </ExternalLink>
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
