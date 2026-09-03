import { Product } from "@/types/product";

/** Convert a product name into the SEO URL format used by the catalogue. */
export function getProductSlug(productOrName: Product | string): string {
  const name = typeof productOrName === "string" ? productOrName : productOrName.name;
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
