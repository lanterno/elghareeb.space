/**
 * The website's own identity: the one place for its URL, the author's name, the navigation and
 * the social links. The static adapter, the head tags, the shell and the footer all read it.
 */
export const site = {
  url: "https://elghareeb.space",
  author: "Ahmed Elghareeb",
  /** Appears after the page's own title: "Work | Ahmed Elghareeb" */
  titleSuffix: " | Ahmed Elghareeb",
  location: "Renens, Switzerland",
  locale: "en_US",
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
