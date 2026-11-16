/**
 * The website's own identity: the one place for its URL, the author's name, the navigation and
 * the social links. The static adapter, the head tags, the shell and the footer all read it.
 */
export const site = {
  url: "https://elghareeb.space",
  author: "Ahmed Elghareeb",
  /** Appears after the page's own title: "Work | Ahmed Elghareeb" */
  titleSuffix: " | Ahmed Elghareeb",
  /** Shown in the footer */
  location: "Chavannes-près-Renens, Switzerland",
  /**
   * Where the author lives, for the structured data. `nearby` are the towns next door that people
   * search for; they are named only to machines (the structured data and /llms.txt), never on
   * the page.
   */
  home: {
    locality: "Chavannes-près-Renens",
    postalCode: "1022",
    district: "District de l’Ouest lausannois",
    region: "Vaud",
    country: "CH",
    nearby: ["Renens", "Lausanne"],
  },
  locale: "en_US",
  /** One sentence on the author, for the structured data and /llms.txt */
  bio: "Staff Software Engineer in Chavannes-près-Renens, next to Renens and Lausanne, Switzerland, drawn to problems where the software has to be right: digital identity, climate and IoT.",
  /** Said wherever the author is introduced to machines, and shown on the Work with me page */
  availability: "Available for freelance and contract work.",
  /** The languages the author works in */
  languages: ["English", "French", "Arabic"],
  /**
   * The fields the author works in, as search engines and AI assistants should know them: the
   * words people use when they ask for someone who knows them. Each is shown on the site.
   */
  knowsAbout: [
    "Digital identity",
    "Swiss E-ID",
    "Verifiable credentials",
    "Digital wallets",
    "Selective disclosure",
    "Zero-knowledge proofs",
    "Applied cryptography",
    "Homomorphic encryption",
    "Climate accountability software",
    "Climate tech",
    "Sustainable IT",
    "Internet of Things",
    "Software architecture",
    "Domain-Driven Design",
    "Backend development",
    "Python",
    "Django",
    "TypeScript",
    "Rust",
    "Research software engineering",
    "AI-assisted software development",
  ],
  /** The link-preview card, 1200 × 630, in public/ */
  ogImage: {
    path: "/og.jpg",
    width: 1200,
    height: 630,
    alt: "Ahmed Elghareeb beside the line “I build software people can trust.”",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work/" },
    { label: "Projects", href: "/projects/" },
    { label: "About", href: "/about/" },
    { label: "Blog", href: "/blog/" },
  ],
  social: {
    github: { login: "lanterno", url: "https://github.com/lanterno" },
    linkedin: { url: "https://linkedin.com/in/ahmedelghareeb" },
  },
} as const;

export type NavItem = (typeof site.nav)[number];
