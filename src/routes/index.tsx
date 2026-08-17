import { $, component$, useSignal } from "@builder.io/qwik";

import {
  ArrowUpRightIcon,
  CalendarIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  GitHubIcon,
  LinkedInIcon,
  LocationIcon,
  MailIcon,
} from "~/components/icons";
import {
  certifications,
  domainCategories,
  type DomainCategoryId,
  education,
  engineeringPrinciples,
  experiences,
  getAnimationDelayClass,
  getTextColorClass,
  organizations,
  personalInfo,
  projects,
  skills,
} from "~/data/portfolio";
import ImgHero from "~/media/hero.jpg?jsx";

import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const selectedCategory = useSignal<DomainCategoryId>("all");
  const isCopied = useSignal<boolean>(false);

  const copyEmail = $(async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 2500);
    } catch {
      isCopied.value = false;
    }
  });

  // Filter experiences based on selected category
  const filteredExperiences = experiences.filter((exp) => {
    if (selectedCategory.value === "all") return true;
    return exp.category === selectedCategory.value;
  });

  // Filter projects based on selected category
  const filteredProjects = projects.filter((proj) => {
    if (selectedCategory.value === "all") return true;
    return proj.category === selectedCategory.value;
  });

  return (
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* ==================================================================== */}
      {/* HERO SECTION                                                         */}
      {/* ==================================================================== */}
      <section id="overview" class="mb-20 lg:mb-28">
        <div class="glass-card rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div class="absolute -right-20 -top-20 w-80 h-80 bg-accent-emerald/10 rounded-full blur-3xl pointer-events-none" />

          <div class="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 relative z-10">
            {/* Left: Avatar & Badges */}
            <div class="flex flex-col items-center sm:items-start gap-4 flex-shrink-0">
              <div class="relative group">
                <div class="absolute -inset-2 bg-gradient-to-tr from-accent-emerald/40 to-accent-sky/30 rounded-3xl blur-md group-hover:blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500" />
                <div class="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-cream-100 shadow-xl bg-cream-200">
                  <ImgHero
                    alt="Ahmed Elghareeb"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div
                  class="absolute -bottom-2 -right-2 bg-cream-50 text-ink-900 border border-ink-200/80 rounded-xl p-1.5 shadow-md flex items-center justify-center text-lg"
                  title="Swiss precision & deliberate engineering"
                >
                  🇨🇭
                </div>
              </div>

              {/* Status Pill */}
              <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-emerald/10 text-accent-emerald-dark rounded-full text-xs font-mono border border-accent-emerald/20 shadow-2xs">
                <span class="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
                <span>Open for Advisory &amp; Collabs</span>
              </div>
            </div>

            {/* Right: Bio & Key Details */}
            <div class="flex-1 text-center sm:text-left">
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-3 text-xs font-mono text-ink-500">
                <span class="px-2.5 py-1 rounded-md bg-cream-200/70 border border-ink-200/40 text-ink-700">
                  Staff Software Engineer
                </span>
                <span class="text-ink-300">/</span>
                <span class="px-2.5 py-1 rounded-md bg-cream-200/70 border border-ink-200/40 text-ink-700">
                  ClimateBase Fellow
                </span>
                <span class="text-ink-300">/</span>
                <span class="px-2.5 py-1 rounded-md bg-cream-200/70 border border-ink-200/40 text-ink-700">
                  Ex-EPFL C4DT
                </span>
              </div>

              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-ink-950 tracking-tight mb-4 text-balance">
                Ahmed <span class="italic font-serif text-ink-800">Elghareeb</span>
              </h1>

              <p class="text-lg sm:text-xl text-ink-700 font-light leading-relaxed mb-6 max-w-3xl">
                Building <strong class="font-semibold text-ink-950">environmental accountability software</strong> at{" "}
                <a
                  href="https://resilio-solutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-accent-emerald font-medium hover:underline inline-flex items-center gap-1"
                >
                  Resilio <ArrowUpRightIcon />
                </a>{" "}
                and pioneering privacy-preserving <strong class="font-semibold text-ink-950">digital identity infrastructure</strong>.
              </p>

              <p class="text-sm sm:text-base text-ink-500 leading-relaxed mb-8 max-w-3xl">
                Specialized in <strong class="text-ink-700">Domain-Driven Design (DDD)</strong>,{" "}
                <strong class="text-ink-700">cryptographic trust systems</strong> (Zero-Knowledge, Verifiable Credentials, Swiss E-ID), and{" "}
                <strong class="text-accent-emerald font-medium">Sustainable IT</strong> architectures. Passionate about applying disciplined engineering to climate action.
              </p>

              {/* Action Buttons */}
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-2.5 bg-ink-900 text-cream-50 rounded-xl hover:bg-ink-800 transition-all font-medium text-sm shadow-sm hover:shadow-md active:scale-95"
                >
                  <LinkedInIcon />
                  <span>Connect on LinkedIn</span>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-2.5 bg-cream-100 border border-ink-200 text-ink-800 rounded-xl hover:bg-cream-200/80 hover:border-ink-300 transition-all font-medium text-sm shadow-2xs active:scale-95"
                >
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>

                <button
                  onClick$={copyEmail}
                  class="inline-flex items-center gap-2 px-4 py-2.5 bg-cream-50 border border-ink-200/80 text-ink-700 rounded-xl hover:bg-cream-200/60 hover:text-ink-900 transition-all text-sm font-mono cursor-pointer active:scale-95"
                  title="Copy email address to clipboard"
                >
                  {isCopied.value ? (
                    <>
                      <CheckIcon />
                      <span class="text-accent-emerald font-semibold">Copied {personalInfo.email}!</span>
                    </>
                  ) : (
                    <>
                      <MailIcon />
                      <span>{personalInfo.email}</span>
                      <CopyIcon />
                    </>
                  )}
                </button>
              </div>

              {/* Metadata Highlights Bar */}
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-ink-100/80">
                <div class="flex flex-col">
                  <span class="text-[11px] font-mono uppercase text-ink-400">Location</span>
                  <span class="text-xs font-semibold text-ink-800 mt-0.5 flex items-center gap-1">
                    <LocationIcon />
                    Lausanne / Renens, CH
                  </span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[11px] font-mono uppercase text-ink-400">Primary Stack</span>
                  <span class="text-xs font-semibold text-ink-800 mt-0.5">Python · Rust · TS</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[11px] font-mono uppercase text-ink-400">Current Focus</span>
                  <span class="text-xs font-semibold text-accent-emerald-dark mt-0.5">Carbon Accounting &amp; DDD</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[11px] font-mono uppercase text-ink-400">Initiatives</span>
                  <span class="text-xs font-semibold text-ink-800 mt-0.5">Sustainable IT @ EPFL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* INTERACTIVE DOMAIN FILTER BAR                                        */}
      {/* ==================================================================== */}
      <section class="mb-12 sticky top-20 z-40">
        <div class="glass-card rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div class="flex items-center gap-2 px-3 text-xs font-mono text-ink-500 uppercase tracking-wider">
            <span>Filter by Domain:</span>
          </div>

          <div class="flex flex-wrap items-center gap-1.5 flex-1">
            {domainCategories.map((cat) => {
              const isActive = selectedCategory.value === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick$={() => {
                    selectedCategory.value = cat.id;
                  }}
                  class={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-ink-900 text-cream-50 shadow-sm"
                      : "bg-cream-100/70 text-ink-700 hover:bg-cream-200/90 hover:text-ink-900"
                  }`}
                >
                  <span>{cat.badgeEmoji}</span>
                  <span>{cat.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {selectedCategory.value !== "all" && (
            <button
              onClick$={() => {
                selectedCategory.value = "all";
              }}
              class="text-xs font-mono text-accent-emerald hover:underline px-2 cursor-pointer"
            >
              Reset Filter ✕
            </button>
          )}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* CURRENT FOCUS & PILLARS (Bento Grid)                                 */}
      {/* ==================================================================== */}
      <section id="focus" class="mb-24">
        <div class="flex items-baseline justify-between mb-8 pb-3 border-b border-ink-200/60">
          <h2 class="text-3xl font-display font-normal text-ink-950 flex items-center gap-3">
            <span>🔭</span>
            <span>Current <span class="italic font-serif">Focus &amp; Initiatives</span></span>
          </h2>
          <span class="text-xs font-mono text-ink-400">Mission-Driven Technology</span>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          {/* Card 1: Resilio */}
          <div class="glass-card rounded-2xl p-6 sm:p-7 relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-accent-emerald/10 text-accent-emerald flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                ♻️
              </div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-0.5 text-[11px] font-mono bg-accent-emerald/15 text-accent-emerald-dark rounded font-medium">
                  Current Full-time
                </span>
                <span class="text-xs text-ink-400 font-mono">Renens, CH</span>
              </div>
              <h3 class="text-xl font-semibold text-ink-950 mb-2">
                Environmental Accountability @ Resilio
              </h3>
              <p class="text-ink-600 text-sm leading-relaxed mb-4">
                Architecting core platforms that help sustainability professionals model, calculate, and audit environmental impact and digital carbon footprints using Domain-Driven Design (DDD).
              </p>
            </div>
            <a
              href="https://resilio-solutions.com"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-accent-emerald hover:text-accent-emerald-dark transition-colors pt-4 border-t border-ink-100"
            >
              <span>Visit Resilio</span>
              <ExternalLinkIcon />
            </a>
          </div>

          {/* Card 2: EPFL Sustainable IT */}
          <div class="glass-card rounded-2xl p-6 sm:p-7 relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-accent-sky/10 text-accent-sky flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                🌿
              </div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-0.5 text-[11px] font-mono bg-accent-sky/15 text-accent-sky rounded font-medium">
                  Community &amp; Research
                </span>
                <span class="text-xs text-ink-400 font-mono">EPFL</span>
              </div>
              <h3 class="text-xl font-semibold text-ink-950 mb-2">
                Sustainable IT Working Group
              </h3>
              <p class="text-ink-600 text-sm leading-relaxed mb-4">
                Initiated and leading a working group on Sustainable IT sponsored by the Research Software Engineering community at EPFL. Partnering with ClimateRoboticsNetworks to advance green compute principles.
              </p>
            </div>
            <a
              href="https://c4dt.epfl.ch"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-accent-sky hover:underline transition-colors pt-4 border-t border-ink-100"
            >
              <span>EPFL C4DT Community</span>
              <ExternalLinkIcon />
            </a>
          </div>

          {/* Card 3: Archetype Project */}
          <div class="glass-card rounded-2xl p-6 sm:p-7 relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-accent-amber/10 text-accent-amber flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                📜
              </div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-0.5 text-[11px] font-mono bg-accent-amber/15 text-accent-amber rounded font-medium">
                  Open Source Lead
                </span>
                <span class="text-xs text-ink-400 font-mono">Palaeography</span>
              </div>
              <h3 class="text-xl font-semibold text-ink-950 mb-2">
                Archetype Palaeography Platform
              </h3>
              <p class="text-ink-600 text-sm leading-relaxed mb-4">
                Leading the backend rewrite of an open-source palaeographical annotation platform used by historians and researchers worldwide for medieval manuscript analysis.
              </p>
            </div>
            <a
              href="https://github.com/archetype-pal/backend"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-accent-amber hover:underline transition-colors pt-4 border-t border-ink-100"
            >
              <span>GitHub Repository</span>
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* EXPERIENCE TIMELINE                                                  */}
      {/* ==================================================================== */}
      <section id="experience" class="mb-24">
        <div class="flex items-baseline justify-between mb-8 pb-3 border-b border-ink-200/60">
          <h2 class="text-3xl font-display font-normal text-ink-950 flex items-center gap-3">
            <span>💼</span>
            <span>Professional <span class="italic font-serif">Experience</span></span>
          </h2>
          <span class="text-xs font-mono text-ink-500">
            Showing {filteredExperiences.length} of {experiences.length} roles
          </span>
        </div>

        {filteredExperiences.length === 0 ? (
          <div class="glass-card rounded-2xl p-8 text-center text-ink-500 font-mono text-sm">
            No experience items match this filter category.
          </div>
        ) : (
          <div class="space-y-8">
            {filteredExperiences.map((exp, i) => (
              <div
                key={exp.company}
                class={`glass-card rounded-2xl p-6 sm:p-8 transition-all hover:border-ink-300 relative ${getAnimationDelayClass(
                  i
                )} ${exp.current ? "ring-1 ring-accent-emerald/40 bg-cream-50/90" : ""}`}
              >
                {/* Header Row */}
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-ink-100">
                  <div>
                    <div class="flex flex-wrap items-center gap-2 mb-1">
                      <h3 class="text-xl sm:text-2xl font-semibold text-ink-950">{exp.title}</h3>
                      {exp.current && (
                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-mono font-medium bg-accent-emerald/15 text-accent-emerald-dark rounded-full">
                          <span class="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span>
                          Current Role
                        </span>
                      )}
                    </div>
                    <div class="flex items-center gap-2">
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-base font-medium text-ink-700 hover:text-accent-emerald inline-flex items-center gap-1 transition-colors"
                      >
                        <span>{exp.company}</span>
                        <ArrowUpRightIcon />
                      </a>
                      <span class="text-ink-300">·</span>
                      <span class="text-xs font-mono text-ink-500">{exp.categoryLabel}</span>
                    </div>
                  </div>

                  {/* Period & Location Metadata */}
                  <div class="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs font-mono text-ink-500">
                    <span class="flex items-center gap-1.5 font-semibold text-ink-800">
                      <CalendarIcon />
                      {exp.period}
                    </span>
                    <span class="flex items-center gap-1">
                      <LocationIcon />
                      {exp.location} · {exp.type}
                    </span>
                  </div>
                </div>

                {/* Description bullet points */}
                <ul class="space-y-2.5 mb-6">
                  {exp.description.map((desc) => (
                    <li
                      key={desc}
                      class="text-ink-600 text-sm leading-relaxed pl-5 relative before:content-['▹'] before:absolute before:left-0 before:text-accent-emerald before:font-bold"
                    >
                      {desc}
                    </li>
                  ))}
                </ul>

                {/* Highlights Tags */}
                <div class="flex flex-wrap items-center gap-2 pt-4 border-t border-ink-100/70">
                  <span class="text-xs font-mono text-ink-400 mr-1">Skills:</span>
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      class="px-2.5 py-1 text-xs font-mono bg-cream-200/70 text-ink-800 rounded-md border border-ink-200/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ==================================================================== */}
      {/* ENGINEERING PRINCIPLES                                               */}
      {/* ==================================================================== */}
      <section class="mb-24">
        <div class="flex items-baseline justify-between mb-8 pb-3 border-b border-ink-200/60">
          <h2 class="text-3xl font-display font-normal text-ink-950 flex items-center gap-3">
            <span>⚡</span>
            <span>Engineering <span class="italic font-serif">Philosophy</span></span>
          </h2>
          <span class="text-xs font-mono text-ink-400">Core Foundations</span>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {engineeringPrinciples.map((principle) => (
            <div
              key={principle.title}
              class="glass-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-accent-emerald/40 transition-colors"
            >
              <div>
                <div class="text-2xl mb-3">{principle.icon}</div>
                <span class="text-[11px] font-mono uppercase text-accent-emerald font-semibold tracking-wider">
                  {principle.tag}
                </span>
                <h3 class="text-base font-semibold text-ink-900 mt-1 mb-2">
                  {principle.title}
                </h3>
                <p class="text-ink-500 text-xs leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* OPEN SOURCE & CODE HIGHLIGHTS                                        */}
      {/* ==================================================================== */}
      <section id="projects" class="mb-24">
        <div class="flex items-baseline justify-between mb-8 pb-3 border-b border-ink-200/60">
          <h2 class="text-3xl font-display font-normal text-ink-950 flex items-center gap-3">
            <span>🌱</span>
            <span>Open Source &amp; <span class="italic font-serif">Tooling</span></span>
          </h2>
          <span class="text-xs font-mono text-ink-500">
            Showing {filteredProjects.length} of {projects.length} repositories
          </span>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, i) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              class={`glass-card rounded-2xl p-6 sm:p-7 group block hover:-translate-y-1 transition-all duration-300 ${getAnimationDelayClass(i)}`}
            >
              <div class="flex items-start justify-between gap-3 mb-3">
                <div class="flex items-center gap-2">
                  <h3 class="text-lg font-semibold text-ink-900 group-hover:text-accent-emerald transition-colors font-mono">
                    {project.name}
                  </h3>
                  <span class="px-2 py-0.5 text-[10px] font-mono font-medium bg-cream-200 text-ink-700 rounded-md border border-ink-200/60">
                    {project.badge}
                  </span>
                </div>
                <div class="p-1.5 rounded-lg bg-cream-200/50 text-ink-600 group-hover:text-ink-900 group-hover:bg-cream-200 transition-all">
                  <ArrowUpRightIcon />
                </div>
              </div>

              <p class="text-ink-600 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              <div class="flex flex-wrap items-center gap-2 pt-4 border-t border-ink-100">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    class="px-2 py-0.5 text-xs font-mono bg-cream-100 text-ink-600 rounded border border-ink-200/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* TECHNICAL TOOLKIT (SKILLS)                                           */}
      {/* ==================================================================== */}
      <section id="toolkit" class="mb-24">
        <div class="flex items-baseline justify-between mb-8 pb-3 border-b border-ink-200/60">
          <h2 class="text-3xl font-display font-normal text-ink-950 flex items-center gap-3">
            <span>🛠️</span>
            <span>Technical <span class="italic font-serif">Toolkit</span></span>
          </h2>
          <span class="text-xs font-mono text-ink-400">Languages, Systems &amp; Standards</span>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((skill, i) => (
            <div
              key={skill.category}
              class={`glass-card rounded-2xl p-5 sm:p-6 ${getAnimationDelayClass(i)} flex flex-col justify-between`}
            >
              <div>
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-xl">{skill.icon}</span>
                  <h3 class={`text-sm font-mono font-semibold tracking-tight ${getTextColorClass(skill.color)}`}>
                    {skill.category}
                  </h3>
                </div>

                <div class="flex flex-wrap gap-2 mt-4">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      class="px-2.5 py-1 text-xs font-mono bg-cream-100/90 text-ink-800 rounded-md border border-ink-200/50 hover:bg-cream-200 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* EDUCATION, CERTIFICATIONS & ORGANIZATIONS                            */}
      {/* ==================================================================== */}
      <section id="education" class="mb-24">
        <div class="flex items-baseline justify-between mb-8 pb-3 border-b border-ink-200/60">
          <h2 class="text-3xl font-display font-normal text-ink-950 flex items-center gap-3">
            <span>📚</span>
            <span>Academic &amp; <span class="italic font-serif">Credentials</span></span>
          </h2>
          <span class="text-xs font-mono text-ink-400">Education &amp; Affiliations</span>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          {/* Education */}
          <div class="glass-card rounded-2xl p-6 sm:p-7">
            <h3 class="text-lg font-semibold text-ink-950 mb-5 flex items-center gap-2 pb-3 border-b border-ink-100">
              <span>🎓</span>
              <span>Education</span>
            </h3>

            <div class="space-y-6">
              {education.map((edu) => (
                <div key={edu.institution} class="relative pl-4 border-l-2 border-accent-emerald/60">
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <h4 class="font-semibold text-ink-900 text-sm">{edu.institution}</h4>
                    <span class="text-[11px] font-mono text-ink-400">{edu.period}</span>
                  </div>
                  <p class="text-xs font-mono font-medium text-accent-emerald-dark mb-2">
                    {edu.degree}
                  </p>
                  <p class="text-xs text-ink-600 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div class="glass-card rounded-2xl p-6 sm:p-7">
            <h3 class="text-lg font-semibold text-ink-950 mb-5 flex items-center gap-2 pb-3 border-b border-ink-100">
              <span>🏅</span>
              <span>Certifications</span>
            </h3>

            <div class="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.name} class="p-3.5 rounded-xl bg-cream-100/70 border border-ink-200/50">
                  <div class="flex items-start justify-between gap-2">
                    <h4 class="font-semibold text-ink-900 text-sm">{cert.name}</h4>
                    <span class="text-[11px] font-mono px-2 py-0.5 bg-cream-200 text-ink-600 rounded">
                      {cert.year}
                    </span>
                  </div>
                  <p class="text-xs text-ink-500 mt-1">{cert.org}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Organizations */}
          <div class="glass-card rounded-2xl p-6 sm:p-7">
            <h3 class="text-lg font-semibold text-ink-950 mb-5 flex items-center gap-2 pb-3 border-b border-ink-100">
              <span>🏢</span>
              <span>Affiliations</span>
            </h3>

            <div class="space-y-3">
              {organizations.map((org) => (
                <a
                  key={org.name}
                  href={org.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block p-3.5 rounded-xl bg-cream-100/70 border border-ink-200/50 hover:bg-cream-200/80 hover:border-ink-300 transition-all group"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-semibold text-ink-900 text-sm group-hover:text-accent-emerald transition-colors">
                      {org.name}
                    </span>
                    <ArrowUpRightIcon />
                  </div>
                  <p class="text-xs text-ink-500 mt-1">{org.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* CONNECT / CONTACT CTA                                                */}
      {/* ==================================================================== */}
      <section id="contact" class="mb-12">
        <div class="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center max-w-4xl mx-auto border-2 border-accent-emerald/20">
          <div class="w-16 h-16 rounded-2xl bg-accent-emerald/10 text-accent-emerald mx-auto flex items-center justify-center text-3xl mb-6">
            🤝
          </div>

          <h2 class="text-3xl sm:text-4xl font-display font-normal text-ink-950 mb-4">
            Let's Collaborate on <span class="italic font-serif text-accent-emerald-dark">Impactful Systems</span>
          </h2>

          <p class="text-ink-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Interested in discussing environmental software architectures, digital identity &amp; cryptographic trust, or sustainable IT engineering? My inbox is open.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-ink-900 text-cream-50 rounded-xl hover:bg-ink-800 transition-all font-medium text-sm shadow-md active:scale-95"
            >
              <LinkedInIcon />
              <span>Connect on LinkedIn</span>
            </a>

            <button
              onClick$={copyEmail}
              class="inline-flex items-center gap-2 px-6 py-3 bg-cream-100 border border-ink-300 text-ink-900 rounded-xl hover:bg-cream-200 transition-all font-medium text-sm cursor-pointer shadow-xs active:scale-95"
            >
              {isCopied.value ? (
                <>
                  <CheckIcon />
                  <span class="text-accent-emerald">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <MailIcon />
                  <span>Copy {personalInfo.email}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Ahmed Elghareeb | Staff Software Engineer & Climate Technologist",
  meta: [
    {
      name: "description",
      content:
        "Staff Software Engineer at Resilio and ClimateBase Fellow. Specialized in Domain-Driven Design, environmental accounting, Swiss digital identity infrastructure, and sustainable software systems.",
    },
    {
      name: "keywords",
      content:
        "Ahmed Elghareeb, Staff Software Engineer, Resilio, EPFL, C4DT, Climate Tech, Sustainable IT, Digital Identity, Switzerland, Django, Python, Rust, Cryptography",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Ahmed Elghareeb | Staff Software Engineer & Climate Technologist",
    },
    {
      property: "og:description",
      content:
        "Staff Software Engineer at Resilio and ClimateBase Fellow. Building environmental accountability platforms and digital identity infrastructure in Switzerland.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://elghareeb.space",
    },
    {
      property: "og:image",
      content: "https://elghareeb.space/hero.jpg",
    },
    {
      property: "og:locale",
      content: "en_US",
    },
    {
      property: "og:site_name",
      content: "Ahmed Elghareeb Portfolio",
    },
    // Twitter Card
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Ahmed Elghareeb | Staff Software Engineer & Climate Technologist",
    },
    {
      name: "twitter:description",
      content:
        "Staff Software Engineer at Resilio and ClimateBase Fellow. Building environmental accountability platforms and digital identity infrastructure in Switzerland.",
    },
    {
      name: "twitter:image",
      content: "https://elghareeb.space/hero.jpg",
    },
  ],
  links: [
    {
      rel: "canonical",
      href: "https://elghareeb.space",
    },
  ],
};
