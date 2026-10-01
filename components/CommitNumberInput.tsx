"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CommitNumberInputProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onCommit: (value: number) => void;
  "aria-label": string;
  className?: string;
  suffix?: string;
};

/**
 * Lets users type freely; commits a clamped number on blur or Enter.
 * Draft syncs from `value` only when the prop changes (not on focus loss),
 * so a just-committed draft is not overwritten by a stale parent value.
 */
export function CommitNumberInput({
  value,
  min,
  max,
  step = 1,
  onCommit,
  className,
  suffix,
  ...props
}: CommitNumberInputProps) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  function commit(raw: string = draft) {
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) {
      setDraft(String(value));
      return;
    }

    let next = parsed;
    if (typeof min === "number") next = Math.max(min, next);
    if (typeof max === "number") next = Math.min(max, next);
    if (step > 0) {
      next = Math.round(next / step) * step;
    }

    setDraft(String(next));
    if (next !== value) {
      onCommit(next);
    }
  }

  return (
    <div className="relative">
      <Input
        type="text"
        inputMode="decimal"
        value={draft}
        aria-label={props["aria-label"]}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => commit()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit();
            (e.target as HTMLInputElement).blur();
          }
          if (e.key === "Escape") {
            setDraft(String(value));
            (e.target as HTMLInputElement).blur();
          }
        }}
        className={cn(
          "h-8 w-[4.5rem] bg-background/60 font-mono text-xs tabular-nums",
          suffix && "pr-6",
          className,
        )}
      />
      {suffix ? (
        <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-muted-foreground">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}
