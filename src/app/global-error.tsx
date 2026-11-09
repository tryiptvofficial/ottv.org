'use client';

// Last-resort boundary for errors in the root layout itself, so it renders its own
// <html> and can't rely on the layout's styles or fonts. The inline values are the design
// system's canvas (#000000), text (#ffffff / #b3b3b3) and primary action (#e50914 with white text, 4px
// radius), copied here because no stylesheet is loaded. Documented exception.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#000000', color: '#ffffff' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 16, textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 500, margin: 0 }}>Something went wrong</h1>
          <p style={{ margin: 0, color: '#b3b3b3' }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ height: 44, padding: '0 16px', borderRadius: 4, border: 0, background: '#e50914', color: '#ffffff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
