import Hero from "@/components/Hero";
import CTABanner from "@/components/landing/CTABanner";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/Navbar";
import TemplatesShowcase from "@/components/landing/TemplatesShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Open-Source shadcn/ui Form Builder | Drag & Drop React Forms`,
  description:
    "The free, open-source drag-and-drop form builder powered by shadcn/ui. Build production-ready React forms with 18+ field types, Zod validation, react-hook-form, multi-step flows, conditional logic, live preview, and instant code export. No sign-up required.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} — Open-Source shadcn/ui Form Builder`,
    description:
      "Build production-ready React forms visually with shadcn/ui components. 18+ field types, Zod validation, multi-step flows, conditional logic, and instant code export. Free & open source.",
    url: siteConfig.url,
    type: "website",
  },
  twitter: {
    title: `${siteConfig.name} — Open-Source shadcn/ui Form Builder`,
    description:
      "Build production-ready React forms visually with shadcn/ui components. 18+ field types, Zod validation, multi-step flows, conditional logic, and instant code export.",
  },
};

const faqData = [
  {
    question: "What is FormKitCN?",
    answer:
      "FormKitCN is a free, open-source drag-and-drop form builder powered by shadcn/ui. It lets you visually build React forms and export production-ready code with react-hook-form and Zod validation — all without writing form code manually.",
  },
  {
    question: "Is FormKitCN free to use?",
    answer:
      "Yes, FormKitCN is completely free and open source under the MIT license. No sign-up, no credit card, no usage limits. You can use it for personal and commercial projects.",
  },
  {
    question: "What field types does FormKitCN support?",
    answer:
      "FormKitCN supports 18+ field types including text, email, password, number, textarea, select dropdown, checkbox, radio group, date picker, time picker, date-time, file upload, toggle switch, URL, phone, slider, color picker, rating, and layout elements like section headings, paragraph descriptions, and horizontal dividers.",
  },
  {
    question: "Can I export the form as React code?",
    answer:
      "Yes! FormKitCN generates a complete, production-ready React component using react-hook-form for state management and Zod for validation. The exported code includes all field configurations, validation rules, conditional logic, and multi-step navigation — ready to drop into your project.",
  },
  {
    question: "Does FormKitCN support multi-step forms?",
    answer:
      "Yes, FormKitCN has full multi-step wizard form support. You can create multiple steps, assign fields to specific steps, add per-step validation, and the exported code includes step navigation with a progress indicator.",
  },
  {
    question: "What is shadcn/ui and how does FormKitCN use it?",
    answer:
      "shadcn/ui is a popular collection of re-usable React components built with Radix UI and Tailwind CSS. FormKitCN uses shadcn/ui components for all form elements (inputs, selects, checkboxes, etc.) and the builder UI itself, ensuring your exported forms follow shadcn/ui patterns and styling conventions.",
  },
  {
    question: "Does FormKitCN support conditional field visibility?",
    answer:
      "Yes. You can set up conditional logic rules to show or hide fields based on other field values. Conditions support operators like equals, not equals, contains, greater than, and less than. The conditional logic is automatically included in the exported React code.",
  },
  {
    question: "Can I add validation to form fields?",
    answer:
      "FormKitCN has a built-in validation engine supporting required fields, min/max length, min/max values, email format, URL format, regex patterns, and custom error messages. All validation rules are exported as a Zod schema in the generated code.",
  },
  {
    question: "Does FormKitCN work on mobile devices?",
    answer:
      "Yes, the FormKitCN builder is fully responsive with a dedicated mobile panel layout that adapts to smaller screens. The forms you build are also mobile-responsive by default since they use shadcn/ui's responsive components.",
  },
  {
    question: "How do I get started with FormKitCN?",
    answer:
      "Just open the builder at formkitcn.jolyui.dev/builder — no installation or sign-up needed. Drag fields from the palette, configure them in the properties panel, preview your form live, and export the React code when you're done.",
  },
];

const featureListItems = [
  {
    name: "18+ Field Types",
    description:
      "Text, email, select, date, file upload, slider, rating, toggle, and many more field types.",
  },
  {
    name: "Drag & Drop Builder",
    description:
      "Intuitive visual canvas with reorder, duplicate, and field configuration.",
  },
  {
    name: "Zod Validation",
    description:
      "Built-in validation engine with regex, min/max, required, and custom error messages.",
  },
  {
    name: "Conditional Logic",
    description:
      "Show or hide fields based on other field values with multiple operators.",
  },
  {
    name: "Multi-Step Forms",
    description:
      "Wizard-style flows with per-step validation and progress indicators.",
  },
  {
    name: "Live Preview",
    description:
      "Real-time form rendering with working validation and step navigation.",
  },
  {
    name: "React Code Export",
    description: "One-click export of react-hook-form + Zod component code.",
  },
  {
    name: "shadcn/ui Components",
    description:
      "All form elements use shadcn/ui for consistent, beautiful styling.",
  },
  {
    name: "Template Gallery",
    description:
      "Pre-built form templates for contact, registration, survey, and more.",
  },
];

const Index = () => {
  return (
    <>
      {/* Structured data for rich search results */}
      <JsonLd type="webApplication" />
      <JsonLd type="howTo" />
      <JsonLd type="faq" data={{ questions: faqData }} />
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { name: "Home", url: siteConfig.url },
            { name: "Features", url: `${siteConfig.url}/#features` },
            { name: "How It Works", url: `${siteConfig.url}/#how-it-works` },
            { name: "Templates", url: `${siteConfig.url}/#templates` },
          ],
        }}
      />
      <JsonLd type="itemList" data={{ items: featureListItems }} />

      <div className="min-h-screen bg-background scroll-smooth">
        <Navbar />
        <main id="main-content">
          <div className="pt-12">
            <Hero />
            <div id="features">
              <Features />
            </div>
            <div id="how-it-works">
              <HowItWorks />
            </div>
            <div id="templates">
              <TemplatesShowcase />
            </div>
            <CTABanner />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
