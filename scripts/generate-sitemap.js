const fs = require('fs');
const path = require('path');

// Reads mock jobs from AppContext.tsx and generates public/sitemap.xml
// This is a simple parser that extracts id fields from the mockJobs array.

const appContextPath = path.join(__dirname, '..', 'src', 'contexts', 'AppContext.tsx');
const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

function readFile(file) {
  return fs.readFileSync(file, 'utf8');
}

function extractJobIds(code) {
  // Find the mockJobs array block
  const arrayMatch = code.match(/const\s+mockJobs[\s\S]*?=\s*\[(?<content>[\s\S]*?)\];/m);
  const ids = [];
  if (arrayMatch && arrayMatch.groups && arrayMatch.groups.content) {
    const content = arrayMatch.groups.content;
    const idRegex = /id\s*:\s*'([^']+)'/g;
    let m;
    while ((m = idRegex.exec(content)) !== null) {
      ids.push(m[1]);
    }
  }
  return ids;
}

function buildSitemap(jobIds) {
  const now = new Date().toISOString().split('T')[0];
  const staticRoutes = [
    '/',
    '/browse-jobs',
    '/pricing',
    '/about',
    '/contact',
    '/login',
    '/signup'
  ];

  let urls = [];
  for (const r of staticRoutes) {
    urls.push({ loc: r, lastmod: now, priority: r === '/' ? '1.0' : '0.7' });
  }

  for (const id of jobIds) {
    urls.push({ loc: `/job/${id}`, lastmod: now, priority: '0.8' });
  }

  const xml = [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`];
  for (const u of urls) {
    xml.push('  <url>');
    xml.push(`    <loc>${u.loc}</loc>`);
    xml.push(`    <lastmod>${u.lastmod}</lastmod>`);
    xml.push(`    <changefreq>daily</changefreq>`);
    xml.push(`    <priority>${u.priority}</priority>`);
    xml.push('  </url>');
  }
  xml.push('</urlset>');
  return xml.join('\n');
}

function ensurePublicDir() {
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
}

function main() {
  if (!fs.existsSync(appContextPath)) {
    console.error('AppContext.tsx not found at', appContextPath);
    process.exit(1);
  }

  const code = readFile(appContextPath);
  const ids = extractJobIds(code);
  console.log('Found job ids:', ids.join(', '));
  ensurePublicDir();
  const sitemap = buildSitemap(ids);
  fs.writeFileSync(outPath, sitemap, 'utf8');
  console.log('Wrote sitemap to', outPath);
}

main();
