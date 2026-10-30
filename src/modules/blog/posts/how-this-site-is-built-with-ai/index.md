---
title: This website was written by AI. All of it.
description: I typed three commits in 2024 and nothing of them survives. Here is the two-year history of a site built entirely through conversation, what went wrong along the way, and what my job turned out to be.
published: 2026-10-29
updated: 2026-10-30
tags: [software]
---

Let me start with the disclosure, because it's the point: I didn't write this website. Not the
code, not the hills in the drawing, not the colours, not the tests, not the blog you're reading.
Over two years, two rebuilds and one redesign I threw away, every line was written by AI agents, with me
directing. The repository is public, and the commit trailers say who wrote what.

People usually mean something smaller by "built with AI": a function here, a regex there, a
snippet pasted from a chat. This is the other thing. A site where _all_ of the craft came out of
a conversation, and where my job was never to type. I want to tell the history honestly,
including the parts that didn't work, because the honest version is more useful than the demo.

## The three commits I typed

In August 2024 I created a repository, ran a framework's starter and configured Tailwind. Three
commits, seventy lines, a page that said nothing. That is the whole of what I have personally
written here, and none of it exists any more. The site stayed that way for sixteen months.

## Three sites in two years

The first real site arrived in a single day in December 2025. I gave an agent my LinkedIn
profile and asked for a portfolio. It threw the starter away, chose a different framework (Qwik,
which renders everything to static HTML at build time), pulled my work history into one long
page and set up deployment to GitHub Pages on my domain. The same day it changed the package
manager, moved Node up two versions, upgraded Vite and then downgraded it again when the CSS
stopped loading. Twenty commits of churn before dinner. It worked, and it looked like every
other developer portfolio on the internet.

In August 2026 I tried to fix that with adjectives. I asked for an "editorial Swiss tech"
redesign with a floating navbar and interactive filters. The agent delivered exactly that, in
one commit, and I reverted it the same afternoon. The lesson was not that the agent did badly.
It was that I had described a trend, not a design, and a trend is what I got back.

The third site, the one you're looking at, began on 17 October 2026 when I stopped describing
the look and handed over a philosophy instead.

## The design came from somewhere else

A year earlier I had worked out a design language for a different project of mine, a personal
time tracker. I called it the bright design style, and it had been written down as a document
with ten principles rather than a mood board. The sky is the ground. Content sits on cloud-white
panels. Sunlight falls on exactly one thing per screen, the thing the person came for. Say it in
a sentence before you show it in a number. Rounded everything. Afternoon by default and dusk by
the bottom of the page.

That document is what the agent read before redesigning the site, and it is why the redesign
landed in one commit where the "Swiss tech" one had failed. The agent came back with the
palette's words rather than its hex values: `sky`, `panel`, `sun`, `wash`, `leaf`, three greens
for the hills. Those words are the design tokens today, and the stylesheet enforces the rule
that nothing outside the palette may exist: every default colour is set to `initial`, then only
what we named.

The same session rebuilt the home page as a short walk from the hero into four tiles, and the
first few things the site now does for itself: counting my years of experience from the day I
started my first job in July 2014 instead of a hand-typed number, so that number, and the
length of my current role, are recomputed on every build without anyone touching them.

## The drawings are code

The part people find hardest to believe is the scenery, which arrived over the following week.
The hills along the bottom of every header, the clouds drifting over the nav, the wind turbines
turning at different speeds so they never move in step, the train that comes out of a tunnel and
crosses a viaduct, the satellite orbiting my portrait, and the Starship that falls from above the
screen, flips, fires its landing burn and is caught by the tower's arms. None of that is an
image. It's SVG paths and CSS keyframes, written from a description of what should happen.

```css
/*
  Starship falls from above the screen belly-first, then its landing burn slows it into the
  tower's arms. It rests there, relaunches and falls again for the next catch. Near the tower,
  distances are in vw because the drawing scales with the width.
*/
@keyframes catch {
  from {
    translate: 0 -100svh;
    animation-timing-function: linear;
  }
  13.89% {
    translate: 0 -8vw;
    animation-timing-function: cubic-bezier(0.3, 0.7, 0.5, 1);
  }
  /* … the flare, the touchdown, the rest between catches … */
  87%,
  to {
    translate: 0 -100svh;
  }
}
```

What I contributed was words and judgement. The ship should turn belly-first again only once
it's out of sight. The tower's arms should stay open until the ship is between them. The catch
used to play once and stop, and I wanted a visitor who scrolled back up to see it again, so now
it relaunches. On a phone, show it already caught, because the hero runs past the first screen
there and the landing would play out of sight. Each of those is now a comment in the code, next
to the keyframe percentages that make it true. I never edited a percentage. Everything moves only
for visitors who allow motion.

## A site that keeps itself true

A static site goes stale. The answer here was to make the build do the remembering, and most of
late October went into that.

- The conferences I'm attending sit in the hero with a live dot while they run, and each one
  disappears once it has ended. Adding the next event is the only manual step.
- A card on the home page shows my GitHub contributions for the year, read from GitHub's API
  while the site builds, so no visitor ever waits on GitHub. Without a token the card degrades
  to a link and the build says why.
- The content, meaning jobs, organisations, projects, conferences and now the tags on a post, is
  checked against schemas during the build. This came from a real bug: a mistyped date had
  reached the page and quietly broken the durations. Now the build fails and names the field.
- Another real bug: conferences were counted in UTC and job durations in the machine's local
  day. They agreed on the build server and disagreed on my laptop after midnight. Every date on
  the site is now UTC.
- The fonts moved off Google's servers onto the site, in the four faces and two subsets it
  actually uses, which removed two connections, a render-blocking stylesheet and the sending of
  every visitor's IP address to a third party.

Between those came two dozen small commits with titles like "remove the template's server
leftovers" and "drop the Bun and web-worker types nothing uses", because a starter leaves debris
and an agent that reads the whole codebase notices it.

## The code is what a careful engineer would write

I was worried, early on, that code written this way would be the kind you can't maintain: a
plausible pile. The December 2025 site was heading there, with one 584-line route file holding
everything. It isn't any more, and the reason is that every standard I'd hold a colleague to, I
held the agent to, in writing, as constraints rather than suggestions.

The biggest piece of work, in the last days of October, was a restructure of the whole codebase.
It did not start with code. It started with the agent reading everything and writing findings:
the facts about each organisation lived in four places, one data file was doing the job of a
schema library, a content file and a date library at once, the buttons were copy-pasted Tailwind
strings, there were no tests, and the CI never ran on a pull request. Then a plan in phases, each
meant to leave the rendered pages pixel-identical. Then a throwaway spike to prove that the
framework could do what the plan assumed, before any of it was built.

![The three layers: app on top, one module per subdomain, the platform underneath](./layers.png "app composes, modules own their subject, platform knows nothing about either")

The result is organised by subject, not by file type. One folder owns everything about my
career, one the open-source projects, one the GitHub activity, one this blog. Each has the same
shape: its model, its content, its queries, its components, its page and its tests. The routes
are one-line re-exports. A platform layer underneath holds what has no domain knowledge: the
date maths, the design tokens, the primitives, the scenery. The linter enforces that the
platform can't see the modules and that modules reach each other only through a public API. There
are forty-two tests now, mostly on the date arithmetic, which is exactly the subtle part.

None of that is novel. What's different is that I didn't implement any of it. I named it, and
then I read the result the way I'd read a pull request from someone I trust but verify.

## The loop

This wasn't one heroic session. It's ninety-odd commits across several agents, and each sat
inside the same loop.

| I do                                    | The agent does                                                                   |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| Describe what should change, and why    | Reads the whole codebase first, then proposes, as findings, not code             |
| Set the constraints it can't trade away | Spikes anything risky in a throwaway copy before planning around it              |
| Decide between real options             | Works in small, reversible steps, one goal per commit                            |
| Read everything, and say no             | Proves each step: types, lint, tests, a full build, a diff of the rendered pages |
| Keep the decisions that can't be undone | Tells me what it couldn't verify and what it wouldn't decide                     |

The last two lines matter most, and two stories from the recent work show why.

The site has two deployment configurations for one domain, GitHub Pages and Cloudflare Workers,
because one was added while the other was still live. The agent that found this listed it as the
first finding and refused to delete either, because it couldn't tell which one was serving the
site and the wrong guess takes the site down. It is still waiting for me to decide. That's the
right instinct, and it's the same one I'd want from a person.

> Lightning CSS silently emitted an empty `@keyframes live {}` when a `color-mix()` landed inside
> the keyframes. The pulsing dot next to "Open to collaborate" would have quietly stopped
> pulsing.

Nothing failed. The agent caught it by reading the generated CSS, and the fix is a comment in
the stylesheet today explaining why the colours are computed outside the keyframes. AI-written
code has AI-found bugs. The loop catches them when the loop is strict.

## What I'm actually doing, then

Not typing. Not, mostly, even reading code first. I read findings, plans and diffs, and I look at
the rendered result on a laptop and on a phone. I supply taste ("the post title should be one
line, and the text should start on the first screen"), constraints ("no new dependency unless the
lockfile can be updated"), decisions ("stay on this framework; it was verified to do what we
need"), and the willingness to say "that's ugly, do better". Once, I supplied a whole design
philosophy, and that turned out to be the most valuable thing I gave.

It's closer to being an editor than an author, and closer to being a staff engineer than I
expected: the work of deciding what good means here and refusing to ship less. The typing was
never the hard part. It turns out it wasn't the interesting part either.

## A last disclosure

The first draft of this post was written by the agent that built the blog, which knew the code
well and the history hardly at all. This version was written by a different agent that read the
ninety-three commits, the planning documents and the one redesign that was reverted,
and then I edited it. If that makes you trust it less, I understand. If it makes you curious what
the edit looked like, that's the part that's mine.
