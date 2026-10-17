/**
 * Portfolio data with Valibot schemas for runtime validation
 * and advanced TypeScript patterns for compile-time safety.
 */
import * as v from "valibot";

import { type Tone, tones } from "./tones";

// ============================================================================
// Branded Types for Type-Safe Identifiers
// ============================================================================

declare const UrlBrand: unique symbol;
declare const YearMonthBrand: unique symbol;
declare const IsoDateBrand: unique symbol;

/** Branded type for validated URLs */
export type Url = string & { readonly [UrlBrand]: typeof UrlBrand };

/** Branded type for a calendar month (e.g., "2025-12") */
export type YearMonth = string & { readonly [YearMonthBrand]: typeof YearMonthBrand };

/** Branded type for a calendar day (e.g., "2025-12-07") */
export type IsoDate = string & { readonly [IsoDateBrand]: typeof IsoDateBrand };

// ============================================================================
// Valibot Schemas
// ============================================================================

const UrlSchema = v.pipe(
  v.string(),
  v.url(),
  v.transform((val): Url => val as Url)
);

const YearMonthSchema = v.pipe(
  v.string(),
  v.regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Must be a YYYY-MM month"),
  v.transform((val): YearMonth => val as YearMonth)
);

const IsoDateSchema = v.pipe(
  v.string(),
  v.isoDate("Must be a YYYY-MM-DD day"),
  v.transform((val): IsoDate => val as IsoDate)
);

const ToneSchema = v.picklist(tones);

// Schemas are used for type inference via v.InferOutput<typeof Schema>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExperienceSchema = v.object({
  title: v.string(),
  company: v.string(),
  companyUrl: v.optional(UrlSchema),
  type: v.picklist(["Full-time", "Part-time", "Contract", "Fellowship", "Permanent"]),
  /** The day it started when I know it, otherwise the month */
  start: v.union([IsoDateSchema, YearMonthSchema]),
  /** `null` while this is the current role */
  end: v.nullable(YearMonthSchema),
  location: v.string(),
  description: v.pipe(v.string(), v.minLength(1)),
  skills: v.array(v.string()),
  tone: ToneSchema,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProjectSchema = v.object({
  name: v.string(),
  description: v.string(),
  link: UrlSchema,
  tags: v.array(v.string()),
  tone: ToneSchema,
  /** Short word set large on the project's cover */
  cover: v.string(),
  /** Where the project lives, shown above the cover word */
  source: v.string(),
  featured: v.boolean(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DomainSchema = v.object({
  id: v.picklist(["identity", "climate", "scale"]),
  label: v.string(),
  tone: ToneSchema,
  headline: v.string(),
  body: v.string(),
  skills: v.array(v.string()),
  links: v.array(
    v.object({
      label: v.string(),
      note: v.string(),
      href: v.string(),
      external: v.boolean(),
    })
  ),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SkillSchema = v.object({
  category: v.string(),
  items: v.array(v.string()),
  tone: ToneSchema,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EducationSchema = v.object({
  institution: v.string(),
  degree: v.string(),
  from: v.number(),
  to: v.number(),
  description: v.string(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
export type Domain = v.InferOutput<typeof DomainSchema>;
export type DomainId = Domain["id"];
export type Skill = v.InferOutput<typeof SkillSchema>;
export type Education = v.InferOutput<typeof EducationSchema>;
export type Certification = v.InferOutput<typeof CertificationSchema>;

// ============================================================================
// Portfolio Data with `satisfies` for Type-Safe Validation
// ============================================================================

export const links = {
  github: "https://github.com/lanterno" as Url,
  linkedin: "https://linkedin.com/in/ahmedelghareeb" as Url,
} as const;

/** The day my first job started; years of experience count from here */
export const careerStart = "2014-07-15" as IsoDate;

/** Most recent first */
export const experiences = [
  {
    title: "Staff Software Engineer",
    company: "Resilio",
    companyUrl: "https://resilio.tech" as Url,
    type: "Full-time",
    start: "2025-12-07" as IsoDate,
    end: null,
    location: "Renens, Switzerland",
    description:
      "Building an environmental accountability platform that helps sustainability professionals analyse and understand their impact. The domain is complex, so the code follows it: Domain-Driven Design on modern Python.",
    skills: ["Domain-Driven Design", "Django", "REST Framework", "Python", "Sustainability tech"],
    tone: "teal",
  },
  {
    title: "Climate Fellow, cohort 6",
    company: "Climatebase",
    companyUrl: "https://climatebase.org" as Url,
    type: "Fellowship",
    start: "2024-09" as YearMonth,
    end: "2024-11" as YearMonth,
    location: "Remote",
    description:
      "Studied the climate side of energy, transportation and agriculture, worked with the non-profit ClimateRoboticsNetworks, and started a working group on Sustainable IT at EPFL, sponsored by its Research Software Engineering community.",
    skills: ["Climate tech", "Sustainability", "Energy", "Transportation", "Agriculture"],
    tone: "lavender",
  },
  {
    title: "Research Software Engineer, Digital Identities",
    company: "Center for Digital Trust (C4DT), EPFL",
    type: "Full-time",
    start: "2023-04" as YearMonth,
    end: "2026-04" as YearMonth,
    location: "Lausanne, Switzerland",
    description:
      "On Switzerland’s E-ID, I experimented with the newest standards for digital wallets and verifiable credentials. On predictive maintenance, I used homomorphic encryption and decentralised learning so several parties could train one model without sharing their data. Most weeks meant reading papers and specs, then proving an idea in whatever language fit.",
    skills: [
      "Digital identity",
      "Cryptography",
      "Rust",
      "TypeScript",
      "E-ID",
      "Zero-knowledge proofs",
    ],
    tone: "blue",
  },
  {
    title: "Senior Software Engineer",
    company: "Back Market",
    type: "Permanent",
    start: "2019-01" as YearMonth,
    end: "2021-02" as YearMonth,
    location: "Paris, France",
    description:
      "Built cloud-based systems that scaled with one of France’s biggest startups, on AWS and platform-as-a-service infrastructure.",
    skills: ["AWS", "Python", "Django", "PostgreSQL", "Platform as a service"],
    tone: "orange",
  },
] as const satisfies readonly Experience[];

export const projects = [
  {
    name: "archetype-pal",
    description:
      "I’m leading the rewrite of an open-source palaeographic annotation platform — the software researchers use to study and annotate medieval manuscripts.",
    link: "https://github.com/archetype-pal/backend" as Url,
    tags: ["Python", "Django", "Research"],
    tone: "coral",
    cover: "archetype",
    source: "Leading now",
    featured: true,
  },
  {
    name: "E-ID Workshop",
    description:
      "Switzerland’s E-ID, hands on: digital wallets, verifiable credentials and identity standards that respect privacy.",
    link: "https://github.com/c4dt/how-2025-06-eID" as Url,
    tags: ["Digital identity", "Privacy", "Switzerland"],
    tone: "blue",
    cover: "E-ID",
    source: "C4DT · 2025",
    featured: false,
  },
  {
    name: "crypto-wasm-ts",
    description:
      "TypeScript abstractions over a Rust crypto library’s WASM wrapper, for verifiable credentials.",
    link: "https://github.com/docknetwork/crypto-wasm-ts" as Url,
    tags: ["TypeScript", "WASM", "Cryptography"],
    tone: "lavender",
    cover: ".ts",
    source: "github.com/docknetwork",
    featured: false,
  },
  {
    name: "crypto-wasm",
    description: "The WASM wrapper underneath it all, over the cryptographic primitives library.",
    link: "https://github.com/docknetwork/crypto-wasm" as Url,
    tags: ["Rust", "WASM", "Crypto"],
    tone: "teal",
    cover: ".wasm",
    source: "github.com/docknetwork",
    featured: false,
  },
] as const satisfies readonly Project[];

export const domains = [
  {
    id: "identity",
    label: "Digital identity",
    tone: "blue",
    headline: "Proving who you are, without giving yourself away.",
    body: "At EPFL’s Center for Digital Trust I worked on the technology behind Switzerland’s E-ID: digital wallets, verifiable credentials and selective disclosure — reading the specs, then building the proof-of-concept in Rust or TypeScript.",
    skills: ["Verifiable credentials", "Zero-knowledge proofs", "Rust", "WASM"],
    links: [
      {
        label: "E-ID Workshop",
        note: "Wallets and credentials, hands on",
        href: "https://github.com/c4dt/how-2025-06-eID",
        external: true,
      },
      {
        label: "crypto-wasm-ts",
        note: "TypeScript over Rust crypto, for credentials",
        href: "https://github.com/docknetwork/crypto-wasm-ts",
        external: true,
      },
      {
        label: "All projects",
        note: "Everything I’ve built in the open",
        href: "/projects/",
        external: false,
      },
    ],
  },
  {
    id: "climate",
    label: "Climate",
    tone: "teal",
    headline: "Making environmental impact something you can measure.",
    body: "At Resilio I build the accountability platform sustainability professionals use to understand their impact. As a Climatebase Fellow I studied energy, transport and agriculture, worked with ClimateRoboticsNetworks, and started a Sustainable IT working group at EPFL.",
    skills: ["Domain-Driven Design", "Django", "Climate tech", "Sustainable IT"],
    links: [
      {
        label: "Resilio",
        note: "Staff Software Engineer, since Dec 2025",
        href: "https://resilio.tech",
        external: true,
      },
      {
        label: "Climatebase Fellowship",
        note: "Cohort 6, autumn 2024",
        href: "https://climatebase.org",
        external: true,
      },
    ],
  },
  {
    id: "scale",
    label: "Scale and craft",
    tone: "orange",
    headline: "Systems that grow with the business — and rewrites that leave code better.",
    body: "At Back Market I built cloud systems on AWS that scaled with one of France’s biggest startups. Today I’m leading the rewrite of archetype-pal, an open-source platform researchers use to annotate medieval manuscripts.",
    skills: ["AWS", "PostgreSQL", "Terraform", "Kubernetes"],
    links: [
      {
        label: "archetype-pal",
        note: "The rewrite I’m leading",
        href: "https://github.com/archetype-pal/backend",
        external: true,
      },
      {
        label: "github.com/lanterno",
        note: "Everything else I’ve shipped in the open",
        href: "https://github.com/lanterno",
        external: true,
      },
    ],
  },
] as const satisfies readonly Domain[];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "Rust", "JavaScript"],
    tone: "orange",
  },
  {
    category: "Backend and data",
    items: ["Django", "PostgreSQL", "GraphQL", "Celery", "REST APIs"],
    tone: "teal",
  },
  {
    category: "Infrastructure",
    items: ["Docker", "AWS", "GCP", "Terraform", "Kubernetes"],
    tone: "lavender",
  },
  {
    category: "Cryptography and identity",
    items: [
      "Verifiable credentials",
      "Zero-knowledge proofs",
      "Digital signatures",
      "E-ID",
      "Homomorphic encryption",
    ],
    tone: "blue",
  },
] as const satisfies readonly Skill[];

/** The scrolling band on the home page */
export const marqueeSkills = [
  { name: "Python", tone: "teal" },
  { name: "Rust", tone: "blue" },
  { name: "TypeScript", tone: "lavender" },
  { name: "Verifiable credentials", tone: "coral" },
  { name: "Zero-knowledge proofs", tone: "teal" },
  { name: "Django", tone: "blue" },
  { name: "Homomorphic encryption", tone: "lavender" },
  { name: "Domain-Driven Design", tone: "coral" },
  { name: "AWS", tone: "teal" },
  { name: "Terraform", tone: "blue" },
  { name: "Kubernetes", tone: "lavender" },
] as const satisfies readonly { name: string; tone: Tone }[];

export const education = [
  {
    institution: "MITx MicroMasters",
    degree: "Statistics and Data Science",
    from: 2019,
    to: 2023,
    description: "From probability and statistics through data analysis to machine learning.",
  },
  {
    institution: "Mansoura University",
    degree: "B.Eng. Computer Engineering",
    from: 2011,
    to: 2016,
    description: "Where I learned to think in systems and solve real problems with discipline.",
  },
] as const satisfies readonly Education[];

export const certifications = [
  { name: "Climatebase Fellow, cohort 6", org: "Climatebase", year: "2024" },
  { name: "AI Safety, Ethics and Society", org: "Center for AI Safety", year: "2023" },
  { name: "Introduction to Aerospace Engineering", org: "MIT edX", year: "2022" },
] as const satisfies readonly Certification[];

// ============================================================================
// Date Formatting
// ============================================================================

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

interface CalendarMonth {
  readonly year: number;
  /** 1–12 */
  readonly month: number;
}

interface CalendarDay extends CalendarMonth {
  readonly day: number;
}

type Span = Pick<Experience, "start" | "end">;

function isDay(value: IsoDate | YearMonth): value is IsoDate {
  return value.length === 10;
}

/** Works on a day too: "2025-12-07" is in December 2025 */
function toCalendarMonth(value: IsoDate | YearMonth): CalendarMonth {
  return { year: Number(value.slice(0, 4)), month: Number(value.slice(5, 7)) };
}

function toCalendarDay(value: IsoDate): CalendarDay {
  return { ...toCalendarMonth(value), day: Number(value.slice(8, 10)) };
}

function fromDate(date: Date): CalendarDay {
  return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
}

/** Whole months between two days: 7 Dec 2025 to 17 Oct 2026 is 10 */
function completedMonths(from: CalendarDay, to: CalendarDay): number {
  return (to.year - from.year) * 12 + (to.month - from.month) - (to.day < from.day ? 1 : 0);
}

function monthName({ month }: CalendarMonth): string {
  return monthNames[month - 1] ?? "";
}

function plural(count: number, unit: string): string {
  return `${String(count)} ${unit}${count === 1 ? "" : "s"}`;
}

/** Whether the role is still going */
export function isCurrent(span: Span): boolean {
  return span.end === null;
}

/**
 * "Dec 2025 – now", "Sep – Nov 2024" or "Apr 2023 – Apr 2026"
 */
export function formatPeriod(span: Span): string {
  const from = toCalendarMonth(span.start);
  if (span.end === null) {
    return `${monthName(from)} ${String(from.year)} – now`;
  }
  const to = toCalendarMonth(span.end);
  if (from.year === to.year) {
    return `${monthName(from)} – ${monthName(to)} ${String(to.year)}`;
  }
  return `${monthName(from)} ${String(from.year)} – ${monthName(to)} ${String(to.year)}`;
}

/**
 * How many months a role has lasted. A current role that started on a known
 * day counts whole months up to the day the site was built. Otherwise months
 * count inclusively, the way LinkedIn does: September to November is three.
 */
function monthsInRole(span: Span, today: Date): number {
  if (span.end === null && isDay(span.start)) {
    return completedMonths(toCalendarDay(span.start), fromDate(today));
  }
  const from = toCalendarMonth(span.start);
  const to = span.end === null ? fromDate(today) : toCalendarMonth(span.end);
  return (to.year - from.year) * 12 + (to.month - from.month) + 1;
}

/**
 * "10 months" or "3 years 1 month"
 */
export function formatDuration(span: Span, today: Date = new Date()): string {
  const total = monthsInRole(span, today);
  const years = Math.floor(total / 12);
  const months = total % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(plural(years, "year"));
  if (months > 0) parts.push(plural(months, "month"));
  return parts.length > 0 ? parts.join(" ") : "under a month";
}

/**
 * Whole years since my first job started, counted on the day the site was
 * built (the deploy workflow rebuilds it daily)
 */
export function yearsOfExperience(today: Date = new Date()): number {
  return Math.floor(completedMonths(toCalendarDay(careerStart), fromDate(today)) / 12);
}

/**
 * The big year on a chapter: { from: "2023", to: "26" }, { from: "2025", to: "now" },
 * or { from: "2024", to: null } when it started and ended in the same year.
 */
export function yearSpan(from: number, to: number | null): { from: string; to: string | null } {
  if (to === null) return { from: String(from), to: "now" };
  if (to === from) return { from: String(from), to: null };
  return { from: String(from), to: String(to).slice(2) };
}

export function experienceYears(span: Span): { from: string; to: string | null } {
  return yearSpan(
    toCalendarMonth(span.start).year,
    span.end === null ? null : toCalendarMonth(span.end).year
  );
}
