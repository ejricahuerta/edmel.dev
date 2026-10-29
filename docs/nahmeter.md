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

Data: `supabase/migrations/*_nahmeter.sql` (two tables, RLS on with no policies, so only this server
can read or write them; `nahmeter_record_payment` adds months atomically).

## One-time setup

1. **Supabase project** in region Canada (Central), so data stays in Canada. Run the migration in the
   SQL editor (or `supabase db push`).
2. **Authentication → URL configuration:** Site URL `https://edmel.dev`; add
   `https://edmel.dev/nahmeter/auth/confirm` and `https://www.edmel.dev/nahmeter/auth/confirm` to the
   redirect URLs.
3. **Authentication → Email templates:** in both "Confirm signup" and "Magic link", make the link:

   ```html
   <a href="{{ .SiteURL }}/nahmeter/auth/confirm?token_hash={{ .TokenHash }}&type=email">Sign in to nah.meter</a>
   ```

   Subject: "Sign in to nah.meter".
4. **Authentication → SMTP:** use Resend (host `smtp.resend.com`, port 465, user `resend`, password a
   Resend API key, sender on the verified edmel.dev domain). Supabase's built-in email only sends a few
   emails an hour.
5. **Vercel → Settings → Environment variables:** the values in `.env.example` under "nah.meter".
6. **App Links:** `public/.well-known/assetlinks.json` holds the SHA-256 of the key that signs
   `nahmeter.apk` (read from the published release). If the signing key ever changes, update it.

## Recording payments

Interac e-Transfers arrive at `NAHMETER_PAY_EMAIL` with the courier's pay code in the message. Open
`/nahmeter/admin`, enter the code and the amount: every full $5 adds a month, starting after the trial
or the current paid date, whichever is later. "Grant free months" does the same at $0 with a note.
The app picks it up on its next check, or when the courier taps Check again.
