/**
 * Product Utilities - Search, Filter, Format Helpers
 */

import { Product, SearchFilters, SearchResult } from "@/types/product";

/** Convert a product name into the SEO URL format used by the catalogue. */
export function getProductSlug(productOrName: Product | string): string {
  const name = typeof productOrName === "string" ? productOrName : productOrName.name;
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

    // Price range filter
    const retailPrice = product.pricing.retail.amount;
    if (filters.minPrice && retailPrice < filters.minPrice) return false;
    if (filters.maxPrice && retailPrice > filters.maxPrice) return false;

    // In stock filter
    if (filters.inStock && product.inventory.available === 0) return false;

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

    if (sortBy === "price") {
      compareA = a.pricing.retail.amount;
      compareB = b.pricing.retail.amount;
    }

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
): SearchResult {
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
): SearchResult {
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
 * Check if product is low stock
 */
export function isLowStock(product: Product, threshold: number = 5): boolean {
  return (
    product.inventory.available > 0 && product.inventory.available <= threshold
  );
}

/**
 * Check if product is out of stock
 */
export function isOutOfStock(product: Product): boolean {
  return product.inventory.available === 0;
}

/**
 * Get applicable price tier for quantity
 */
export function getApplicablePrice(product: Product, quantity: number) {
  if (product.pricing.bulk && quantity >= 100) {
    return product.pricing.bulk;
  }
  if (product.pricing.wholesale && quantity >= 50) {
    return product.pricing.wholesale;
  }
  return product.pricing.retail;
}

/**
 * Calculate total price with tax
 */
export function calculateTotalWithTax(
  basePrice: number,
  taxRate: number = 0.16,
): number {
  return basePrice * (1 + taxRate);
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
