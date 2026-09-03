/**
 * Product Type Definitions
 * Core data structures for products in the wholesale foods marketplace
 */

export type ProductCategory =
  | "dry-goods"
  | "frozen-foods"
  | "beverages"
  | "spices"
  | "grains";

export type Currency = "USD" | "KES" | "UGX" | "GHS" | "ETB";

export interface Price {
  amount: number;
  currency: Currency;
  unit: string; // e.g., "per kg", "per box", "per liter"
}

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductInventory {
  available: number;
  reserved: number;
  minOrderQuantity: number;
  maxOrderQuantity?: number;
  reorderLevel: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  images: ProductImage[];
  pricing: {
    retail: Price;
    wholesale?: Price;
    bulk?: Price;
  };
  inventory: ProductInventory;
  specs: {
    origin?: string;
    expiryDate?: string;
    certification?: string[]; // e.g., ['organic', 'fairtrade']
    storageCondition?: string;
  };
  rating?: number;
  reviews?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderItem extends CartItem {
  product: Product;
  subtotal: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  currency: Currency;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  createdAt: string;
  estimatedDelivery?: string;
}

export interface SearchFilters {
  query?: string;
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "name" | "price" | "rating" | "newest";
  sortOrder?: "asc" | "desc";
}

export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}
