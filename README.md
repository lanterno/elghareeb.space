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

Two pipelines deploy on every push to `main`:

- **GitHub Pages** (`.github/workflows/deploy.yml`) serves the domain. Nothing rebuilds between
  pushes, so the computed dates, the conferences, scheduled posts and the GitHub card are as current
  as the last push; run the workflow by hand from the Actions tab to refresh them.
- **Cloudflare Workers.** The repository is connected to the Worker `personal-site` through Workers
  Builds (`bun run build`, then `bunx wrangler deploy`, per `wrangler.jsonc`). It needs a build
  token selected in the Worker's build settings on the Cloudflare dashboard.

Keeping one is an open decision; see the roadmap.

- [Architecture](docs/ARCHITECTURE.md): the layers, the module template and the decisions behind them
- [Writing a post](docs/WRITING.md)
- [Roadmap](docs/ROADMAP.md): what is still open

## License

MIT
