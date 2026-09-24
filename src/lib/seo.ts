/**
 * SEO Utilities - Schema.org JSON-LD Generators
 * Generate structured data for search engines.
 *
 * NOTE: We never emit fabricated data (reviews, ratings, prices, GTIN, SKU,
 * stock levels, certifications). Product schema only includes fields we can
 * verify from the catalogue.
 */

import { Product } from "@/types/product";
import { BUSINESS, SITE_URL, absoluteUrl, FORMATTED_ADDRESS } from "@/lib/site";

export interface JsonLdSchema {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

/**
 * Generate Product schema for a single product.
 * Only verifiable fields are included — no reviews/ratings/prices are emitted.
 */
export function generateProductSchema(
  product: Product,
  options?: { url?: string; categoryName?: string },
): JsonLdSchema {
  const schema: JsonLdSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => absoluteUrl(img.url)),
    category: options?.categoryName,
    url: options?.url,
    brand: {
      "@type": "Brand",
      name: BUSINESS.name,
    },
  };

  if (product.specs?.origin) {
    schema.countryOfOrigin = product.specs.origin;
  }

  return schema;
}

/**
 * Generate BreadcrumbList schema for navigation.
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : absoluteUrl(item.url),
    })),
  };
}

/**
 * Generate an ItemList schema for a category/listing page.
 */
export function generateItemListSchema(
  items: Array<{ name: string; url: string }>,
): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : absoluteUrl(item.url),
    })),
  };
}

/**
 * Generate Organization schema.
 */
export function generateOrganizationSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: absoluteUrl(BUSINESS.logo),
    email: BUSINESS.email,
    telephone: BUSINESS.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: BUSINESS.email,
      telephone: BUSINESS.phoneE164,
      areaServed: "CA",
      availableLanguage: "en",
    },
  };
}

/**
 * Generate LocalBusiness schema for the verified Edmonton location.
 */
export function generateLocalBusinessSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: SITE_URL,
    image: absoluteUrl(BUSINESS.logo),
    logo: absoluteUrl(BUSINESS.logo),
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: {
      "@type": "Country",
      name: "Canada",
    },
    openingHoursSpecification: BUSINESS.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}

/**
 * Generate FAQPage schema.
 */
export function generateFaqSchema(
  faqs: Array<{ question: string; answer: string }>,
): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate Website schema. Search action omitted (no dedicated search route).
 */
export function generateWebsiteSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS.name,
    url: SITE_URL,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
    },
  };
}

/**
 * Sanitize JSON-LD schema by removing undefined values.
 */
export function sanitizeSchema(schema: JsonLdSchema): JsonLdSchema {
  return JSON.parse(JSON.stringify(schema));
}

export { FORMATTED_ADDRESS };
