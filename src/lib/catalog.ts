/**
 * Catalog helpers — server-safe accessors over the product catalogue.
 *
 * These read directly from the JSON data (synchronously) so they can be used
 * in Server Components, generateStaticParams, generateMetadata, sitemap, etc.
 */

import productsData from "@/data/products.json" assert { type: "json" };
import { Product } from "@/types/product";
import { categories, Category } from "@/data/categories";

const allProducts = productsData.data as Product[];

/** All products in the catalogue. */
export function getAllProducts(): Product[] {
  return allProducts;
}

/** Look up a product by its slug. */
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

/**
 * Known aliases between category-definition slugs (categories.ts) and the
 * category values used inside product records (products.json). This keeps
 * category routes resilient to historical slug mismatches (e.g. the
 * definition slug "dry-foods" vs the product value "dry-goods").
 */
const CATEGORY_SLUG_ALIASES: Record<string, string> = {
  "dry-foods": "dry-goods",
  "dry-goods": "dry-goods",
};

/** Resolve a URL/category slug to the value stored on product records. */
export function resolveProductCategoryValue(slug: string): string {
  return CATEGORY_SLUG_ALIASES[slug] ?? slug;
}

/** All products belonging to a category slug (alias-aware). */
export function getProductsByCategory(categorySlug: string): Product[] {
  const value = resolveProductCategoryValue(categorySlug);
  return allProducts.filter((p) => p.category === value);
}

/** Categories that actually contain at least one product (alias-aware). */
export function getActiveCategories(): Array<Category & { count: number }> {
  return categories
    .map((cat) => ({
      ...cat,
      count: getProductsByCategory(cat.slug).length,
    }))
    .filter((cat) => cat.count > 0);
}

/** Look up a category definition by its slug. */
export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/**
 * Resolve a product's stored category value to the category-definition slug
 * used in URLs (reverse of resolveProductCategoryValue). Falls back to the
 * value itself when no alias/definition exists.
 */
export function getCategoryUrlSlug(productCategoryValue: string): string {
  const direct = categories.find((c) => c.slug === productCategoryValue);
  if (direct) return direct.slug;
  const aliasEntry = Object.entries(CATEGORY_SLUG_ALIASES).find(
    ([, value]) => value === productCategoryValue,
  );
  return aliasEntry ? aliasEntry[0] : productCategoryValue;
}

/** Human-readable category name for a product (alias-aware, prettified fallback). */
export function getCategoryName(categorySlug: string): string {
  const urlSlug = getCategoryUrlSlug(categorySlug);
  return (
    categories.find((c) => c.slug === urlSlug)?.name ||
    categorySlug.replace(/-/g, " ")
  );
}

/** Related products in the same category, excluding the given product. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
