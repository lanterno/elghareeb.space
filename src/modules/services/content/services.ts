import { site } from "~/platform/seo";

import type { Engagement, Question, Service } from "../model";

/** The opening of the page */
export const servicesIntro =
  "Alongside my role at Resilio, I take on freelance and contract work: digital identity, climate software and the backends under them. I live in Chavannes-près-Renens and work with teams across Switzerland and Europe, remotely or in person.";

/** What I take on, most asked-for first. Every claim points at the page that shows it. */
export const services = [
  {
    id: "digital-identity",
    title: "Digital identity and verifiable credentials",
    summary:
      "Wallets, issuers and verifiers; selective disclosure and zero-knowledge proofs; the standards behind Switzerland’s E-ID. I spent three years on them at EPFL’s Center for Digital Trust, and contributed to the cryptography libraries that verifiable credentials run on.",
    keywords: [
      "Swiss E-ID",
      "Verifiable credentials",
      "Digital wallets",
      "Selective disclosure",
      "Zero-knowledge proofs",
      "Rust",
      "TypeScript",
    ],
    tone: "blue",
    evidence: [
      { label: "The E-ID workshop", href: "/projects/eid-workshop/" },
      { label: "crypto-wasm-ts", href: "/projects/crypto-wasm-ts/" },
      { label: "Three years at C4DT", href: "/work/" },
    ],
  },
  {
    id: "climate-software",
    title: "Climate and sustainability software",
    summary:
      "Platforms that measure an organisation’s environmental footprint, and the data models that make those numbers trustworthy. I build one today at Resilio, with Domain-Driven Design where the domain is complex, and I was a Climatebase Fellow.",
    keywords: [
      "Climate tech",
      "Environmental accountability",
      "Sustainable IT",
      "Domain-Driven Design",
    ],
    tone: "teal",
    evidence: [
      { label: "Resilio and Climatebase", href: "/work/" },
      { label: "About me", href: "/about/" },
    ],
  },
  {
    id: "backend-architecture",
    title: "Backend and platform architecture",
    summary:
      "Python and Django backends, PostgreSQL, APIs and the cloud they run on, from a system that scaled with one of France’s biggest startups to a small team’s first platform. Design reviews, a plan for a rewrite, or building it.",
    keywords: ["Python", "Django", "PostgreSQL", "REST APIs", "AWS", "Terraform", "Kubernetes"],
    tone: "orange",
    evidence: [
      { label: "Back Market and Resilio", href: "/work/" },
      { label: "The toolkit", href: "/about/" },
    ],
  },
  {
    id: "research-software",
    title: "Research and open-source software",
    summary:
      "Turning a paper, a standard or an aging research tool into software people can maintain. I lead the rewrite of archetype-pal, the open-source platform researchers use to annotate medieval manuscripts.",
    keywords: ["Research software engineering", "Open source", "IIIF", "Celery", "Meilisearch"],
    tone: "coral",
    evidence: [{ label: "archetype-pal", href: "/projects/archetype-pal/" }],
  },
  {
    id: "ai-assisted-engineering",
    title: "Engineering with AI agents",
    summary:
      "Pairing AI coding agents with careful design, so a team moves faster without lowering the bar: how to set the work up, what to review, and where the agent should not be trusted. This site is built that way.",
    keywords: ["AI coding agents", "Code review", "Engineering practices"],
    tone: "lavender",
    evidence: [{ label: "How this site is built", href: "/blog/how-this-site-is-built-with-ai/" }],
  },
] as const satisfies readonly Service[];

/** The shapes an engagement takes */
export const engagements = [
  {
    title: "Advice and reviews",
    description:
      "An architecture review, a second opinion on a design, or a few hours a month on call for a team.",
  },
  {
    title: "A proof of concept",
    description:
      "Taking a standard or an idea to working code quickly, to find out whether it holds before you commit to it.",
  },
  {
    title: "Building it",
    description:
      "A feature, a service or a platform, end to end, with tests and documentation for the people who keep it.",
  },
] as const satisfies readonly Engagement[];

/** The facts beside the engagements */
export const workingFacts = [
  { label: "Based in", value: "Chavannes-près-Renens, Switzerland" },
  { label: "Works", value: "Remotely, or in person in Switzerland" },
  { label: "Languages", value: site.languages.join(", ") },
  { label: "Time zone", value: "Central European Time" },
] as const;

/** Asked before people write; also the page's FAQ for search engines and AI assistants */
export const questions = [
  {
    question: "Do you take freelance work?",
    answer:
      "Yes. Alongside my role as a Staff Software Engineer at Resilio, I take on freelance and contract projects in digital identity, climate and sustainability software, backend architecture and research software.",
  },
  {
    question: "Where are you based, and do you work remotely?",
    answer:
      "I live in Chavannes-près-Renens, Switzerland. I work remotely with teams across Switzerland and Europe, in Central European Time, and in person in Switzerland when it helps.",
  },
  {
    question: "Which languages do you work in?",
    answer: `${site.languages.slice(0, -1).join(", ")} and ${site.languages.at(-1) ?? ""}.`,
  },
  {
    question: "What experience do you have with digital identity?",
    answer:
      "Three years as a research software engineer on digital identities at EPFL’s Center for Digital Trust (C4DT), working on Switzerland’s E-ID: digital wallets, verifiable credentials, selective disclosure and zero-knowledge proofs. I also contributed to Dock’s crypto-wasm and crypto-wasm-ts libraries, and worked on C4DT’s hands-on E-ID workshop.",
  },
  {
    question: "What does your work in climate software look like?",
    answer:
      "At Resilio I build an environmental accountability platform that helps sustainability professionals analyse their impact, with Domain-Driven Design on modern Python. As a Climatebase Fellow I studied energy, transportation and agriculture, and started a working group on Sustainable IT at EPFL.",
  },
  {
    question: "How do we start?",
    answer:
      "Write to me on LinkedIn with a few lines about the project: what it is, where it stands and what you need. I’ll tell you honestly whether I’m the right person for it.",
  },
] as const satisfies readonly Question[];
