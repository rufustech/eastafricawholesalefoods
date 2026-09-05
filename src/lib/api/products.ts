/**
 * Products API Service Layer
 *
 * Abstraction layer for product data fetching
 * Currently uses mock JSON data, easily swappable with real API calls
 *
 * Backend endpoint will be: GET /api/products
 * Response format: { success: boolean; data: Product[]; total: number }
 */

import { Product } from "@/types/product";
import productsData from "@/data/products.json";

/**
 * Fetch all products
 * Mock implementation using JSON data - will switch to real API when backend ready
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    //   headers: { 'Content-Type': 'application/json' },
    //   next: { revalidate: 60 },
    // });
    // if (!response.ok) throw new Error(`API error: ${response.status}`);
    // const result = await response.json();
    // return result.data || [];

    return productsData.data || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return productsData.data || [];
  }
}

/**
 * Fetch single product by slug
 * Mock implementation - will switch to real API when backend ready
 */
export async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`, {
    //   headers: { 'Content-Type': 'application/json' },
    //   next: { revalidate: 60 },
    // });
    // if (!response.ok) return null;
    // const result = await response.json();
    // return result.data || null;

    const product = productsData.data?.find((p) => p.slug === slug);
    return product || null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

/**
 * Search products with filters
 * Mock implementation - will switch to real API when backend ready
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const products = await fetchProducts();
    const lowerQuery = query.toLowerCase();

    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.specs.origin?.toLowerCase().includes(lowerQuery),
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
