/** Centralised SEO constants — single source of truth for every meta tag. */

export const siteConfig = {
  name: "FormKitCN",
  shortName: "FormKitCN",
  tagline: "Open-Source shadcn/ui Form Builder",
  description:
    "The open-source drag-and-drop form builder for React, powered by shadcn/ui. Build production-ready forms with 18+ field types, Zod validation, react-hook-form, multi-step flows, conditional logic, live preview, and one-click code export.",
  longDescription:
    "formkitcn is a free, open-source visual form builder built on shadcn/ui components. Drag and drop 18+ field types onto a canvas, configure validation rules with Zod, add conditional visibility logic, create multi-step wizard flows, preview your form in real time, and export a clean React component using react-hook-form — all without writing a single line of form code.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://formkitcn.jolyui.dev",
  ogImage: "/og-image.png",
  creator: "Johuniq",
  authors: [{ name: "Johuniq", url: "https://github.com/Johuniq" }],
  keywords: [
    // Primary keywords
    "form builder",
    "react form builder",
    "shadcn form builder",
    "shadcn/ui form builder",
    "shadcn ui form",
    "drag and drop form builder",
    // Product-specific
    "formkitcn",
    "form kit cn",
    "form generator",
    "visual form builder",
    "schema form builder",
    "form builder tool",
    // Technology keywords
    "react hook form builder",
    "zod form builder",
    "zod validation form",
    "react hook form generator",
    "typescript form builder",
    "nextjs form builder",
    "tailwind form builder",
    "tailwindcss form",
    "radix ui form",
    // Feature keywords
    "multi-step form builder",
    "conditional form builder",
    "form builder with validation",
    "form builder code export",
    "drag drop form react",
    "form builder no code",
    "open source form builder",
    "free form builder",
    // Long-tail
    "build react forms visually",
    "generate react form code",
    "shadcn ui form generator online",
    "react form builder with zod validation",
    "drag and drop form builder react",
  ],
  locale: "en_US",
  themeColor: "#3b82f6",
  backgroundColor: "#09090b",
  twitterHandle: "@Johuniq",
  links: {
    github: "https://github.com/Johuniq/formkitcn",
    jolyui: "https://www.jolyui.dev",
  },
  features: [
    "18+ field types including text, email, select, date, file upload, slider, rating, and more",
    "Drag-and-drop visual form canvas with reorder, duplicate, and delete",
    "Zod-powered validation engine with min/max, regex, email, and custom rules",
    "Conditional field visibility based on other field values",
    "Multi-step wizard form flows with per-step validation",
    "Real-time live form preview with working validation",
    "JSON schema output ready to copy and integrate",
    "One-click React component export with react-hook-form and Zod",
    "Undo/redo history with autosave and draft recovery",
    "Mobile-responsive builder with adaptive panel layout",
    "Template gallery with pre-built forms for common use cases",
    "Built entirely on shadcn/ui components and Tailwind CSS",
  ],
  version: "0.1.0",

  /** Search engine verification IDs — set via env vars in production */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION ?? "",
    pinterest: process.env.NEXT_PUBLIC_PINTEREST_SITE_VERIFICATION ?? "",
    baidu: process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION ?? "",
  },

  /** Analytics IDs — set via env vars in production */
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    microsoftClarityId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "",
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
    plausibleSrc:
      process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ??
      "https://plausible.io/js/script.js",
    umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "",
    umamiSrc:
      process.env.NEXT_PUBLIC_UMAMI_SRC ?? "https://cloud.umami.is/script.js",
  },
} as const;

export type SiteConfig = typeof siteConfig;
