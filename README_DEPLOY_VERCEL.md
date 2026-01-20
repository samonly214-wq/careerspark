# Deploying CareersPark to Vercel

This file explains the simplest ways to deploy the app to Vercel and the environment variables you must configure.

Quick summary
1. Push your repo to GitHub (or ensure it's already there).
2. Create a Vercel project and connect the GitHub repo (or use the GitHub Action included).
3. Add the public Supabase environment variables in Vercel project settings.
4. Add the generated Vercel URL as a redirect in Supabase Auth settings.

Files added to this repo to help deployment
- `vercel.json` — Vercel build config (builds `build/` and rewrites all routes to `index.html` for SPA behavior).
- `.github/workflows/deploy-vercel.yml` — optional GitHub Actions workflow that builds and deploys to Vercel using the Vercel CLI.

Environment variables to set in Vercel (Project Settings -> Environment Variables)
- `NEXT_PUBLIC_SUPABASE_URL` = https://ptbcmpplbcmlcsbiixyq.supabase.co
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` = sb_publishable_N4SgZRaxVT877yazigYs7A_-98yAJ6K

Notes about server secrets
- If you have server-side functions that require the Supabase service role key, store it as a Vercel secret and never commit it to source control:
  - `SUPABASE_SERVICE_ROLE_KEY` (use only in server-side code or serverless functions)

Using the GitHub Action (automated)
1. Create a `VERCEL_TOKEN` personal token:
   - Go to https://vercel.com/account/tokens and create a token (name it something like `github-action-token`).
2. Add the token to your GitHub repository secrets:
   - Repository -> Settings -> Secrets and variables -> Actions -> New repository secret
   - Name: `VERCEL_TOKEN`, Value: the token you created
3. Push to the `main` or `master` branch. The workflow will run automatically and deploy the site.

Notes if you prefer Vercel UI (recommended for first deploy)
- Go to https://vercel.com/new and import the repo.
- When prompted, set the Environment Variables (see list above).
- Vercel will auto-detect build command (`npm run build`) and publish directory (`build`).

After deploy — configure Supabase
- In your Supabase project, go to Authentication -> Settings -> Redirect URLs and add your production site URL:
  - Example: `https://your-vercel-subdomain.vercel.app` (also add `http://localhost:5173` for local dev if you use that port)

Local testing (optional)
- Run locally while developing:
  ```powershell
  npm install
  npm run dev
  ```
- For a production-like preview locally:
  ```powershell
  npm run build
  npx serve -s build -l 5173
  ```

If you want, I can also:
- Create a `vercel.env.json` snippet for convenience (not included here to avoid committing secrets).
- Prepare a GitHub Action that sets environment variables in Vercel via the CLI (requires additional secrets).

If you'd like me to proceed and (A) create a GitHub repo and push these changes (I can't push from here), or (B) help you create the Vercel project and set environment variables step-by-step, tell me which and I'll provide the exact next commands and UI clicks.
