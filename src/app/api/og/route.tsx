
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  // ?title=<title>. Without one (the homepage preview), only the brand line and tagline are drawn,
  // so "OTTV" does not appear twice.
  const title = searchParams.get('title')?.slice(0, 100);

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
          backgroundColor: '#000000',
          color: '#f0ece5',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '48px', fontWeight: 500 }}>
          {/* The OTTV mark, as in public/favicon.svg: green diamond, black play symbol */}
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(45 32 32)">
              <rect x="10" y="10" width="44" height="44" rx="10" fill="#25F07C" />
            </g>
            <path
              d="M27 22.8C27 21.55 28.38 20.79 29.44 21.46L43.14 30.16C44.12 30.78 44.12 32.22 43.14 32.84L29.44 41.54C28.38 42.21 27 41.45 27 40.2V22.8Z"
              fill="#000000"
            />
          </svg>
          <span style={{
            color: '#f0ece5',
            letterSpacing: '-0.04em'
          }}>
            OTTV
          </span>
        </div>
        {title && (
          <p
            style={{
              fontSize: 60,
              fontWeight: 500,
              textAlign: 'center',
              padding: '0 80px',
              lineHeight: 1.1,
              letterSpacing: '-0.04em'
            }}
          >
            {title}
          </p>
        )}
        <p style={{ fontSize: 24, color: '#a8a39b', marginTop: '20px' }}>
          Live TV, sports and movies on the devices you own.
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
