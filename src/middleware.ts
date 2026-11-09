import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { resolveRedirect } from '@/lib/redirects';

// Canonical origin: always https://www.ottv.org
// Any other host (non-www, http, the old domain) is redirected here, keeping the path.
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const target = resolveRedirect({
    host: request.headers.get('host') ?? '',
    protocol: url.protocol,
    pathname: url.pathname,
    search: url.search,
    isPreviewDeployment: process.env.VERCEL_ENV === 'preview',
  });

  return target ? NextResponse.redirect(new URL(target, request.url), { status: 301 }) : NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
