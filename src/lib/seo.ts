/**
 * SEO Utilities - Schema.org JSON-LD Generators
 * Generate structured data for search engines
 */

import { Product } from "@/types/product";

export interface JsonLdSchema {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

/**
 * Generate Product schema for a single product
 */
export function generateProductSchema(product: Product): JsonLdSchema {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    offers: {
      "@type": "Offer",
      price: product.pricing.retail.amount.toString(),
      priceCurrency: product.pricing.retail.currency,
      availability: product.inventory.available > 0 ? "InStock" : "OutOfStock",
      url: `${typeof window !== "undefined" ? window.location.origin : ""}/products/${product.id}`,
    },
    aggregateRating:
      product.rating && product.reviews
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating.toString(),
            reviewCount: product.reviews.toString(),
          }
        : undefined,
  };
}

/**
 * Generate BreadcrumbList schema for navigation
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
      item: item.url,
    })),
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(config: {
  name: string;
  url: string;
  logo?: string;
  email?: string;
  phone?: string;
}): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.name,
    url: config.url,
    logo: config.logo,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: config.email,
      telephone: config.phone,
    },
  };
}

/**
 * Generate LocalBusiness schema for regional operations
 */
export function generateLocalBusinessSchema(config: {
  name: string;
  description: string;
  address: string;
  region: string;
  phone: string;
  email: string;
}): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.name,
    description: config.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address,
      addressRegion: config.region,
    },
    telephone: config.phone,
    email: config.email,
  };
}

/**
 * Generate FAQPage schema
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
 * Generate Website schema with SearchAction
 */
export function generateWebsiteSchema(config: {
  name: string;
  url: string;
}): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.name,
    url: config.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${config.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Sanitize JSON-LD schema by removing undefined values
 */
export function sanitizeSchema(schema: JsonLdSchema): JsonLdSchema {
  return JSON.parse(JSON.stringify(schema));
}
