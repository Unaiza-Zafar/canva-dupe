"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "fabric";

export type FabricCanvasProps = {
  width?: number;
  height?: number;
  className?: string;
  onReady?: (canvas: Canvas | null) => void;
};

/**
 * Client-only Fabric.js canvas.
 * Fabric touches the DOM, so this must stay a Client Component.
 */
export default function FabricCanvas({
  width = 800,
  height = 600,
  className,
  onReady,
}: FabricCanvasProps) {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const el = canvasElRef.current;
    if (!el || fabricRef.current) return;

    const canvas = new Canvas(el, {
      width,
      height,
      backgroundColor: "#ffffff",
      selection: true,
      preserveObjectStacking: true,
      selectionColor: "rgba(15, 118, 110, 0.16)",
      selectionBorderColor: "rgba(15, 118, 110, 0.9)",
      selectionLineWidth: 1,
    });

    fabricRef.current = canvas;
    onReadyRef.current?.(canvas);

    return () => {
      onReadyRef.current?.(null);
      void canvas.dispose();
      fabricRef.current = null;
    };
  }, [width, height]);

  return (
    <div className={className}>
      <canvas ref={canvasElRef} />
    </div>
  );
}
