-- careerspark: Schema using stored tsvector columns and triggers for full-text search
-- Paste into Supabase SQL editor and run. This avoids "functions in index expression must be marked IMMUTABLE" errors

-- Enable helpful extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Drop old functional indexes if present
DROP INDEX IF EXISTS profiles_full_name_idx;
DROP INDEX IF EXISTS companies_name_idx;
DROP INDEX IF EXISTS jobs_title_idx;

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

-- 2) kv_store (used by repo functions)
CREATE TABLE IF NOT EXISTS kv_store_252339b3 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

-- 3) profiles
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

-- 4) companies
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

-- 5) jobs
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

-- 6) applications
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

-- 7) saved_jobs
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, job_id)
);

-- 8) conversations/messages
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

-- 9) notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10) plans/subscriptions
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
  plan_id UUID NOT NULL REFERENCES plans(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

-- 11) site_events
CREATE TABLE IF NOT EXISTS site_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12) Trigger function to update updated_at
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to main tables
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_profiles') THEN
    CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_companies') THEN
    CREATE TRIGGER set_updated_at_companies BEFORE UPDATE ON companies FOR EACH ROW EXECUTE PROCEDURE trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_jobs') THEN
    CREATE TRIGGER set_updated_at_jobs BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE PROCEDURE trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_conversations') THEN
    CREATE TRIGGER set_updated_at_conversations BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE PROCEDURE trigger_set_updated_at();
  END IF;
END$$;

-- 13) Full-text: trigger functions to maintain search_vector columns
-- Profiles search_vector
CREATE OR REPLACE FUNCTION profiles_search_vector_trigger() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.full_name,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.headline,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.skills, ' '),'')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Companies search_vector
CREATE OR REPLACE FUNCTION companies_search_vector_trigger() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description,'')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Jobs search_vector
CREATE OR REPLACE FUNCTION jobs_search_vector_trigger() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.requirements, ' '),'')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach triggers (before insert or update)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'profiles_search_vector_biu') THEN
    CREATE TRIGGER profiles_search_vector_biu BEFORE INSERT OR UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE profiles_search_vector_trigger();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'companies_search_vector_biu') THEN
    CREATE TRIGGER companies_search_vector_biu BEFORE INSERT OR UPDATE ON companies FOR EACH ROW EXECUTE PROCEDURE companies_search_vector_trigger();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'jobs_search_vector_biu') THEN
    CREATE TRIGGER jobs_search_vector_biu BEFORE INSERT OR UPDATE ON jobs FOR EACH ROW EXECUTE PROCEDURE jobs_search_vector_trigger();
  END IF;
END$$;

-- 14) Indexes on search_vector columns (no expression indexes)
CREATE INDEX IF NOT EXISTS profiles_search_vector_idx ON profiles USING gin (search_vector);
CREATE INDEX IF NOT EXISTS companies_search_vector_idx ON companies USING gin (search_vector);
CREATE INDEX IF NOT EXISTS jobs_search_vector_idx ON jobs USING gin (search_vector);

-- 15) Additional trigram indexes for substring / ILIKE searches (optional but fast)
CREATE INDEX IF NOT EXISTS profiles_name_trgm ON profiles USING gin ((coalesce(full_name,'') || ' ' || coalesce(headline,'')) gin_trgm_ops);
CREATE INDEX IF NOT EXISTS companies_name_trgm ON companies USING gin ((coalesce(name,'') || ' ' || coalesce(description,'')) gin_trgm_ops);
CREATE INDEX IF NOT EXISTS jobs_title_trgm ON jobs USING gin ((coalesce(title,'') || ' ' || coalesce(description,'')) gin_trgm_ops);

-- 16) SAMPLE SEED DATA (replace UUIDs with real auth.uids if desired)
-- Sample profiles
INSERT INTO profiles (id, full_name, display_name, email, role, headline, bio, location, website, skills, resume_url)
VALUES
  ('11111111-1111-1111-1111-111111111111','Alex Johnson','alex','alex@example.com','seeker','Frontend engineer','5+ years building React apps','San Francisco, CA','https://alex.dev',ARRAY['React','TypeScript','CSS'],'https://example.com/resume/alex.pdf'),
  ('22222222-2222-2222-2222-222222222222','Samira Patel','samira','samira@example.com','seeker','Product designer','Designing delightful user experiences','Remote','https://samira.design',ARRAY['Figma','UX','Prototyping'],'https://example.com/resume/samira.pdf'),
  ('33333333-3333-3333-3333-333333333333','Acme HR','acme-hr','hr@acme.example','provider','Hiring at Acme','We build things people love','New York, NY','https://acme.example',ARRAY[]::text[],'https://example.com/company/acme');

-- Force triggeR to populate search vectors for seeded rows
UPDATE profiles SET full_name = full_name WHERE id IN ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333333');

-- Sample companies
INSERT INTO companies (id, owner_id, name, slug, website, description, logo_url, location)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'Acme Corp', 'acme-corp', 'https://acme.example', 'Acme makes category-defining products', 'https://cdn.example.com/logos/acme.png', 'New York, NY'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 'Bright Labs', 'bright-labs', 'https://bright.example', 'Bright Labs builds data tools', 'https://cdn.example.com/logos/bright.png', 'Remote');

UPDATE companies SET name = name WHERE id IN ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');

-- Sample jobs
INSERT INTO jobs (id, company_id, posted_by, title, slug, location, is_remote, job_type, description, responsibilities, requirements, salary_min, salary_max, currency, status)
VALUES
  ('d1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'Senior Frontend Engineer', 'senior-frontend-engineer', 'San Francisco, CA', TRUE, 'full_time',
   'We are seeking an experienced Senior Frontend Developer to join our dynamic team. You will be responsible for building and maintaining our web applications.',
   ARRAY['Build and maintain responsive web applications','Write tests and documentation','Mentor junior engineers'],
   ARRAY['5+ years frontend','React','TypeScript','CSS'],
   130000, 180000, 'USD', 'open'),
  ('d2222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 'Product Designer', 'product-designer', 'Remote', TRUE, 'full_time',
   'Join our creative team to design beautiful user experiences for cutting-edge applications.',
   ARRAY['Lead design initiatives','Run user research','Create prototypes'],
   ARRAY['3+ years design','Figma','Portfolio'],
   90000, 120000, 'USD', 'open');

UPDATE jobs SET title = title WHERE id IN ('d1111111-1111-1111-1111-111111111111','d2222222-2222-2222-2222-222222222222');

-- Sample applications
INSERT INTO applications (id, job_id, applicant_id, cover_letter, resume_url, portfolio_url, status)
VALUES
  (gen_random_uuid(), 'd1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'I am very interested in this role and have built many complex SPAs.', 'https://example.com/resume/alex.pdf', 'https://alex.dev/portfolio', 'applied'),
  (gen_random_uuid(), 'd2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Design is my passion — portfolio attached.', 'https://example.com/resume/samira.pdf', 'https://samira.design/works', 'applied');

-- Update jobs.applications_count
UPDATE jobs j
SET applications_count = sub.c
FROM (SELECT job_id, COUNT(*) AS c FROM applications GROUP BY job_id) sub
WHERE j.id = sub.job_id;

-- Sample saved job
INSERT INTO saved_jobs (id, user_id, job_id)
VALUES (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'd2222222-2222-2222-2222-222222222222');

-- Sample conversation and messages
INSERT INTO conversations (id, subject) VALUES ('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', 'Application: Senior Frontend Engineer');
INSERT INTO conversation_participants (conversation_id, user_id) VALUES ('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', '11111111-1111-1111-1111-111111111111'), ('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', '33333333-3333-3333-3333-333333333333');
INSERT INTO messages (conversation_id, sender_id, body) VALUES
  ('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', '11111111-1111-1111-1111-111111111111', 'Hi — I just applied to the Senior Frontend position. Happy to provide more details.'),
  ('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', '33333333-3333-3333-3333-333333333333', 'Thanks Alex! We will review and get back to you.');

-- Sample notifications
INSERT INTO notifications (user_id, type, data) VALUES
  ('11111111-1111-1111-1111-111111111111', 'application_received', jsonb_build_object('job_id','d1111111-1111-1111-1111-111111111111','application_id', (SELECT id FROM applications LIMIT 1))),
  ('33333333-3333-3333-3333-333333333333', 'new_message', jsonb_build_object('conversation_id','c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1','snippet','I just applied...'));

-- Sample plans / subscriptions
INSERT INTO plans (id, slug, name, price_cents, interval, features) VALUES
 (gen_random_uuid(), 'free', 'Free', 0, 'monthly', '["1 active job","Basic Support"]'::jsonb),
 (gen_random_uuid(), 'pro', 'Pro', 9900, 'monthly', '["10 active jobs","Priority Support","Applicant Insights"]'::jsonb);

-- kv_store sample
INSERT INTO kv_store_252339b3 (key, value) VALUES
 ('site:welcome_message', '{"text":"Welcome to Careerspark (dev copy)","updated":"2026-01-21"}'),
 ('figma:mock-data', '{"recent": [{"id": "f1", "name": "Design Assets"}]}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 17) Final note: triggers already populated for seeded rows via the UPDATE ... = ... statements above

-- End of schema + seed script
