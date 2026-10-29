# nah.meter accounts on edmel.dev

nah.meter (the Android app in `ejricahuerta/nah-meter`) signs couriers in with an email link and checks
their licence here. Couriers get a 14-day trial from their first sign-in, then $5 CAD a month by Interac
e-Transfer, or free months on request. Nothing the app reads on screen ever reaches this server.

## What's here

| Path | What it does |
| --- | --- |
| `POST /api/nahmeter/auth/start` | `{email}` → sends the sign-in email |
| `POST /api/nahmeter/auth/verify` | `{token_hash}` → session + licence; the first sign-in creates the account and starts the trial |
| `POST /api/nahmeter/auth/refresh` | `{refresh_token}` → new session |
| `GET /api/nahmeter/licence` | Bearer token → trial / paid dates, pay code, price, pay address |
| `POST /api/nahmeter/account/delete` | Bearer token → deletes the account and its payments |
| `/nahmeter` | public page: what it is, price, how to pay, terms and privacy |
| `/nahmeter/auth/confirm` | where the email link lands when it doesn't open the app |
| `/nahmeter/admin` | owner only (password): accounts, record an e-Transfer, grant free months |
| `/.well-known/assetlinks.json` | lets the email link open the app (Android App Links) |

Data: `supabase/migrations/*_nahmeter.sql`, in its own `nahmeter` schema: `accounts`, `payments` and
`signin_requests`, with RLS on and no policies. Only the service role (this server) can use the schema;
`anon` and `authenticated` have no access. `nahmeter.record_payment` adds months atomically.

## One-time setup

1. **Database:** the migration is applied to the Supabase project **"default"**
   (`bkagbhgycjdtkxpaecly`, US West). It shares that project with other apps: nah.meter's tables
   live in the `nahmeter` schema, and its sign-in doesn't touch the project's auth email templates.
   **Supabase → Project Settings → Data API → Exposed schemas: add `nahmeter`** and save, or every
   call fails with "Invalid schema: nahmeter". Exposing it doesn't open it to the public key: only
   the service role has access.
2. **Sign-in emails** are made here (`auth.admin.generateLink`) and sent through Resend with the
   contact form's `RESEND_API_KEY` and `RESEND_FROM`, from "nah.meter <that address>". Limits: one
   a minute and five an hour per address (`nahmeter.signin_requests`).
3. **Vercel → Settings → Environment variables** (Production and Preview):
   - `SUPABASE_URL` = `https://bkagbhgycjdtkxpaecly.supabase.co`
   - `SUPABASE_ANON_KEY` = the project's anon key (Supabase → Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY` = the service role key (same page; secret, server only)
   - `NAHMETER_PAY_EMAIL` = `pay@edmel.dev`
   - `NAHMETER_ADMIN_PASSWORD` = a long random string (16+ characters)
   - `RESEND_API_KEY` and `RESEND_FROM` are already there for the contact form.
4. **App Links:** `public/.well-known/assetlinks.json` holds the SHA-256 of the key that signs
   `nahmeter.apk` (read from the published release). If the signing key ever changes, update it.
5. **Moving to its own project later** (e.g. Canada, once a free slot or Pro is available): create
   it, run `supabase/migrations/*_nahmeter.sql`, expose the `nahmeter` schema, change the three
   `SUPABASE_*` values, and update the privacy policy's "Where".

## Recording payments

Interac e-Transfers arrive at `NAHMETER_PAY_EMAIL` with the courier's pay code in the message. Open
`/nahmeter/admin`, enter the code and the amount: every full $5 adds a month, starting after the trial
or the current paid date, whichever is later. "Grant free months" does the same at $0 with a note.
The app picks it up on its next check, or when the courier taps Check again.
