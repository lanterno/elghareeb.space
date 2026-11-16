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
and zone. Nothing rebuilds between pushes. The dates that would go stale (years of experience, the
current role's duration, the conference balloons) are recounted by the Worker on each request;
scheduled posts and the GitHub card are as current as the last push, so run the workflow by hand
from the Actions tab to refresh them. After a local `bun run build`, `bunx wrangler deploy` does the same from a machine
that has run `wrangler login`.

### Analytics

Page views are measured by Cloudflare Web Analytics, injected at the edge, nothing in the code. A
few interactions (clicks on links to other sites, the closing call, how far a post is read) are
reported by `src/platform/analytics/EventBeacon.tsx` to `worker/index.ts`, which stores them in the
Analytics Engine dataset `site_events` without anything that identifies a visitor.
[elghareeb.space/stats](https://elghareeb.space/stats) puts both on one page, behind a password:
traffic, pages, referrers, devices and Core Web Vitals through the GraphQL Analytics API
(`worker/traffic.ts`, which the account's plan caps at 32 days back), and the interactions through
the Analytics Engine SQL API. The Web Analytics site tag is `WEB_ANALYTICS_SITE` in
`wrangler.jsonc`; the page needs two Worker secrets, set once from a machine that has run
`wrangler login`:

```bash
bunx wrangler secret put STATS_PASSWORD      # whatever you'll type into the browser's prompt
bunx wrangler secret put CF_ANALYTICS_TOKEN  # an API token with Account Analytics: Read
```

### Search engines and AI assistants

Every page carries its title, description, canonical link, Open Graph card and one JSON-LD graph
(`src/platform/seo`). I am the same `Person` on every page: where I live, the languages I work in,
the fields I work in (`site.knowsAbout`) and that I take freelance work (`site.availability`). The
About page is a `ProfilePage`; [Work with me](https://elghareeb.space/work-with-me/)
(`src/modules/services`) lists the services as offers and its questions as a `FAQPage`; a
project's page describes its code as `SoftwareSourceCode`; pages below a section carry a
breadcrumb.

For AI assistants and agents, three files are built from the same records as the pages:
`/llms.txt` sums the site up, `/llms-full.txt` holds every page and post in full as markdown
(`src/app/pages/llms`), and `/resume.json` is the CV in the JSON Resume format
(`src/app/pages/resume`). `robots.txt` welcomes search, AI answers and AI training.

- [Architecture](docs/ARCHITECTURE.md): the layers, the module template and the decisions behind them
- [Writing a post](docs/WRITING.md)
- [Roadmap](docs/ROADMAP.md): what is still open

## License

MIT
