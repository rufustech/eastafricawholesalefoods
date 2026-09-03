/**
 * Structured Data Component
 * Renders JSON-LD schema markup in page head
 */

import { JsonLdSchema, sanitizeSchema } from "@/lib/seo";

interface StructuredDataProps {
  schema: JsonLdSchema | JsonLdSchema[];
}

export function StructuredData({ schema }: StructuredDataProps) {
  // Ensure it's always an array for consistent handling
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(sanitizeSchema(s)),
          }}
        />
      ))}
    </>
  );
}
