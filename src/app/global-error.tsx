'use client';

// Last-resort boundary for errors in the root layout itself, so it renders its own
// <html> and can't rely on the layout's styles or fonts. The inline values are the design
// system's canvas (#122314), text (#ffffff / #b7bda5) and primary action (Electric Sprout #68ef3f on Onyx Olive
// #30322a, 28px radius), copied here because no stylesheet is loaded. Documented exception.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#122314', color: '#ffffff' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 16, textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 500, margin: 0 }}>Something went wrong</h1>
          <p style={{ margin: 0, color: '#b7bda5' }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ height: 44, padding: '0 16px', borderRadius: 28, border: 0, background: '#68ef3f', color: '#30322a', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
