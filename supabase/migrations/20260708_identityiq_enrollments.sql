-- IdentityIQ enrollment tracking
-- Run in Supabase SQL Editor if table does not exist yet

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

create trigger identityiq_enrollments_updated_at before update on identityiq_enrollments
  for each row execute function set_updated_at();

alter table identityiq_enrollments enable row level security;

create policy "Allow all for authenticated" on identityiq_enrollments
  for all using (true) with check (true);
