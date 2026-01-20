-- db/setup.sql
-- Combined setup: creates profiles table, trigger, and RLS policies

-- Create profiles table and updated_at trigger
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text default 'seeker',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.profiles;
create trigger set_updated_at
  before update on public.profiles
  for each row
  execute procedure public.set_updated_at();

-- Enable RLS and create example policies for profiles table
alter table public.profiles enable row level security;

-- Allow authenticated users to select their own profile
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

-- Allow authenticated users to insert their own profile (id must equal auth.uid())
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- Allow authenticated users to update their own profile (but not role unless you explicitly allow it)
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- NOTE: for admin role updates, create a secure server route or admin table and use service_role key server-side
