# Object Toolbar

## Component

**File:** `components/ObjectToolbar.tsx`

Toolbar above the canvas for the currently selected object(s). Built with shadcn `Button`, `Badge`, `Label`, `Separator`, `Toggle`, and shared field helpers.

## Controls

| Control | Behavior |
| --- | --- |
| Fill | Color swatch + hex field — applies to all selected objects |
| Stroke | Color swatch + hex field — applies to all selected objects |
| Stroke W | Stroke width in px — commit on blur / Enter |
| Width / Height | Commit-on-blur number fields (`CommitNumberInput`) |
| Lock ratio | Toggle — links W/H and corner-handle scaling (`canvas.uniformScaling`) |
| Opacity | 0–100% — commit on blur / Enter |
| Rotate | Degrees — commit on blur / Enter |
| Delete | Removes selection (`Backspace` / `Delete` also work) |

## Editable number fields

Width, height, opacity, and rotate use `components/CommitNumberInput.tsx`:

1. Typing updates a local draft string (so values like `12` or empty mid-edit work).
2. On **Enter** or **blur**, the value is parsed, clamped, and committed to Fabric.
3. **Escape** reverts the draft to the last committed value.
4. External canvas changes (handles, multi-select) refresh the field only when it is not focused.

Hex colors work the same way via `components/ColorField.tsx` (swatch + `#rrggbb` text).

## Multi-selection

- Shift+click or drag-select multiple objects.
- Toolbar shows `N selected`.
- Fill, stroke, opacity, and delete apply to every selected object.
- Size, rotation, and aspect lock apply to the active selection as a group.

## Supporting pieces

| File | Role |
| --- | --- |
| `hooks/useActiveObject.ts` | Selection / modify / rotate events |
| `hooks/useCanvasHotkeys.ts` | Keyboard delete |
| `lib/object-controls.ts` | Style, resize, aspect lock, delete |
| `components/CommitNumberInput.tsx` | Draft → commit number input |
| `components/ColorField.tsx` | Swatch + hex color input |
