import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Builder — Drag & Drop React Form Generator",
  description:
    "Build React forms visually with the FormKitCN drag-and-drop builder. 18+ shadcn/ui field types, Zod validation, conditional logic, multi-step flows, live preview, and one-click code export.",
  alternates: {
    canonical: `${siteConfig.url}/builder`,
  },
  openGraph: {
    title: `Form Builder | ${siteConfig.name} — Visual React Form Generator`,
    description:
      "Drag-and-drop form builder powered by shadcn/ui. Build, preview, and export production-ready React forms with Zod validation instantly.",
    url: `${siteConfig.url}/builder`,
    type: "website",
  },
  twitter: {
    title: `Form Builder | ${siteConfig.name}`,
    description:
      "Drag-and-drop form builder powered by shadcn/ui. Build, preview, and export production-ready React forms with Zod validation instantly.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: siteConfig.url },
            { name: "Form Builder", url: `${siteConfig.url}/builder` },
          ],
        }}
      />
      <JsonLd type="webApplication" />
      {children}
    </>
  );
}
