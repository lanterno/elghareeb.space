# Development

Scripts are in `package.json`. Two are not what they look like: `bun run build` also type-checks and
lints (Qwik's build does), and `bun run preview` serves the built `dist/` statically rather than
rendering on the fly, so 404s and trailing slashes behave as deployed.

The deploy pins Bun 1.4.4; use that or newer.

## Checks

CI (`.github/workflows/ci.yml`) runs on every pull request. The same, locally:

```bash
bun run fmt.check && bun run lint && bun run typecheck && bun test && bun run build
```

The build is also where the content validation runs, so a bad date in a job or a post only fails
there. Tests sit beside the code they cover as `*.test.ts`.

## Environment

`GITHUB_TOKEN` lets the build read the contribution calendar for the home page's GitHub card.
Without it the card links to the profile and leaves out the chart.

## Deployment

Two pipelines deploy on every push to `main`:

- **GitHub Pages** (`.github/workflows/deploy.yml`) publishes `dist/` and also rebuilds daily, which
  is what keeps the dates, the conferences, scheduled posts and the GitHub card current. **The
  domain points here.**
- **Cloudflare Workers.** The repository is connected to the Worker `personal-site` through Workers
  Builds, which runs `bun run build` then `bunx wrangler deploy`, uploading `dist/` as static assets
  per `wrangler.jsonc`. It needs a build token selected in the Worker's build settings on the
  Cloudflare dashboard, and it has no daily rebuild.

Keeping one is an open decision; see [ROADMAP.md](ROADMAP.md).
