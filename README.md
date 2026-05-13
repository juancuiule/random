# random

Personal sandbox for generative art projects, built with [p5.js](https://p5js.org/) and [Vite](https://vitejs.dev/).

Each project lives in `projects/` as an independent package with its own dependencies and dev server. The repo is structured as a pnpm workspace — one install gets everything running.

## Getting started

```bash
pnpm install
pnpm dev:gelatina
pnpm dev:generative-factory
```

Or run any project directly:

```bash
pnpm --filter gelatina dev
pnpm --filter generative-factory dev
```

## Projects

### [gelatina](./projects/gelatina)

Three overlapping grids of circles in pink, green and yellow, rendered with blend modes (MULTIPLY / SCREEN depending on theme). The composition drifts autonomously using Perlin noise. Built for [fxhash](https://www.fxhash.xyz/) — the `fxrand` seeded RNG drives all randomness so each token hash produces a unique, deterministic output.

**Stack:** p5.js · TypeScript · Vite · fxhash

---

### [generative-factory](./projects/generative-factory)

An industrial layout generator that arranges rectangular blocks into factory-like compositions. Blocks are assigned roles (biggest, screws, cables, icon, animated, label, pulley) and drawn across multiple layers. Color palette is limited to four colors (pink, black, blue, white) with randomized assignments per run. Includes a lil-gui control panel and a debug overlay.

**Stack:** p5.js · TypeScript · Vite · lil-gui

---

## Adding a new project

```bash
# 1. Create the project
mkdir projects/my-project && cd projects/my-project
pnpm create vite . --template vanilla-ts

# 2. Add a dev script to the root package.json
# "dev:my-project": "pnpm --filter my-project dev"
```

## Pulling updates from a source repo

Each project was imported via `git subtree` so its history is embedded here. To pull in new commits from the original repo:

```bash
git subtree pull --prefix=projects/gelatina gelatina main
git subtree pull --prefix=projects/generative-factory generative-factory main
```
