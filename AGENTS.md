# AGENTS.md

## Cursor Cloud specific instructions

`edmel.dev` is a single Next.js 15 (App Router, React 19, TypeScript) portfolio/marketing site. There is no database or other backing service — the only local process is the Next.js server. The one piece of backend logic is the contact API route (`app/api/contact/route.ts`), which emails submissions via Resend.

Standard commands live in `package.json` (`dev`, `build`, `start`, `lint`). The dev server runs on port `3000`.

Non-obvious notes:

- Do NOT run `npm run build` while `npm run dev` is running. They share the `.next/` directory, and a concurrent build corrupts the running dev server (you'll see a runtime build error in the browser). If the dev server starts erroring, stop it, run `rm -rf .next`, and restart `npm run dev`.
- `npm run lint` (`next lint`) is interactive on a fresh checkout because no ESLint config is committed — it prompts you to choose a config and blocks. For a non-interactive lint + type check, use `npm run build` (Next.js runs "Linting and checking validity of types" during the build) or `npx tsc --noEmit` for types only.
- The contact form's email send requires Resend secrets: `RESEND_API_KEY`, `CONTACT_EMAIL`, and `RESEND_FROM` (see `.env.example`; put them in `.env.local`). Without them, `POST /api/contact` returns HTTP 500 `Server missing RESEND_API_KEY.` — this is expected. All pages, UI, and client-side form validation work without any env vars; only the outbound email step needs the secrets.
