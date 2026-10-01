import {
  ActiveSelection,
  type Canvas,
  type FabricObject,
  type TFiller,
} from "fabric";

export type AspectLockable = FabricObject & {
  lockAspectRatio?: boolean;
};

function asColorString(value: string | TFiller | null | undefined): string {
  return typeof value === "string" && value.length > 0 ? value : "#000000";
}

export function isMultiSelection(
  object: FabricObject | null | undefined,
): object is ActiveSelection {
  return object instanceof ActiveSelection;
}

/** Individual objects to style (unwraps ActiveSelection). */
export function getStyleTargets(canvas: Canvas): FabricObject[] {
  return canvas.getActiveObjects();
}

export function getObjectFill(object: FabricObject): string {
  return asColorString(object.fill);
}

export function getObjectStroke(object: FabricObject): string {
  return asColorString(object.stroke);
}

export function getObjectStrokeWidth(object: FabricObject) {
  return Math.max(0, Math.round(object.strokeWidth ?? 0));
}

export function getObjectSize(object: FabricObject) {
  return {
    width: Math.max(1, Math.round(object.getScaledWidth())),
    height: Math.max(1, Math.round(object.getScaledHeight())),
  };
}

export function getObjectOpacity(object: FabricObject) {
  return Math.round((object.opacity ?? 1) * 100);
}

export function getObjectRotation(object: FabricObject) {
  return Math.round(object.angle ?? 0);
}

export function isStrokeOnlyObject(object: FabricObject) {
  return object.isType("line");
}

export function areAllStrokeOnly(objects: FabricObject[]) {
  return objects.length > 0 && objects.every(isStrokeOnlyObject);
}

export function getAspectRatioLocked(object: FabricObject) {
  const value = (object as AspectLockable).lockAspectRatio;
  // Match Fabric's default uniformScaling behavior until the user toggles.
  return value === undefined ? true : Boolean(value);
}

export function setAspectRatioLocked(
  canvas: Canvas,
  object: FabricObject,
  locked: boolean,
) {
  (object as AspectLockable).lockAspectRatio = locked;
  // Corner handles scale proportionally when true (Fabric default).
  canvas.uniformScaling = locked;
  canvas.requestRenderAll();
}

export function setObjectFill(canvas: Canvas, fill: string) {
  for (const object of getStyleTargets(canvas)) {
    if (isStrokeOnlyObject(object)) continue;
    object.set("fill", fill);
  }
  canvas.requestRenderAll();
}

export function setObjectStroke(canvas: Canvas, stroke: string) {
  for (const object of getStyleTargets(canvas)) {
    object.set("stroke", stroke);
    if (!object.strokeWidth || object.strokeWidth < 1) {
      object.set("strokeWidth", 2);
    }
  }
  canvas.requestRenderAll();
}

export function setObjectStrokeWidth(canvas: Canvas, strokeWidth: number) {
  const width = Math.max(0, strokeWidth);
  for (const object of getStyleTargets(canvas)) {
    object.set("strokeWidth", width);
    if (width > 0 && !object.stroke) {
      object.set("stroke", "#134e4a");
    }
  }
  canvas.requestRenderAll();
}

export function setObjectOpacity(canvas: Canvas, opacityPercent: number) {
  const opacity = Math.min(100, Math.max(0, opacityPercent)) / 100;
  for (const object of getStyleTargets(canvas)) {
    object.set("opacity", opacity);
  }
  canvas.requestRenderAll();
}

export function setObjectRotation(canvas: Canvas, angle: number) {
  const active = canvas.getActiveObject();
  if (!active) return;
  active.rotate(angle);
  active.setCoords();
  canvas.requestRenderAll();
}

export function setObjectSize(
  canvas: Canvas,
  object: FabricObject,
  next: { width?: number; height?: number },
  options?: { lockAspectRatio?: boolean },
) {
  const lockAspect =
    options?.lockAspectRatio ?? getAspectRatioLocked(object);
  const baseWidth = object.width || 1;
  const baseHeight = object.height || 1;
  const current = getObjectSize(object);

  let width = next.width;
  let height = next.height;

  if (lockAspect) {
    const ratio = current.width / current.height || 1;
    if (typeof width === "number" && typeof height !== "number") {
      height = Math.max(1, Math.round(width / ratio));
    } else if (typeof height === "number" && typeof width !== "number") {
      width = Math.max(1, Math.round(height * ratio));
    }
  }

  if (typeof width === "number" && width > 0) {
    object.set("scaleX", width / baseWidth);
  }
  if (typeof height === "number" && height > 0) {
    object.set("scaleY", height / baseHeight);
  }

  object.setCoords();
  canvas.requestRenderAll();
}

export function deleteActiveObject(canvas: Canvas) {
  const targets = canvas.getActiveObjects();
  if (targets.length === 0) return;

  canvas.discardActiveObject();
  canvas.remove(...targets);
  canvas.requestRenderAll();
}

export function isEditingText(canvas: Canvas) {
  const active = canvas.getActiveObject();
  return Boolean(
    active && "isEditing" in active && (active as { isEditing?: boolean }).isEditing,
  );
}
