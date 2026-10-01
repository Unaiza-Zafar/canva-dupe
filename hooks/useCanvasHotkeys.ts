"use client";

import { useEffect } from "react";
import { useCanvas } from "@/components/CanvasProvider";
import { deleteActiveObject, isEditingText } from "@/lib/object-controls";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

/**
 * Deletes the current selection with Backspace / Delete
 * unless the user is typing in a form field or editing canvas text.
 */
export function useCanvasHotkeys() {
  const { canvas } = useCanvas();

  useEffect(() => {
    if (!canvas) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Backspace" && event.key !== "Delete") return;
      if (isTypingTarget(event.target)) return;
      if (isEditingText(canvas)) return;
      if (canvas.getActiveObjects().length === 0) return;

      event.preventDefault();
      deleteActiveObject(canvas);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canvas]);
}
