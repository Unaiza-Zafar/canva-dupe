"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function normalizeHex(value: string) {
  const trimmed = value.trim();
  if (!HEX.test(trimmed)) return null;
  if (trimmed.length === 4) {
    const [, r, g, b] = trimmed;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return trimmed.toLowerCase();
}

type ColorFieldProps = {
  value: string;
  onCommit: (value: string) => void;
  label: string;
};

export function ColorField({ value, onCommit, label }: ColorFieldProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  function commit(raw: string = draft) {
    const next = normalizeHex(raw.startsWith("#") ? raw : `#${raw}`);
    if (!next) {
      setDraft(value);
      return;
    }
    setDraft(next);
    if (next !== value) onCommit(next);
  }

  return (
    <div className="flex items-center gap-1.5">
      <label className="relative size-8 shrink-0 overflow-hidden rounded-md border border-border shadow-inner">
        <span className="sr-only">{label}</span>
        <input
          type="color"
          value={HEX.test(value) ? value : "#000000"}
          aria-label={label}
          onChange={(e) => {
            setDraft(e.target.value);
            onCommit(e.target.value);
          }}
          className="absolute inset-0 size-full cursor-pointer appearance-none border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0"
        />
      </label>
      <Input
        value={draft}
        aria-label={`${label} hex`}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => commit()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit();
            (e.target as HTMLInputElement).blur();
          }
        }}
        className={cn(
          "h-8 w-[5.5rem] bg-background/60 font-mono text-[11px] uppercase tracking-wide",
        )}
      />
    </div>
  );
}
