import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Canonical origin: always https://www.iptvmax.co
// Any other host (non-www, http, old domain) is redirected here.
const CANONICAL_HOST = 'www.iptvmax.co';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') ?? '';

  // Strip port for comparison (dev environments use localhost with a port)
  const bareHost = host.split(':')[0];

  // Allow local development hosts through without redirecting
  if (bareHost === 'localhost' || bareHost === '127.0.0.1' || bareHost.endsWith('.localhost')) {
    return NextResponse.next();
  }

  const needsHttps = url.protocol === 'http:';
  const needsWww = bareHost !== CANONICAL_HOST;

  if (needsHttps || needsWww) {
    const canonical = new URL(request.url);
    canonical.protocol = 'https:';
    canonical.host = CANONICAL_HOST;
    // Setting host keeps the incoming port (e.g. the app server's), which would leak into the redirect.
    canonical.port = '';
    return NextResponse.redirect(canonical, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
