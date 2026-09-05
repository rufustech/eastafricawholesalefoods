/**
 * Product Utilities - Search, Filter, Format Helpers
 */

import { Product, SearchFilters } from "@/types/product";

/** Convert a product name into the SEO URL format used by the catalogue. */
export function getProductSlug(productOrName: Product | string): string {
  const name =
    typeof productOrName === "string" ? productOrName : productOrName.name;
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * Filter products based on search criteria
 */
export function filterProducts(
  products: Product[],
  filters: SearchFilters,
): Product[] {
  return products.filter((product) => {
    // Query filter
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matchesQuery =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      if (!matchesQuery) return false;
    }

    // Category filter
    if (filters.category && product.category !== filters.category) return false;

    return true;
  });
}

/**
 * Sort products by criteria
 */
export function sortProducts(
  products: Product[],
  sortBy: string = "name",
  sortOrder: string = "asc",
): Product[] {
  const sorted = [...products];
  const isAsc = sortOrder === "asc";

  sorted.sort((a, b) => {
    let compareA: any = a[sortBy as keyof Product];
    let compareB: any = b[sortBy as keyof Product];

    if (compareA < compareB) return isAsc ? -1 : 1;
    if (compareA > compareB) return isAsc ? 1 : -1;
    return 0;
  });

  return sorted;
}

/**
 * Paginate products
 */
export function paginateProducts(
  products: Product[],
  page: number = 1,
  pageSize: number = 12,
): { products: Product[]; total: number; page: number; pageSize: number } {
  const total = products.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedProducts = products.slice(start, end);

  return {
    products: paginatedProducts,
    total,
    page,
    pageSize,
  };
}

/**
 * Search and filter products in one operation
 */
export function searchProducts(
  products: Product[],
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = 12,
): { products: Product[]; total: number; page: number; pageSize: number } {
  let results = filterProducts(products, filters);
  results = sortProducts(
    results,
    filters.sortBy || "name",
    filters.sortOrder || "asc",
  );
  return paginateProducts(results, page, pageSize);
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string = "USD"): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
}

/**
 * Get product discount percentage
 */
export function getDiscountPercentage(
  originalPrice: number,
  discountedPrice: number,
): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

/**
 * Check if product is in stock
 */
export function isInStock(product: Product): boolean {
  return product.inventory === "In Inventory";
}

/**
 * Check if product is out of stock
 */
export function isOutOfStock(product: Product): boolean {
  return product.inventory !== "In Inventory";
}

/**
 * Group products by category
 */
export function groupProductsByCategory(
  products: Product[],
): Record<string, Product[]> {
  return products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {} as Record<string, Product[]>,
  );
}
