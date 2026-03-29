"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type TooltipContextValue = {
  show: (anchor: HTMLElement, content: ReactNode) => void;
  updatePosition: () => void;
  hide: () => void;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

export function useTooltip() {
  const ctx = useContext(TooltipContext);
  if (!ctx) {
    throw new Error("useTooltip must be used within TooltipProvider");
  }
  return ctx;
}

export function TooltipProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);
  const anchorRef = useRef<HTMLElement | null>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const applyPosition = useCallback(() => {
    const el = anchorRef.current;
    const portal = portalRef.current;
    if (!el || !portal || content === null) return;

    const r = el.getBoundingClientRect();
    const anchorCenter = r.left + r.width / 2;
    const gap = 8;
    const margin = 12;

    portal.classList.add("is-visible");
    portal.style.visibility = "hidden";
    portal.style.left = "0px";
    portal.style.top = `${r.bottom + gap}px`;

    const pw = portal.offsetWidth;

    let left = anchorCenter - pw / 2;
    left = Math.min(Math.max(left, margin), window.innerWidth - pw - margin);

    portal.style.left = `${left}px`;
    portal.style.top = `${r.bottom + gap}px`;
    portal.style.visibility = "";

    const arrowInset = 12;
    const arrowX = Math.min(
      Math.max(anchorCenter - left, arrowInset),
      pw - arrowInset,
    );
    portal.style.setProperty("--tooltip-arrow-x", `${arrowX}px`);
  }, [content]);

  useLayoutEffect(() => {
    const portal = portalRef.current;
    if (content === null) {
      if (portal) {
        portal.classList.remove("is-visible");
        portal.style.removeProperty("--tooltip-arrow-x");
        portal.style.visibility = "";
        portal.style.left = "";
        portal.style.top = "";
      }
      return;
    }
    applyPosition();
  }, [content, applyPosition]);

  const show = useCallback((anchor: HTMLElement, node: ReactNode) => {
    anchorRef.current = anchor;
    setContent(node);
  }, []);

  const updatePosition = useCallback(() => {
    applyPosition();
  }, [applyPosition]);

  const hide = useCallback(() => {
    anchorRef.current = null;
    setContent(null);
  }, []);

  return (
    <TooltipContext.Provider value={{ show, updatePosition, hide }}>
      {children}
      <div id="tooltip-portal" ref={portalRef}>
        {content}
      </div>
    </TooltipContext.Provider>
  );
}
