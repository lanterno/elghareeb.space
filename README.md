# Ahmed Elghareeb

**Staff Software Engineer at Resilio** · **Climatebase Fellow**

I build software people can trust. At [Resilio](https://resilio.tech) I build climate accountability software. Before that, I spent three years on Switzerland's digital identity at [EPFL's Center for Digital Trust (C4DT)](https://c4dt.epfl.ch).

## About

I'm a software engineer in Renens, Switzerland, drawn to problems where the software has to be right: digital identity, climate and IoT.

At Resilio I lead the platform's architecture. At C4DT I worked on the technology behind Switzerland's E-ID: digital wallets, verifiable credentials and selective disclosure. Beyond code, I care about climate tech and sustainable IT. As a Climatebase Fellow I worked with ClimateRoboticsNetworks and started a working group on Sustainable IT at EPFL.

## Also building

- **[archetype-pal](https://github.com/archetype-pal/backend)**: I'm leading the rewrite of this open-source platform researchers use to annotate medieval manuscripts
- **[LifePete](https://lifepete.com)**, which I founded
- **[Transparium](https://transparium.com)**

## Connect

- **Website**: [elghareeb.space](https://elghareeb.space)
- **GitHub**: [@lanterno](https://github.com/lanterno)
- **LinkedIn**: [ahmedelghareeb](https://linkedin.com/in/ahmedelghareeb)

---

## About This Repository

The source of my site: a static Qwik City build, deployed on every push to `main`.

```bash
bun install   # Bun 1.4.4 or newer, as the deploy pins
bun run dev
```

`bun run build` also type-checks and lints, and it is where the content is validated: a bad date
in a job or a post fails the build and names the field.

`GITHUB_TOKEN` lets the build read my contribution calendar for the home page's GitHub card.
Without it the card links to the profile and leaves out the chart.

### Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and uploads `dist/` to the Cloudflare
Worker `personal-site` (`wrangler.jsonc`), which serves the domain. It needs the repository secret
`CLOUDFLARE_API_TOKEN`, a token with Workers Scripts, Workers Routes and DNS edit on this account
and zone. Nothing rebuilds between pushes, so the computed dates, the conferences, scheduled posts
and the GitHub card are as current as the last push; run the workflow by hand from the Actions tab
to refresh them. After a local `bun run build`, `bunx wrangler deploy` does the same from a machine
that has run `wrangler login`.

### Analytics

Page views come from Cloudflare Web Analytics, injected at the edge, nothing in the code. A few
interactions (clicks on links to other sites, the closing call, how far a post is read) are
reported by `src/platform/analytics/EventBeacon.tsx` to `worker/index.ts`, which stores them in the
Analytics Engine dataset `site_events` without anything that identifies a visitor.
[elghareeb.space/stats](https://elghareeb.space/stats) shows them, behind a password. It needs two
Worker secrets, set once from a machine that has run `wrangler login`:

```bash
bunx wrangler secret put STATS_PASSWORD      # whatever you'll type into the browser's prompt
bunx wrangler secret put CF_ANALYTICS_TOKEN  # an API token with Account Analytics: Read
```

- [Architecture](docs/ARCHITECTURE.md): the layers, the module template and the decisions behind them
- [Writing a post](docs/WRITING.md)
- [Roadmap](docs/ROADMAP.md): what is still open

## License

MIT
