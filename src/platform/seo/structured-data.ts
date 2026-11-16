/**
 * The schema.org description of a page, for search engines' rich results and for the AI
 * assistants that answer from the page: the site, its author and the page itself, a
 * `BlogPosting` when it is a post, a `ProfilePage` when it is about the author. The author is the
 * same `Person` on every page, so whichever page a crawler reads names the author, the work and
 * the fields. One JSON-LD graph per page.
 */
import { site } from "./site";

/** One step of the trail from the home page to a page below a section */
export interface Crumb {
  name: string;
  /** Absolute URL */
  url: string;
}

/** What the author does and where the author studied, for the pages that say so */
export interface PersonDetails {
  jobTitle: string;
  worksFor: { name: string; url: string };
  /** Schools, by name */
  alumniOf?: readonly string[];
  /** The organisations the author worked at before */
  formerEmployers?: readonly { name: string; url: string }[];
  /** Fellowships and recognitions, as their names */
  awards?: readonly string[];
}

/** An open-source project a page is about */
export interface SoftwareDescription {
  name: string;
  /** Where its code lives */
  codeRepository: string;
  /** What it is built with */
  keywords: readonly string[];
}

export interface PageDescription {
  /** The page's full title */
  title: string;
  description: string;
  /** The page's absolute URL */
  url: string;
  /** A post's own title, without the site name */
  article?: { headline: string; published: string; updated?: string };
  person?: PersonDetails;
  /** The page is about the author: a `ProfilePage` rather than a `WebPage` */
  profile?: boolean;
  software?: SoftwareDescription;
  /** From the home page down to this page; left out for top-level pages */
  breadcrumb?: readonly Crumb[];
  /** The services the author offers, on the page that lists them */
  offers?: readonly Offering[];
  /** Questions the page answers: a `FAQPage` rather than a `WebPage` */
  faq?: readonly Question[];
}

/** One service the author offers */
export interface Offering {
  name: string;
  description: string;
}

/** A question the page answers, in plain text */
export interface Question {
  question: string;
  answer: string;
}

const websiteId = `${site.url}/#website`;
const personId = `${site.url}/#person`;

function offerNode({ name, description }: Offering): object {
  return {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      description,
      serviceType: "Freelance software engineering",
      provider: { "@id": personId },
      areaServed: [
        { "@type": "Country", name: "Switzerland" },
        { "@type": "Place", name: "Europe" },
      ],
      availableLanguage: site.languages,
    },
  };
}

function alumni(person: PersonDetails): object[] {
  return [
    ...(person.alumniOf ?? []).map((name) => ({ "@type": "EducationalOrganization", name })),
    ...(person.formerEmployers ?? []).map((org) => ({ "@type": "Organization", ...org })),
  ];
}

function personNode(
  image: string,
  person: PersonDetails | undefined,
  offers: readonly Offering[] | undefined
): object {
  const address = {
    "@type": "PostalAddress",
    addressLocality: site.home.locality,
    postalCode: site.home.postalCode,
    addressRegion: site.home.region,
    addressCountry: site.home.country,
  };
  return {
    "@type": "Person",
    "@id": personId,
    name: site.author,
    url: site.url,
    image,
    description: `${site.bio} ${site.availability}`,
    knowsAbout: site.knowsAbout,
    knowsLanguage: site.languages.map((name) => ({ "@type": "Language", name })),
    sameAs: [site.social.github.url, site.social.linkedin.url],
    address,
    homeLocation: {
      "@type": "Place",
      name: site.home.locality,
      address,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: site.home.district,
        containedInPlace: { "@type": "AdministrativeArea", name: site.home.region },
      },
    },
    /** The title the author goes by; "developer" is how people search for it */
    hasOccupation: {
      "@type": "Occupation",
      name: "Staff Software Engineer",
      alternateName: ["Software engineer", "Software developer"],
      occupationLocation: [site.home.locality, ...site.home.nearby].map((name) => ({
        "@type": "City",
        name,
      })),
      skills: site.knowsAbout,
    },
    ...(person === undefined
      ? {}
      : {
          jobTitle: person.jobTitle,
          worksFor: { "@type": "Organization", ...person.worksFor },
          ...(alumni(person).length === 0 ? {} : { alumniOf: alumni(person) }),
          ...(person.awards === undefined ? {} : { award: person.awards }),
        }),
    ...(offers === undefined ? {} : { makesOffer: offers.map(offerNode) }),
  };
}

function pageType(profile: boolean | undefined, faq: readonly Question[] | undefined): string {
  if (profile === true) return "ProfilePage";
  return faq === undefined ? "WebPage" : "FAQPage";
}

function pageNode(
  { title, description, url, article, profile, software, breadcrumb, faq }: PageDescription,
  image: string
): object {
  const trail = breadcrumb === undefined ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } };
  if (article !== undefined) {
    return {
      "@type": "BlogPosting",
      "@id": url,
      mainEntityOfPage: url,
      headline: article.headline,
      description,
      image,
      datePublished: article.published,
      dateModified: article.updated ?? article.published,
      author: { "@id": personId },
      publisher: { "@id": personId },
      isPartOf: { "@id": websiteId },
      inLanguage: "en",
      ...trail,
    };
  }
  return {
    "@type": pageType(profile, faq),
    "@id": url,
    url,
    name: title,
    description,
    isPartOf: { "@id": websiteId },
    ...(profile === true ? { mainEntity: { "@id": personId } } : {}),
    about: { "@id": software === undefined ? personId : `${url}#software` },
    ...(faq === undefined
      ? {}
      : {
          mainEntity: faq.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }),
    inLanguage: "en",
    ...trail,
  };
}

function softwareNode(url: string, description: string, software: SoftwareDescription): object {
  return {
    "@type": "SoftwareSourceCode",
    "@id": `${url}#software`,
    name: software.name,
    description,
    codeRepository: software.codeRepository,
    keywords: software.keywords,
    contributor: { "@id": personId },
    subjectOf: { "@id": url },
  };
}

function breadcrumbNode(url: string, crumbs: readonly Crumb[]): object {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function structuredData(page: PageDescription): object {
  const image = new URL(site.ogImage.path, site.url).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.author,
        description: `${site.bio} ${site.availability}`,
        publisher: { "@id": personId },
        inLanguage: "en",
      },
      personNode(image, page.person, page.offers),
      pageNode(page, image),
      ...(page.software === undefined
        ? []
        : [softwareNode(page.url, page.description, page.software)]),
      ...(page.breadcrumb === undefined ? [] : [breadcrumbNode(page.url, page.breadcrumb)]),
    ],
  };
}

/** The graph as the text of a `<script type="application/ld+json">`, safe inside the element */
export function structuredDataScript(description: PageDescription): string {
  return JSON.stringify(structuredData(description)).replaceAll("<", "\\u003c");
}
