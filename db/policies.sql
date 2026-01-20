-- policies.sql
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

-- NOTE: to allow admins to manage roles you can create a separate table of admins or add a custom claim
-- and create policies that allow updates to role when auth.role = 'admin'. For service-side operations use the
-- service_role key reserved for server-side code.
