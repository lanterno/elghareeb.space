# Development Guide

## Prerequisites

- [Bun](https://bun.sh) >= 1.1.0

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

public/               # Static assets (images, manifest, favicon)
```

## Building for Production

### Static Site (Recommended)

Generates a fully static site, perfect for GitHub Pages, Netlify, Vercel, or any static host.

```bash
bun run build
```

Output: `dist/` directory containing HTML, CSS, JS, and assets.

## Deployment

### GitHub Pages

1. Build the site: `bun run build`
2. Deploy the `dist/` folder to GitHub Pages
3. Or use GitHub Actions for automatic deployment

### Netlify / Vercel

Both platforms auto-detect the build command. Set:
- **Build command**: `bun run build`
- **Output directory**: `dist`

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

Ensure all dependencies are installed and up to date:

```bash
rm -rf node_modules bun.lock
bun install
```

