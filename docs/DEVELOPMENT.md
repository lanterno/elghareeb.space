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
├── env.ts            # Type-safe environment variables
├── global.css        # Global styles and Tailwind theme
└── root.tsx          # Application entry point

adapters/
├── static/           # Static site generation
└── bun/              # Bun server adapter

public/               # Static assets (images, manifest, favicon)
```

## Building for Production

### Static Site (Recommended)

Generates a fully static site, perfect for GitHub Pages, Netlify, Vercel, or any static host.

```bash
bun run build
```

Output: `dist/` directory containing HTML, CSS, JS, and assets.

### Bun Server

For server-side rendering with Bun runtime:

```bash
bun run build.bun
```

## Deployment

### GitHub Pages

1. Build the site: `bun run build`
2. Deploy the `dist/` folder to GitHub Pages
3. Or use GitHub Actions for automatic deployment

### Netlify / Vercel

Both platforms auto-detect the build command. Set:
- **Build command**: `bun run build`
- **Output directory**: `dist`

### Self-Hosted (Bun)

```bash
bun run build.bun
# Run the generated server bundle
bun run server/entry.bun.js
```

## Environment Variables

Create a `.env` file for local development:

```env
PUBLIC_SITE_URL=https://elghareeb.space
NODE_ENV=development
DEBUG=false
```

See `src/env.ts` for the full schema and validation.

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

