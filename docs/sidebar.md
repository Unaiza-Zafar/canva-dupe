# Object Sidebar

## Component

**File:** `components/ObjectSidebar.tsx`

Left panel that lists placeable elements. Clicking an item creates a Fabric object and adds it to the shared canvas.

## Layout

```
┌────────────┬──────────────────────────┐
│ Elements   │   [ Object toolbar ]     │
│            │                          │
│ Shapes     │      Fabric canvas       │
│ Text       │                          │
└────────────┴──────────────────────────┘
```

Wired through `components/Editor.tsx` + `CanvasProvider`.

## Available objects

| Section | Kind | Fabric type | Notes |
| --- | --- | --- | --- |
| Shapes | `rect` | `Rect` | Rounded corners |
| Shapes | `circle` | `Circle` | |
| Shapes | `ellipse` | `Ellipse` | |
| Shapes | `triangle` | `Triangle` | |
| Shapes | `line` | `Line` | Stroke only |
| Text | `heading` | `FabricText` | Bold, large |
| Text | `text` | `IText` | Double-click to edit |

Object factories live in `lib/canvas-objects.ts`. New kinds should be added there and registered in the sidebar lists.

## How placement works

1. Sidebar calls `useCanvas()` to get the live Fabric instance.
2. `addObjectToCanvas(canvas, kind)` builds the object and centers it.
3. The new object becomes the active selection so it can be moved/resized immediately.

Buttons stay disabled until the canvas reports ready via `onReady`.

## Next steps

- [ ] Drag-and-drop from sidebar onto canvas
- [ ] More shapes (star, polygon, arrow)
- [ ] Image upload element
- [ ] Categories / search in the sidebar
