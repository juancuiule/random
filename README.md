# random

Personal sandbox for generative art projects, built with [p5.js](https://p5js.org/) and [Vite](https://vitejs.dev/).

Each project lives in `projects/` as an independent package with its own dependencies and dev server. The repo is structured as a pnpm workspace — one install gets everything running.

## Getting started

```bash
pnpm install
pnpm dev:gelatina
pnpm dev:generative-factory
pnpm dev:bouba
```

Or run any project directly:

```bash
pnpm --filter gelatina dev
pnpm --filter generative-factory dev
pnpm --filter bouba dev
```

## Projects

### [gelatina](./projects/gelatina)
<img width="300" height="300" alt="gelatina-16" src="https://github.com/user-attachments/assets/1cbff819-d957-4fb0-9b05-5176798ef507" />
<img width="300" height="300" alt="gelatina-14" src="https://github.com/user-attachments/assets/2b4fe610-90d0-49e8-bf3e-7870f42acd11" />



Three overlapping grids of circles in pink, green and yellow, rendered with blend modes (MULTIPLY / SCREEN depending on theme). The composition drifts autonomously using Perlin noise. Built for [fxhash](https://www.fxhash.xyz/) — the `fxrand` seeded RNG drives all randomness so each token hash produces a unique, deterministic output.

**Stack:** p5.js · TypeScript · Vite · fxhash

---

### [generative-factory](./projects/generative-factory)

<img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/c8ccc0a4-3f69-4de9-a313-351d486a32e9" />
<img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/9509c497-726d-4189-bdde-e16c5c72e169" />
<img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/f8a8d345-6ff3-49e6-98f7-482a93fd3f07" />
<img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/1bf8acc2-8924-4c7f-956e-537a3bd45901" />
<img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/bb7d0d94-fd20-4c98-b853-5d5d1f41ca37" />



An industrial layout generator that arranges rectangular blocks into factory-like compositions. Blocks are assigned roles (biggest, screws, cables, icon, animated, label, pulley) and drawn across multiple layers. Color palette is limited to four colors (pink, black, blue, white) with randomized assignments per run. Includes a lil-gui control panel and a debug overlay.

**Stack:** p5.js · TypeScript · Vite · lil-gui

---

### [bouba](./projects/bouba)

<img width="250" height="250" alt="bouba-colors-17" src="https://github.com/user-attachments/assets/09e4eb04-96ba-4d34-9d2c-9e297548f518" />
<img width="250" height="250" alt="bouba-colors-7" src="https://github.com/user-attachments/assets/1efb5d41-ed29-482e-b64e-d45f2c3434fb" />
<img width="250" height="250" alt="bouba-colors-6" src="https://github.com/user-attachments/assets/6504f8ea-5ea8-43b2-ad1c-bd13ae6ab0ee" />


Generates organic blob shapes inspired by the [bouba/kiki effect](https://en.wikipedia.org/wiki/Bouba/kiki_effect). Two layers of rounded forms are built by chaining non-overlapping circles into a smooth closed contour, then blended with MULTIPLY. The constraint-solving runs iteratively in the background with a loading animation while it resolves. Built for [fxhash](https://www.fxhash.xyz/) — supports PNG and SVG export.

**Stack:** p5.js · TypeScript · webpack · fxhash

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
git subtree pull --prefix=projects/bouba bouba main
```
