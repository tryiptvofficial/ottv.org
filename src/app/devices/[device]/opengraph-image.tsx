
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
        <p style={{ fontSize: 24, color: '#9c9c9d', marginTop: '20px' }}>
          Live TV, sports and movies on the devices you own.
        </p>
      </div>
    ),
    { ...size }
  )
}
