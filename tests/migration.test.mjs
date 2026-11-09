// Regression tests for the iptvmax.co -> ottv.org migration, run against a production build (`npm run build` first).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { after, before, test } from 'node:test';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ORIGIN = 'https://www.ottv.org';
const PORT = 4319;
const WHATSAPP = 'https://wa.me/212694833293';

function get(pathname, { host = `localhost:${PORT}`, proto } = {}) {
  return new Promise((resolve, reject) => {
    const headers = { host, ...(proto && { 'x-forwarded-proto': proto }) };
    http.get({ port: PORT, path: pathname, headers }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (d) => (body += d));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    }).on('error', reject);
  });
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const metaContent = (html, attr, name) => decode((html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`)) || [])[1] ?? '');
const canonicalOf = (html) => (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] ?? '';
const titleOf = (html) => decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] ?? '');
const noSlash = (u) => u.replace(/\/$/, '');
const jsonLd = (html) => [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

let server;
let sitemapXml;
let locs;
let paths;
const pages = new Map();

before(async () => {
  server = spawn(path.join(root, 'node_modules/.bin/next'), ['start', '-p', String(PORT)], { cwd: root, stdio: 'ignore' });
  for (let i = 0; i < 120; i++) {
    try { if ((await get('/robots.txt')).status === 200) break; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  sitemapXml = (await get('/sitemap.xml')).body;
  locs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  paths = locs.map((l) => new URL(l).pathname);
  const queue = [...paths];
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const p = queue.shift();
      pages.set(p, await get(p));
    }
  }));
}, { timeout: 180000 });

after(() => server?.kill());

test('production build exists', () => {
  assert.ok(fs.existsSync(path.join(root, '.next/BUILD_ID')));
});

test('public output has no old-domain URLs or old brand', () => {
  for (const [p, { body }] of pages) {
    assert.doesNotMatch(body, /iptvmax\.co/i, p);
    // The permitted mentions are the schema's alternateName and the footer's "formerly IPTVMax" note.
    assert.doesNotMatch(body.replace(/alternateName[\\":]+IPTVMax/g, '').replace(/OTTV, formerly IPTVMax,/g, ''), /IPTVMax/, p);
    // Rendered text, so a name split across elements cannot slip through.
    const rendered = body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, '').replace(/OTTV, formerly IPTVMax,/g, '');
    assert.doesNotMatch(rendered, /IPTV\s*Max/i, `${p}: rendered text`);
  }
});

test('source and public files reference the old domain nowhere, and the old brand only on purpose', () => {
  const files = [...walk(path.join(root, 'src')), ...walk(path.join(root, 'public')), ...walk(path.join(root, 'scripts'))]
    .filter((f) => /\.(tsx?|mjs|json|txt|svg|webmanifest|css)$/.test(f));
  const brandAllowed = new Set(['src/lib/schema.ts', 'public/llms.txt', 'src/components/shared/Footer.tsx', 'src/lib/site-data/faq.ts']);
  for (const f of files) {
    const rel = path.relative(root, f);
    const text = fs.readFileSync(f, 'utf8');
    assert.doesNotMatch(text, /iptvmax\.co/i, rel);
    if (!brandAllowed.has(rel)) assert.doesNotMatch(text, /IPTVMax/, rel);
  }
});

test('every indexable page has a self-referencing canonical on the new origin', () => {
  for (const [p, { status, body }] of pages) {
    assert.equal(status, 200, p);
    assert.equal(noSlash(canonicalOf(body)), noSlash(`${ORIGIN}${p}`), p);
    assert.equal(body.match(/<link rel="canonical"/g).length, 1, `${p}: one canonical`);
  }
});

test('sitemap is on the new origin, complete, and not build-stamped', () => {
  assert.match(sitemapXml, /^<\?xml/);
  assert.ok(sitemapXml.includes('<urlset'));
  assert.ok(locs.length >= 216, `${locs.length} URLs`);
  assert.equal(new Set(locs).size, locs.length);
  for (const l of locs) assert.ok(l === ORIGIN || l.startsWith(`${ORIGIN}/`), l);
  assert.doesNotMatch(fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8'), /new Date\(\)/);
});

test('robots.txt references the sitemap and keeps the crawler policy', async () => {
  const { status, body } = await get('/robots.txt');
  assert.equal(status, 200);
  assert.ok(body.includes(`Sitemap: ${ORIGIN}/sitemap.xml`));
  assert.doesNotMatch(body, /iptvmax/i);
  assert.doesNotMatch(body, /Disallow: \/_next/);
  const star = body.split(/\n\s*\n/).find((g) => /User-Agent: \*/i.test(g));
  assert.doesNotMatch(star, /Disallow: \/\s*$/m);
  assert.match(body, /User-Agent: GPTBot\nDisallow: \//);
});

test('JSON-LD parses, uses the new origin and has no invented ratings', () => {
  let orgs = 0;
  for (const [p, { body }] of pages) {
    const blocks = jsonLd(body);
    assert.ok(blocks.length >= 2, p);
    for (const raw of blocks) {
      const data = JSON.parse(raw);
      const text = JSON.stringify(data);
      assert.doesNotMatch(text, /iptvmax\.co/i, p);
      assert.doesNotMatch(text, /aggregateRating|"Review"/, p);
      if (data['@type'] === 'Organization' && data['@id']) {
        orgs++;
        assert.equal(data['@id'], `${ORIGIN}/#organization`);
      }
      if (data['@type'] === 'WebSite') assert.equal(data['@id'], `${ORIGIN}/#website`);
    }
  }
  assert.equal(orgs, pages.size);
});

test('breadcrumbs are ordered and point at live pages', async () => {
  let seen = 0;
  for (const [p, { body }] of pages) {
    for (const raw of jsonLd(body)) {
      const data = JSON.parse(raw);
      if (data['@type'] !== 'BreadcrumbList') continue;
      seen++;
      for (const [i, el] of data.itemListElement.entries()) {
        assert.equal(el.position, i + 1, p);
        assert.ok(el.item === ORIGIN || el.item.startsWith(`${ORIGIN}/`), `${p}: ${el.item}`);
        const target = new URL(el.item).pathname;
        if (!pages.has(target)) assert.equal((await get(target)).status, 200, `${p}: ${el.item}`);
      }
    }
  }
  assert.ok(seen > 200, `${seen} breadcrumb lists`);
});

test('every baseline country URL is preserved', () => {
  const { paths: baseline } = JSON.parse(fs.readFileSync(path.join(root, 'scripts/country-urls.baseline.json'), 'utf8'));
  assert.ok(baseline.length > 0);
  for (const p of baseline) {
    assert.equal(pages.get(p)?.status, 200, p);
    assert.equal(canonicalOf(pages.get(p).body), `${ORIGIN}${p}`, p);
  }
});

test('hreflang values are valid and reciprocal', () => {
  const alternates = (html) => [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]);
  const home = alternates(pages.get('/').body);
  assert.deepEqual(home.map(([l]) => l).sort(), ['en-US', 'x-default']);
  for (const [p, { body }] of pages) {
    for (const [lang, href] of alternates(body)) {
      assert.match(lang, /^(x-default|[a-z]{2,3}(-[A-Z]{2})?)$/, p);
      assert.ok(href === ORIGIN || href.startsWith(`${ORIGIN}/`), `${p}: ${href}`);
      const target = pages.get(new URL(href).pathname);
      assert.ok(target, `${p}: ${href} is in the sitemap`);
      assert.ok(alternates(target.body).some(([, back]) => noSlash(back) === noSlash(`${ORIGIN}${p}`)), `${p}: ${href} links back`);
    }
  }
});

test('titles and descriptions are unique, with complete social metadata', () => {
  const titles = new Map();
  const descriptions = new Map();
  for (const [p, { body }] of pages) {
    const title = titleOf(body);
    const description = metaContent(body, 'name', 'description');
    assert.ok(title.includes('OTTV'), `${p}: ${title}`);
    assert.ok(!title.includes('OTTV | OTTV'), p);
    assert.ok(description, p);
    assert.ok(!titles.has(title), `${p} repeats the title of ${titles.get(title)}`);
    assert.ok(!descriptions.has(description), `${p} repeats the description of ${descriptions.get(description)}`);
    titles.set(title, p);
    descriptions.set(description, p);
    assert.equal(noSlash(metaContent(body, 'property', 'og:url')), noSlash(`${ORIGIN}${p}`), `${p}: og:url`);
    assert.ok(metaContent(body, 'property', 'og:title'), p);
    assert.ok(metaContent(body, 'property', 'og:description'), p);
    assert.ok(metaContent(body, 'property', 'og:image').startsWith(ORIGIN), p);
    assert.equal(metaContent(body, 'name', 'twitter:card'), 'summary_large_image', p);
  }
});

test('no public page is noindexed; checkout is', async () => {
  for (const [p, { body, headers }] of pages) {
    assert.doesNotMatch(metaContent(body, 'name', 'robots'), /noindex/i, p);
    assert.doesNotMatch(headers['x-robots-tag'] ?? '', /noindex/i, p);
  }
  assert.match(metaContent((await get('/checkout')).body, 'name', 'robots'), /noindex/i);
  assert.ok(!paths.includes('/checkout'));
});

test('old hostnames reach the same path on the new origin in one permanent hop', async () => {
  const special = {
    '/pricing/': '/pricing', '/iptv-subscription': '/pricing', '/tv/pricing': '/pricing', '/tv/country/us': '/country/united-states',
    '/tv/country/myanmar': '/country/burma', '/country/south-korea': '/country/korea', '/pricing?utm_source=x': '/pricing?utm_source=x',
  };
  const cases = [...paths.map((p) => [p, p]), ...Object.entries(special)];
  for (const host of ['www.iptvmax.co', 'iptvmax.co']) {
    for (const [from, to] of cases) {
      const hop = await get(from, { host, proto: 'https' });
      assert.ok([301, 308].includes(hop.status), `${host}${from}: ${hop.status}`);
      assert.equal(hop.headers.location, `${ORIGIN}${to}`, `${host}${from}`);
      const landed = await get(to, { host: 'www.ottv.org', proto: 'https' });
      assert.equal(landed.status, 200, `${host}${from} -> ${to}: ${landed.status}`);
    }
  }
});

test('new-origin variants normalise in one hop', async () => {
  for (const [host, proto] of [['ottv.org', 'https'], ['ottv.org', 'http'], ['www.ottv.org', 'http']]) {
    const hop = await get('/pricing', { host, proto });
    assert.ok([301, 308].includes(hop.status), `${proto}://${host}: ${hop.status}`);
    assert.equal(hop.headers.location, `${ORIGIN}/pricing`);
  }
});

test('internal links on every page resolve', async () => {
  const targets = new Set();
  for (const { body } of pages.values()) {
    for (const m of body.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) targets.add(m[1]);
  }
  assert.ok(targets.size > 200);
  for (const t of targets) {
    if (pages.has(t)) continue;
    const { status } = await get(t);
    assert.ok(status < 400, `${t}: ${status}`);
  }
});

test('order and checkout flows still go to the same WhatsApp number at the same prices', async () => {
  const pricing = fs.readFileSync(path.join(root, 'src/lib/site-data/pricing.ts'), 'utf8');
  assert.deepEqual([...pricing.matchAll(/^\s+price: ([\d.]+),/gm)].map((m) => m[1]), ['15.82', '38.30', '59.15', '88.23']);
  const checkout = await get('/checkout?plan=1-month');
  assert.equal(checkout.status, 200);
  assert.ok(checkout.body.includes(WHATSAPP));
  assert.ok(pages.get('/pricing').body.includes(`${WHATSAPP}?text=`));
  assert.ok(pages.get('/contact').body.includes(WHATSAPP));
});

test('analytics and verification tags are intact', () => {
  const home = pages.get('/').body;
  // The scripts load only after consent, so they live behind ConsentManager and must stay out of the HTML.
  assert.ok(!home.includes('analytics.ahrefs.com/analytics.js'));
  assert.ok(!home.includes('cdn.visitors.now/v.js'));
  const analytics = fs.readFileSync(path.join(root, 'src/components/shared/Analytics.tsx'), 'utf8');
  assert.ok(analytics.includes('analytics.ahrefs.com/analytics.js'));
  assert.ok(analytics.includes('cdn.visitors.now/v.js'));
  assert.ok(analytics.includes('0a9ca441-3262-415a-a3ac-e06859feeeba'));
  assert.equal(metaContent(home, 'name', 'msvalidate.01'), 'CEC29E9356C1B062CC9637E64D68C778');
  assert.match(home, /google-site-verification/);
  assert.ok(fs.readFileSync(path.join(root, 'src/app/layout.tsx'), 'utf8').includes('<ConsentManager'));
  assert.ok(fs.existsSync(path.join(root, 'public/34703b31e96542ffb49bffed790d5e29.txt')));
});

test('no secrets are committed', () => {
  const files = [...walk(path.join(root, 'src')), ...walk(path.join(root, 'public')), ...walk(path.join(root, 'scripts'))]
    .filter((f) => /\.(tsx?|mjs|js|json|txt|ya?ml)$/.test(f));
  const secret = /-----BEGIN [A-Z ]*PRIVATE KEY|"private_key"\s*:|AIza[0-9A-Za-z_-]{35}|sk_live_[0-9a-zA-Z]+|xox[bp]-[0-9a-zA-Z-]+/;
  for (const f of files) assert.doesNotMatch(fs.readFileSync(f, 'utf8'), secret, path.relative(root, f));
  assert.ok(fs.readFileSync(path.join(root, '.gitignore'), 'utf8').includes('.env*'));
  assert.deepEqual(fs.readdirSync(root).filter((n) => /^\.env/.test(n)), []);
});

const mainText = (html) => decode((html.match(/<main[\s\S]*?<\/main>/) || [''])[0]
  .replace(/<script[\s\S]*?<\/script>|<svg[\s\S]*?<\/svg>/g, ' ')
  .replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

test('all 216 URLs stay indexable and listed in the sitemap', () => {
  assert.equal(locs.length, 216);
  const baseline = JSON.parse(fs.readFileSync(path.join(root, 'scripts/country-urls.baseline.json'), 'utf8'));
  const countries = (Array.isArray(baseline) ? baseline : baseline.urls ?? baseline.paths).map((u) => new URL(u, ORIGIN).pathname);
  assert.equal(countries.length, 199);
  for (const p of countries) assert.ok(paths.includes(p), p);
  for (const [p, res] of pages) {
    assert.equal(res.status, 200, p);
    assert.doesNotMatch(res.body, /<meta name="robots" content="[^"]*noindex/, p);
  }
});

test('country pages make no availability claim and differ beyond the country name', () => {
  const countryPaths = paths.filter((p) => p.startsWith('/country/'));
  const historical = new Set(['/country/east-germany', '/country/congo-free-state']);
  const masked = new Set();
  for (const p of countryPaths) {
    const html = pages.get(p).body;
    assert.doesNotMatch(html, /areaServed/, p);
    assert.ok(titleOf(html).length <= 60, `${p} title: ${titleOf(html)}`);
    assert.ok(metaContent(html, 'name', 'description').length <= 160, p);
    if (historical.has(p)) continue;
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, p);
    const h1 = mainText((html.match(/<h1[\s\S]*?<\/h1>/) || [''])[0].replace(/^/, '<main>').concat('</main>'));
    const name = h1.replace(/^Best IPTV in (the )?/, '');
    const text = mainText(html).replace(/Other Pages in [\s\S]*?Ready to start\?/, '').replace(new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), 'X');
    masked.add(text);
  }
  // A few countries genuinely share every fact (same currency, language, offset and device lists), so this is not 197.
  assert.ok(masked.size >= 185, `only ${masked.size} of 197 pages differ once the name is masked`);
});
