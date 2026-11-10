'use client';

// Last-resort boundary for errors in the root layout itself, so it renders its own
// <html> and can't rely on the layout's styles or fonts. The inline values are the design
// system's canvas (#0a0a0a), text (#fafafa / #a1a1a1) and primary action (#e5e5e5 with #171717 text, 8px
// radius), copied here because no stylesheet is loaded. Documented exception.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#0a0a0a', color: '#fafafa' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 16, textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 500, margin: 0 }}>Something went wrong</h1>
          <p style={{ margin: 0, color: '#a1a1a1' }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ height: 44, padding: '0 16px', borderRadius: 8, border: 0, background: '#e5e5e5', color: '#171717', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
