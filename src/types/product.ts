/**
 * Product Type Definitions
 * Core data structures for products in the wholesale foods marketplace
 */

export type ProductCategory =
  | "flours-grains"
  | "legumes-beans"
  | "rice-cereals"
  | "dry-goods"
  | "spices"
  | "condiments"
  | "oils-fats"
  | "fresh-produce"
  | "frozen-vegetables"
  | "dairy-spreads"
  | "canned-dairy"
  | "canned-fish"
  | "canned-legumes"
  | "beverages"
  | "soft-drinks"
  | "baking-mixes"
  | "baking-essentials"
  | "baby-foods"
  | "specialty"
  | "whole-foods";

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductSpecs {
  origin?: string;
  storageCondition?: string;
  certification?: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  images: ProductImage[];
  rating?: number;
  reviews?: number;
  inventory: string; // e.g., "In Inventory"
  specs: ProductSpecs;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface SearchFilters {
  query?: string;
  category?: ProductCategory;
  sortBy?: "name" | "rating" | "newest";
  sortOrder?: "asc" | "desc";
}
  pageSize: number;
}
