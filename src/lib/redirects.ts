// Every permanent redirect the site issues, as one pure function so a request needs at most one hop.
// next.config redirects and Next's trailing-slash redirect run before middleware, so anything left
// there would become a second hop on the old host (old domain -> old domain -> ottv.org).
// Keep this file free of path aliases and Next imports: tests/redirects.test.mjs loads it directly.

export const CANONICAL_HOST = 'www.ottv.org';

const exactPaths: Record<string, string> = {
  '/iptv-subscription': '/pricing',
  // Legacy iptvprovider.me paths.
  '/tv': '/',
  '/tv/pricing': '/pricing',
  '/tv/faq': '/faq',
  '/tv/iptv-free-trial': '/iptv-free-trial',
  '/tv/guides/iptv-buffering-troubleshooting': '/devices/troubleshooting',
  '/tv/country/us': '/country/united-states',
  '/tv/country/uk': '/country/united-kingdom',
  '/tv/country/ca': '/country/canada',
  // Old-domain country slugs that differ from this site's slugs (both had Search Console impressions).
  '/country/south-korea': '/country/korea',
  '/country/myanmar': '/country/burma',
};

const segmentRewrites: [RegExp, string][] = [
  [/^\/tv\/devices\/([^/]+)$/, '/devices/$1'],
  [/^\/tv\/country\/([^/]+)$/, '/country/$1'],
];

// Dropped when leaving the requested host, so credentials never travel in a redirect to another origin.
const sensitiveParams = new Set(['token', 'access_token', 'id_token', 'secret', 'password', 'api_key', 'apikey']);

/** The final path for a request path, with trailing slashes removed and legacy paths resolved. */
export function canonicalPath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '') || '/';
  if (exactPaths[trimmed]) return exactPaths[trimmed];
  for (const [pattern, replacement] of segmentRewrites) {
    if (pattern.test(trimmed)) {
      const rewritten = trimmed.replace(pattern, replacement);
      return exactPaths[rewritten] ?? rewritten;
    }
  }
  return trimmed;
}

function withoutSensitiveParams(search: string): string {
  const params = new URLSearchParams(search);
  const present = [...params.keys()].filter((key) => sensitiveParams.has(key.toLowerCase()));
  if (!present.length) return search;
  present.forEach((key) => params.delete(key));
  const kept = params.toString();
  return kept ? `?${kept}` : '';
}

export interface RedirectRequest {
  host: string;
  protocol: string;
  pathname: string;
  search: string;
  /** Vercel preview deployments stay on their own host so a build can be checked before go-live. */
  isPreviewDeployment?: boolean;
}

/** The redirect target for a request, or null when it should be served as is. Local targets are relative. */
export function resolveRedirect({ host, protocol, pathname, search, isPreviewDeployment }: RedirectRequest): string | null {
  const bareHost = host.split(':')[0].toLowerCase();
  const path = canonicalPath(pathname);
  const pathChanged = path !== pathname;

  const staysOnHost = bareHost === 'localhost' || bareHost === '127.0.0.1' || bareHost.endsWith('.localhost') || isPreviewDeployment;
  if (staysOnHost) return pathChanged ? `${path}${search}` : null;

  const wrongHost = bareHost !== CANONICAL_HOST;
  if (!wrongHost && protocol !== 'http:' && !pathChanged) return null;

  return `https://${CANONICAL_HOST}${path}${wrongHost ? withoutSensitiveParams(search) : search}`;
}
