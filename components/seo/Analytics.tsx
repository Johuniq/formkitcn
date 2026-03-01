"use client";

import { siteConfig } from "@/lib/seo-config";
import Script from "next/script";

/**
 * Analytics — loads only when the corresponding env var is set.
 *
 * Supports:
 *   - Google Analytics 4 (GA4)     → NEXT_PUBLIC_GA_MEASUREMENT_ID
 *   - Google Tag Manager (GTM)     → NEXT_PUBLIC_GTM_ID
 *   - Microsoft Clarity            → NEXT_PUBLIC_CLARITY_PROJECT_ID
 *   - Plausible Analytics          → NEXT_PUBLIC_PLAUSIBLE_DOMAIN
 *   - Umami Analytics              → NEXT_PUBLIC_UMAMI_WEBSITE_ID
 *
 * All scripts are loaded with `afterInteractive` strategy so they
 * don't block the initial page render.
 */
export default function Analytics() {
  const {
    googleAnalyticsId,
    googleTagManagerId,
    microsoftClarityId,
    plausibleDomain,
    plausibleSrc,
    umamiWebsiteId,
    umamiSrc,
  } = siteConfig.analytics;

  return (
    <>
      {/* ── Google Analytics 4 ──────────────────────────────── */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_path: window.location.pathname,
                send_page_view: true,
              });
            `}
          </Script>
        </>
      )}

      {/* ── Google Tag Manager ──────────────────────────────── */}
      {googleTagManagerId && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManagerId}');
            `}
          </Script>
        </>
      )}

      {/* ── Microsoft Clarity ───────────────────────────────── */}
      {microsoftClarityId && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${microsoftClarityId}");
          `}
        </Script>
      )}

      {/* ── Plausible Analytics ─────────────────────────────── */}
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src={plausibleSrc}
          strategy="afterInteractive"
        />
      )}

      {/* ── Umami Analytics ─────────────────────────────────── */}
      {umamiWebsiteId && (
        <Script
          defer
          data-website-id={umamiWebsiteId}
          src={umamiSrc}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

/**
 * GTM noscript iframe — place inside <body> right after the opening tag.
 * Only renders when NEXT_PUBLIC_GTM_ID is set.
 */
export function GtmNoScript() {
  const { googleTagManagerId } = siteConfig.analytics;
  if (!googleTagManagerId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
