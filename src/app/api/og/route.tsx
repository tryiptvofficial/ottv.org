
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  // ?title=<title>
  const hasTitle = searchParams.has('title');
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'IPTVMax';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#040506',
          backgroundImage: 'radial-gradient(60% 60% at 50% 26%, rgba(20, 60, 163, 0.45), rgba(2, 25, 59, 0.25) 55%, #040506 80%)',
          color: 'white',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '48px', fontWeight: 500 }}>
           <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: '#ff6363' }}
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.51 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
          <span style={{
            color: '#ffffff'
          }}>
            IPTVMax
          </span>
        </div>
        <p
          style={{
            fontSize: 60,
            fontWeight: 500,
            textAlign: 'center',
            padding: '0 50px',
            lineHeight: 1.2
          }}
        >
          {title}
        </p>
        <p style={{ fontSize: 24, color: '#9c9c9d', marginTop: '20px' }}>
          The world&apos;s most reliable streaming service.
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Output depends only on the URL, so let browsers and CDNs keep it (the edge runtime used to set this).
      headers: { 'cache-control': 'public, immutable, no-transform, max-age=31536000' },
    }
  );
}
