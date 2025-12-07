import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// Icons as inline SVG components
const GitHubIcon = component$(() => (
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      fill-rule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clip-rule="evenodd"
    />
  </svg>
));

const LinkedInIcon = component$(() => (
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
));

const LocationIcon = component$(() => (
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
));

const ExternalLinkIcon = component$(() => (
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
));

const CalendarIcon = component$(() => (
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
));

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Center for Digital Trust (C4DT), EPFL",
    type: "Full-time",
    period: "Apr 2023 - Present",
    duration: "2+ years",
    location: "Lausanne, Switzerland",
    description: [
      "E-ID (Digital Identity Infrastructure In Switzerland): Experimenting with cutting-edge standards and technologies for Digital Identities, digital wallets, and verifiable credentials.",
      "Predictive Maintenance (Private Multi-party ML): Using modern ML privacy technology including Homomorphic Encryption and Decentralized Learning on neural networks.",
      "Working in a research environment, reading papers and specifications, and building proof-of-concepts in various programming languages.",
    ],
    skills: ["Digital Identity", "Cryptography", "Rust", "TypeScript", "E-ID", "Zero-Knowledge Proofs"],
    current: true,
  },
  {
    title: "Climate Fellow - Cohort 6",
    company: "Climatebase",
    type: "Fellowship",
    period: "Sep 2024 - Nov 2024",
    duration: "3 months",
    location: "Remote",
    description: [
      "Investigated multiple domains with a focus on climate aspects, particularly energy, transportation, and agriculture sectors.",
      "Working with ClimateRoboticsNetworks non-profit organization.",
      "Started a working group on Sustainable IT at EPFL, sponsored by the Research Software Engineering community.",
    ],
    skills: ["Climate Tech", "Sustainability", "Energy", "Transportation", "Agriculture"],
    current: false,
  },
  {
    title: "Senior Software Engineer",
    company: "Back Market",
    type: "Permanent",
    period: "Jan 2019 - Feb 2021",
    duration: "2 years 2 months",
    location: "Paris, France",
    description: [
      "Built cloud-based, scalable systems at one of the biggest startups in France.",
      "Worked with AWS infrastructure and Platform as a Service (PAAS) solutions.",
    ],
    skills: ["AWS", "Python", "Django", "PostgreSQL", "Platform as a Service"],
    current: false,
  },
];

const projects = [
  {
    name: "E-ID Workshop",
    description:
      "Building Switzerland's E-ID infrastructure — digital wallets, verifiable credentials, and identity standards that respect privacy.",
    link: "https://github.com/c4dt/how-2025-06-eID",
    tags: ["Digital Identity", "Privacy", "Switzerland"],
  },
  {
    name: "archetype-pal",
    description:
      "Leading the rewrite of an open-source palaeographic annotation platform for medieval manuscript research.",
    link: "https://github.com/archetype-pal/backend",
    tags: ["Python", "Django", "Research"],
  },
  {
    name: "crypto-wasm-ts",
    description:
      "TypeScript abstractions over Rust crypto library's WASM wrapper for verifiable credentials.",
    link: "https://github.com/docknetwork/crypto-wasm-ts",
    tags: ["TypeScript", "WASM", "Cryptography"],
  },
  {
    name: "crypto-wasm",
    description: "WASM wrapper over the cryptographic primitives library.",
    link: "https://github.com/docknetwork/crypto-wasm",
    tags: ["Rust", "WASM", "Crypto"],
  },
];

const skills = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "Rust", "JavaScript"],
    color: "accent-emerald",
  },
  {
    category: "Backend & Data",
    items: ["Django", "PostgreSQL", "GraphQL", "Celery", "REST APIs"],
    color: "accent-sky",
  },
  {
    category: "Infrastructure",
    items: ["Docker", "AWS", "GCP", "Terraform", "Kubernetes"],
    color: "accent-amber",
  },
  {
    category: "Cryptography & Identity",
    items: ["Verifiable Credentials", "Zero-Knowledge Proofs", "Digital Signatures", "E-ID", "Homomorphic Encryption"],
    color: "accent-rose",
  },
];

const education = [
  {
    institution: "MITx MicroMasters",
    degree: "Statistics and Data Science",
    period: "2019 - 2023",
    description: "From probability and statistics to data analysis and machine learning, mastering skills needed to solve complex challenges.",
  },
  {
    institution: "Mansoura University",
    degree: "B.Eng. Computer Engineering",
    period: "2011 - 2016",
    description: "Learned to think systematically and apply disciplined solutions to real world problems. Success is not a coincidence, and so is good systems.",
  },
];

const certifications = [
  { name: "Climatebase Fellow, Cohort 6", org: "Climatebase", year: "2024" },
  { name: "AI Safety, Ethics & Society", org: "Center for AI Safety", year: "2023" },
  { name: "Introduction to Aerospace Engineering", org: "MIT edX", year: "2022" },
];

export default component$(() => {
  return (
    <main class="max-w-5xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section class="mb-24">
        <div class="flex flex-col lg:flex-row items-start gap-12">
          {/* Profile Image */}
          <div class="opacity-0 animate-fade-in flex-shrink-0">
            <div class="relative group">
              <div class="absolute -inset-2 bg-gradient-to-r from-accent-emerald to-accent-sky rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <img
                src="/hero.jpg"
                alt="Ahmed Elghareeb"
                width={180}
                height={180}
                class="relative rounded-full border-4 border-cream-100 shadow-xl"
              />
              <span class="absolute bottom-2 right-2 text-3xl" aria-label="Turtle emoji">
                🐢
              </span>
            </div>
          </div>

          {/* Info */}
          <div class="flex-1">
            <h1 class="opacity-0 animate-fade-up text-5xl lg:text-6xl font-display font-normal mb-4">
              Ahmed <span class="italic">Elghareeb</span>
            </h1>

            <p class="opacity-0 animate-fade-up animation-delay-100 text-xl text-ink-600 mb-6 font-light">
              <span class="font-semibold text-ink-900">Senior Backend Engineer</span> ·{" "}
              <span class="text-accent-emerald font-medium">ClimateBase Fellow</span>
            </p>

            <div class="opacity-0 animate-fade-up animation-delay-200 flex items-center gap-2 text-ink-500 mb-6">
              <LocationIcon />
              <span>Lausanne, Switzerland</span>
              <span class="text-ink-300 mx-2">·</span>
              <span class="font-mono text-sm">@c4dt · EPFL</span>
            </div>

            <p class="opacity-0 animate-fade-up animation-delay-300 text-lg text-ink-600 leading-relaxed mb-6 max-w-2xl">
              Building <strong class="text-ink-900">Switzerland's digital identity infrastructure</strong> at{" "}
              <strong class="text-ink-900">EPFL's Center for Digital Trust (C4DT)</strong>. Experimenting with 
              cutting-edge standards for digital wallets, verifiable credentials, and privacy-preserving technologies.
            </p>

            <p class="opacity-0 animate-fade-up animation-delay-400 text-ink-500 leading-relaxed mb-8 max-w-2xl">
              Beyond code, I'm passionate about <strong class="text-accent-emerald">climate tech</strong> and{" "}
              <strong class="text-accent-emerald">sustainable IT</strong>. As a{" "}
              <strong class="text-ink-700">Climatebase Fellow</strong>, I explore the intersection of technology 
              and sustainability in energy, transportation, and agriculture. Currently leading a{" "}
              <strong class="text-ink-700">Sustainable IT working group</strong> at EPFL.
            </p>

            {/* Open to Work Badge */}
            <div class="opacity-0 animate-fade-up animation-delay-400 mb-6">
              <span class="inline-flex items-center gap-2 px-4 py-2 bg-accent-emerald/10 text-accent-emerald rounded-full text-sm font-medium border border-accent-emerald/20">
                <span class="w-2 h-2 bg-accent-emerald rounded-full animate-pulse-soft"></span>
                Open to Work · Senior Software Engineer, Django Developer
              </span>
            </div>

            {/* Social Links */}
            <div class="opacity-0 animate-fade-up animation-delay-500 flex gap-4">
              <a
                href="https://github.com/lanterno"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-5 py-2.5 bg-ink-900 text-cream-50 rounded-lg hover:bg-ink-800 transition-colors"
              >
                <GitHubIcon />
                <span class="font-medium">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/ahmedelghareeb"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-5 py-2.5 border-2 border-ink-200 text-ink-700 rounded-lg hover:border-ink-400 hover:bg-ink-50 transition-colors"
              >
                <LinkedInIcon />
                <span class="font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section class="mb-24">
        <h2 class="text-3xl font-display mb-8 opacity-0 animate-fade-up">
          💼 <span class="italic">Experience</span>
        </h2>
        <div class="space-y-8">
          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              class={`opacity-0 animate-fade-up animation-delay-${i}00 relative pl-8 border-l-2 ${
                exp.current ? "border-accent-emerald" : "border-ink-200"
              }`}
            >
              {/* Timeline dot */}
              <div
                class={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                  exp.current
                    ? "bg-accent-emerald border-accent-emerald"
                    : "bg-cream-50 border-ink-300"
                }`}
              />

              <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 class="text-xl font-semibold text-ink-900">{exp.title}</h3>
                  <p class="text-ink-600 font-medium">{exp.company}</p>
                </div>
                {exp.current && (
                  <span class="px-3 py-1 text-xs font-medium bg-accent-emerald/10 text-accent-emerald rounded-full">
                    Current
                  </span>
                )}
              </div>

              <div class="flex flex-wrap items-center gap-3 text-sm text-ink-500 mb-4">
                <span class="flex items-center gap-1">
                  <CalendarIcon />
                  {exp.period}
                </span>
                <span>·</span>
                <span>{exp.duration}</span>
                <span>·</span>
                <span>{exp.location}</span>
                <span>·</span>
                <span class="text-ink-400">{exp.type}</span>
              </div>

              <ul class="space-y-2 mb-4">
                {exp.description.map((desc) => (
                  <li key={desc} class="text-ink-600 text-sm leading-relaxed pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-accent-emerald">
                    {desc}
                  </li>
                ))}
              </ul>

              <div class="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    class="px-2.5 py-1 text-xs font-mono bg-ink-100 text-ink-600 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Current Focus */}
      <section class="mb-24">
        <h2 class="text-3xl font-display mb-8 opacity-0 animate-fade-up">
          🔭 <span class="italic">Current Focus</span>
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="opacity-0 animate-fade-up glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-transform">
            <div class="text-3xl mb-4">🪪</div>
            <h3 class="text-lg font-semibold mb-2">Digital Identity @ C4DT</h3>
            <p class="text-ink-500 text-sm leading-relaxed">
              Building Switzerland's E-ID infrastructure — digital wallets, verifiable credentials,
              and identity standards that respect privacy.
            </p>
            <a
              href="https://github.com/c4dt/how-2025-06-eID"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 mt-4 text-sm font-medium text-accent-emerald hover:underline"
            >
              E-ID Workshop <ExternalLinkIcon />
            </a>
          </div>

          <div class="opacity-0 animate-fade-up animation-delay-100 glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-transform">
            <div class="text-3xl mb-4">🌿</div>
            <h3 class="text-lg font-semibold mb-2">Sustainable IT @ EPFL</h3>
            <p class="text-ink-500 text-sm leading-relaxed">
              Leading a working group on Sustainable IT, sponsored by the Research Software 
              Engineering community at EPFL. Working with ClimateRoboticsNetworks.
            </p>
          </div>

          <div class="opacity-0 animate-fade-up animation-delay-200 glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-transform">
            <div class="text-3xl mb-4">📜</div>
            <h3 class="text-lg font-semibold mb-2">Archetype Project</h3>
            <p class="text-ink-500 text-sm leading-relaxed">
              Leading the rewrite of an open-source palaeographic annotation platform for medieval
              manuscript research.
            </p>
            <a
              href="https://github.com/archetype-pal/backend"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 mt-4 text-sm font-medium text-accent-emerald hover:underline"
            >
              archetype-pal <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </section>

      {/* Technical Toolkit */}
      <section class="mb-24">
        <h2 class="text-3xl font-display mb-8 opacity-0 animate-fade-up">
          🛠 <span class="italic">Technical Toolkit</span>
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <div
              key={skill.category}
              class={`opacity-0 animate-fade-up animation-delay-${i}00 p-5 rounded-xl border border-ink-100 bg-cream-100/50`}
            >
              <h3 class={`text-sm font-mono font-semibold mb-3 text-${skill.color}`}>
                {skill.category}
              </h3>
              <div class="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    class="px-2.5 py-1 text-sm bg-cream-200/80 text-ink-700 rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Open Source Highlights */}
      <section class="mb-24">
        <h2 class="text-3xl font-display mb-8 opacity-0 animate-fade-up">
          🌱 <span class="italic">Open Source Highlights</span>
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              class={`opacity-0 animate-fade-up animation-delay-${i}00 group block p-6 rounded-xl border border-ink-100 hover:border-accent-emerald/50 bg-cream-100/30 hover:bg-cream-100/60 transition-all`}
            >
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-semibold group-hover:text-accent-emerald transition-colors">
                  {project.name}
                </h3>
                <ExternalLinkIcon />
              </div>
              <p class="text-ink-500 text-sm leading-relaxed mb-4">{project.description}</p>
              <div class="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    class="px-2 py-0.5 text-xs font-mono bg-ink-100 text-ink-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section class="mb-24">
        <h2 class="text-3xl font-display mb-8 opacity-0 animate-fade-up">
          📚 <span class="italic">Education & Certifications</span>
        </h2>

        <div class="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <div class="opacity-0 animate-fade-up animation-delay-100">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <span class="text-xl">🎓</span> Education
            </h3>
            <div class="space-y-6">
              {education.map((edu) => (
                <div key={edu.institution} class="pl-4 border-l-2 border-ink-200">
                  <h4 class="font-semibold text-ink-800">{edu.institution}</h4>
                  <p class="text-sm font-medium text-accent-emerald">{edu.degree}</p>
                  <p class="text-xs text-ink-400 mb-2">{edu.period}</p>
                  <p class="text-sm text-ink-500">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div class="opacity-0 animate-fade-up animation-delay-200">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <span class="text-xl">🏅</span> Certifications
            </h3>
            <div class="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.name} class="pl-4 border-l-2 border-accent-emerald/40">
                  <h4 class="font-semibold text-ink-800">{cert.name}</h4>
                  <p class="text-sm text-ink-500">{cert.org} · {cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organizations */}
      <section class="mb-12">
        <h2 class="text-3xl font-display mb-8 opacity-0 animate-fade-up">
          🏢 <span class="italic">Organizations</span>
        </h2>
        <div class="opacity-0 animate-fade-up animation-delay-100 flex flex-wrap gap-4">
          <a
            href="https://github.com/c4dt"
            target="_blank"
            rel="noopener"
            class="px-4 py-2 rounded-lg bg-ink-900 text-cream-50 font-mono text-sm hover:bg-ink-800 transition-colors"
          >
            @c4dt
          </a>
          <a
            href="https://climatebase.org"
            target="_blank"
            rel="noopener"
            class="px-4 py-2 rounded-lg bg-accent-emerald/10 text-accent-emerald font-mono text-sm hover:bg-accent-emerald/20 transition-colors border border-accent-emerald/20"
          >
            Climatebase
          </a>
        </div>
      </section>

      {/* Contact CTA */}
      <section class="mt-24 mb-12">
        <div class="opacity-0 animate-fade-up text-center p-8 rounded-2xl glass-card">
          <h2 class="text-2xl font-display mb-4">Let's Connect</h2>
          <p class="text-ink-500 mb-6 max-w-lg mx-auto">
            I'm always interested in discussing digital identity, climate tech, or interesting engineering challenges.
          </p>
          <div class="flex justify-center gap-4">
            <a
              href="https://linkedin.com/in/ahmedelghareeb"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 px-6 py-3 bg-ink-900 text-cream-50 rounded-lg hover:bg-ink-800 transition-colors"
            >
              <LinkedInIcon />
              <span class="font-medium">Message me on LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Ahmed Elghareeb | Senior Backend Engineer",
  meta: [
    {
      name: "description",
      content:
        "Senior Backend Engineer and ClimateBase Fellow. Building Switzerland's digital identity infrastructure at EPFL's Center for Digital Trust (C4DT). Passionate about climate tech and sustainable IT.",
    },
    {
      name: "keywords",
      content:
        "Ahmed Elghareeb, Software Engineer, Digital Identity, EPFL, C4DT, Climate Tech, Switzerland, Backend Engineer, Django, Python, Rust",
    },
    {
      property: "og:title",
      content: "Ahmed Elghareeb | Senior Backend Engineer",
    },
    {
      property: "og:description",
      content:
        "Senior Backend Engineer and ClimateBase Fellow at EPFL's Center for Digital Trust. Building digital identity infrastructure for Switzerland.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
};
