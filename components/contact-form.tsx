"use client";

import { useCallback, useState } from "react";
import { contactSchema, PROJECT_TYPES } from "@/lib/contact-schema";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);

  const submit = useCallback(async () => {
    setSubmitError(null);
    setFieldErrors({});

    const parsed = contactSchema.safeParse({
      name,
      email,
      projectType,
      message,
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !next[key]) {
          next[key] = issue.message;
        }
      }
      setFieldErrors(next);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setSuccessEmail(parsed.data.email);
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, projectType, message]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
        e.preventDefault();
        void submit();
      }
    },
    [submit],
  );

  if (successEmail) {
    return (
      <div className="form-success is-visible" id="form-success">
        <span className="ok">// ✓ Got it.</span>
        <span className="info">// I&apos;ll be in touch at the email you left.</span>
        <span className="val">{successEmail}</span>
      </div>
    );
  }

  return (
    <>
      <div className="form-body" id="form-wrap">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="f-name">Name</label>
            <input
              id="f-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldErrors.name ? "input-error" : undefined}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "err-name" : undefined}
            />
            {fieldErrors.name ? (
              <span id="err-name" className="form-error-inline" role="alert">
                {fieldErrors.name}
              </span>
            ) : null}
          </div>
          <div className="form-field">
            <label htmlFor="f-email">Email</label>
            <input
              id="f-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
              className={fieldErrors.email ? "input-error" : undefined}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "err-email" : undefined}
            />
            {fieldErrors.email ? (
              <span id="err-email" className="form-error-inline" role="alert">
                {fieldErrors.email}
              </span>
            ) : null}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="f-type">Project type</label>
          <select
            id="f-type"
            name="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            onKeyDown={onKeyDown}
            aria-invalid={Boolean(fieldErrors.projectType)}
            aria-describedby={
              fieldErrors.projectType ? "err-type" : undefined
            }
          >
            <option value="" disabled>
              Select one
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {fieldErrors.projectType ? (
            <span id="err-type" className="form-error-inline" role="alert">
              {fieldErrors.projectType}
            </span>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="f-msg">Tell me about your project</label>
          <textarea
            id="f-msg"
            name="message"
            placeholder="Brief description, timeline, anything useful…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "err-msg" : undefined}
          />
          {fieldErrors.message ? (
            <span id="err-msg" className="form-error-inline" role="alert">
              {fieldErrors.message}
            </span>
          ) : null}
        </div>

        {submitError ? (
          <div className="form-field" role="alert">
            <span className="form-error-inline">{submitError}</span>
          </div>
        ) : null}

        <div className="form-actions">
          <span className="form-note">// no obligation, just a conversation</span>
          <button
            type="button"
            className="form-btn"
            onClick={() => void submit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Start a Project"}
          </button>
        </div>
      </div>
    </>
  );
}
