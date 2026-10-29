# Development Guide

## Prerequisites

- [Bun](https://bun.sh) 1.4.4 or newer (the deploy uses 1.4.4)

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

The site will be available at `http://localhost:5173`.

## Available Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `bun run dev`       | Start development server with hot reload |
| `bun run build`     | Build for production (static site)       |
| `bun run preview`   | Preview production build locally         |
| `bun run typecheck` | Run TypeScript type checking             |
| `bun run lint`      | Lint code with ESLint                    |
| `bun run lint:fix`  | Lint and auto-fix issues                 |
| `bun run fmt`       | Format code with Prettier                |
| `bun run clean`     | Remove build artifacts                   |
| `bun run update`    | Check for outdated packages              |

## Project Structure

The code is organised by subdomain — see [ARCHITECTURE.md](ARCHITECTURE.md) for the rules.

```
src/
├── app/               # Composition root: the only place where modules meet
│   ├── routes/        #   Qwik City routes — one-line re-exports, nothing else
│   ├── pages/         #   Home, About and 404, composed from the modules' public APIs
│   └── shell/         #   Site layout, Navbar, Footer, RouterHead
├── modules/           # One folder per subdomain: model, content, queries, ui, pages, tests
│   ├── career/        #   Organisations, experiences, fields of work, conferences — /work/
│   ├── showcase/      #   Open-source projects — /projects/
│   ├── activity/      #   GitHub contributions — the card on the home page
│   └── blog/          #   Markdown posts in posts/<slug>/ — /blog/, /blog/<slug>/, rss.xml
├── platform/          # Shared ground with no domain knowledge
│   ├── kernel/        #   Dates, Period, Tone, Valibot building blocks (tested)
│   ├── design/        #   Tokens, tone context, motion, utilities (CSS)
│   ├── ui/            #   Button, Chip, PageHeader, ClosingScene, icons…
│   ├── scenery/       #   Hills, clouds and the hero drawings
│   ├── seo/           #   Site identity and pageHead()
│   └── build/         #   Vite build helpers
├── media/             # Source images (served through Qwik's ?jsx imports)
├── root.tsx           # Qwik entry points — the framework expects them here
└── entry.ssr.tsx

adapters/static/       # Static site generation
public/                # Static assets (favicon, link preview card, robots.txt)
```

### Adding content

- A new job or organisation: `src/modules/career/content/`. Organisations are a registry; every
  other record points at one by id.
- A new project: `src/modules/showcase/content/projects.ts`.
- A blog post: copy `src/modules/blog/posts/_template` — see [WRITING.md](WRITING.md).
- Content is checked against its model during the build, so a mistyped date or URL fails
  `bun run build` with a message naming the field.

### Adding a subdomain

Copy the shape of an existing module (`index.ts`, `model.ts`, `content/`, `queries.ts`, `ui/`,
`pages/`, a test), add its route files under `src/app/routes/` as one-line re-exports, and add a
nav entry in `src/platform/seo/site.ts` if it gets a page.

## Tests

```bash
bun test
```

Tests sit beside the code they cover (`*.test.ts`): the kernel's date maths, each module's
content rules and queries, and the GitHub adapter's mapping.

## Building for Production

Generates a fully static site:

```bash
bun run build
```

Output: `dist/` directory containing HTML, CSS, JS, and assets.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages on every push to `main`. It also rebuilds daily, so the years of experience, the current role's length, the conferences and the GitHub card stay current.

## Environment Variables

`GITHUB_TOKEN` lets the build read the contribution calendar for the home page's GitHub card.
Without it the card links to the profile and leaves out the chart.

## Troubleshooting

### CSS not loading in development

The global stylesheet (`src/platform/design/global.css`) is injected with Qwik's `useStyles$`. If styles don't appear:

1. Clear Vite cache: `bun run clean`
2. Restart dev server: `bun run dev`

### TypeScript errors

Run type checking to identify issues:

```bash
bun run typecheck
```

### Build failures

Reinstall the dependencies from the lockfile, the way the deploy does:

```bash
rm -rf node_modules
bun install --frozen-lockfile
```
