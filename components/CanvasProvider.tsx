"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Canvas } from "fabric";

type CanvasContextValue = {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
};

const CanvasContext = createContext<CanvasContextValue | null>(null);

export function CanvasProvider({ children }: { children: ReactNode }) {
  const [canvas, setCanvasState] = useState<Canvas | null>(null);

  const setCanvas = useCallback((next: Canvas | null) => {
    setCanvasState(next);
  }, []);

  const value = useMemo(
    () => ({ canvas, setCanvas }),
    [canvas, setCanvas],
  );

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
}

export function useCanvas() {
  const ctx = useContext(CanvasContext);
  if (!ctx) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return ctx;
}
