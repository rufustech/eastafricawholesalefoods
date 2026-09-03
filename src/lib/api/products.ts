/**
 * Products API Service Layer
 *
 * Abstracts product data fetching - currently returns mock data,
 * but easily swappable with real API calls later.
 *
 * Backend endpoint: GET /api/products
 * Response: { success: boolean; data: Product[]; error?: string }
 */

import { Product } from "@/types/product";
import { products as mockProducts } from "@/data/products";

function productSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Fetch all products
 * Currently returns mock data; will call API when backend is ready
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${API_URL}/api/products`, {
    //   headers: { 'Content-Type': 'application/json' },
    //   next: { revalidate: 60 }, // Cache for 60 seconds
    // });
    // if (!response.ok) throw new Error(`API error: ${response.status}`);
    // const data = await response.json();
    // return data.data || [];

    // For now, return mock data
    return mockProducts;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Fallback to mock data on error
    return mockProducts;
  }
}

/**
 * Fetch single product by ID
 * Currently returns mock data; will call API when backend is ready
 */
export async function fetchProduct(idOrSlug: string): Promise<Product | null> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${API_URL}/api/products/${id}`, {
    //   headers: { 'Content-Type': 'application/json' },
    //   next: { revalidate: 60 },
    // });
    // if (!response.ok) return null;
    // const data = await response.json();
    // return data.data || null;

    // For now, search mock data
    return (
      mockProducts.find(
        (p, index) =>
          p.id === idOrSlug ||
          productSlug(p.name) === idOrSlug ||
          `prod-${String(index + 1).padStart(3, "0")}` === idOrSlug,
      ) || null
    );
  } catch (error) {
    console.error(`Failed to fetch product ${idOrSlug}:`, error);
    return null;
  }
}

/**
 * Search products by query
 * Currently uses client-side search; will call API when backend is ready
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${API_URL}/api/products/search?q=${encodeURIComponent(query)}`, {
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // if (!response.ok) throw new Error(`API error: ${response.status}`);
    // const data = await response.json();
    // return data.data || [];

    // For now, client-side search
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery),
    );
  } catch (error) {
    console.error("Failed to search products:", error);
    return [];
  }
}

/**
 * Fetch products by category
 * Currently filters mock data; will call API when backend is ready
 */
export async function fetchProductsByCategory(
  category: string,
): Promise<Product[]> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await fetch(
    //   `${API_URL}/api/products/category/${encodeURIComponent(category)}`,
    //   { headers: { 'Content-Type': 'application/json' } }
    // );
    // if (!response.ok) throw new Error(`API error: ${response.status}`);
    // const data = await response.json();
    // return data.data || [];

    // For now, filter mock data
    return mockProducts.filter((p) => p.category === category);
  } catch (error) {
    console.error(`Failed to fetch products for category ${category}:`, error);
    return [];
  }
}
