"use client";

import { useEffect, type ReactNode } from "react";
import { Link2, Link2Off, Trash2 } from "lucide-react";
import { CommitNumberInput } from "@/components/CommitNumberInput";
import { ColorField } from "@/components/ColorField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { useActiveObject } from "@/hooks/useActiveObject";
import {
  areAllStrokeOnly,
  deleteActiveObject,
  getAspectRatioLocked,
  getObjectFill,
  getObjectOpacity,
  getObjectRotation,
  getObjectSize,
  getObjectStroke,
  getObjectStrokeWidth,
  getStyleTargets,
  isMultiSelection,
  setAspectRatioLocked,
  setObjectFill,
  setObjectOpacity,
  setObjectRotation,
  setObjectSize,
  setObjectStroke,
  setObjectStrokeWidth,
} from "@/lib/object-controls";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </Label>
      {children}
    </div>
  );
}

export default function ObjectToolbar() {
  const { canvas, activeObject, version, refresh } = useActiveObject();

  useEffect(() => {
    if (!canvas || !activeObject) return;
    canvas.uniformScaling = getAspectRatioLocked(activeObject);
  }, [canvas, activeObject, version]);

  if (!canvas || !activeObject) {
    return (
      <div className="animate-editor-rise flex min-h-14 w-full max-w-[900px] items-center rounded-xl border border-dashed border-border/70 bg-card/40 px-5 text-sm text-muted-foreground backdrop-blur-sm">
        Select an object to edit style and size · Shift+click multi-select ·
        ⌫ Delete
      </div>
    );
  }

  void version;

  const targets = getStyleTargets(canvas);
  const isMulti = isMultiSelection(activeObject) || targets.length > 1;
  const primary = targets[0] ?? activeObject;
  const strokeOnly = areAllStrokeOnly(targets);
  const fill = getObjectFill(primary);
  const stroke = getObjectStroke(primary);
  const strokeWidth = getObjectStrokeWidth(primary);
  const size = getObjectSize(activeObject);
  const opacity = getObjectOpacity(isMulti ? primary : activeObject);
  const rotation = getObjectRotation(activeObject);
  const aspectLocked = getAspectRatioLocked(activeObject);

  return (
    <div className="animate-editor-rise flex w-full max-w-[900px] flex-wrap items-end gap-3 rounded-xl border border-border/90 bg-card/95 p-3 shadow-sm backdrop-blur-md">
     

      {!strokeOnly ? (
        <Field label="Fill">
          <ColorField
            label="Fill color"
            value={fill}
            onCommit={(color) => {
              setObjectFill(canvas, color);
              refresh();
            }}
          />
        </Field>
      ) : null}

      <Field label="Stroke">
        <ColorField
          label="Stroke color"
          value={stroke}
          onCommit={(color) => {
            setObjectStroke(canvas, color);
            refresh();
          }}
        />
      </Field>

      <Field label="Stroke W">
        <CommitNumberInput
          value={strokeWidth}
          min={0}
          max={10}
          aria-label="Stroke width"
          onCommit={(width) => {
            setObjectStrokeWidth(canvas, width);
            refresh();
          }}
        />
      </Field>

      <Separator orientation="vertical" className="mx-1 hidden h-10 sm:block" />

      <Field label="Width">
        <CommitNumberInput
          value={size.width}
          min={1}
          aria-label="Width"
          onCommit={(width) => {
            setObjectSize(
              canvas,
              activeObject,
              { width },
              { lockAspectRatio: aspectLocked },
            );
            refresh();
          }}
        />
      </Field>

      <div className="flex items-end pb-0.5">
        <Toggle
          pressed={aspectLocked}
          onPressedChange={(pressed) => {
            setAspectRatioLocked(canvas, activeObject, pressed);
            refresh();
          }}
          aria-label={aspectLocked ? "Unlock aspect ratio" : "Lock aspect ratio"}
          title={aspectLocked ? "Unlock aspect ratio" : "Lock aspect ratio"}
          variant="outline"
          size="sm"
          className="data-pressed:border-primary data-pressed:bg-primary/15 data-pressed:text-primary"
        >
          {aspectLocked ? <Link2 /> : <Link2Off />}
        </Toggle>
      </div>

      <Field label="Height">
        <CommitNumberInput
          value={size.height}
          min={1}
          aria-label="Height"
          onCommit={(height) => {
            setObjectSize(
              canvas,
              activeObject,
              { height },
              { lockAspectRatio: aspectLocked },
            );
            refresh();
          }}
        />
      </Field>

      <Separator orientation="vertical" className="mx-1 hidden h-10 sm:block" />

      <Field label="Opacity">
        <CommitNumberInput
          value={opacity}
          min={0}
          max={100}
          suffix="%"
          aria-label="Opacity percent"
          onCommit={(value) => {
            setObjectOpacity(canvas, value);
            refresh();
          }}
        />
      </Field>

      <Field label="Rotate">
        <CommitNumberInput
          value={rotation}
          min={-360}
          max={360}
          suffix="°"
          aria-label="Rotation degrees"
          onCommit={(value) => {
            setObjectRotation(canvas, value);
            refresh();
          }}
        />
      </Field>

      <div className="ml-auto flex items-end">
      {isMulti ? (
        <Badge variant="secondary" className="mb-1 self-center">
          {targets.length} selected
        </Badge>
      ) : null}
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => {
            deleteActiveObject(canvas);
            refresh();
          }}
        >
          <Trash2 data-icon="inline-start" />
        </Button>
      </div>
    </div>
  );
}
