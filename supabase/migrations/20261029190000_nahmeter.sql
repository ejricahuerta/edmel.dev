-- nah.meter accounts: a 14-day trial from the first sign-in, then $5/month paid by Interac e-Transfer
-- (or free months on request). Only the edmel.dev server (service role) reads or writes these tables.

create table public.nahmeter_accounts (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now(),
  trial_ends_at timestamptz not null default (now() + interval '14 days'),
  paid_until timestamptz,
  -- Put in the e-Transfer message so a payment can be matched to its account.
  pay_code text not null unique
);

create table public.nahmeter_payments (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.nahmeter_accounts (user_id) on delete cascade,
  amount_cents integer not null check (amount_cents >= 0),
  months integer not null check (months between 1 and 24),
  received_on date not null default current_date,
  etransfer_ref text,
  note text,
  created_at timestamptz not null default now()
);

create index nahmeter_payments_user_idx on public.nahmeter_payments (user_id);

-- RLS on with no policies: the anon and authenticated roles can't touch these tables at all.
alter table public.nahmeter_accounts enable row level security;
alter table public.nahmeter_payments enable row level security;

-- Adds months (paid, or free on request) and records the payment in one step. Months start from the
-- latest of now, the end of the trial and the current paid date, so paying early loses nothing.
create or replace function public.nahmeter_record_payment(
  p_user uuid,
  p_months integer,
  p_amount_cents integer,
  p_ref text,
  p_note text
) returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  new_until timestamptz;
begin
  update public.nahmeter_accounts
     set paid_until = greatest(now(), trial_ends_at, coalesce(paid_until, now())) + make_interval(months => p_months)
   where user_id = p_user
  returning paid_until into new_until;

  if new_until is null then
    raise exception 'No nah.meter account for %', p_user;
  end if;

  insert into public.nahmeter_payments (user_id, amount_cents, months, etransfer_ref, note)
  values (p_user, p_amount_cents, p_months, p_ref, p_note);

  return new_until;
end;
$$;

revoke all on function public.nahmeter_record_payment(uuid, integer, integer, text, text) from public, anon, authenticated;
