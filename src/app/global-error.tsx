'use client';

// Last-resort boundary for errors in the root layout itself, so it renders its own
// <html> and can't rely on the layout's styles or fonts. The inline values are the design
// system's black page, text (#f0ece5 / #a8a39b) and primary action (green #25f07c with black text, 10px
// radius), copied here because no stylesheet is loaded. Documented exception.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#000000', color: '#f0ece5' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 450, letterSpacing: '-0.04em', margin: 0 }}>Something went wrong</h1>
          <p style={{ margin: 0, color: '#a8a39b' }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 0, background: '#25f07c', color: '#000000', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
