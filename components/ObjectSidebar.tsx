"use client";

import type { ReactNode } from "react";
import { Type } from "lucide-react";
import { addObjectToCanvas, type CanvasObjectKind } from "@/lib/canvas-objects";
import { useCanvas } from "@/components/CanvasProvider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SidebarItem = {
  kind: CanvasObjectKind;
  label: string;
  preview: ReactNode;
};

const SHAPES: SidebarItem[] = [
  {
    kind: "rect",
    label: "Rectangle",
    preview: (
      <span className="block h-7 w-9 rounded-[3px] border-2 border-primary/80 bg-primary/20" />
    ),
  },
  {
    kind: "circle",
    label: "Circle",
    preview: (
      <span className="block size-8 rounded-full border-2 border-primary/80 bg-primary/20" />
    ),
  },
  {
    kind: "ellipse",
    label: "Ellipse",
    preview: (
      <span className="block h-6 w-9 rounded-full border-2 border-primary/80 bg-primary/20" />
    ),
  },
  {
    kind: "triangle",
    label: "Triangle",
    preview: (
      <svg
        viewBox="0 0 36 32"
        className="h-7 w-8 fill-primary/20 stroke-primary/80 stroke-2"
        aria-hidden
      >
        <polygon points="18,2 34,30 2,30" />
      </svg>
    ),
  },
  {
    kind: "line",
    label: "Line",
    preview: <span className="block h-0.5 w-9 rounded-full bg-primary" />,
  },
];

const TEXT_ITEMS: SidebarItem[] = [
  {
    kind: "heading",
    label: "Heading",
    preview: (
      <span className="font-heading text-xl font-bold leading-none tracking-tight text-primary">
        Aa
      </span>
    ),
  },
  {
    kind: "text",
    label: "Body text",
    preview: <Type className="size-5 text-primary" />,
  },
];

function ObjectButton({
  item,
  disabled,
  onAdd,
  delay,
}: {
  item: SidebarItem;
  disabled: boolean;
  onAdd: (kind: CanvasObjectKind) => void;
  delay: number;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={() => onAdd(item.kind)}
      className={cn(
        "animate-editor-rise h-auto flex-col gap-2.5 rounded-xl border-border/80 bg-sidebar-accent/40 px-2 py-3 text-sidebar-foreground hover:border-primary/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="flex h-10 w-full items-center justify-center">
        {item.preview}
      </span>
      <span className="text-[11px] font-medium tracking-wide">{item.label}</span>
    </Button>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <h3 className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          {title}
        </h3>
        <Separator className="flex-1" />
      </div>
      {children}
    </section>
  );
}

export default function ObjectSidebar() {
  const { canvas } = useCanvas();

  function handleAdd(kind: CanvasObjectKind) {
    if (!canvas) return;
    addObjectToCanvas(canvas, kind);
  }

  const disabled = !canvas;

  return (
    <aside className="flex h-full w-[17.5rem] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="animate-editor-rise border-b border-sidebar-border px-5 py-5">
        <p className="text-[10px] font-semibold tracking-[0.22em] text-primary uppercase">
          Library
        </p>
        <h2 className="font-heading mt-1 text-xl font-semibold tracking-tight">
          Elements
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Click to place on the artboard
        </p>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-7 p-4">
          <Section title="Shapes">
            <div className="grid grid-cols-2 gap-2">
              {SHAPES.map((item, index) => (
                <ObjectButton
                  key={item.kind}
                  item={item}
                  disabled={disabled}
                  onAdd={handleAdd}
                  delay={80 + index * 40}
                />
              ))}
            </div>
          </Section>

          <Section title="Text">
            <div className="grid grid-cols-2 gap-2">
              {TEXT_ITEMS.map((item, index) => (
                <ObjectButton
                  key={item.kind}
                  item={item}
                  disabled={disabled}
                  onAdd={handleAdd}
                  delay={280 + index * 40}
                />
              ))}
            </div>
          </Section>
        </div>
      </ScrollArea>
    </aside>
  );
}
