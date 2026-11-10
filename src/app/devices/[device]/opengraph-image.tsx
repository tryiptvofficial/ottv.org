
import { ImageResponse } from 'next/og'
import { getSafeArticleData, howToArticles } from '@/lib/how-to';

export const alt = 'IPTV Setup Guide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Prerender one image per guide at build time instead of rendering on every crawler request.
export function generateStaticParams() {
  return howToArticles.map((article) => ({ device: article.id }))
}

export default async function Image({ params }: { params: Promise<{ device: string }> }) {
  const { device } = await params
  const post = getSafeArticleData(device)
  
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
          backgroundColor: '#0a0a0a',
          color: 'white',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '48px', fontWeight: 500 }}>
          {/* The OTTV mark, as in public/favicon.svg */}
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(45 32 32)">
              <rect x="10" y="10" width="44" height="44" rx="10" fill="#FAFAFA" />
            </g>
            <path
              d="M27 22.8C27 21.55 28.38 20.79 29.44 21.46L43.14 30.16C44.12 30.78 44.12 32.22 43.14 32.84L29.44 41.54C28.38 42.21 27 41.45 27 40.2V22.8Z"
              fill="#0A0A0A"
            />
          </svg>
          <span style={{
            color: '#fafafa'
          }}>
            OTTV
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
          {post?.title}
        </p>
        <p style={{ fontSize: 24, color: '#a1a1a1', marginTop: '20px' }}>
          Live TV, sports and movies on the devices you own.
        </p>
      </div>
    ),
    { ...size }
  )
}
