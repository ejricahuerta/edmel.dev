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
    summary: "can't add features without breaking what's there",
    detail: [
      {
        type: "p",
        text: "New work touches old code paths nobody fully remembers. Without tests or clear seams, every deploy feels like roulette.",
      },
      {
        type: "bullets",
        lead: "What helps is tightening boundaries first:",
        items: [
          "smaller changes",
          "observable behavior",
          "coverage where risk lives",
        ],
      },
      {
        type: "p",
        text: "Then you ship features in slices instead of big bangs.",
      },
    ],
  },
  {
    id: "002",
    fileLabel: "issue-002.md",
    summary: "every change needs a developer you no longer have",
    detail: [
      {
        type: "p",
        text: "The system made sense to one person or one agency. They’re not in Slack anymore, and the repo never had a tour guide.",
      },
      {
        type: "bullets",
        lead: "I treat handoff as part of delivery:",
        items: [
          "sane structure",
          "notes where they matter",
          "a codebase the next person can run without a séance",
        ],
      },
    ],
  },
  {
    id: "003",
    fileLabel: "issue-003.md",
    summary: "site works but nobody inside the business can touch it",
    detail: [
      {
        type: "p",
        text: "Marketing can’t fix copy. Ops can’t tweak a field. Everything routes through “someone technical” who isn’t on payroll.",
      },
      {
        type: "p",
        text: "You don’t always need a full CMS. Sometimes it’s guardrails, admin surfaces, or content hooks that match how your team actually works.",
      },
    ],
  },
  {
    id: "004",
    fileLabel: "issue-004.md",
    summary: "outgrown the platform, and a rebuild feels too risky",
    detail: [
      {
        type: "p",
        text: "The starter stack carried you far. Now it fights your workflows, and a ground-up rewrite sounds expensive and scary.",
      },
      {
        type: "bullets",
        lead: "The middle path is often a phased move:",
        items: [
          "stabilize what pays the bills",
          "extract the worst bottlenecks",
          "replace in chunks instead of freezing the business for a big bang",
        ],
      },
    ],
  },
  {
    id: "005",
    fileLabel: "issue-005.md",
    summary: "paying monthly for a tool that's in the way",
    detail: [
      {
        type: "p",
        text: "Subscriptions pile up. Each one promised speed, but together they’re friction, export limits, and workarounds.",
      },
      {
        type: "p",
        text: "A tighter stack you own can cost less in dollars and less in context-switching. The goal isn’t dogma; it’s fewer tools that actually fit the job.",
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
