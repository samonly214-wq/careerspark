-- RLS tweak: make jobs browsable by anyone (public browsing) while requiring authentication for management and posting.
-- Paste and run in Supabase SQL editor.

-- DROP existing jobs SELECT policies (if present) to avoid duplicates
DROP POLICY IF EXISTS jobs_public_select ON public.jobs;
DROP POLICY IF EXISTS jobs_public_select_all ON public.jobs;
DROP POLICY IF EXISTS jobs_public_select_view ON public.jobs;
DROP POLICY IF EXISTS jobs_select_authenticated ON public.jobs;
DROP POLICY IF EXISTS jobs_owner_manage ON public.jobs;

-- Create a safe public view for browsing (limited fields)
CREATE OR REPLACE VIEW public.jobs_public_view AS
SELECT
  id,
  company_id,
  title,
  slug,
  location,
  is_remote,
  job_type,
  salary_min,
  salary_max,
  currency,
  status,
  posted_at
FROM public.jobs
WHERE status = 'open';

-- Grant SELECT on the view to the anon/public role so the frontend can query it without authentication
GRANT SELECT ON public.jobs_public_view TO public;

-- Ensure jobs table has RLS enabled
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Policy: allow anonymous/public browsing of open jobs (row-level)
-- This allows SELECT from the jobs table for rows where status = 'open'.
-- Note: clients should use the `jobs_public_view` for browsing; the view surfaces only non-sensitive fields.
CREATE POLICY IF NOT EXISTS jobs_public_select ON public.jobs
  FOR SELECT
  USING (status = 'open');

-- Policy: allow authenticated users (and owners) to SELECT any job rows (details)
CREATE POLICY IF NOT EXISTS jobs_select_authenticated ON public.jobs
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    OR posted_by = auth.uid()
    OR (SELECT owner_id FROM public.companies WHERE companies.id = jobs.company_id) = auth.uid()
  );

-- Policy: allow authenticated users to INSERT jobs, requiring posted_by = auth.uid()
DROP POLICY IF EXISTS jobs_insert_authenticated ON public.jobs;
CREATE POLICY jobs_insert_authenticated ON public.jobs
  FOR INSERT
  WITH CHECK (posted_by = auth.uid());

-- Policy: allow owners to UPDATE/DELETE their jobs (already present in complete_schema_rls, but reinforce)
DROP POLICY IF EXISTS jobs_owner_manage ON public.jobs;
CREATE POLICY jobs_owner_manage ON public.jobs
  FOR UPDATE, DELETE
  USING (
    posted_by = auth.uid()
    OR (SELECT owner_id FROM public.companies WHERE companies.id = jobs.company_id) = auth.uid()
  )
  WITH CHECK (
    posted_by = auth.uid()
    OR (SELECT owner_id FROM public.companies WHERE companies.id = jobs.company_id) = auth.uid()
  );

-- Final note: For browsing, use the `jobs_public_view` from client-side (anon key) to list jobs.
-- For job details, fetch from the `jobs` table using an authenticated session (auth key). This pattern keeps listing public while requiring auth for management and posting.

SELECT now() AS completed_at;
