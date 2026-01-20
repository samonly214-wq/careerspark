-- profiles.sql
-- Run this in your Supabase SQL editor to ensure the profiles table exists and RLS is configured.

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text default 'seeker',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Optionally create a trigger to keep updated_at current
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
