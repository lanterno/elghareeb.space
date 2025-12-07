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

const ExperienceSchema = v.object({
  title: v.string(),
  company: v.string(),
  type: v.picklist(["Full-time", "Part-time", "Contract", "Fellowship", "Permanent"]),
  period: DateRangeSchema,
  duration: v.string(),
  location: v.string(),
  description: v.array(v.pipe(v.string(), v.minLength(1))),
  skills: v.array(v.string()),
  current: v.boolean(),
});

const ProjectSchema = v.object({
  name: v.string(),
  description: v.string(),
  link: UrlSchema,
  tags: v.array(v.string()),
});

const SkillSchema = v.object({
  category: v.string(),
  items: v.array(v.string()),
  color: ColorClassSchema,
});

const EducationSchema = v.object({
  institution: v.string(),
  degree: v.string(),
  period: DateRangeSchema,
  description: v.string(),
});

const CertificationSchema = v.object({
  name: v.string(),
  org: v.string(),
  year: v.pipe(v.string(), v.regex(/^\d{4}$/, "Must be a 4-digit year")),
});

// ============================================================================
// Inferred Types from Schemas
// ============================================================================

export type Experience = v.InferOutput<typeof ExperienceSchema>;
export type Project = v.InferOutput<typeof ProjectSchema>;
export type Skill = v.InferOutput<typeof SkillSchema>;
export type Education = v.InferOutput<typeof EducationSchema>;
export type Certification = v.InferOutput<typeof CertificationSchema>;

// ============================================================================
// Portfolio Data with `satisfies` for Type-Safe Validation
// ============================================================================

export const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Center for Digital Trust (C4DT), EPFL",
    type: "Full-time",
    period: "Apr 2023 - Present" as DateRange,
    duration: "2+ years",
    location: "Lausanne, Switzerland",
    description: [
      "E-ID (Digital Identity Infrastructure In Switzerland): Experimenting with cutting-edge standards and technologies for Digital Identities, digital wallets, and verifiable credentials.",
      "Predictive Maintenance (Private Multi-party ML): Using modern ML privacy technology including Homomorphic Encryption and Decentralized Learning on neural networks.",
      "Working in a research environment, reading papers and specifications, and building proof-of-concepts in various programming languages.",
    ],
    skills: [
      "Digital Identity",
      "Cryptography",
      "Rust",
      "TypeScript",
      "E-ID",
      "Zero-Knowledge Proofs",
    ],
    current: true,
  },
  {
    title: "Climate Fellow - Cohort 6",
    company: "Climatebase",
    type: "Fellowship",
    period: "Sep 2024 - Nov 2024" as DateRange,
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
    period: "Jan 2019 - Feb 2021" as DateRange,
    duration: "2 years 2 months",
    location: "Paris, France",
    description: [
      "Built cloud-based, scalable systems at one of the biggest startups in France.",
      "Worked with AWS infrastructure and Platform as a Service (PAAS) solutions.",
    ],
    skills: ["AWS", "Python", "Django", "PostgreSQL", "Platform as a Service"],
    current: false,
  },
] as const satisfies readonly Experience[];

export const projects = [
  {
    name: "E-ID Workshop",
    description:
      "Building Switzerland's E-ID infrastructure — digital wallets, verifiable credentials, and identity standards that respect privacy.",
    link: "https://github.com/c4dt/how-2025-06-eID" as Url,
    tags: ["Digital Identity", "Privacy", "Switzerland"],
  },
  {
    name: "archetype-pal",
    description:
      "Leading the rewrite of an open-source palaeographic annotation platform for medieval manuscript research.",
    link: "https://github.com/archetype-pal/backend" as Url,
    tags: ["Python", "Django", "Research"],
  },
  {
    name: "crypto-wasm-ts",
    description:
      "TypeScript abstractions over Rust crypto library's WASM wrapper for verifiable credentials.",
    link: "https://github.com/docknetwork/crypto-wasm-ts" as Url,
    tags: ["TypeScript", "WASM", "Cryptography"],
  },
  {
    name: "crypto-wasm",
    description: "WASM wrapper over the cryptographic primitives library.",
    link: "https://github.com/docknetwork/crypto-wasm" as Url,
    tags: ["Rust", "WASM", "Crypto"],
  },
] as const satisfies readonly Project[];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "Rust", "JavaScript"],
    color: "accent-emerald" as ColorClass,
  },
  {
    category: "Backend & Data",
    items: ["Django", "PostgreSQL", "GraphQL", "Celery", "REST APIs"],
    color: "accent-sky" as ColorClass,
  },
  {
    category: "Infrastructure",
    items: ["Docker", "AWS", "GCP", "Terraform", "Kubernetes"],
    color: "accent-amber" as ColorClass,
  },
  {
    category: "Cryptography & Identity",
    items: [
      "Verifiable Credentials",
      "Zero-Knowledge Proofs",
      "Digital Signatures",
      "E-ID",
      "Homomorphic Encryption",
    ],
    color: "accent-rose" as ColorClass,
  },
] as const satisfies readonly Skill[];

export const education = [
  {
    institution: "MITx MicroMasters",
    degree: "Statistics and Data Science",
    period: "2019 - 2023" as DateRange,
    description:
      "From probability and statistics to data analysis and machine learning, mastering skills needed to solve complex challenges.",
  },
  {
    institution: "Mansoura University",
    degree: "B.Eng. Computer Engineering",
    period: "2011 - 2016" as DateRange,
    description:
      "Learned to think systematically and apply disciplined solutions to real world problems. Success is not a coincidence, and so is good systems.",
  },
] as const satisfies readonly Education[];

export const certifications = [
  { name: "Climatebase Fellow, Cohort 6", org: "Climatebase", year: "2024" },
  { name: "AI Safety, Ethics & Society", org: "Center for AI Safety", year: "2023" },
  { name: "Introduction to Aerospace Engineering", org: "MIT edX", year: "2022" },
] as const satisfies readonly Certification[];

// ============================================================================
// Animation Delay Utilities
// ============================================================================

/** Animation delay class names for staggered animations */
export const animationDelayClasses = [
  "animation-delay-000",
  "animation-delay-100",
  "animation-delay-200",
  "animation-delay-300",
  "animation-delay-400",
  "animation-delay-500",
  "animation-delay-600",
] as const;

export type AnimationDelayClass = (typeof animationDelayClasses)[number];

/**
 * Get animation delay class for staggered animations
 * @param index - The index of the item in a list
 * @returns The appropriate animation delay class
 */
export function getAnimationDelayClass(index: number): AnimationDelayClass {
  const safeIndex = Math.min(Math.max(0, index), animationDelayClasses.length - 1);
  return animationDelayClasses[safeIndex] ?? "animation-delay-100";
}

// ============================================================================
// Validation Utilities (for runtime validation if needed)
// ============================================================================

export const PortfolioSchemas = {
  Experience: ExperienceSchema,
  Project: ProjectSchema,
  Skill: SkillSchema,
  Education: EducationSchema,
  Certification: CertificationSchema,
} as const;

/**
 * Validate portfolio data at runtime (useful for dynamic data sources)
 */
export function validateExperience(data: unknown): Experience {
  return v.parse(ExperienceSchema, data);
}

export function validateProject(data: unknown): Project {
  return v.parse(ProjectSchema, data);
}

export function validateSkill(data: unknown): Skill {
  return v.parse(SkillSchema, data);
}
