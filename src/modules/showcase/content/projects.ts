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
