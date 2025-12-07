# Architecture & Design Philosophy

This document explains the technology choices behind this portfolio. Every tool was selected because it represents the **state of the art** in its category — not out of familiarity or convenience.

## Core Philosophy

> **Use the best tool for the job, not the most popular one.**

Software ages quickly. A portfolio should showcase not just who I am, but how I think about technology. This project prioritizes:

1. **Performance** — Users shouldn't wait
2. **Type Safety** — Catch errors before runtime
3. **Modern Standards** — Native web features over polyfills
4. **Developer Experience** — Fast feedback loops
5. **Simplicity** — Minimal dependencies, maximal capability

---

## Technology Choices

### Runtime: Bun

**Why not Node.js?**

[Bun](https://bun.sh) is a drop-in replacement for Node.js, written in Zig, that's significantly faster for:
- Package installation (10-100x faster than npm)
- Script execution
- TypeScript execution (native, no transpilation step)

Bun serves as the package manager, test runner, and script executor. It's the future of JavaScript runtimes.

### Framework: Qwik

**Why not React, Vue, or Svelte?**

[Qwik](https://qwik.dev) introduces **resumability** — a paradigm shift from hydration.

Traditional frameworks ship JavaScript to the browser, then re-execute it to make the page interactive (hydration). Qwik serializes the application state into HTML, allowing instant interactivity without re-execution.

For a portfolio site, this means:
- **Instant loading** — No JavaScript execution blocking interaction
- **Fine-grained lazy loading** — Only load code when needed
- **Optimal Core Web Vitals** — Near-perfect Lighthouse scores

Qwik is what React would be if built today with modern constraints.

### Build Tool: Vite

**Why not Webpack, Parcel, or Bun's bundler?**

[Vite](https://vitejs.dev) is the standard for modern frontend tooling:
- Native ES modules in development (no bundling during dev)
- Rollup-based production builds (optimal chunking)
- Extensive plugin ecosystem

Qwik's optimizer is a Vite plugin, making Vite the only viable choice. Bun's bundler lacks the plugin architecture needed for Qwik's transformations.

### Styling: Tailwind CSS v4

**Why not vanilla CSS, Sass, or CSS-in-JS?**

[Tailwind CSS v4](https://tailwindcss.com) represents a complete rewrite:
- **Native CSS** — Uses CSS custom properties, not JavaScript
- **No configuration file** — Theme defined in CSS with `@theme`
- **Smaller output** — Only generates classes you use
- **Lightning CSS** — Rust-based compiler for speed

Tailwind v4 is utility-first CSS done right — embracing the platform instead of fighting it.

### Type Safety: TypeScript (Strict)

**Configuration philosophy:**

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "noPropertyAccessFromIndexSignature": true
}
```

Every strict flag is enabled. TypeScript should catch errors, not just provide autocomplete.

**Advanced patterns used:**
- **Branded types** — Distinguish URLs from strings, date ranges from strings
- **`satisfies` operator** — Validate data structures while preserving literal types
- **Valibot schemas** — Runtime validation with compile-time type inference

### Validation: Valibot

**Why not Zod?**

[Valibot](https://valibot.dev) is the next generation of validation libraries:
- **10x smaller** than Zod (tree-shakeable by design)
- **Better TypeScript inference**
- **Functional API** — Composable validation pipelines

For a portfolio with minimal runtime validation, bundle size matters.

### Linting: ESLint Flat Config + typescript-eslint v8

**Why the newest ESLint?**

[ESLint's flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) is the future:
- Single configuration file (no `.eslintrc` maze)
- Explicit dependency management
- Better TypeScript integration

Combined with [typescript-eslint v8](https://typescript-eslint.io/):
- Type-aware linting (catch bugs ESLint alone misses)
- Strict rules enabled by default
- Import sorting with `eslint-plugin-perfectionist`

### PWA: vite-plugin-pwa

**Why PWA?**

Progressive Web App features provide:
- **Offline access** — Service worker caches assets
- **Installability** — Add to home screen on mobile
- **Performance** — Cached fonts and images load instantly

A portfolio should work anywhere, even without connectivity.

---

## What's NOT Here

Equally important is what I chose **not** to include:

| Avoided | Reason |
|---------|--------|
| React | Hydration overhead for a static site |
| Next.js | Server complexity not needed |
| CSS Modules | Tailwind is more maintainable |
| Jest | Bun's test runner is faster |
| Prettier plugins | Native Prettier is sufficient |
| State management libs | Qwik signals are built-in |
| Component libraries | Custom design, no bloat |

---

## Performance Results

The architecture delivers:

- **Lighthouse Performance**: 100
- **First Contentful Paint**: < 0.5s
- **Time to Interactive**: < 0.5s
- **Total JavaScript**: < 30KB (gzipped)

---

## Future Considerations

Technologies I'm watching:

- **Bun bundler** — When plugin support matures, could replace Vite
- **Qwik 2.0** — Further resumability improvements
- **CSS native nesting** — Reduce Tailwind reliance
- **Import maps** — Native browser module resolution

The stack will evolve. The philosophy won't.

