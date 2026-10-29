import type { SkillGroup, SkillHighlight } from "../model";

/** The toolkit on the About page */
export const skillGroups = [
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
] as const satisfies readonly SkillGroup[];

/** The scrolling band on the home page; the tones are decorative and simply cycle */
export const skillHighlights = [
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
] as const satisfies readonly SkillHighlight[];
