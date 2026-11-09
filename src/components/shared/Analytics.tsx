'use client'

import Script from 'next/script'
import { GoogleAnalytics } from 'nextjs-google-analytics'

/** Every analytics tool on the site. Rendered only by ConsentManager, after a visitor accepts. */
export function Analytics() {
    return (
        <>
            <GoogleAnalytics trackPageViews strategy="lazyOnload" />
            {/* Visitors refuses to track localhost and logs a console error, which the dev overlay reports. */}
            {process.env.NODE_ENV === 'production' && (
                <Script
                    src="https://cdn.visitors.now/v.js"
                    data-token="0a9ca441-3262-415a-a3ac-e06859feeeba"
                    strategy="lazyOnload"
                />
            )}
            <Script src="https://analytics.ahrefs.com/analytics.js" id="ahrefs-analytics" strategy="lazyOnload" />
        </>
    )
}
