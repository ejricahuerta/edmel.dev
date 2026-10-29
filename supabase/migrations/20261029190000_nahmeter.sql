-- nah.meter accounts, in their own schema so they stay apart from the other apps in this project.
-- A 14-day trial from the first sign-in, then $5/month by Interac e-Transfer (or free months on
-- request). Only the edmel.dev server (service role) can use this schema: anon and authenticated get
-- nothing. Add "nahmeter" to Settings -> Data API -> Exposed schemas so the server can reach it.

create schema if not exists nahmeter;

revoke all on schema nahmeter from public, anon, authenticated;
grant usage on schema nahmeter to service_role;

create table nahmeter.accounts (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now(),
  trial_ends_at timestamptz not null default (now() + interval '14 days'),
  paid_until timestamptz,
  -- Put in the e-Transfer message so a payment can be matched to its account.
  pay_code text not null unique
);

create table nahmeter.payments (
  id bigint generated always as identity primary key,
  user_id uuid not null references nahmeter.accounts (user_id) on delete cascade,
  amount_cents integer not null check (amount_cents >= 0),
  months integer not null check (months between 1 and 24),
  received_on date not null default current_date,
  etransfer_ref text,
  note text,
  created_at timestamptz not null default now()
);

create index payments_user_idx on nahmeter.payments (user_id);

-- Sign-in emails sent, so one address can't be flooded (edmel.dev sends them through Resend).
create table nahmeter.signin_requests (
  id bigint generated always as identity primary key,
  email text not null,
  created_at timestamptz not null default now()
);

create index signin_requests_email_idx on nahmeter.signin_requests (email, created_at desc);

alter table nahmeter.accounts enable row level security;
alter table nahmeter.payments enable row level security;
alter table nahmeter.signin_requests enable row level security;

grant all on all tables in schema nahmeter to service_role;
grant all on all sequences in schema nahmeter to service_role;

-- Adds months (paid, or free on request) and records the payment in one step. Months start from the
-- latest of now, the end of the trial and the current paid date, so paying early loses nothing.
create or replace function nahmeter.record_payment(
  p_user uuid,
  p_months integer,
  p_amount_cents integer,
  p_ref text,
  p_note text
) returns timestamptz
language plpgsql
security definer
set search_path = nahmeter
as $$
declare
  new_until timestamptz;
begin
  update nahmeter.accounts
     set paid_until = greatest(now(), trial_ends_at, coalesce(paid_until, now())) + make_interval(months => p_months)
   where user_id = p_user
  returning paid_until into new_until;

  if new_until is null then
    raise exception 'No nah.meter account for %', p_user;
  end if;

  insert into nahmeter.payments (user_id, amount_cents, months, etransfer_ref, note)
  values (p_user, p_amount_cents, p_months, p_ref, p_note);

  return new_until;
end;
$$;

revoke all on function nahmeter.record_payment(uuid, integer, integer, text, text) from public, anon, authenticated;
grant execute on function nahmeter.record_payment(uuid, integer, integer, text, text) to service_role;
