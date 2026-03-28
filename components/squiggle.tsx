"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useTooltip } from "@/components/tooltip-provider";

type SquiggleProps = {
  variant: "warn" | "error";
  code: string;
  message: ReactNode;
  children: ReactNode;
};

export function Squiggle({ variant, code, message, children }: SquiggleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { show, updatePosition, hide } = useTooltip();

  const tip = useMemo(
    () => (
      <>
        {variant === "error" ? (
          <span className="tt-error">⚠ error: {code}</span>
        ) : (
          <span className="tt-warn">⚠ warning: {code}</span>
        )}
        <span className="tt-msg">{message}</span>
      </>
    ),
    [variant, code, message],
  );

  return (
    <span
      ref={ref}
      className={`squiggle ${variant === "error" ? "squiggle-error" : "squiggle-warn"}`}
      onMouseEnter={() => {
        if (ref.current) show(ref.current, tip);
      }}
      onMouseMove={() => updatePosition()}
      onMouseLeave={hide}
    >
      {children}
    </span>
  );
}
