Rescue engineering for apps that outgrew the demo. The brand runs on one idea: **problems get a squiggle, fixes get a straight line.** Everything here — the Fixline logo, the warning underlines, the issue tracker, the lime highlighter — tells that story. Dark ("Night shift") is the default theme; "Paper" is the light theme for case studies, print and people who prefer it.

## Wiring

How this folder reaches the running site (`edmel.dev`, Next.js App Router, no Tailwind — vanilla CSS with custom properties):

- **`tokens.json` is the source of truth.** `tokens.css` is its generated CSS form, kept here for reference. The app does **not** import either: the `:root` / `[data-theme="light"]` values are inlined at the top of `app/globals.css`, which also carries every `ed-*` component rule. Change a token here, mirror it there.
- **Fonts come from `next/font/local`** in `app/layout.tsx`, reading `app/fonts/*.woff2`. That is why `app/globals.css` deliberately omits `--font-display` / `--font-mono` and the `@font-face` rules that `tokens.css` declares — Next supplies those variables on `<html>`. The `@font-face` block in `tokens.css` is reference only.
- **Components are React, in the app.** Shared primitives live in `components/ui.tsx` (`Logo`, `Fixline`, `Arrow`, `Button`, `SectionLabel`, `Mark`, `StatusPill`, `Chips`, `Window`, `SpecList`, `Section`); the stateful ones have their own files (`site-nav.tsx`, `site-footer.tsx`, `hero-prompt.tsx` = AskPrompt, `contact-form.tsx` = RescueForm, `known-issues.tsx` = IssueList, `ticker.tsx`, `squiggle.tsx`, `reveal.tsx`, `case-study/*`). `components/index.d.ts` is the prop contract they follow.
- **Theme** defaults to `data-theme="dark"` on `<html>`, with a pre-paint inline script in `app/layout.tsx` reading `localStorage.theme` so Paper users get no dark flash.
- There is no JS component bundle. An earlier `window.React` reference build was dropped because the Next app cannot consume it and its CSS duplicated `app/globals.css`.

## Voice

- **Developer-honest, never cute for its own sake.** Short declaratives. Name the failure, then the fix: "Auth, RLS, secrets, API routes. Stop treating 'it works in the demo' as a security model."
- **First person singular.** Edmel is one engineer: "I de-slop the UI", "I close them." Never "we", never "our team".
- **Sentence case** for headlines and buttons' source text (buttons render uppercase via `mono-label`). No Title Case.
- **The `//` voice** is for asides only: availability, hints, captions, numbering — set in `mono-comment` or `mono-label`, coloured `ink-comment`. `///` opens a section label. Do not put sentences of body copy in mono.
- **Vocabulary the brand owns:** rescue, de-slop, lock down, stabilize, vibe-coded, production-ready, known issues, triage, "the demo vs. the product". Avoid generic agency words: *solutions, leverage, seamless, cutting-edge, passionate*.
- **No emoji.** Status glyphs are typographic: ✕ open · ◐ in progress · ✓ resolved · ↗ external · → internal.
- Real numbers only (138k lines, 186 test files, 0 payment processors). Never invent a stat.

Examples to quote: "Enterprise quality. Startup speed." · "Don't ship the demo as the product." · "Your app has 5 known issues. I close them." · "// hit enter to start a rescue conversation".

## Colour

- Set every page on `surface-0`. Separate sections with a `line` hairline and space, not tinted bands. Raised things (Window bodies, hover) use `surface-1`; title bars, ticker and inputs use `surface-2`.
- `ink` for headlines and body; `ink-muted` for ledes, descriptions and the quiet half of a two-tone headline ("Startup" in `ink-muted`, "speed." in `ink` + Mark).
- **Lime is the fix.** `brand` is a fill and a mark (Fixline, highlighter, mark tile, resolved dot). For lime *text* use `brand-ink` — it drops to olive on Paper, where raw lime fails contrast.
- The primary button is `action` / `on-action`: lime-on-ink at night, ink-with-lime-label on paper. One primary per view.
- Status colours always travel with a word and a glyph: `error` = open / error squiggle, `info` = in progress, `brand-ink` = resolved, `warn` = warning squiggle. `error` and `brand` differ by 3:1+ in lightness in both themes, so status never depends on hue alone.
- Focus is a 2px solid `focus` ring, offset 2px, on every interactive element. It is 11:1 or better on every surface in both themes.
- Never use gradients, purple, or blue-to-purple anything. The old VS Code syntax palette (keyword blue, string orange, function yellow) is retired.

## Type

- **Bricolage Grotesque** (variable, opsz 12–96, wght 200–800) for everything readable: display, headings, body. Its optical-size axis matters — display styles run at opsz 96 (tight, characterful), body at opsz 14 (open, sturdy).
- **IBM Plex Mono** for the developer voice: labels, filenames, specs, URLs, buttons, comments (true italic for `mono-comment`).
- Hero: `display-xl` (76px desktop → 44px on phones). Case study / CTA: `display-l`. Sections: `heading-1`; service and product names: `heading-2`; card titles: `heading-3`. Ledes `body-l`, paragraphs `body`, footers `body-s`.
- **12px is the floor.** The old site's 9–10px mono labels are gone; `mono-label` is 12px with 0.08em tracking. Body never drops below 16px on mobile (inputs are 16px so iOS does not zoom).
- Keep paragraphs to `measure` (34em).
- Two-tone headlines: first clause `ink`, second clause `ink-muted`, the key word wrapped in Mark.

## Layout & spacing

- Content sits in a `page-max` (1240px) column framed by two full-height `line` rails — the brand's "editor margins". Gutters: `space-4` on phones, `space-6` from 720px.
- Section rhythm: `space-8` vertical padding on mobile, `space-9` on desktop; `space-7` between a SectionLabel and its content.
- Grids are drawn with 1px `line` gaps (ServiceGrid, StatStrip, ProductList): cells, not floating cards.
- Breakpoints: 560 (two-up form fields), 720 (tablet: gutters, two-column grids), 900 (desktop nav, three-up stats), 1000 (two-column hero), 1100 (full display sizes).
- Everything is square (`radius-0`). Rounding is reserved: `radius-pill` for the Ask bar, its send button and StatusPill; `radius-md` for the mark tile and screenshot frames; `radius-sm` for chips and tooltips.
- Nothing resting on the page casts a shadow. `shadow-pop` only for floating layers (dialog, tooltip, mobile sheet).

## Mobile

- Touch targets are 44px minimum (buttons, nav icons, issue rows, choice chips 40px).
- Under 900px the nav collapses to theme toggle + menu button; the menu opens a full-width sheet with 22px links and a block "Start a rescue" button.
- Hero stacks: copy, actions (stacked), then the Ask prompt. Product cards stack name over description. Issue rows put the status pill on the id line and let the summary wrap.
- Window title bars wrap their `// meta` to a second line rather than truncating the filename.
- The Ticker scrolls; under `prefers-reduced-motion` it becomes a static wrapped list. All motion (reveal, blink, ticker) respects reduced motion.

## Motion

140ms for hover/press, 240ms for dialog and sheet, 600ms for scroll reveal (fade + 8px rise). No parallax, no bounce.

## Logo & Fixline

- The **Fixline** is the signature: a squiggle that resolves into a straight line. Use it under the wordmark, under an accent stat, or as a divider — never as a background pattern.
- **Lockup** (mark + wordmark) in the nav when there is no portrait; with the portrait, use the wordmark alone beside it. **Mark** alone for favicons, avatars and social tiles (lime tile on any ground; ink tile on Paper only).
- Use the `Logo` component in product UI (it follows the theme). The SVG files in Logos are for outside use: `-dark` on dark grounds, `-light` on light grounds. Minimum: wordmark 24px tall, mark 16px.
- Don't recolour the wordmark, stretch it, add effects, or set "edmel.dev" in another typeface.

## Iconography

- No icon library. Directional and status glyphs are text characters set in the current font: → (internal link), ↗ (external), ✕, ◐, ✓, ▲ (warning), ☀ / ☾ (theme), ≡ (menu).
- The only drawn icon is the send arrow in AskPrompt (24px grid, 2.2 stroke, `currentColor`).

## Imagery

- The portrait is black-and-white and stays that way (`grayscale(1)`); it appears at 32px in the nav and up to 360px on an about block.
- Product screenshots sit in a `radius-md` frame with a `line-strong` border; phones get a 6px `surface-3` bezel. Always add a `// caption` and real alt text describing what's on screen.

## Components & pages

Build with the components in this system: Logo, Fixline, Button, SectionLabel, Squiggle, Mark, Fix, StatusPill, Chips, Window, AskPrompt, RescueForm, Ticker, ServiceGrid, ProductCard, IssueList, StatStrip, SpecList, Shot, Decision, CTABlock, SiteNav, SiteFooter.

The Pages group shows three home-page variations to choose from — **A · Diagnostics** (the evolved current site), **B · Issue tracker** (the bug list is the hero), **C · Diff** (before/after) — plus the 6ixBack case study and a Start-a-rescue contact page, each at desktop width and on a 390px phone, in both themes.
