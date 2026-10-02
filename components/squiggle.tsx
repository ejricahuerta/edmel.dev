"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useTooltip } from "@/components/tooltip-provider";

type SquiggleProps = {
  variant: "warn" | "error";
  code: string;
  message: ReactNode;
  children: ReactNode;
  /** Inside a link or button: skip the extra tab stop (the parent is focusable). */
  inLink?: boolean;
};

/** A diagnostic underline on a problem phrase. Hover, focus or tap shows the tooltip. */
export function Squiggle({ variant, code, message, children, inLink = false }: SquiggleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { show, updatePosition, hide } = useTooltip();

  const tip = useMemo(
    () => (
      <>
        <span className={variant === "error" ? "tt-error" : "tt-warn"}>{code}</span>
        <span className="tt-msg">{message}</span>
      </>
    ),
    [variant, code, message],
  );

  const open = () => {
    if (ref.current) show(ref.current, tip);
  };

  return (
    <span
      ref={ref}
      tabIndex={inLink ? undefined : 0}
      className={`ed-sq ${variant === "error" ? "ed-sq-error" : "ed-sq-warn"}`}
      onMouseEnter={open}
      onMouseMove={() => updatePosition()}
      onMouseLeave={hide}
      onFocus={inLink ? undefined : open}
      onBlur={inLink ? undefined : hide}
    >
      {children}
    </span>
  );
}
