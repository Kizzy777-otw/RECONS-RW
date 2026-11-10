create table public.farmers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null default '',
  location text not null default '',
  joined_at date,
  source text not null default 'manual'
    check (source in ('manual', 'salesforce', 'google_forms')),
  external_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source, external_id)
);

create table public.contracts (
  id uuid primary key default gen_random_uuid(),
  contract_number text not null unique,
  farmer_id uuid not null references public.farmers(id) on delete restrict,
  model text not null default '',
  signed_at date,
  source text not null default 'manual'
    check (source in ('manual', 'salesforce', 'google_forms')),
  external_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source, external_id)
);

create table public.issues (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid references public.farmers(id) on delete set null,
  phone text not null default '',
  message text not null,
  received_at timestamptz not null default now(),
  status text not null default 'New'
    check (status in ('New', 'In progress', 'Resolved')),
  source text not null default 'manual'
    check (source in ('manual', 'sms', 'salesforce', 'google_forms')),
  external_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source, external_id)
);

create table public.contract_notes (
  id uuid primary key default gen_random_uuid(),
  contract_number text not null references public.contracts(contract_number) on delete cascade,
  text text not null check (length(trim(text)) > 0),
  author text not null,
  created_at timestamptz not null default now()
);

create index farmers_name_idx on public.farmers (name);
create index farmers_phone_idx on public.farmers (phone);
create index issues_received_at_idx on public.issues (received_at desc);
create index issues_farmer_id_idx on public.issues (farmer_id);
create index contract_notes_contract_created_idx
  on public.contract_notes (contract_number, created_at desc);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger farmers_set_updated_at
before update on public.farmers
for each row execute function public.set_updated_at();

create trigger contracts_set_updated_at
before update on public.contracts
for each row execute function public.set_updated_at();

create trigger issues_set_updated_at
before update on public.issues
for each row execute function public.set_updated_at();

alter table public.farmers enable row level security;
alter table public.contracts enable row level security;
alter table public.issues enable row level security;
alter table public.contract_notes enable row level security;

revoke all on public.farmers, public.contracts, public.issues, public.contract_notes
  from public, anon, authenticated;
grant all on public.farmers, public.contracts, public.issues, public.contract_notes
  to service_role;
