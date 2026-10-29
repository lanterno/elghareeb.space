import { formatMonth } from "~/platform/kernel";

import { experiences } from "./experiences";
import { organizations } from "./organizations";

import type { FieldOfWork } from "../model";

const current = experiences.find((experience) => experience.end === null) ?? experiences[0];

/** The three worlds on the Work page, in tab order */
export const fields = [
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
      },
      {
        label: "crypto-wasm-ts",
        note: "TypeScript over Rust crypto, for credentials",
        href: "https://github.com/docknetwork/crypto-wasm-ts",
      },
      {
        label: "All projects",
        note: "Everything I’ve built in the open",
        href: "/projects/",
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
        label: organizations[current.org].name,
        note: `${current.title}, since ${formatMonth(current.start)}`,
        href: organizations[current.org].url,
      },
      {
        label: "Climatebase Fellowship",
        note: "Cohort 6, autumn 2024",
        href: organizations.climatebase.url,
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
      },
      {
        label: "github.com/lanterno",
        note: "Everything else I’ve shipped in the open",
        href: "https://github.com/lanterno",
      },
    ],
  },
] as const satisfies readonly FieldOfWork[];
