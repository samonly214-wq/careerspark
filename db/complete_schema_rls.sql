-- careerspark: Complete schema + RLS + auth trigger
-- Run this in Supabase SQL editor. It creates tables, full-text support, triggers to maintain search vectors,
-- an auth.users insert trigger to auto-create profiles, and recommended RLS policies.
-- Notes:
-- 1) Run from Supabase SQL editor (you have admin privileges there). The service role bypasses RLS for migration/seeding.
-- 2) After running, test the policies by signing up via the app and checking profile creation.

-- 0) Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 1) Enums
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('seeker', 'provider', 'admin');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'employment_type') THEN
    CREATE TYPE employment_type AS ENUM ('full_time', 'part_time', 'contract', 'temporary', 'internship');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
    CREATE TYPE application_status AS ENUM ('applied','viewed','interview','offered','hired','rejected','withdrawn');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_status') THEN
    CREATE TYPE job_status AS ENUM ('draft','open','closed');
  END IF;
END$$;

-- 2) kv_store (used by server function in repo)
CREATE TABLE IF NOT EXISTS kv_store_252339b3 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

-- 3) Core tables
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  display_name TEXT,
  email TEXT,
  role user_role NOT NULL DEFAULT 'seeker',
  headline TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  avatar_url TEXT,
  skills TEXT[] DEFAULT ARRAY[]::text[],
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  search_vector tsvector
);

CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  website TEXT,
  description TEXT,
  logo_url TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  search_vector tsvector
);

CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  posted_by UUID,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  location TEXT,
  is_remote BOOLEAN DEFAULT false,
  job_type employment_type DEFAULT 'full_time',
  description TEXT,
  responsibilities TEXT[],
  requirements TEXT[],
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'USD',
  status job_status DEFAULT 'draft',
  posted_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  views INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  search_vector tsvector,
  CONSTRAINT jobs_slug_company_unique UNIQUE (company_id, slug)
);

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL,
  cover_letter TEXT,
  resume_url TEXT,
  portfolio_url TEXT,
  status application_status DEFAULT 'applied',
  submitted_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (job_id, applicant_id)
);

CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, job_id)
);

CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conversation_participants (
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  body TEXT,
  attachments JSONB,
  sent_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price_cents INTEGER DEFAULT 0,
  interval TEXT DEFAULT 'monthly',
  features JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  plan_id UUID REFERENCES plans(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS site_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4) Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_profiles') THEN
    CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_companies') THEN
    CREATE TRIGGER set_updated_at_companies BEFORE UPDATE ON companies FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_jobs') THEN
    CREATE TRIGGER set_updated_at_jobs BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_conversations') THEN
    CREATE TRIGGER set_updated_at_conversations BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_updated_at();
  END IF;
END$$;

-- 5) Full-text triggers (stored tsvector columns)
CREATE OR REPLACE FUNCTION public.profiles_search_vector_trigger() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.full_name,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.headline,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.skills, ' '),'')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.companies_search_vector_trigger() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description,'')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.jobs_search_vector_trigger() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.requirements, ' '),'')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'profiles_search_vector_biu') THEN
    CREATE TRIGGER profiles_search_vector_biu BEFORE INSERT OR UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE public.profiles_search_vector_trigger();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'companies_search_vector_biu') THEN
    CREATE TRIGGER companies_search_vector_biu BEFORE INSERT OR UPDATE ON companies FOR EACH ROW EXECUTE PROCEDURE public.companies_search_vector_trigger();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'jobs_search_vector_biu') THEN
    CREATE TRIGGER jobs_search_vector_biu BEFORE INSERT OR UPDATE ON jobs FOR EACH ROW EXECUTE PROCEDURE public.jobs_search_vector_trigger();
  END IF;
END$$;

-- 6) Indexes
CREATE INDEX IF NOT EXISTS profiles_search_vector_idx ON profiles USING gin (search_vector);
CREATE INDEX IF NOT EXISTS companies_search_vector_idx ON companies USING gin (search_vector);
CREATE INDEX IF NOT EXISTS jobs_search_vector_idx ON jobs USING gin (search_vector);

CREATE INDEX IF NOT EXISTS profiles_name_trgm ON profiles USING gin ((coalesce(full_name,'') || ' ' || coalesce(headline,'')) gin_trgm_ops);
CREATE INDEX IF NOT EXISTS companies_name_trgm ON companies USING gin ((coalesce(name,'') || ' ' || coalesce(description,'')) gin_trgm_ops);
CREATE INDEX IF NOT EXISTS jobs_title_trgm ON jobs USING gin ((coalesce(title,'') || ' ' || coalesce(description,'')) gin_trgm_ops);

-- 7) Auth -> profiles trigger: auto-create profile row when a new auth user is created
-- Function must be in public schema so the trigger can call it
CREATE OR REPLACE FUNCTION public.handle_auth_user_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Create a minimal profile row (id = auth user id)
  INSERT INTO public.profiles (id, email, display_name, created_at)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta->>'full_name', now())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on auth.users (Supabase manages the auth schema)
-- It's okay to re-run CREATE TRIGGER; IF NOT EXISTS isn't available for triggers so we drop existing first
DROP TRIGGER IF EXISTS auth_user_insert_trigger ON auth.users;
CREATE TRIGGER auth_user_insert_trigger
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_auth_user_insert();

-- 8) SAMPLE SEED DATA (optional, safe to run with admin)
-- Sample profiles
INSERT INTO profiles (id, full_name, display_name, email, role, headline, bio, location, website, skills, resume_url)
VALUES
  ('11111111-1111-1111-1111-111111111111','Alex Johnson','alex','alex@example.com','seeker','Frontend engineer','5+ years building React apps','San Francisco, CA','https://alex.dev',ARRAY['React','TypeScript','CSS'],'https://example.com/resume/alex.pdf')
ON CONFLICT (id) DO NOTHING;

INSERT INTO profiles (id, full_name, display_name, email, role, headline, bio, location, website, skills, resume_url)
VALUES
  ('22222222-2222-2222-2222-222222222222','Samira Patel','samira','samira@example.com','seeker','Product designer','Designing delightful user experiences','Remote','https://samira.design',ARRAY['Figma','UX','Prototyping'],'https://example.com/resume/samira.pdf')
ON CONFLICT (id) DO NOTHING;

INSERT INTO profiles (id, full_name, display_name, email, role, headline, bio, location, website, skills, resume_url)
VALUES
  ('33333333-3333-3333-3333-333333333333','Acme HR','acme-hr','hr@acme.example','provider','Hiring at Acme','We build things people love','New York, NY','https://acme.example',ARRAY[]::text[],'https://example.com/company/acme')
ON CONFLICT (id) DO NOTHING;

-- Sample companies
INSERT INTO companies (id, owner_id, name, slug, website, description, logo_url, location)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'Acme Corp', 'acme-corp', 'https://acme.example', 'Acme makes category-defining products', 'https://cdn.example.com/logos/acme.png', 'New York, NY')
ON CONFLICT (id) DO NOTHING;

INSERT INTO companies (id, owner_id, name, slug, website, description, logo_url, location)
VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 'Bright Labs', 'bright-labs', 'https://bright.example', 'Bright Labs builds data tools', 'https://cdn.example.com/logos/bright.png', 'Remote')
ON CONFLICT (id) DO NOTHING;

-- Sample jobs
INSERT INTO jobs (id, company_id, posted_by, title, slug, location, is_remote, job_type, description, responsibilities, requirements, salary_min, salary_max, currency, status)
VALUES
  ('d1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'Senior Frontend Engineer', 'senior-frontend-engineer', 'San Francisco, CA', TRUE, 'full_time',
   'We are seeking an experienced Senior Frontend Developer to join our dynamic team. You will be responsible for building and maintaining our web applications.',
   ARRAY['Build and maintain responsive web applications','Write tests and documentation','Mentor junior engineers'],
   ARRAY['5+ years frontend','React','TypeScript','CSS'],
   130000, 180000, 'USD', 'open')
ON CONFLICT (id) DO NOTHING;

INSERT INTO jobs (id, company_id, posted_by, title, slug, location, is_remote, job_type, description, responsibilities, requirements, salary_min, salary_max, currency, status)
VALUES
  ('d2222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 'Product Designer', 'product-designer', 'Remote', TRUE, 'full_time',
   'Join our creative team to design beautiful user experiences for cutting-edge applications.',
   ARRAY['Lead design initiatives','Run user research','Create prototypes'],
   ARRAY['3+ years design','Figma','Portfolio'],
   90000, 120000, 'USD', 'open')
ON CONFLICT (id) DO NOTHING;

-- Simple applications
INSERT INTO applications (id, job_id, applicant_id, cover_letter, resume_url, portfolio_url, status)
VALUES
  (gen_random_uuid(), 'd1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'I am very interested in this role and have built many complex SPAs.', 'https://example.com/resume/alex.pdf', 'https://alex.dev/portfolio', 'applied')
ON CONFLICT DO NOTHING;

INSERT INTO applications (id, job_id, applicant_id, cover_letter, resume_url, portfolio_url, status)
VALUES
  (gen_random_uuid(), 'd2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Design is my passion — portfolio attached.', 'https://example.com/resume/samira.pdf', 'https://samira.design/works', 'applied')
ON CONFLICT DO NOTHING;

-- Conversations/messages
INSERT INTO conversations (id, subject) VALUES ('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', 'Application: Senior Frontend Engineer') ON CONFLICT DO NOTHING;
INSERT INTO conversation_participants (conversation_id, user_id) VALUES ('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', '11111111-1111-1111-1111-111111111111') ON CONFLICT DO NOTHING;
INSERT INTO conversation_participants (conversation_id, user_id) VALUES ('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', '33333333-3333-3333-3333-333333333333') ON CONFLICT DO NOTHING;
INSERT INTO messages (conversation_id, sender_id, body) VALUES ('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', '11111111-1111-1111-1111-111111111111', 'Hi — I just applied to the Senior Frontend position. Happy to provide more details.') ON CONFLICT DO NOTHING;
INSERT INTO messages (conversation_id, sender_id, body) VALUES ('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', '33333333-3333-3333-3333-333333333333', 'Thanks Alex! We will review and get back to you.') ON CONFLICT DO NOTHING;

-- Notifications / saved_jobs
INSERT INTO notifications (user_id, type, data) VALUES ('11111111-1111-1111-1111-111111111111', 'application_received', jsonb_build_object('job_id','d1111111-1111-1111-1111-111111111111','application_id', (SELECT id FROM applications LIMIT 1))) ON CONFLICT DO NOTHING;
INSERT INTO notifications (user_id, type, data) VALUES ('33333333-3333-3333-3333-333333333333', 'new_message', jsonb_build_object('conversation_id','c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1','snippet','I just applied...')) ON CONFLICT DO NOTHING;
INSERT INTO saved_jobs (id, user_id, job_id) VALUES (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'd2222222-2222-2222-2222-222222222222') ON CONFLICT DO NOTHING;

-- kv_store sample
INSERT INTO kv_store_252339b3 (key, value) VALUES
 ('site:welcome_message', '{"text":"Welcome to Careerspark (dev copy)","updated":"2026-01-21"}'),
 ('figma:mock-data', '{"recent": [{"id": "f1", "name": "Design Assets"}]}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Ensure search_vector for seeded rows (run as admin will fire triggers)
UPDATE profiles SET full_name = full_name WHERE id IN ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333333');
UPDATE companies SET name = name WHERE id IN ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');
UPDATE jobs SET title = title WHERE id IN ('d1111111-1111-1111-1111-111111111111','d2222222-2222-2222-2222-222222222222');

-- 9) Enable Row Level Security and policies (recommended)
-- Profiles: only the owner (auth.uid()) can read/update/delete/insert their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS profiles_owner_policy ON public.profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Companies: public can SELECT companies (for listing), but INSERT requires authenticated user; UPDATE/DELETE allowed for owner
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS companies_public_select ON public.companies
  FOR SELECT
  USING (true);
CREATE POLICY IF NOT EXISTS companies_insert_authenticated ON public.companies
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' OR auth.role() IS NULL OR auth.uid() IS NOT NULL);
CREATE POLICY IF NOT EXISTS companies_owner_manage ON public.companies
  FOR UPDATE, DELETE
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

-- Jobs: public can SELECT; INSERT allowed for authenticated users when posted_by = auth.uid(); UPDATE/DELETE allowed for job poster or company owner
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS jobs_public_select ON public.jobs
  FOR SELECT
  USING (status = 'open' OR posted_by = auth.uid());

CREATE POLICY IF NOT EXISTS jobs_insert_authenticated ON public.jobs
  FOR INSERT
  WITH CHECK (posted_by = auth.uid());

CREATE POLICY IF NOT EXISTS jobs_owner_manage ON public.jobs
  FOR UPDATE, DELETE
  USING (
    posted_by = auth.uid()
    OR (SELECT owner_id FROM public.companies WHERE companies.id = jobs.company_id) = auth.uid()
  )
  WITH CHECK (
    posted_by = auth.uid()
    OR (SELECT owner_id FROM public.companies WHERE companies.id = jobs.company_id) = auth.uid()
  );

-- Applications: applicant can manage their own applications; company owner can read applications for their jobs
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS applications_applicant_manage ON public.applications
  FOR ALL
  USING (
    applicant_id = auth.uid()
    OR (
      -- company owner can access application if they own the company that posted the job
      (SELECT owner_id FROM public.companies WHERE companies.id = (
        SELECT company_id FROM public.jobs WHERE jobs.id = applications.job_id
      )) = auth.uid()
    )
  )
  WITH CHECK (
    applicant_id = auth.uid()
  );

-- Saved_jobs: only the user can manage their saved jobs
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS saved_jobs_owner ON public.saved_jobs
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Conversations & messages: only participants can read/post
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS conversations_participant_select ON public.conversations
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.conversation_participants cp WHERE cp.conversation_id = conversations.id AND cp.user_id = auth.uid()));

CREATE POLICY IF NOT EXISTS conversations_insert_authenticated ON public.conversations
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS messages_participant_select ON public.messages
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.conversation_participants cp WHERE cp.conversation_id = messages.conversation_id AND cp.user_id = auth.uid()
  ));

CREATE POLICY IF NOT EXISTS messages_send_participant ON public.messages
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.conversation_participants cp WHERE cp.conversation_id = NEW.conversation_id AND cp.user_id = auth.uid()
  ));

-- conversation_participants: only allow participants to manage their own join rows (insert allowed for authenticated users when user_id = auth.uid())
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS conversation_participants_owner ON public.conversation_participants
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Notifications: only the target user can see their notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS notifications_user ON public.notifications
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Plans and subscriptions: plans public, subscriptions owner-only
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS plans_public_select ON public.plans
  FOR SELECT
  USING (true);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS subscriptions_owner ON public.subscriptions
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- site_events: admin-only (no policy = no access by non-admins). If you want to allow inserts from server functions using service role, that's fine; service role bypasses RLS.
ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;
-- No policies -> only service role or DB owner can access

-- 10) Final notes
-- - The policies above are intentionally conservative: owners are identified by auth.uid() and owner_id fields.
-- - Service role (the database role associated with the service key) bypasses RLS. Admin operations from the Supabase dashboard will continue to work.
-- - You can refine policies to allow broader public reads (for jobs) or indexed search. For example, jobs_public_select restricts non-open jobs except to poster.

-- Done: run SELECT now() to verify script ran without errors.
SELECT now() AS completed_at;
