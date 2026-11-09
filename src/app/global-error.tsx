'use client';

// Last-resort boundary for errors in the root layout itself, so it renders its own
// <html> and can't rely on the layout's styles or fonts. The inline values are the design
// system's canvas (#040506), text (#ffffff / #9c9c9d) and primary action (Mist #e6e6e6 on Iron
// #454647, 8px radius), copied here because no stylesheet is loaded. Documented exception.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, system-ui, -apple-system, sans-serif', background: '#040506', color: '#ffffff' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 16, textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 500, margin: 0 }}>Something went wrong</h1>
          <p style={{ margin: 0, color: '#9c9c9d' }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ height: 44, padding: '0 16px', borderRadius: 8, border: 0, background: '#e6e6e6', color: '#454647', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
