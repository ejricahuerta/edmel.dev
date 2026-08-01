"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ContactForm } from "@/components/contact-form";

const PLACEHOLDERS = [
  "Does your app look like AI slop?",
  "Is your data actually secured?",
  "Does Cursor keep breaking what worked?",
  "Ready to make it production-ready?",
] as const;

const CYCLE_MS = 2800;

export function HeroPrompt() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(true);
  const [promptValue, setPromptValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  useEffect(() => {
    if (!isCycling || isExpanded) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const id = window.setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, CYCLE_MS);

    return () => window.clearInterval(id);
  }, [isCycling, isExpanded]);

  const expand = useCallback((message: string) => {
    setInitialMessage(message.trim());
    setIsExpanded(true);
    setIsCycling(false);
  }, []);

  const onSubmitPrompt = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const typed = promptValue.trim();
      expand(typed || PLACEHOLDERS[placeholderIndex]);
    },
    [expand, placeholderIndex, promptValue],
  );

  const onFocus = useCallback(() => {
    setIsCycling(false);
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptValue(e.target.value);
    setIsCycling(false);
  }, []);

  return (
    <div className="form-card hero-prompt-card" id="contact">
      <div className="form-header">
        <div className="form-header-dot" />
        <span className="form-header-label">
          {isExpanded ? "rescue_request.json" : "ask_edmel"}
        </span>
        {!isExpanded ? (
          <span className="form-availability">// 2 spots left this quarter</span>
        ) : null}
      </div>

      {!isExpanded ? (
        <div className="hero-prompt-body">
          <p className="hero-prompt-label">Ask edmel…</p>
          <form className="hero-prompt-bar" onSubmit={onSubmitPrompt}>
            <label htmlFor={inputId} className="sr-only">
              What should we fix in your app?
            </label>
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              className="hero-prompt-input"
              value={promptValue}
              onChange={onChange}
              onFocus={onFocus}
              placeholder={PLACEHOLDERS[placeholderIndex]}
              autoComplete="off"
            />
            <button
              type="submit"
              className="hero-prompt-send"
              aria-label="Continue"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
          <p className="hero-prompt-hint">
            // hit enter to start a rescue conversation
          </p>
        </div>
      ) : (
        <ContactForm initialMessage={initialMessage} />
      )}
    </div>
  );
}
