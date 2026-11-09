import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Guards the indexing endpoints with `Authorization: Bearer <INDEXING_API_SECRET>`.
 * Returns an error response to send back, or null when the request may proceed.
 * Fails closed: with no secret configured, every request is refused.
 */
export function rejectUnlessAuthorized(req: NextRequest): NextResponse | null {
  const secret = process.env.INDEXING_API_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Endpoint not configured' }, { status: 503 });
  }

  const provided = Buffer.from(req.headers.get('authorization') ?? '');
  const expected = Buffer.from(`Bearer ${secret}`);
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}
