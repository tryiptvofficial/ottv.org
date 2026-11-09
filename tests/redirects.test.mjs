// Unit tests for the redirect rules. Needs a Node version that strips TypeScript types (22.18+).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { canonicalPath, resolveRedirect } from '../src/lib/redirects.ts';

const NEW = 'https://www.ottv.org';
const at = (host, pathname, search = '', protocol = 'https:', extra = {}) =>
  resolveRedirect({ host, protocol, pathname, search, ...extra });

test('old hosts keep the path', () => {
  for (const host of ['iptvmax.co', 'www.iptvmax.co', 'WWW.IPTVMAX.CO', 'ottv.org']) {
    assert.equal(at(host, '/'), `${NEW}/`);
    assert.equal(at(host, '/pricing'), `${NEW}/pricing`);
    assert.equal(at(host, '/iptv-free-trial'), `${NEW}/iptv-free-trial`);
    assert.equal(at(host, '/country/france'), `${NEW}/country/france`);
  }
});

test('http on the canonical host upgrades to https', () => {
  assert.equal(at('www.ottv.org', '/pricing', '', 'http:'), `${NEW}/pricing`);
});

test('the canonical URL is served without a redirect', () => {
  assert.equal(at('www.ottv.org', '/'), null);
  assert.equal(at('www.ottv.org', '/pricing', '?a=1'), null);
});

test('legacy paths on the old host land in one hop', () => {
  const cases = {
    '/iptv-subscription': '/pricing',
    '/tv': '/',
    '/tv/pricing': '/pricing',
    '/tv/devices/fire-tv': '/devices/fire-tv',
    '/tv/country/us': '/country/united-states',
    '/tv/country/belgium': '/country/belgium',
    '/tv/country/south-korea': '/country/korea',
    '/tv/country/myanmar': '/country/burma',
    '/country/south-korea': '/country/korea',
    '/pricing/': '/pricing',
    '/tv/pricing/': '/pricing',
  };
  for (const [from, to] of Object.entries(cases)) assert.equal(at('www.iptvmax.co', from), `${NEW}${to}`, from);
});

test('every resolved path is final, so there are no chains or loops', () => {
  for (const p of ['/', '/tv', '/tv/pricing', '/tv/country/myanmar', '/country/south-korea', '/iptv-subscription', '/a/b/', '/pricing//']) {
    const once = canonicalPath(p);
    assert.equal(canonicalPath(once), once, p);
    assert.equal(at('www.ottv.org', once), null, p);
  }
});

test('query strings survive, credentials do not cross hosts', () => {
  assert.equal(at('www.iptvmax.co', '/pricing', '?utm_source=x&plan=1'), `${NEW}/pricing?utm_source=x&plan=1`);
  assert.equal(at('www.iptvmax.co', '/pricing', '?token=abc&plan=1'), `${NEW}/pricing?plan=1`);
  assert.equal(at('www.iptvmax.co', '/pricing', '?API_KEY=abc'), `${NEW}/pricing`);
});

test('local and preview hosts stay put but still apply path rules', () => {
  assert.equal(at('localhost:9003', '/pricing', '', 'http:'), null);
  assert.equal(at('localhost:9003', '/tv/pricing', '?a=1', 'http:'), '/pricing?a=1');
  assert.equal(at('my-app-git-x.vercel.app', '/pricing', '', 'https:', { isPreviewDeployment: true }), null);
});

test('a production vercel.app host still goes to the canonical origin', () => {
  assert.equal(at('my-app.vercel.app', '/pricing'), `${NEW}/pricing`);
});
