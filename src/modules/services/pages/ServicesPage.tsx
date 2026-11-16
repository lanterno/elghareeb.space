import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link } from "@builder.io/qwik-city";

import { pageHead, site } from "~/platform/seo";
import {
  ArrowRightIcon,
  Button,
  Chip,
  ClosingScene,
  LinkedInIcon,
  PageHeader,
  SectionHeading,
} from "~/platform/ui";

import { engagements, questions, services, servicesIntro, workingFacts } from "../content";

/**
 * /work-with-me/ — freelance work: what I take on and the pages that prove it, how an
 * engagement can be shaped, and the questions people ask before writing. The same questions are
 * the page's FAQ in its structured data, and the services are the author's offers.
 */
export default component$(() => (
  <>
    <PageHeader title="Freelance, for software that has to be right." intro={servicesIntro}>
      <Button href={site.social.linkedin.url} variant="panel-compact" data-track="hire">
        <LinkedInIcon />
        Write to me on LinkedIn
      </Button>
    </PageHeader>

    {/* Services */}
    <section aria-labelledby="services-title" class="wrap flex flex-col gap-6">
      <SectionHeading
        id="services-title"
        title="What I can help with."
        lede="Each comes with the work that shows it."
      />
      <ul class="grid gap-[18px] md:grid-cols-2">
        {services.map((service) => (
          <li
            key={service.id}
            id={service.id}
            data-tone={service.tone}
            class="flex scroll-mt-24 flex-col gap-4 rounded-card bg-tone-tint p-[26px] md:p-8"
          >
            <h3 class="text-[26px] leading-tight text-tone-ink">{service.title}</h3>
            <p class="text-[17px] leading-[1.7]">{service.summary}</p>
            <ul class="flex flex-wrap gap-2" aria-label="Keywords">
              {service.keywords.map((keyword) => (
                <Chip key={keyword} variant="panel">
                  {keyword}
                </Chip>
              ))}
            </ul>
            <ul class="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-2" aria-label="Where I did it">
              {service.evidence.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    class="inline-flex items-center gap-1.5 text-[15px] font-bold text-tone-ink underline-offset-4 hover:underline"
                  >
                    {item.label}
                    <ArrowRightIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>

    {/* How we can work */}
    <section
      aria-labelledby="engagements-title"
      class="wrap flex flex-col gap-6 pt-24 md:pt-[110px]"
    >
      <SectionHeading id="engagements-title" title="How we can work." />
      <div class="grid gap-[18px] md:grid-cols-[3fr_2fr]">
        <ul class="rounded-card bg-panel px-8 py-2.5 shadow-hair">
          {engagements.map((engagement) => (
            <li
              key={engagement.title}
              class="flex flex-col gap-1.5 border-b border-ink/9 py-6 last:border-b-0"
            >
              <h3 class="font-sans text-lg font-bold">{engagement.title}</h3>
              <p class="text-[15px] leading-[1.7]">{engagement.description}</p>
            </li>
          ))}
        </ul>
        <dl class="rounded-card bg-panel px-8 py-2.5 shadow-hair">
          {workingFacts.map((fact) => (
            <div
              key={fact.label}
              class="flex flex-col gap-1 border-b border-ink/9 py-6 last:border-b-0"
            >
              <dt class="text-sm text-ink-muted">{fact.label}</dt>
              <dd class="text-[17px] font-bold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* Questions */}
    <section aria-labelledby="questions-title" class="wrap flex flex-col gap-6 pt-24 md:pt-[110px]">
      <SectionHeading id="questions-title" title="Before you write." />
      <dl class="grid gap-[18px] md:grid-cols-2">
        {questions.map((item) => (
          <div
            key={item.question}
            class="flex flex-col gap-2 rounded-card bg-panel p-[26px] shadow-hair"
          >
            <dt class="font-sans text-lg font-bold">{item.question}</dt>
            <dd class="text-[15px] leading-[1.7]">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>

    <ClosingScene
      eyebrow={site.availability}
      title="Tell me what has to be right."
      body="A few lines about the project are enough to start. LinkedIn is the quickest way to reach me."
    />
  </>
));

export const head: DocumentHead = pageHead({
  title: "Freelance software engineer in Switzerland",
  description:
    "Freelance Staff Software Engineer in Chavannes-près-Renens, Switzerland: digital identity and verifiable credentials, climate software, Python and Django backends, research software. English, French and Arabic.",
  path: "/work-with-me/",
  offers: services.map((service) => ({ name: service.title, description: service.summary })),
  faq: questions,
});
