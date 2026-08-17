/**
 * Portfolio data with Valibot schemas for runtime validation
 * and advanced TypeScript patterns for compile-time safety.
 */
import * as v from "valibot";

// ============================================================================
// Branded Types for Type-Safe Identifiers
// ============================================================================

declare const UrlBrand: unique symbol;
declare const DateRangeBrand: unique symbol;
declare const ColorClassBrand: unique symbol;

/** Branded type for validated URLs */
export type Url = string & { readonly [UrlBrand]: typeof UrlBrand };

/** Branded type for date range strings (e.g., "Jan 2020 - Dec 2021") */
export type DateRange = string & { readonly [DateRangeBrand]: typeof DateRangeBrand };

/** Branded type for Tailwind color classes */
export type ColorClass = string & { readonly [ColorClassBrand]: typeof ColorClassBrand };

// ============================================================================
// Category Types & Filter Config
// ============================================================================

export type DomainCategoryId = "all" | "climate" | "identity" | "systems" | "research";

export interface DomainCategory {
  id: DomainCategoryId;
  label: string;
  shortLabel: string;
  badgeEmoji: string;
  description: string;
}

export const domainCategories: readonly DomainCategory[] = [
  {
    id: "all",
    label: "All Focus Areas",
    shortLabel: "All",
    badgeEmoji: "✨",
    description: "Full portfolio across backend systems, privacy cryptography, and climate technology.",
  },
  {
    id: "climate",
    label: "Climate & Sustainability",
    shortLabel: "Climate Tech",
    badgeEmoji: "🌿",
    description: "Environmental accountability platforms, sustainable IT, and carbon analytics.",
  },
  {
    id: "identity",
    label: "Digital Identity & Cryptography",
    shortLabel: "Digital Identity",
    badgeEmoji: "🔐",
    description: "Swiss E-ID infrastructure, verifiable credentials, zero-knowledge proofs, and WASM crypto.",
  },
  {
    id: "systems",
    label: "Systems & Cloud Architecture",
    shortLabel: "Systems",
    badgeEmoji: "⚡",
    description: "Domain-Driven Design, high-scale Python/Django services, PostgreSQL, and AWS cloud.",
  },
  {
    id: "research",
    label: "Research & Palaeography",
    shortLabel: "Research",
    badgeEmoji: "📜",
    description: "Academic tooling, multi-party ML research at EPFL, and medieval manuscript annotation.",
  },
] as const;

// ============================================================================
// Valibot Schemas
// ============================================================================

const UrlSchema = v.pipe(
  v.string(),
  v.url(),
  v.transform((val): Url => val as Url)
);

const DateRangeSchema = v.pipe(
  v.string(),
  v.minLength(1),
  v.transform((val): DateRange => val as DateRange)
);

const ColorClassSchema = v.pipe(
  v.string(),
  v.regex(/^accent-\w+$/, "Must be a valid accent color class"),
  v.transform((val): ColorClass => val as ColorClass)
);

export const ExperienceSchema = v.object({
  title: v.string(),
  company: v.string(),
  companyUrl: UrlSchema,
  type: v.picklist(["Full-time", "Part-time", "Contract", "Fellowship", "Permanent"]),
  period: DateRangeSchema,
  duration: v.string(),
  location: v.string(),
  category: v.picklist(["climate", "identity", "systems", "research"]),
  categoryLabel: v.string(),
  description: v.array(v.pipe(v.string(), v.minLength(1))),
  highlights: v.array(v.string()),
  skills: v.array(v.string()),
  current: v.boolean(),
});

export const ProjectSchema = v.object({
  name: v.string(),
  description: v.string(),
  link: UrlSchema,
  category: v.picklist(["climate", "identity", "systems", "research"]),
  tags: v.array(v.string()),
  badge: v.optional(v.string()),
  isFeatured: v.optional(v.boolean()),
});

export const SkillSchema = v.object({
  category: v.string(),
  items: v.array(v.string()),
  color: ColorClassSchema,
  icon: v.optional(v.string()),
});

export const EducationSchema = v.object({
  institution: v.string(),
  degree: v.string(),
  period: DateRangeSchema,
  location: v.optional(v.string()),
  description: v.string(),
  badge: v.optional(v.string()),
});

export const CertificationSchema = v.object({
  name: v.string(),
  org: v.string(),
  year: v.pipe(v.string(), v.regex(/^\d{4}$/, "Must be a 4-digit year")),
  badge: v.optional(v.string()),
});

// ============================================================================
// Inferred Types
// ============================================================================

export type Experience = v.InferOutput<typeof ExperienceSchema>;
export type Project = v.InferOutput<typeof ProjectSchema>;
export type Skill = v.InferOutput<typeof SkillSchema>;
export type Education = v.InferOutput<typeof EducationSchema>;
export type Certification = v.InferOutput<typeof CertificationSchema>;

// ============================================================================
// Portfolio Data
// ============================================================================

export const personalInfo = {
  name: "Ahmed Elghareeb",
  handle: "lanterno",
  role: "Staff Software Engineer",
  subRole: "Climate Technologist & Identity Researcher",
  location: "Renens / Lausanne, Switzerland",
  timezone: "Europe/Zurich",
  timezoneLabel: "CET (UTC+1/2)",
  email: "ahmed@elghareeb.space",
  github: "https://github.com/lanterno" as Url,
  linkedin: "https://linkedin.com/in/ahmedelghareeb" as Url,
  status: "Available for select advisory & climate collaborations",
  shortBio:
    "Architecting environmental accountability platforms at Resilio and researching Swiss digital trust infrastructure. Specialized in Domain-Driven Design, privacy-preserving cryptography, and sustainable software systems.",
} as const;

export const experiences = [
  {
    title: "Staff Software Engineer",
    company: "Resilio",
    companyUrl: "https://resilio-solutions.com" as Url,
    type: "Full-time",
    period: "Dec 2025 - Present" as DateRange,
    duration: "Current",
    location: "Renens, Switzerland",
    category: "climate",
    categoryLabel: "Climate & Environmental Accountability",
    description: [
      "Architecting an enterprise environmental accountability platform empowering sustainability teams to measure, analyze, and mitigate carbon emissions and digital footprint.",
      "Implementing Domain-Driven Design (DDD) to model complex lifecycle assessments (LCA) and sustainability metrics with precision.",
      "Leading technical decisions across modern Python services, high-throughput data processing, and automated reporting pipelines.",
    ],
    highlights: ["Domain-Driven Design (DDD)", "Environmental Footprint Engines", "Python / Django"],
    skills: [
      "Domain-Driven Design",
      "Django",
      "REST Framework",
      "Python",
      "PostgreSQL",
      "Sustainability Tech",
    ],
    current: true,
  },
  {
    title: "Research Software Engineer in Digital Identities",
    company: "Center for Digital Trust (C4DT), EPFL",
    companyUrl: "https://c4dt.epfl.ch" as Url,
    type: "Full-time",
    period: "Apr 2023 - Apr 2026" as DateRange,
    duration: "3 years 1 month",
    location: "Lausanne, Switzerland",
    category: "identity",
    categoryLabel: "Digital Identity & Privacy Cryptography",
    description: [
      "Swiss E-ID Infrastructure: Experimented with next-generation identity standards, digital wallets, and decentralized verifiable credentials for the Swiss Confederation ecosystem.",
      "Private Multi-Party Machine Learning: Designed predictive maintenance POCs using privacy-preserving ML, Homomorphic Encryption, and decentralized neural networks.",
      "Bridged academic research papers and production-grade implementations in Rust, WebAssembly, and TypeScript.",
    ],
    highlights: ["Swiss E-ID Standards", "Zero-Knowledge & ZKP", "Rust & WebAssembly"],
    skills: [
      "Digital Identity",
      "Cryptography",
      "Rust",
      "TypeScript",
      "WebAssembly (WASM)",
      "Zero-Knowledge Proofs",
      "Homomorphic Encryption",
    ],
    current: false,
  },
  {
    title: "Climate Fellow - Cohort 6",
    company: "Climatebase",
    companyUrl: "https://climatebase.org" as Url,
    type: "Fellowship",
    period: "Sep 2024 - Nov 2024" as DateRange,
    duration: "3 months",
    location: "Remote",
    category: "climate",
    categoryLabel: "Climate Tech Fellowship",
    description: [
      "Investigated deep decarbonization levers across energy grids, sustainable mobility, and regenerative agriculture.",
      "Collaborated with ClimateRoboticsNetworks to support open-source robotics for carbon sequestration and biodiversity tracking.",
      "Founded a working group on Sustainable IT at EPFL, sponsored by the Research Software Engineering community.",
    ],
    highlights: ["Sustainable IT at EPFL", "Energy & Mobility Decarbonization", "ClimateRobotics"],
    skills: ["Climate Tech", "Sustainable IT", "Energy Systems", "Agriculture Tech"],
    current: false,
  },
  {
    title: "Senior Software Engineer",
    company: "Back Market",
    companyUrl: "https://backmarket.com" as Url,
    type: "Permanent",
    period: "Jan 2019 - Feb 2021" as DateRange,
    duration: "2 years 2 months",
    location: "Paris, France",
    category: "systems",
    categoryLabel: "High-Scale E-Commerce & Systems",
    description: [
      "Engineered resilient, scalable distributed backend services at Europe's leading refurbished electronics marketplace.",
      "Designed and maintained cloud infrastructure across AWS, managing PostgreSQL clusters and asynchronous message brokers for high-traffic peak seasons.",
      "Promoted engineering rigor, code quality, and observability across cross-functional product squads.",
    ],
    highlights: ["High-Throughput Distributed Systems", "AWS & PostgreSQL", "Circular Economy"],
    skills: ["AWS", "Python", "Django", "PostgreSQL", "Platform as a Service", "Celery", "Redis"],
    current: false,
  },
] as const satisfies readonly Experience[];

export const projects = [
  {
    name: "E-ID Workshop & Tooling",
    description:
      "Hands-on reference implementations for Switzerland's emerging E-ID infrastructure — privacy-preserving digital wallets, verifiable credentials, and trust registries.",
    link: "https://github.com/c4dt/how-2025-06-eID" as Url,
    category: "identity",
    tags: ["Digital Identity", "Privacy", "Verifiable Credentials", "Switzerland"],
    badge: "EPFL / C4DT",
    isFeatured: true,
  },
  {
    name: "crypto-wasm-ts",
    description:
      "High-performance TypeScript abstraction layer over cryptographic primitives and Rust WASM modules for verifiable credentials and digital signatures.",
    link: "https://github.com/docknetwork/crypto-wasm-ts" as Url,
    category: "identity",
    tags: ["TypeScript", "WASM", "Rust", "Cryptography"],
    badge: "Open Source",
    isFeatured: true,
  },
  {
    name: "archetype-pal",
    description:
      "Leading the modernization and backend rewrite of an open-source palaeographical annotation platform for medieval manuscript research and digital humanities.",
    link: "https://github.com/archetype-pal/backend" as Url,
    category: "research",
    tags: ["Python", "Django", "Palaeography", "Research"],
    badge: "Academic OSS",
    isFeatured: true,
  },
  {
    name: "crypto-wasm",
    description:
      "WebAssembly compilation and memory safety wrapper for core zero-knowledge and cryptographic primitives built in Rust.",
    link: "https://github.com/docknetwork/crypto-wasm" as Url,
    category: "identity",
    tags: ["Rust", "WASM", "ZKP", "Crypto"],
    badge: "Systems & Security",
    isFeatured: false,
  },
] as const satisfies readonly Project[];

export const engineeringPrinciples = [
  {
    title: "Domain-Driven Precision",
    description:
      "Complex environmental systems and cryptographic protocols demand clear bounded contexts, expressive ubiquitous language, and clean architecture.",
    tag: "Architecture",
    icon: "⚡",
  },
  {
    title: "Privacy by Default",
    description:
      "Verifiable credentials and Zero-Knowledge Proofs guarantee data integrity and user autonomy without central honeypots or surveillance vectors.",
    tag: "Cryptography",
    icon: "🔐",
  },
  {
    title: "Sustainable & Lean IT",
    description:
      "Software carbon intensity matters. Every query, compute cycle, and architectural decision should be intentional, measurable, and energy-conscious.",
    tag: "Sustainability",
    icon: "🌿",
  },
  {
    title: "Deterministic & Polyglot",
    description:
      "Selecting the optimal tool for the constraint: Rust for cryptographically critical pipelines, Python for rich domain modeling, and TypeScript for secure tooling.",
    tag: "Engineering",
    icon: "🛠️",
  },
] as const;

/** Mapping of color classes to their text- prefixed Tailwind classes */
const colorTextClasses = {
  "accent-emerald": "text-accent-emerald",
  "accent-sky": "text-accent-sky",
  "accent-amber": "text-accent-amber",
  "accent-rose": "text-accent-rose",
} as const;

export type AccentColor = keyof typeof colorTextClasses;

/** Get the text color class for a given accent color */
export function getTextColorClass(color: AccentColor): string {
  return colorTextClasses[color];
}

export const skills = [
  {
    category: "Core Languages",
    items: ["Python", "TypeScript", "Rust", "JavaScript", "SQL", "Bash"],
    color: "accent-emerald" as AccentColor,
    icon: "⌨️",
  },
  {
    category: "Backend & Data Systems",
    items: ["Django", "Domain-Driven Design", "PostgreSQL", "GraphQL", "Celery", "REST APIs", "Redis"],
    color: "accent-sky" as AccentColor,
    icon: "⚙️",
  },
  {
    category: "Cloud & Infrastructure",
    items: ["Docker", "AWS", "GCP", "Terraform", "Kubernetes", "Linux", "CI/CD"],
    color: "accent-amber" as AccentColor,
    icon: "☁️",
  },
  {
    category: "Cryptography & Identity",
    items: [
      "Swiss E-ID Standards",
      "Verifiable Credentials",
      "Zero-Knowledge Proofs",
      "Homomorphic Encryption",
      "WebAssembly (WASM)",
      "Digital Signatures",
    ],
    color: "accent-rose" as AccentColor,
    icon: "🔒",
  },
] as const;

export const education = [
  {
    institution: "MITx MicroMasters",
    degree: "Statistics and Data Science",
    period: "2019 - 2023" as DateRange,
    location: "Online / Cambridge, MA",
    description:
      "Rigorous mastery of probabilistic modeling, statistical inference, machine learning algorithms, and big data analysis for complex system modeling.",
    badge: "MicroMasters Credential",
  },
  {
    institution: "Mansoura University",
    degree: "B.Eng. Computer Engineering",
    period: "2011 - 2016" as DateRange,
    location: "Egypt",
    description:
      "Deep foundation in computer architecture, distributed systems, algorithms, operating systems, and disciplined engineering methodology.",
    badge: "Bachelor of Engineering",
  },
] as const satisfies readonly Education[];

export const certifications = [
  {
    name: "Climatebase Fellow, Cohort 6",
    org: "Climatebase",
    year: "2024",
    badge: "Climate Tech",
  },
  {
    name: "AI Safety, Ethics & Society",
    org: "Center for AI Safety",
    year: "2023",
    badge: "AI Governance",
  },
  {
    name: "Introduction to Aerospace Engineering",
    org: "MIT edX",
    year: "2022",
    badge: "Systems Eng",
  },
] as const satisfies readonly Certification[];

export const organizations = [
  {
    name: "Resilio",
    role: "Staff Software Engineer",
    link: "https://resilio-solutions.com" as Url,
    description: "Environmental footprint & carbon accounting software",
    badge: "Current",
    isPrimary: true,
  },
  {
    name: "Center for Digital Trust (C4DT) @ EPFL",
    role: "Research Software Engineer",
    link: "https://c4dt.epfl.ch" as Url,
    description: "Digital identity & Swiss E-ID infrastructure research",
    badge: "Academic",
    isPrimary: true,
  },
  {
    name: "Climatebase",
    role: "Fellow, Cohort 6",
    link: "https://climatebase.org" as Url,
    description: "Global climate innovation & decarbonization network",
    badge: "Fellowship",
    isPrimary: false,
  },
  {
    name: "Sustainable IT Working Group @ EPFL",
    role: "Founder / Lead",
    link: "https://github.com/c4dt" as Url,
    description: "Advancing digital sustainability across academic research software",
    badge: "Community",
    isPrimary: false,
  },
] as const;

// ============================================================================
// Animation Delay Utilities
// ============================================================================

export const animationDelayClasses = [
  "animation-delay-100",
  "animation-delay-200",
  "animation-delay-300",
  "animation-delay-400",
  "animation-delay-500",
] as const;

export type AnimationDelayClass = (typeof animationDelayClasses)[number];

export function getAnimationDelayClass(index: number): AnimationDelayClass {
  const safeIndex = Math.min(Math.max(0, index), animationDelayClasses.length - 1);
  const delayClass = animationDelayClasses[safeIndex];
  return delayClass ?? "animation-delay-100";
}
