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

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run build` | Build for production (static site) |
| `bun run preview` | Preview production build locally |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run lint` | Lint code with ESLint |
| `bun run lint:fix` | Lint and auto-fix issues |
| `bun run fmt` | Format code with Prettier |
| `bun run clean` | Remove build artifacts |
| `bun run update` | Check for outdated packages |

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── icons/        # SVG icon components
│   └── router-head/  # Document head management
├── data/             # Portfolio data (experiences, projects, skills)
├── routes/           # File-based routing (Qwik City)
├── global.css        # Global styles and Tailwind theme
└── root.tsx          # Application entry point

adapters/
└── static/           # Static site generation

public/               # Static assets (favicon, link preview card, robots.txt)
```

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

The project uses Qwik's `useStyles$` for CSS injection. If styles don't appear:

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

