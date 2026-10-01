# Canva Dupe — Project Documentation

Living docs for this Next.js + Fabric.js design editor. Update this folder as features land so the team always has a current map of the app.

## Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | React Server Components by default |
| UI | React 19 + Tailwind CSS 4 + shadcn/ui | Client Components only where DOM/browser APIs are required |
| Canvas | Fabric.js 7 | Interactive object model on HTML `<canvas>` |
| Language | TypeScript | Strict mode enabled |
| Look | Day atelier | Cool stone studio, teal accent, Syne + IBM Plex |

## Goals

Build a browser-based design editor (Canva-like) where users can:

- Create and edit designs on a canvas
- Add text, shapes, and images
- Select, move, resize, and style objects
- Export or persist designs (planned)

## Folder map

```
app/                 Next.js App Router (pages, layouts, styles)
components/          Reusable UI and editor components
hooks/               React hooks (e.g. active object selection)
lib/                 Shared helpers (e.g. canvas object factories)
docs/                Project documentation (this folder)
```

## Documentation index

| Doc | Purpose |
| --- | --- |
| [architecture.md](./architecture.md) | High-level system shape and conventions |
| [canvas.md](./canvas.md) | Fabric canvas component, usage, and lifecycle |
| [sidebar.md](./sidebar.md) | Left elements panel (shapes & text) |
| [toolbar.md](./toolbar.md) | Selection toolbar (fill, size, delete) |

## Conventions

1. Prefer Server Components. Mark files with `"use client"` only when they need browser APIs (Fabric, events, local state tied to the DOM).
2. Keep Fabric logic inside dedicated components under `components/`.
3. When you add a feature, add or update a short note in `docs/` in the same change.
4. Path alias: `@/*` maps to the repo root (see `tsconfig.json`).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
