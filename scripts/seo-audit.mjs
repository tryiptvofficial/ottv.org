// Usage: node scripts/seo-audit.mjs [baseUrl] [reportDir]
// Crawls a production build (starts `next start` on a free port if no baseUrl is given) and fails on SEO errors.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ORIGIN = 'https://www.iptvmax.co';
const BRAND = 'IPTVMax';
const approved = { channels: '25,000', vod: '120,000' };
const legacyRedirects = {
  '/tv': '/', '/tv/pricing': '/pricing', '/tv/faq': '/faq', '/tv/iptv-free-trial': '/iptv-free-trial',
  '/tv/devices/fire-tv': '/devices/fire-tv', '/tv/guides/iptv-buffering-troubleshooting': '/devices/troubleshooting',
  '/tv/country/us': '/country/united-states', '/tv/country/uk': '/country/united-kingdom', '/tv/country/ca': '/country/canada',
  '/tv/country/belgium': '/country/belgium', '/country/south-korea': '/country/korea', '/country/myanmar': '/country/burma',
  '/iptv-subscription': '/pricing',
};

let base = process.argv[2];
const reportDir = process.argv[3];
let server;
if (!base) {
  const port = 4317;
  base = `http://localhost:${port}`;
  server = spawn('npx', ['next', 'start', '-p', String(port)], { cwd: root, stdio: 'ignore' });
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(base)).ok) break; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 500));
  }
}

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (h) => decode(h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
const local = (u) => base + new URL(u, ORIGIN).pathname;
const statusCache = new Map();
async function status(url) {
  if (!statusCache.has(url)) statusCache.set(url, fetch(url, { redirect: 'manual' }).then((r) => r.status).catch(() => 0));
  return statusCache.get(url);
}

try {
  // Sitemap
  const sitemapRes = await fetch(`${base}/sitemap.xml`);
  const sitemapXml = await sitemapRes.text();
  if (!sitemapRes.ok || !sitemapXml.includes('<urlset')) err('sitemap.xml missing or not a urlset');
  const entries = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: (m[1].match(/<loc>(.*?)<\/loc>/) || [])[1],
    lastmod: (m[1].match(/<lastmod>(.*?)<\/lastmod>/) || [])[1],
  }));
  const locs = entries.map((e) => e.loc);
  if (new Set(locs).size !== locs.length) err('sitemap has duplicate URLs');
  for (const e of entries) {
    if (!e.loc?.startsWith(ORIGIN)) err(`sitemap URL not on ${ORIGIN}: ${e.loc}`);
    if (!e.lastmod || Number.isNaN(Date.parse(e.lastmod))) err(`sitemap lastmod missing/invalid: ${e.loc}`);
  }

  // Robots
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) err('robots.txt does not reference the canonical sitemap');
  const disallows = [...robots.matchAll(/^Disallow:\s*(\S+)/gim)].map((m) => m[1]);

  // Pages
  const rows = [];
  const titles = new Map();
  const descriptions = new Map();
  const inbound = new Map();
  const links = new Set();
  const images = new Set();
  for (const loc of locs) {
    const p = new URL(loc).pathname;
    const res = await fetch(local(loc), { redirect: 'manual' });
    const html = await res.text();
    const title = text((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
    const description = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
    const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
    const robotsMeta = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
    const indexable = res.status === 200 && !/noindex/i.test(robotsMeta) && !/noindex/i.test(res.headers.get('x-robots-tag') || '');
    const selfCanonical = canonical.replace(/\/$/, '') === loc.replace(/\/$/, '');
    rows.push({ url: loc, status: res.status, indexable, canonical, inSitemap: true, h1: h1s.join(' | '), title });

    if (res.status !== 200) err(`${p}: HTTP ${res.status}`);
    if (!indexable) err(`${p}: not indexable`);
    if (!selfCanonical) err(`${p}: canonical ${canonical || '(none)'}`);
    if (!title) err(`${p}: missing title`);
    if (title.includes(`${BRAND} | ${BRAND}`)) err(`${p}: brand duplicated in title`);
    if (!description) err(`${p}: missing meta description`);
    if (h1s.length !== 1) err(`${p}: ${h1s.length} H1 elements`);
    if (/#1\b/.test(h1s.join(' '))) err(`${p}: "#1" in H1`);
    if (disallows.some((d) => d !== '/' && p.startsWith(d))) err(`${p}: blocked by robots.txt`);
    if (/<article[^>]*\bhidden\b/.test(html)) err(`${p}: hidden <article> block`);
    if (/href="#"/.test(html)) err(`${p}: href="#" link`);
    titles.set(title, [...(titles.get(title) || []), p]);
    descriptions.set(description, [...(descriptions.get(description) || []), p]);

    for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
      try {
        const data = JSON.parse(m[1]);
        const json = JSON.stringify(data);
        if (/aggregateRating|"Review"|LocalBusiness|streetAddress/.test(json)) err(`${p}: unsupported schema (rating/review/address)`);
      } catch { err(`${p}: invalid JSON-LD`); }
    }

    const visible = text(html.replace(/<script[\s\S]*?<\/script>/g, ''));
    const facts = html.replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/g, '');
    for (const m of text(facts).matchAll(/(\d{1,3}(?:,\d{3})+|\d{3,})\s*\+?\s*(?:live\s+|tv\s+|hd\/4k\s+)*(channels?|vod|movies|titles|shows)/gi)) {
      const value = Number(m[1].replace(/,/g, '')).toLocaleString('en-US');
      const kind = /channel/i.test(m[2]) ? 'channels' : 'vod';
      if (value !== approved[kind]) err(`${p}: product claim "${m[0]}" (approved ${approved[kind]}+)`);
    }
    if (!visible) err(`${p}: no visible text`);

    for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) {
      const target = m[1] === '' ? '/' : m[1];
      links.add(target);
      if (target !== p) inbound.set(target, (inbound.get(target) || 0) + 1);
    }
    for (const m of html.matchAll(/<img [^>]*src="([^"]+)"/g)) images.add(decode(m[1]));
  }

  for (const [t, ps] of titles) if (t && ps.length > 1) err(`duplicate title "${t}" on ${ps.length} pages`);
  for (const [d, ps] of descriptions) if (d && ps.length > 1) err(`duplicate meta description on ${ps.length} pages: ${ps.slice(0, 3).join(', ')}`);

  for (const l of links) {
    const s = await status(base + l);
    if (s >= 400 || s === 0) err(`broken internal link ${l} (${s})`);
  }
  for (const src of images) {
    if (!src.startsWith('/')) continue;
    const s = await status(base + src);
    if (s >= 400 || s === 0) err(`broken image ${src} (${s})`);
  }
  for (const loc of locs) {
    const p = new URL(loc).pathname;
    if (p !== '/' && !inbound.get(p)) err(`orphan: ${p} has no internal links from other pages`);
  }

  for (const [from, to] of Object.entries(legacyRedirects)) {
    const r = await fetch(base + from, { redirect: 'manual' });
    const dest = r.headers.get('location') ? new URL(r.headers.get('location'), base).pathname : null;
    if (![301, 308].includes(r.status) || dest !== to) err(`redirect ${from}: expected 301/308 → ${to}, got ${r.status} → ${dest}`);
    else if ((await status(base + to)) !== 200) err(`redirect ${from} → ${to}: target not 200 (single hop expected)`);
  }

  const summary = {
    base,
    sitemapUrls: locs.length,
    countryUrls: locs.filter((l) => l.includes('/country/')).length,
    indexable: rows.filter((r) => r.indexable).length,
    internalLinksChecked: links.size,
    localImagesChecked: [...images].filter((s) => s.startsWith('/')).length,
    legacyRedirectsChecked: Object.keys(legacyRedirects).length,
    errors: errors.length,
    warnings: warnings.length,
  };
  console.log(JSON.stringify(summary, null, 2));
  if (reportDir) {
    fs.mkdirSync(reportDir, { recursive: true });
    const csv = ['url,status,indexable,canonical,in_sitemap,h1,title', ...rows.map((r) => [r.url, r.status, r.indexable, r.canonical, r.inSitemap, r.h1, r.title].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))];
    fs.writeFileSync(path.join(reportDir, 'url-status.csv'), csv.join('\n'));
    fs.writeFileSync(path.join(reportDir, 'seo-audit.json'), JSON.stringify({ summary, errors, warnings }, null, 2));
  }
  if (errors.length) {
    console.error(`\nSEO audit FAILED with ${errors.length} error(s):`);
    errors.slice(0, 50).forEach((e) => console.error(`  ${e}`));
    process.exitCode = 1;
  } else console.log('SEO audit passed.');
} finally {
  server?.kill();
}
