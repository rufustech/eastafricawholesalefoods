import Link from "next/link";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/seo";

export interface Crumb {
  name: string;
  url: string;
}

/**
 * Accessible breadcrumb trail that also emits BreadcrumbList JSON-LD.
 * The final crumb is rendered as the current page (not a link).
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <StructuredData schema={generateBreadcrumbSchema(items)} />
      <nav
        className="mb-8 flex flex-wrap items-center gap-2 text-sm"
        aria-label="Breadcrumb"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.url} className="flex items-center gap-2">
              {isLast ? (
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  {item.name}
                </Link>
              )}
              {!isLast && (
                <span className="text-neutral-400" aria-hidden="true">
                  /
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
