
import type { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "IPTV Subscription Plans | IPTVMax",
  description: "Explore our IPTV subscription plans. Choose the best package for your needs and enjoy thousands of channels and movies.",
  alternates: {
    canonical: "/pricing",
  },
  robots: {
    index: false,
    follow: true, // Allow search engines to follow the redirect
  }
};

// This component will render a meta refresh tag to redirect on the client-side,
// while the permanent redirect in next.config.js handles the server-side.
// This ensures that even if a user lands here, they are quickly sent to the correct page.
export default function IptvSubscriptionPage() {
  // For users with JavaScript disabled or for crawlers that don't execute JS,
  // we can provide a simple link as a fallback.
  // The primary redirect mechanism is the meta tag.
  
  // Best practice is to use server-side redirect if no content is ever shown.
  redirect('/pricing');

  // The code below is effectively unreachable but serves as a conceptual fallback.
  return (
    <html lang="en">
      <head>
        <title>Redirecting...</title>
        <meta http-equiv="refresh" content="0;url=/pricing" />
        <link rel="canonical" href="/pricing" />
      </head>
      <body>
        <p>
          You are being redirected to our pricing page. If you are not redirected automatically,
          <a href="/pricing">click here</a>.
        </p>
      </body>
    </html>
  );
}
