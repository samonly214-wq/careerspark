# How to commit and push the SEO & sitemap changes

Follow these steps locally to commit and push the edits I made (SEO, sitemap generator, public assets, CI):

1. Install dependencies

   Open PowerShell (or cmd) in the repo root and run:

```powershell
npm install
```

If PowerShell blocks script execution, run (as Admin if necessary):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install
```

2. Run the sitemap generator locally to ensure `public/sitemap.xml` is correct:

```powershell
node ./scripts/generate-sitemap.js
```

3. Run the dev server and spot-check pages:

```powershell
npm run dev
```

Open http://localhost:5173 and check a few pages and the head tags.

4. Run the build (pre/postbuild hook will regenerate sitemap):

```powershell
npm run build
```

5. Commit and push the changes

```powershell
git add .
git commit -m "feat(seo): add per-page SEO, robots & sitemap, public assets, sitemap generator and CI"
git push origin main
```

6. Verify GitHub Actions

After pushing, go to the repository on GitHub > Actions and check the `CI` workflow run. It will run `npm ci`, generate sitemap, build and upload the artifact.

If you want me to create the git commit locally in this environment, tell me and I'll prepare the exact git commands for you to run (I can't push on your behalf).