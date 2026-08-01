"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "@/components/reveal";

type IssueDetailBlock =
  | { type: "p"; text: string }
  | { type: "bullets"; lead: string; items: string[] };

type KnownIssue = {
  id: string;
  fileLabel: string;
  summary: string;
  detail: IssueDetailBlock[];
};

function IssueDetailBlocks({ blocks }: { blocks: IssueDetailBlock[] }) {
  return blocks.map((block, i) => {
    if (block.type === "p") {
      return <p key={i}>{block.text}</p>;
    }
    return (
      <div key={i} className="issue-detail-block">
        <p>{block.lead}</p>
        <ul className="dash-list">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      </div>
    );
  });
}

const ISSUES: KnownIssue[] = [
  {
    id: "001",
    fileLabel: "issue-001.md",
    summary: "UI looks like every other AI app",
    detail: [
      {
        type: "p",
        text: "Inter, purple gradients, identical card stacks. Users can tell it was generated before they read a word.",
      },
      {
        type: "bullets",
        lead: "De-slop means intentional design:",
        items: [
          "typography and layout that match the brand",
          "one clear composition per screen",
          "UI that feels built, not prompted",
        ],
      },
    ],
  },
  {
    id: "002",
    fileLabel: "issue-002.md",
    summary: "tables and auth are wide open",
    detail: [
      {
        type: "p",
        text: 'The demo works because everything is public. RLS is missing, roles are fuzzy, and "logged in" is not the same as authorized.',
      },
      {
        type: "bullets",
        lead: "Lock it down properly:",
        items: [
          "row-level security that matches real users",
          "auth flows that don't trust the client",
          "API routes that check who is asking",
        ],
      },
    ],
  },
  {
    id: "003",
    fileLabel: "issue-003.md",
    summary: "secrets and keys live in the client",
    detail: [
      {
        type: "p",
        text: "Service keys, OpenAI tokens, or admin URLs ended up in the browser bundle. It worked in Cursor. It is a liability in production.",
      },
      {
        type: "p",
        text: "I move secrets server-side, rotate what leaked, and leave a setup the next deploy won't undo.",
      },
    ],
  },
  {
    id: "004",
    fileLabel: "issue-004.md",
    summary: "AI breaks three things when you add one",
    detail: [
      {
        type: "p",
        text: "Each prompt patches a symptom and rewrites something that worked. No seams, no tests, no map of what is safe to touch.",
      },
      {
        type: "bullets",
        lead: "Stabilize first:",
        items: [
          "boundaries where the AI pasted chaos",
          "coverage where risk lives",
          "changes you can ship without roulette",
        ],
      },
    ],
  },
  {
    id: "005",
    fileLabel: "issue-005.md",
    summary: "demo works, real users scare you",
    detail: [
      {
        type: "p",
        text: "Friends said it looked cool. Paying users mean edge cases, data you can't lose, and a product that has to stay up.",
      },
      {
        type: "p",
        text: "I harden what can be saved and rebuild what can't, so you can keep shipping without freezing the business for a rewrite.",
      },
    ],
  },
];

export function KnownIssues() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    setPortalEl(document.body);
  }, []);

  const open = useCallback((id: string) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openId, close]);

  const active = openId ? ISSUES.find((i) => i.id === openId) : null;

  const modal =
    active && portalEl ? (
      <div
        className="issue-modal-backdrop"
        role="presentation"
        onClick={close}
      >
        <div
          className="form-card issue-modal-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="form-header">
            <div className="form-header-dot" />
            <span className="form-header-label" id={titleId}>
              {active.fileLabel}
            </span>
            <button
              ref={closeRef}
              type="button"
              className="issue-modal-close"
              onClick={close}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="issue-modal-body">
            <p className="issue-modal-summary">
              <span className="tt-type">#{active.id}</span>
              {"  "}
              {active.summary}
            </p>
            <IssueDetailBlocks blocks={active.detail} />
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <Reveal>
        <div className="known-issues-rows">
          {ISSUES.map((issue) => (
            <button
              key={issue.id}
              type="button"
              className="prod-desc known-issue-trigger"
              onClick={() => open(issue.id)}
              aria-haspopup="dialog"
              aria-expanded={openId === issue.id}
            >
              <span className="tt-type">#{issue.id}</span>
              {"  "}
              {issue.summary}
            </button>
          ))}
        </div>
        <div className="known-issues-foot">
          <div className="svc-n">// assigned to: edmel</div>
          <div className="svc-n">// status: open → in progress</div>
        </div>
      </Reveal>
      {portalEl && modal ? createPortal(modal, portalEl) : null}
    </>
  );
}
