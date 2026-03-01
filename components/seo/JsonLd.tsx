import { siteConfig } from "@/lib/seo-config";

type JsonLdType =
  | "website"
  | "webApplication"
  | "softwareApplication"
  | "organization"
  | "breadcrumb"
  | "faq"
  | "howTo"
  | "itemList"
  | "product";

interface JsonLdProps {
  type: JsonLdType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
}

function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/builder`,
        },
        "query-input": "required",
      },
    ],
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
  };
}

function getWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${siteConfig.url}/#webapp`,
    name: siteConfig.name,
    url: `${siteConfig.url}/builder`,
    description: siteConfig.description,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Form Builder",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: siteConfig.version,
    releaseNotes: `${siteConfig.url}/changelog`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: siteConfig.features,
    screenshot: [
      {
        "@type": "ImageObject",
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        caption: "FormKitCN drag-and-drop form builder interface",
      },
    ],
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    isAccessibleForFree: true,
    license: "https://opensource.org/licenses/MIT",
    inLanguage: "en-US",
    keywords: siteConfig.keywords.slice(0, 10).join(", "),
  };
}

function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}/#software`,
    name: siteConfig.name,
    description: siteConfig.longDescription,
    url: siteConfig.url,
    applicationCategory: "WebApplication",
    operatingSystem: "Cross-platform",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    downloadUrl: siteConfig.links.github,
    installUrl: `${siteConfig.url}/builder`,
    softwareVersion: siteConfig.version,
    softwareHelp: {
      "@type": "CreativeWork",
      url: siteConfig.links.github,
    },
    author: { "@id": `${siteConfig.url}/#organization` },
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };
}

function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/icon-512.png`,
      width: 512,
      height: 512,
    },
    sameAs: [siteConfig.links.github, siteConfig.links.jolyui],
    foundingDate: "2025",
    description: `${siteConfig.name} — ${siteConfig.tagline}`,
  };
}

function getBreadcrumbSchema(items: { name: string; url: string }[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function getFaqSchema(questions: { question: string; answer: string }[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

function getHowToSchema(
  data: {
    name?: string;
    description?: string;
    steps?: { name: string; text: string; url?: string }[];
    totalTime?: string;
  } = {},
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.name || `How to build a form with ${siteConfig.name}`,
    description:
      data.description ||
      "Step-by-step guide to building production-ready React forms using FormKitCN's visual drag-and-drop builder.",
    totalTime: data.totalTime || "PT2M",
    tool: [
      { "@type": "HowToTool", name: "Web browser" },
      { "@type": "HowToTool", name: siteConfig.name },
    ],
    step: (
      data.steps || [
        {
          name: "Open the builder",
          text: "Navigate to the FormKitCN builder page to start creating your form.",
          url: `${siteConfig.url}/builder`,
        },
        {
          name: "Drag and drop fields",
          text: "Choose from 18+ field types in the palette and drag them onto the form canvas. Reorder with drag handles.",
        },
        {
          name: "Configure validation",
          text: "Select a field and set validation rules like required, min/max, regex, and email with custom error messages.",
        },
        {
          name: "Add conditional logic",
          text: "Set up conditional visibility rules to show or hide fields based on other field values.",
        },
        {
          name: "Preview your form",
          text: "Switch to the live preview tab to see your form render with working validation and multi-step navigation.",
        },
        {
          name: "Export React code",
          text: "Click the export button to download a production-ready React component with react-hook-form and Zod validation.",
        },
      ]
    ).map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: s.url || `${siteConfig.url}/builder`,
    })),
  };
}

function getItemListSchema(
  data: { items?: { name: string; description: string; url?: string }[] } = {},
) {
  const items = data.items || [];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} Features`,
    description: `Key features of ${siteConfig.name} form builder`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      description: item.description,
      url: item.url || `${siteConfig.url}/#features`,
    })),
  };
}

function getProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}/#product`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/og-image.png`,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/builder`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    category: "Developer Tools",
  };
}

export function JsonLd({ type, data }: JsonLdProps) {
  let schema;

  switch (type) {
    case "website":
      schema = getWebsiteSchema();
      break;
    case "webApplication":
      schema = getWebApplicationSchema();
      break;
    case "softwareApplication":
      schema = getSoftwareApplicationSchema();
      break;
    case "organization":
      schema = getOrganizationSchema();
      break;
    case "breadcrumb":
      schema = getBreadcrumbSchema(data?.items);
      break;
    case "faq":
      schema = getFaqSchema(data?.questions);
      break;
    case "howTo":
      schema = getHowToSchema(data as Parameters<typeof getHowToSchema>[0]);
      break;
    case "itemList":
      schema = getItemListSchema(
        data as Parameters<typeof getItemListSchema>[0],
      );
      break;
    case "product":
      schema = getProductSchema();
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Helper: render multiple JSON-LD blocks at once */
export function JsonLdMulti({ schemas }: { schemas: JsonLdProps[] }) {
  return (
    <>
      {schemas.map((s, i) => (
        <JsonLd key={`${s.type}-${i}`} type={s.type} data={s.data} />
      ))}
    </>
  );
}
