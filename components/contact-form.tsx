"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui";
import { contactSchema, PROJECT_TYPES } from "@/lib/contact-schema";

type ContactFormProps = {
  initialMessage?: string;
};

export function ContactForm({ initialMessage = "" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState(initialMessage);
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
      <div className="ed-success" role="status" id="form-success">
        <div className="ok">{"\u2713"} request received</div>
        <div>
          <span className="k">reply_to: </span>
          <span className="v">{successEmail}</span>
        </div>
        <div className="c">// I&apos;ll be in touch at the email you left.</div>
      </div>
    );
  }

  return (
    <div className="ed-form" id="form-wrap">
      <div className="ed-row2">
        <div className={fieldErrors.name ? "ed-field has-error" : "ed-field"}>
          <label htmlFor="f-name">Name</label>
          <input
            id="f-name"
            className="ed-input"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "err-name" : undefined}
          />
          {fieldErrors.name ? (
            <span id="err-name" className="ed-field-error" role="alert">
              {fieldErrors.name}
            </span>
          ) : null}
        </div>
        <div className={fieldErrors.email ? "ed-field has-error" : "ed-field"}>
          <label htmlFor="f-email">Email</label>
          <input
            id="f-email"
            className="ed-input"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="jane@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={onKeyDown}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "err-email" : undefined}
          />
          {fieldErrors.email ? (
            <span id="err-email" className="ed-field-error" role="alert">
              {fieldErrors.email}
            </span>
          ) : null}
        </div>
      </div>

      <div className={fieldErrors.projectType ? "ed-field has-error" : "ed-field"}>
        <span className="ed-field-label" id="f-type-label">
          What do you need?
        </span>
        <div
          className="ed-choices"
          role="radiogroup"
          aria-labelledby="f-type-label"
          aria-describedby={fieldErrors.projectType ? "err-type" : undefined}
        >
          {PROJECT_TYPES.map((t) => (
            <label key={t} className="ed-choice">
              <input
                type="radio"
                name="projectType"
                value={t}
                checked={projectType === t}
                onChange={() => setProjectType(t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
        {fieldErrors.projectType ? (
          <span id="err-type" className="ed-field-error" role="alert">
            {fieldErrors.projectType}
          </span>
        ) : null}
      </div>

      <div className={fieldErrors.message ? "ed-field has-error" : "ed-field"}>
        <label htmlFor="f-msg">What&apos;s broken?</label>
        <textarea
          id="f-msg"
          className="ed-input"
          name="message"
          placeholder="Stack, what looks like slop, what's insecure, anything useful…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "err-msg" : undefined}
        />
        {fieldErrors.message ? (
          <span id="err-msg" className="ed-field-error" role="alert">
            {fieldErrors.message}
          </span>
        ) : null}
      </div>

      {submitError ? (
        <p className="ed-form-alert" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="ed-form-actions">
        <span className="ed-comment">// no obligation, just a conversation</span>
        <Button onClick={() => void submit()} disabled={isSubmitting} arrow={!isSubmitting}>
          {isSubmitting ? "Sending…" : "Get it production-ready"}
        </Button>
      </div>
    </div>
  );
}
