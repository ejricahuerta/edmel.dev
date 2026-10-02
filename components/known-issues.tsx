"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "@/components/reveal";
import { Button, StatusPill, type Status } from "@/components/ui";

type IssueDetailBlock =
  | { type: "p"; text: string }
  | { type: "bullets"; lead: string; items: string[] };

type KnownIssue = {
  id: string;
  status: Status;
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
      <div key={i}>
        <p>{block.lead}</p>
        <ul className="ed-dash">
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
    status: "open",
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
    status: "open",
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
    status: "progress",
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
    status: "progress",
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
    status: "resolved",
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
      if (e.key === "Escape") {
        const id = openId;
        close();
        requestAnimationFrame(() => {
          document.getElementById(`issue-trigger-${id}`)?.focus();
        });
      }
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openId, close]);

  const active = openId ? ISSUES.find((i) => i.id === openId) : null;

  const closeAndReturnFocus = useCallback(() => {
    const id = openId;
    close();
    if (id) {
      requestAnimationFrame(() => {
        document.getElementById(`issue-trigger-${id}`)?.focus();
      });
    }
  }, [openId, close]);

  const counts = ISSUES.reduce(
    (acc, i) => ({ ...acc, [i.status]: acc[i.status] + 1 }),
    { open: 0, progress: 0, resolved: 0 } as Record<Status, number>,
  );

  const modal =
    active && portalEl ? (
      <div className="ed-scrim" role="presentation" onClick={closeAndReturnFocus}>
        <div
          className="ed-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="ed-window">
            <div className="ed-window-bar">
              <span
                className="ed-window-dot"
                style={{
                  background:
                    active.status === "resolved"
                      ? "var(--brand)"
                      : active.status === "progress"
                        ? "var(--info)"
                        : "var(--error)",
                }}
                aria-hidden
              />
              <span className="ed-window-title">{active.fileLabel}</span>
              <button
                ref={closeRef}
                type="button"
                className="ed-icon-btn"
                onClick={closeAndReturnFocus}
                aria-label="Close"
              >
                {"\u2715"}
              </button>
            </div>
            <div className="ed-window-body">
              <StatusPill status={active.status} />
              <h3 className="ed-h2" id={titleId}>
                {active.summary}
              </h3>
              <IssueDetailBlocks blocks={active.detail} />
              <div>
                <Button href="#contact" arrow onClick={close}>
                  Fix this in my app
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <Reveal>
        <ul className="ed-issues">
          {ISSUES.map((issue) => (
            <li key={issue.id} className="ed-issue">
              <button
                id={`issue-trigger-${issue.id}`}
                type="button"
                className="ed-issue-btn"
                onClick={() => open(issue.id)}
                aria-haspopup="dialog"
                aria-expanded={openId === issue.id}
              >
                <span className="ed-issue-id">#{issue.id}</span>
                <span className="ed-issue-sum">{issue.summary}</span>
                <span className="ed-issue-status">
                  <StatusPill status={issue.status} />
                </span>
                <span className="ed-issue-go" aria-hidden>
                  {"\u2192"}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="ed-issues-foot">
          <span>
            <b>{counts.open}</b> open
          </span>
          <span>
            <b>{counts.progress}</b> in progress
          </span>
          <span>
            <b>{counts.resolved}</b> resolved
          </span>
          <span>
            assigned to: <b>edmel</b>
          </span>
        </div>
      </Reveal>
      {portalEl && modal ? createPortal(modal, portalEl) : null}
    </>
  );
}
