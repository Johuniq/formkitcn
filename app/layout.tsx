import Providers from "@/components/Providers";
import Analytics, { GtmNoScript } from "@/components/seo/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo-config";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ── Global viewport config ─────────────────────────────── */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: siteConfig.themeColor },
    { media: "(prefers-color-scheme: light)", color: siteConfig.themeColor },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

/* ── Global metadata (inherited by every page) ──────────── */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  generator: "Next.js",
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Drag & drop form builder powered by shadcn/ui`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} — Drag & drop form builder powered by shadcn/ui`,
        width: 1200,
        height: 630,
      },
    ],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": siteConfig.url,
    },
  },
  category: "developer tools",
  classification: "Software, Developer Tools, Form Builder",

  /* ── Search engine verification ────────────────────────── */
  verification: {
    ...(siteConfig.verification.google && {
      google: siteConfig.verification.google,
    }),
    ...(siteConfig.verification.yandex && {
      yandex: siteConfig.verification.yandex,
    }),
    other: {
      ...(siteConfig.verification.bing && {
        "msvalidate.01": siteConfig.verification.bing,
      }),
      ...(siteConfig.verification.pinterest && {
        "p:domain_verify": siteConfig.verification.pinterest,
      }),
      ...(siteConfig.verification.baidu && {
        "baidu-site-verification": siteConfig.verification.baidu,
      }),
    },
  },

  other: {
    "msapplication-TileColor": siteConfig.themeColor,
    "msapplication-config": "/browserconfig.xml",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": siteConfig.name,
    "mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Global structured data */}
        <JsonLd type="website" />
        <JsonLd type="organization" />
        <JsonLd type="softwareApplication" />
        <JsonLd type="product" />

        {/* Analytics scripts (only load when env vars are set) */}
        <Analytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* GTM noscript fallback */}
        <GtmNoScript />
        {/* Skip to content for accessibility (SEO + a11y) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-semibold focus:outline-none"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
