# elghareeb.space

Personal portfolio website for Ahmed Elghareeb, built with [Qwik](https://qwik.dev) and [Qwik City](https://qwik.dev/docs/qwikcity/).

## Quick Start

```bash
# Install dependencies (requires Bun >= 1.1.0)
bun install

# Start development server
bun run dev

# Type check
bun run typecheck

# Lint code
bun run lint

# Lint and auto-fix
bun run lint:fix

# Format code
bun run fmt

# Build for production (static)
bun run build

# Build for Bun server
bun run build.bun

# Preview production build
bun run preview

# Clean build artifacts
bun run clean

# Check for outdated packages
bun run update
```

## Tech Stack

- **Runtime**: [Bun](https://bun.sh) >= 1.1.0
- **Framework**: [Qwik](https://qwik.dev) ^1.13.0 - Resumable framework for instant loading
- **Routing**: [Qwik City](https://qwik.dev/docs/qwikcity/) - File-based routing
- **Build Tool**: [Vite](https://vitejs.dev) ^6.0.0
- **Styling**: [Tailwind CSS](https://tailwindcss.com) ^4.1.0 - Utility-first CSS with native CSS features
- **Type Safety**: [TypeScript](https://www.typescriptlang.org) 5.7+ with strict configuration
- **Validation**: [Valibot](https://valibot.dev) - Type-safe runtime validation
- **Linting**: [ESLint](https://eslint.org) ^9.17.0 with typescript-eslint flat config
- **PWA**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) - Service worker and offline support
- **Fonts**: Sora, Instrument Serif, JetBrains Mono

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── icons/        # SVG icon components
│   └── router-head/  # Document head component
├── data/             # Portfolio data with Valibot schemas
│   └── portfolio.ts  # Experiences, projects, skills data
├── routes/           # File-based routing
│   ├── index.tsx     # Homepage
│   └── layout.tsx    # Root layout
├── env.ts            # Type-safe environment handling
├── global.css        # Global styles with Tailwind @theme
└── root.tsx          # App entry point
adapters/
├── static/           # Static site generation adapter
└── bun/              # Bun server adapter
public/
├── hero.jpg          # Profile image
├── favicon.svg       # Favicon
├── manifest.json     # PWA manifest
└── robots.txt        # Search engine directives
```

## Features

- **Performance First**: Qwik's resumability for instant loading
- **Type Safety**: Strict TypeScript with branded types and Valibot validation
- **Modern Build**: Vite 6 with optimized chunking and caching
- **PWA Ready**: Service worker with offline caching for fonts and assets
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, structured data
- **Responsive Design**: Modern aesthetics with smooth animations
- **Developer Experience**: ESLint flat config, import sorting, auto-formatting

## TypeScript Features

This project uses advanced TypeScript patterns:

- **Branded Types**: Type-safe URLs, date ranges, and color classes
- **Valibot Schemas**: Runtime validation with compile-time type inference
- **`satisfies` Operator**: Type-safe data validation without losing literal types
- **Strict Configuration**: All strict flags enabled including `exactOptionalPropertyTypes`

## Deployment

### Static Site (GitHub Pages, Netlify, etc.)

```bash
bun run build
# Deploy contents of dist/
```

### Bun Server

```bash
bun run build.bun
# Run the generated server
```

## License

MIT
