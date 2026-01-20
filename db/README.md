# Database SQL for CareersPark

This directory contains SQL files to create the `profiles` table and recommended Row Level Security (RLS) policies.

Files:
- `profiles.sql` - creates `profiles` table and a trigger to update `updated_at`.
- `policies.sql` - enables RLS and creates example policies that allow users to manage their own profile.

How to apply
1. Open the Supabase project dashboard -> SQL Editor.
2. Paste the contents of `profiles.sql` and run.
3. Paste the contents of `policies.sql` and run.

Notes
- The `profiles.id` column references `auth.users(id)`. Make sure your project has the Auth feature enabled (it is by default).
- For administrative role management, create a dedicated admin table or use custom JWT claims and add policies accordingly.
