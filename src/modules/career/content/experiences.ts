import type { Experience } from "../model";

/** The day my first job started; years of experience count from here */
export const careerStart = "2014-07-15";

/** Most recent first */
export const experiences = [
  {
    org: "resilio",
    title: "Staff Software Engineer",
    type: "Full-time",
    start: "2025-12-07",
    end: null,
    location: "Renens, Switzerland",
    description:
      "Building an environmental accountability platform that helps sustainability professionals analyse and understand their impact. The domain is complex, so the code follows it: Domain-Driven Design on modern Python.",
    skills: ["Domain-Driven Design", "Django", "REST Framework", "Python", "Sustainability tech"],
  },
  {
    org: "climatebase",
    title: "Climate Fellow, cohort 6",
    type: "Fellowship",
    start: "2024-09",
    end: "2024-11",
    location: "Remote",
    description:
      "Studied the climate side of energy, transportation and agriculture, worked with the non-profit ClimateRoboticsNetworks, and started a working group on Sustainable IT at EPFL, sponsored by its Research Software Engineering community.",
    skills: ["Climate tech", "Sustainability", "Energy", "Transportation", "Agriculture"],
  },
  {
    org: "c4dt",
    title: "Research Software Engineer, Digital Identities",
    type: "Full-time",
    start: "2023-04",
    end: "2026-04",
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
  },
  {
    org: "backMarket",
    title: "Senior Software Engineer",
    type: "Permanent",
    start: "2019-01",
    end: "2021-02",
    location: "Paris, France",
    description:
      "Built cloud-based systems that scaled with one of France’s biggest startups, on AWS and platform-as-a-service infrastructure.",
    skills: ["AWS", "Python", "Django", "PostgreSQL", "Platform as a service"],
  },
] as const satisfies readonly Experience[];
