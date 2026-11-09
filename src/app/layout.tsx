
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist_Mono, Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ContactSheet } from "@/components/shared/ContactSheet";
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Analytics } from "@/components/shared/Analytics";
import { Schema } from "@/components/shared/Schema";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const viewport: Viewport = {
  // The site is dark in every OS theme, so the browser chrome matches the canvas token
  themeColor: '#040506',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const homeTitle = `${siteConfig.name} | 2026 Best IPTV Service With 24h Free Trial`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  keywords: [
    'best IPTV provider', 'iptv providers', 'best iptv providers', 'iptv service provider',
    'buy IPTV', 'IPTV subscription', 'IPTV USA', 'IPTV UK', 'IPTV service',
    'premium IPTV', 'cheap IPTV', 'IPTV channels', 'live TV streaming',
    '4K IPTV', 'sports IPTV', 'VOD streaming'
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: homeTitle,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Best Streaming Service`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: ['WayUe3dolb9UPFpMPHfTYy8CS-T1RkpFYqGvAkW5XqI', 'w1u9m2kb6kHd6gIgqXKGkXKQ7R6xLnYIpT54kS2sEkA'],
    yandex: '4cafd334f7cdc146',
    other: {
      'msvalidate.01': 'CEC29E9356C1B062CC9637E64D68C778',
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'x-default': '/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning className={cn(
        "font-body antialiased",
        inter.variable,
        geistMono.variable
      )}>
       <head>
          <Schema id="organization" schema={generateOrganizationSchema()} />
          <Schema id="website" schema={generateWebSiteSchema()} />
          <link rel="dns-prefetch" href="https://www.google-analytics.com"/>
          {/* Preconnect to external image origins used for LCP/hero and above-fold assets */}
          <link rel="preconnect" href="https://iptvwell.com" crossOrigin="anonymous"/>
          <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous"/>
          <link rel="dns-prefetch" href="https://image.tmdb.org"/>
        </head>
      <body>
        <ProgressBar />
        <Analytics />
        {/* Visitors refuses to track localhost and logs a console error, which the dev overlay reports. */}
        {process.env.NODE_ENV === "production" && (
          <Script
              src="https://cdn.visitors.now/v.js"
              data-token="0a9ca441-3262-415a-a3ac-e06859feeeba"
              strategy="afterInteractive"
          />
        )}
        <Script
            src="https://analytics.ahrefs.com/analytics.js"
            id="ahrefs-analytics"
            strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-control focus:bg-primary focus:text-primary-foreground"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
          </div>
          <ContactSheet />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
