# Fabric Canvas

## Component

**File:** `components/FabricCanvas.tsx`

Client Component that creates a Fabric.js `Canvas` on mount and disposes it on unmount.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `number` | `800` | Canvas width in CSS pixels |
| `height` | `number` | `600` | Canvas height in CSS pixels |
| `className` | `string` | — | Wrapper `div` class names |
| `onReady` | `(canvas: Canvas \| null) => void` | — | Called with the instance when ready; `null` on dispose |

### Usage

```tsx
import FabricCanvas from "@/components/FabricCanvas";
import type { Canvas } from "fabric";

function Editor() {
  function handleReady(canvas: Canvas | null) {
    // Store or clear the instance for tools / sidebar
  }

  return (
    <FabricCanvas
      width={800}
      height={600}
      onReady={handleReady}
    />
  );
}
```

### Lifecycle

1. Component mounts → `useEffect` runs in the browser.
2. `new Canvas(htmlCanvasElement, options)` creates the Fabric instance.
3. Optional `onReady` callback receives the instance for parent wiring.
4. Component unmounts (or size deps change) → `onReady(null)` then `canvas.dispose()`.

### Why `"use client"`?

Fabric.js reads and writes the DOM. Next.js Server Components cannot run that code on the server, so the canvas must be a Client Component (or dynamically imported with `ssr: false` if we ever wrap it differently).

### Import path

```ts
import { Canvas } from "fabric";
```

Fabric v7 uses named ESM exports (not the older `fabric.Canvas` default-namespace style).

## Next steps (canvas)

- [x] Expose a shared canvas context/ref for toolbar tools
- [x] Add sample objects (rect, text) via sidebar
- [ ] Handle responsive resize / zoom / pan
- [ ] Serialize / restore via `canvas.toJSON()` / `loadFromJSON()`
