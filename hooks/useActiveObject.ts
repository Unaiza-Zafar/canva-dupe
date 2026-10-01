"use client";

import { useCallback, useEffect, useState } from "react";
import type { Canvas, FabricObject } from "fabric";
import { useCanvas } from "@/components/CanvasProvider";

/**
 * Tracks the currently selected Fabric object and re-syncs when
 * selection or object geometry/style changes.
 */
export function useActiveObject() {
  const { canvas } = useCanvas();
  const [activeObject, setActiveObject] = useState<FabricObject | null>(null);
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => {
    if (!canvas) {
      setActiveObject(null);
      setVersion((v) => v + 1);
      return;
    }
    setActiveObject(canvas.getActiveObject() ?? null);
    setVersion((v) => v + 1);
  }, [canvas]);

  useEffect(() => {
    if (!canvas) {
      setActiveObject(null);
      return;
    }

    const sync = () => refresh();
    const clear = () => {
      setActiveObject(null);
      setVersion((v) => v + 1);
    };

    sync();

    canvas.on("selection:created", sync);
    canvas.on("selection:updated", sync);
    canvas.on("selection:cleared", clear);
    canvas.on("object:modified", sync);
    canvas.on("object:scaling", sync);
    canvas.on("object:rotating", sync);

    return () => {
      canvas.off("selection:created", sync);
      canvas.off("selection:updated", sync);
      canvas.off("selection:cleared", clear);
      canvas.off("object:modified", sync);
      canvas.off("object:scaling", sync);
      canvas.off("object:rotating", sync);
    };
  }, [canvas, refresh]);

  return { canvas, activeObject, version, refresh };
}

export type ActiveObjectState = {
  canvas: Canvas | null;
  activeObject: FabricObject | null;
  version: number;
  refresh: () => void;
};
