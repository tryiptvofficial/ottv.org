// Usage: node scripts/check-country-indexability.mjs <baseUrl> [outFile] [canonicalOrigin]
// Checks every country URL in scripts/country-urls.baseline.json against a running build.
import fs from 'node:fs';
import path from 'node:path';

const base = (process.argv[2] || 'http://localhost:9010').replace(/\/$/, '');
const outFile = process.argv[3];
const canonicalOrigin = (process.argv[4] || 'https://www.iptvmax.co').replace(/\/$/, '');
const baseline = JSON.parse(fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'country-urls.baseline.json'), 'utf8'));

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

async function get(url) {
  const res = await fetch(url, { redirect: 'manual' });
  return { status: res.status, location: res.headers.get('location'), xRobots: res.headers.get('x-robots-tag'), body: await res.text() };
}

function disallowedPrefixes(robots) {
  const groups = [];
  let current = null;
  for (const raw of robots.split('\n')) {
    const line = raw.split('#')[0].trim();
    const [k, ...rest] = line.split(':');
    const v = rest.join(':').trim();
    if (/^user-agent$/i.test(k)) {
      if (!current || current.rules.length) groups.push((current = { agents: [], rules: [] }));
      current.agents.push(v.toLowerCase());
    } else if (current && /^(dis)?allow$/i.test(k)) current.rules.push({ allow: /^allow$/i.test(k), path: v });
  }
  return groups;
}

function blockedFor(groups, agent, p) {
  const g = groups.find((x) => x.agents.includes(agent)) || groups.find((x) => x.agents.includes('*'));
  if (!g) return false;
  let best = null;
  for (const r of g.rules) if (r.path && p.startsWith(r.path) && (!best || r.path.length > best.path.length)) best = r;
  return !!best && !best.allow;
}

const sitemap = await get(`${base}/sitemap.xml`);
const sitemapPaths = new Set([...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
const robots = await get(`${base}/robots.txt`);
const groups = disallowedPrefixes(robots.body);
const hub = await get(`${base}/locations`);
const hubLinks = new Set([...hub.body.matchAll(/href="(\/country\/[^"#?]+)"/g)].map((m) => m[1]));

const results = [];
const queue = [...baseline.paths];
async function worker() {
  while (queue.length) {
    const p = queue.shift();
    const r = await get(`${base}${p}`);
    const html = r.body;
    const robotsMeta = [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map((m) => m[1]);
    const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || null;
    const title = text((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
    const checks = {
      http200: r.status === 200,
      noRedirect: !r.location,
      noMetaNoindex: !robotsMeta.some((c) => /noindex/i.test(c)),
      noHeaderNoindex: !/noindex/i.test(r.xRobots || ''),
      robotsAllowedGooglebot: !blockedFor(groups, 'googlebot', p),
      robotsAllowedBingbot: !blockedFor(groups, 'bingbot', p),
      selfCanonical: canonical === `${canonicalOrigin}${p}`,
      inSitemap: sitemapPaths.has(p),
      hasTitle: title.length > 0,
      singleH1: h1s.length === 1 && h1s[0].length > 0,
      linkedFromHub: hubLinks.has(p),
    };
    results.push({ path: p, status: r.status, location: r.location, robotsMeta, xRobots: r.xRobots, canonical, title, h1: h1s, checks, pass: Object.values(checks).every(Boolean) });
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
results.sort((a, b) => a.path.localeCompare(b.path));

const failing = results.filter((r) => !r.pass);
const countrySitemapCount = [...sitemapPaths].filter((p) => p.startsWith('/country/')).length;
const summary = {
  base,
  checkedAt: new Date().toISOString(),
  baselineCount: baseline.paths.length,
  sitemapTotal: sitemapPaths.size,
  sitemapCountryUrls: countrySitemapCount,
  hubCountryLinks: hubLinks.size,
  passed: results.length - failing.length,
  failed: failing.length,
  failures: Object.fromEntries(Object.keys(results[0].checks).map((k) => [k, results.filter((r) => !r.checks[k]).map((r) => r.path)]).filter(([, v]) => v.length)),
};
console.log(JSON.stringify(summary, null, 2));
if (outFile) fs.writeFileSync(outFile, JSON.stringify({ summary, results }, null, 2));
process.exit(failing.length ? 1 : 0);
