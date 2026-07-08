-- Credit Repair OS schema
-- Run in Supabase SQL Editor or via migration

create extension if not exists "pgcrypto";

-- ─── Clients ───────────────────────────────────────────────────────────────

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  date_of_birth date,
  ssn_last4 text,
  status text not null default 'active' check (status in ('active', 'paused', 'completed')),
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  zip text,
  notes text,
  created_by text default 'admin'
);

create index if not exists clients_email_idx on clients (email);
create index if not exists clients_status_idx on clients (status);

-- ─── Credit Reports ────────────────────────────────────────────────────────

create table if not exists credit_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_id uuid not null references clients (id) on delete cascade,
  bureau text not null check (bureau in ('experian', 'equifax', 'transunion', 'merged')),
  file_url text,
  file_name text,
  uploaded_at timestamptz not null default now(),
  uploaded_by text default 'admin',
  status text not null default 'pending_review' check (status in ('pending_review', 'reviewed', 'archived')),
  review_notes text,
  score_experian integer,
  score_equifax integer,
  score_transunion integer
);

create index if not exists credit_reports_client_id_idx on credit_reports (client_id);

-- ─── Negative Items ────────────────────────────────────────────────────────

create table if not exists negative_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_id uuid not null references clients (id) on delete cascade,
  credit_report_id uuid references credit_reports (id) on delete set null,
  creditor_name text not null,
  account_number text,
  bureau text not null check (bureau in ('experian', 'equifax', 'transunion', 'all')),
  item_type text not null default 'other' check (
    item_type in (
      'collection',
      'charge_off',
      'late_payment',
      'inquiry',
      'public_record',
      'repossession',
      'foreclosure',
      'other'
    )
  ),
  status text not null default 'identified' check (
    status in ('identified', 'disputing', 'removed', 'verified')
  ),
  balance numeric(12, 2),
  date_opened date,
  date_of_last_activity date,
  notes text
);

create index if not exists negative_items_client_id_idx on negative_items (client_id);

-- ─── Disputes ──────────────────────────────────────────────────────────────

create table if not exists disputes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_id uuid not null references clients (id) on delete cascade,
  negative_item_id uuid not null references negative_items (id) on delete cascade,
  status text not null default 'not_started' check (
    status in (
      'not_started',
      'drafted',
      'sent',
      'waiting_response',
      'removed',
      'verified',
      'escalated'
    )
  ),
  round_number integer not null default 1,
  reason text,
  method text default 'mail' check (method in ('mail', 'online')),
  sent_at timestamptz,
  response_due_at timestamptz,
  resolved_at timestamptz,
  notes text
);

create index if not exists disputes_client_id_idx on disputes (client_id);
create index if not exists disputes_status_idx on disputes (status);

-- ─── Dispute Letters ───────────────────────────────────────────────────────

create table if not exists dispute_letters (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  dispute_id uuid not null references disputes (id) on delete cascade,
  client_id uuid not null references clients (id) on delete cascade,
  template_type text not null,
  content text not null,
  generated_at timestamptz not null default now(),
  sent_at timestamptz,
  delivery_method text default 'mail' check (delivery_method in ('mail', 'online'))
);

create index if not exists dispute_letters_dispute_id_idx on dispute_letters (dispute_id);

-- ─── Client Documents ──────────────────────────────────────────────────────

create table if not exists client_documents (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_id uuid not null references clients (id) on delete cascade,
  document_type text not null check (
    document_type in (
      'id',
      'ssn_card',
      'proof_of_address',
      'credit_report',
      'other'
    )
  ),
  file_url text,
  file_name text not null,
  uploaded_at timestamptz not null default now(),
  uploaded_by text default 'client'
);

create index if not exists client_documents_client_id_idx on client_documents (client_id);

-- ─── Consent Forms ─────────────────────────────────────────────────────────

create table if not exists consent_forms (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_id uuid not null references clients (id) on delete cascade,
  form_type text not null default 'credit_repair_authorization',
  signed_at timestamptz,
  signature_name text,
  ip_address text,
  document_url text,
  status text not null default 'pending' check (status in ('pending', 'signed', 'revoked'))
);

create index if not exists consent_forms_client_id_idx on consent_forms (client_id);

-- ─── Audit Logs ────────────────────────────────────────────────────────────

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_id uuid references clients (id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  actor text not null default 'system',
  metadata jsonb default '{}'::jsonb
);

create index if not exists audit_logs_client_id_idx on audit_logs (client_id);
create index if not exists audit_logs_entity_idx on audit_logs (entity_type, entity_id);
create index if not exists audit_logs_created_at_idx on audit_logs (created_at desc);

-- ─── IdentityIQ Enrollments ────────────────────────────────────────────────

create table if not exists identityiq_enrollments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_id uuid not null unique references clients (id) on delete cascade,
  status text not null default 'pending' check (
    status in ('pending', 'enrolled', 'active', 'sync_failed')
  ),
  member_reference text,
  enrollment_url text,
  enrolled_at timestamptz,
  last_sync_at timestamptz,
  last_summary jsonb,
  metadata jsonb default '{}'::jsonb
);

create index if not exists identityiq_enrollments_client_id_idx
  on identityiq_enrollments (client_id);

-- ─── Updated-at trigger ────────────────────────────────────────────────────

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger clients_updated_at before update on clients
  for each row execute function set_updated_at();
create trigger credit_reports_updated_at before update on credit_reports
  for each row execute function set_updated_at();
create trigger negative_items_updated_at before update on negative_items
  for each row execute function set_updated_at();
create trigger disputes_updated_at before update on disputes
  for each row execute function set_updated_at();
create trigger identityiq_enrollments_updated_at before update on identityiq_enrollments
  for each row execute function set_updated_at();

-- ─── Storage bucket (run separately if using Storage UI) ─────────────────────
-- insert into storage.buckets (id, name, public) values ('credit-documents', 'credit-documents', false);

-- ─── RLS (permissive for development — tighten before production) ──────────

alter table clients enable row level security;
alter table credit_reports enable row level security;
alter table negative_items enable row level security;
alter table disputes enable row level security;
alter table dispute_letters enable row level security;
alter table client_documents enable row level security;
alter table consent_forms enable row level security;
alter table audit_logs enable row level security;
alter table identityiq_enrollments enable row level security;

create policy "Allow all for authenticated" on clients for all using (true) with check (true);
create policy "Allow all for authenticated" on credit_reports for all using (true) with check (true);
create policy "Allow all for authenticated" on negative_items for all using (true) with check (true);
create policy "Allow all for authenticated" on disputes for all using (true) with check (true);
create policy "Allow all for authenticated" on dispute_letters for all using (true) with check (true);
create policy "Allow all for authenticated" on client_documents for all using (true) with check (true);
create policy "Allow all for authenticated" on consent_forms for all using (true) with check (true);
create policy "Allow all for authenticated" on audit_logs for all using (true) with check (true);
create policy "Allow all for authenticated" on identityiq_enrollments for all using (true) with check (true);
