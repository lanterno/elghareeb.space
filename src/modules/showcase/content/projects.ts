import type { Project, ProjectGroup } from "../model";

export const projects = [
  {
    slug: "archetype-pal",
    name: "archetype-pal",
    description:
      "I’m leading the rewrite of an open-source palaeographic annotation platform — the software researchers use to study and annotate medieval manuscripts.",
    link: "https://github.com/archetype-pal/backend",
    tags: ["Python", "Django", "Research"],
    tone: "coral",
    cover: "archetype",
    source: "Leading now",
    group: "featured",
    story: {
      role: "Leading the rewrite, since July 2024",
      stack: [
        "Python",
        "Django",
        "Django REST Framework",
        "Celery",
        "PostgreSQL",
        "Meilisearch",
        "IIIF",
        "TypeScript",
        "Docker",
      ],
      chapters: [
        {
          title: "What it is for",
          paragraphs: [
            "Palaeography is the study of historical handwriting. Archetype lets a researcher record what they see in a manuscript hand — the shape of an a, the way a stroke was made — and turn those observations into evidence they can search, compare and cite, anchored to the image of the page. It is open software: any project can run it over its own manuscripts.",
            "The corpus it is proving itself on is Models of Authority, Scottish charters from 1100 to 1250: 710 charters, some 3,000 page images and 12,700 annotated letter-forms, live in public beta.",
          ],
        },
        {
          title: "Why a rewrite",
          paragraphs: [
            "Archetype grew out of DigiPal, a framework built at King’s College London more than a decade ago. The research it made possible was real; the software had reached the end of what it could be maintained into. Version 3, in development since 2024, keeps the ideas and starts the code again: a Django and Django REST Framework API with Celery for the slow work, PostgreSQL, Meilisearch for search, a IIIF image server, and a TypeScript frontend, all run with Docker so an institution can host its own.",
            "It speaks the standards the field already uses: IIIF for images, TEI for transcriptions and W3C Web Annotations for what researchers mark on a page.",
          ],
        },
        {
          title: "My part",
          paragraphs: [
            "I lead the engineering and have written most of the backend and the frontend, along with the infrastructure that deploys the beta. The day-to-day is what you would expect of a small open-source team with research deadlines: shaping the API and the search contract with the people who use them, keeping the test suite and the CI honest, and leaving documentation behind for the next contributor. Version 3 is supported by the University of Glasgow’s OG(H)AM project and the École Pratique des Hautes Études.",
          ],
        },
      ],
      links: [
        {
          label: "Try the live corpus",
          note: "Models of Authority, in public beta",
          href: "https://beta.archetype-pal.ink",
        },
        {
          label: "archetype-pal.ink",
          note: "The project’s site: what it does, how to run it",
          href: "https://archetype-pal.ink",
        },
        {
          label: "Backend",
          note: "The API and services, on GitHub",
          href: "https://github.com/archetype-pal/backend",
        },
        {
          label: "Frontend",
          note: "The research interface, on GitHub",
          href: "https://github.com/archetype-pal/frontend",
        },
        {
          label: "DigiPal",
          note: "The framework Version 3 rewrites",
          href: "https://github.com/kcl-ddh/digipal",
        },
      ],
    },
  },
  {
    slug: "eid-workshop",
    name: "E-ID Workshop",
    description:
      "Switzerland’s E-ID, hands on: digital wallets, verifiable credentials and identity standards that respect privacy.",
    link: "https://github.com/c4dt/how-2025-06-eID",
    tags: ["Digital identity", "Privacy", "Switzerland"],
    tone: "blue",
    cover: "E-ID",
    source: "C4DT · 2025",
    group: "identity",
    story: {
      role: "With the E-ID team at C4DT · June 2025",
      stack: ["Jupyter", "Swiyu", "BBS signatures", "ECDSA", "Zero-knowledge proofs"],
      chapters: [
        {
          title: "A day with the partners",
          paragraphs: [
            "On 26 June 2025 the Center for Digital Trust ran a hands-on workshop on electronic identity for its partners. The morning, presented by Dr. Imad Aad, laid out the landscape: what the Swiss law on the E-ID requires, how those requirements map onto trust and threat models, and which cryptographic protocols can deliver them. This repository holds the afternoon: two Jupyter notebooks anyone can run with Docker or DevBox.",
          ],
        },
        {
          title: "Two notebooks",
          paragraphs: [
            "The first walks through Swiyu, the Swiss government’s test environment for the E-ID: how it works, how C4DT’s taxonomy describes it, and where its current limits are.",
            "The second looks past it, at two properties the next E-ID will need. Holder binding, so a credential can only be presented by the person it was issued to. Unlinkability, so two presentations cannot be tied to the same person. Building on Cloudflare’s ZKAttest, Ubique’s SHIELDS and Dock’s crypto library, it shows how an ECDSA signature can be proved alongside a BBS signature without being revealed.",
          ],
        },
        {
          title: "Why it is here",
          paragraphs: [
            "This is what my three years on digital identity at C4DT were about: reading the specs and the papers, then proving that an idea holds in running code. The two crypto libraries below are the same thread, pulled further down.",
          ],
        },
      ],
      links: [
        {
          label: "The workshop",
          note: "Both notebooks and how to run them, on GitHub",
          href: "https://github.com/c4dt/how-2025-06-eID",
        },
        {
          label: "Taxonomy 101",
          note: "C4DT’s vocabulary for E-ID privacy",
          href: "https://eid-privacy.github.io/wp1/2025/06/10/taxonomy-101.html",
        },
        {
          label: "crypto-wasm-ts",
          note: "The TypeScript library the proofs lean on",
          href: "/projects/crypto-wasm-ts/",
        },
      ],
    },
  },
  {
    slug: "crypto-wasm-ts",
    name: "crypto-wasm-ts",
    description:
      "TypeScript abstractions over a Rust crypto library’s WASM wrapper, for verifiable credentials.",
    link: "https://github.com/docknetwork/crypto-wasm-ts",
    tags: ["TypeScript", "WASM", "Cryptography"],
    tone: "lavender",
    cover: ".ts",
    source: "github.com/docknetwork",
    group: "identity",
    story: {
      role: "Contributor, 2024 – 2025",
      stack: ["TypeScript", "WebAssembly", "BBS+", "Accumulators", "Composite proofs"],
      chapters: [
        {
          title: "What it is",
          paragraphs: [
            "Dock Labs’ crypto library, written in Rust, implements the primitives anonymous credentials are built from. BBS and BBS+ signatures sign a list of messages and let the holder prove the signature while revealing only some of them. Accumulators are a constant-size set with membership proofs. A composite proof system combines them with range proofs, verifiable encryption and predicates written in Circom.",
            "crypto-wasm-ts is the TypeScript layer over all of that: classes and types a web or Node developer can use without touching the WebAssembly calls underneath.",
          ],
        },
        {
          title: "What I did",
          paragraphs: [
            "I came to it as a user, building verifiable-credential proofs of concept at C4DT, and started where users notice the gaps: the documentation. I rewrote the examples for selective disclosure and composite proofs so they match what the code does, drew the line between BBS and BBS+ where the README blurred it, and fixed a missing export for the in-memory accumulators.",
            "In 2025 the work moved to keeping the library current: bringing in each new release of crypto-wasm, updating the typings where the Rust side had changed, dropping support for old presentation formats, and modernising the build and the CI matrix.",
          ],
        },
      ],
      links: [
        {
          label: "crypto-wasm-ts",
          note: "The library, on GitHub",
          href: "https://github.com/docknetwork/crypto-wasm-ts",
        },
        {
          label: "@docknetwork/crypto-wasm-ts",
          note: "On npm",
          href: "https://www.npmjs.com/package/@docknetwork/crypto-wasm-ts",
        },
        {
          label: "Dock’s crypto library",
          note: "The Rust underneath, on GitHub",
          href: "https://github.com/docknetwork/crypto",
        },
        {
          label: "crypto-wasm",
          note: "The WASM wrapper in between",
          href: "/projects/crypto-wasm/",
        },
      ],
    },
  },
  {
    slug: "crypto-wasm",
    name: "crypto-wasm",
    description: "The WASM wrapper underneath it all, over the cryptographic primitives library.",
    link: "https://github.com/docknetwork/crypto-wasm",
    tags: ["Rust", "WASM", "Crypto"],
    tone: "teal",
    cover: ".wasm",
    source: "github.com/docknetwork",
    group: "identity",
    story: {
      role: "Contributor, 2025",
      stack: ["Rust", "WebAssembly", "wasm-pack", "arkworks", "BBS+"],
      chapters: [
        {
          title: "What it is",
          paragraphs: [
            "The thin layer between Dock’s Rust crypto library and JavaScript: wasm-pack compiles the Rust to WebAssembly, and this crate exposes free-standing functions for BBS+ signatures, accumulators and the composite proof system. Everything crypto-wasm-ts offers runs through here.",
          ],
        },
        {
          title: "What I did",
          paragraphs: [
            "A library like this ages at the speed of its dependencies. In 2025 I brought it up to date: moving the Dock crypto crates and arkworks to their current versions and re-typing the accumulator, bound-check and composite proof modules to match, updating the threshold signature protocol to name its hash functions explicitly, pinning the Rust toolchain, installing wasm-pack directly in CI so builds stopped picking up an old version, and moving the JavaScript side to Yarn 4 with Node 22 and 24 in the matrix.",
            "Those changes shipped as versions 0.34 and 0.35, which crypto-wasm-ts then adopted.",
          ],
        },
      ],
      links: [
        {
          label: "crypto-wasm",
          note: "The wrapper, on GitHub",
          href: "https://github.com/docknetwork/crypto-wasm",
        },
        {
          label: "Dock’s crypto library",
          note: "The Rust underneath, on GitHub",
          href: "https://github.com/docknetwork/crypto",
        },
        {
          label: "crypto-wasm-ts",
          note: "The TypeScript layer on top",
          href: "/projects/crypto-wasm-ts/",
        },
      ],
    },
  },
] as const satisfies readonly Project[];

/** The rows under the featured card, in page order */
export const projectGroups = [
  {
    id: "identity",
    title: "The identity trilogy.",
    lede: "From the cryptographic primitives up to a workshop anyone can follow.",
  },
] as const satisfies readonly ProjectGroup[];

/** The page's opening line. It counts the projects above, so keep it in step when adding one. */
export const projectsIntro =
  "Three of these four answer one question: how do you prove who you are without giving yourself away? The fourth helps historians read the Middle Ages.";
