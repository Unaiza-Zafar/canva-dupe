"use client";

import { useCallback } from "react";
import type { Canvas } from "fabric";
import { CanvasProvider, useCanvas } from "@/components/CanvasProvider";
import FabricCanvas from "@/components/FabricCanvas";
import ObjectSidebar from "@/components/ObjectSidebar";
import ObjectToolbar from "@/components/ObjectToolbar";
import { useCanvasHotkeys } from "@/hooks/useCanvasHotkeys";
import { Badge } from "@/components/ui/badge";

function EditorWorkspace() {
  const { setCanvas } = useCanvas();
  useCanvasHotkeys();

  const handleReady = useCallback(
    (canvas: Canvas | null) => {
      setCanvas(canvas);
    },
    [setCanvas],
  );

  return (
    <div className="flex min-h-full flex-1 overflow-hidden">
      <ObjectSidebar />

      <section className="studio-grid relative flex flex-1 flex-col overflow-auto">
        <header className="animate-editor-rise flex items-center justify-between gap-4 border-b border-border/60 bg-background/50 px-6 py-4 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-2xl font-semibold tracking-tight">
                Atelier
              </h1>
              <Badge variant="outline" className="border-primary/40 text-primary">
                canvas
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Compose shapes and type — refine with the toolbar above the board.
            </p>
          </div>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center gap-5 p-6 md:p-8">
          <ObjectToolbar />
          <div
            className="animate-artboard-glow artboard-frame overflow-hidden rounded-xl"
            style={{ animationDelay: "120ms" }}
          >
            <FabricCanvas
              width={900}
              height={600}
              onReady={handleReady}
              className="bg-artboard"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Editor() {
  return (
    <CanvasProvider>
      <EditorWorkspace />
    </CanvasProvider>
  );
}
