# Architecture

## Overview

The app is a Next.js App Router project. Most routes stay as Server Components for fast initial HTML. The design surface is a **Client Component** because Fabric.js requires a real DOM canvas element and browser event handling.

```
Browser
  └── app/page.tsx (Server Component)
        └── components/Editor.tsx (Client)
              ├── ObjectSidebar (adds shapes / text)
              └── FabricCanvas (fabric.Canvas instance)
                    ▲ shared via CanvasProvider
```

## Rendering boundary

| Concern | Where it lives | Why |
| --- | --- | --- |
| Page shell, metadata, layout | Server Components (`app/`) | SEO, less client JS |
| Fabric canvas & interactions | Client Components (`components/`) | Needs `window` / DOM |
| Object sidebar / editor chrome | Client Components | Local UI state and canvas commands |

## Planned layers (as we grow)

1. **Canvas layer** — Fabric instance creation, dispose, resize (`FabricCanvas`) — done
2. **Object tools** — add text, shapes via left sidebar — done (basic)
3. **Selection toolbar** — fill, stroke, resize, delete — done (basic)
4. **Editor state** — history (undo/redo), active tool, selected object props
5. **Persistence** — serialize canvas JSON, save/load designs
6. **Export** — PNG / SVG / PDF from the canvas

Update this section when each layer is introduced.
