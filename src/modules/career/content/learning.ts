import type { Certification, Education } from "../model";

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
