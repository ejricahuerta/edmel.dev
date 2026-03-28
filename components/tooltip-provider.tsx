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
    let left = r.left;
    const top = r.bottom + 10;
    portal.style.left = `${left}px`;
    portal.style.top = `${top}px`;
    portal.classList.add("is-visible");
    const pw = portal.offsetWidth;
    if (left + pw > window.innerWidth - 12) {
      portal.style.left = `${window.innerWidth - pw - 12}px`;
    }
  }, [content]);

  useLayoutEffect(() => {
    if (content === null) {
      portalRef.current?.classList.remove("is-visible");
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
