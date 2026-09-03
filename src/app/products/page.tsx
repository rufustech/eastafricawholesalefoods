"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { fetchProducts } from "@/lib/api/products";
import { Product } from "@/types/product";
import { getProductSlug } from "@/lib/product-slugs";
import { SiteHeader } from "@/components/SiteHeader";
import { BrandSpinner } from "@/components/BrandSpinner";

type SortOption = "name" | "rating" | "newest";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const startedAt = Date.now();
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        const remaining = Math.max(0, 1000 - (Date.now() - startedAt));
        window.setTimeout(() => setIsLoading(false), remaining);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) return <BrandSpinner />;

  let filtered = products;

  // Filter by category
  if (selectedCategory) {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    );
  }

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <>
      <SiteHeader />
      {/* Legacy header retained for layout compatibility */}
      <header className="hidden bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-50">
        <div className="container flex-between py-4">
          <div>
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              🌾 East Africa Wholesale Foods
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Browse our complete product catalog
            </p>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 space-y-6 border border-neutral-200 dark:border-neutral-700">
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                    Search
                  </label>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
                    Categories
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === null
                          ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium"
                          : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === cat.id
                            ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        }`}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                {/* Stock Status */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Showing {sorted.length} of {products.length} products
                  </p>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {sorted.length === 0 ? (
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-12 text-center border border-neutral-200 dark:border-neutral-700">
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    No products found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                    className="btn btn-primary bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid-products">
                  {sorted.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${getProductSlug(product)}`}
                      className="card group flex flex-col h-full bg-white dark:bg-neutral-800 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-neutral-900/50 transition-shadow rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700"
                    >
                      {/* Product Image */}
                      <div className="relative w-full aspect-[4/3] bg-neutral-100 dark:bg-neutral-700 rounded mb-4 overflow-hidden">
                        <Image src={product.images[0]?.url || "/eastafricawholesalefoodsLogo.png"} alt={product.images[0]?.alt || product.name} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-contain p-4" />
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 text-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 text-clamp-2">
                          {product.description}
                        </p>

                        {/* Rating */}
                        {product.rating && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-yellow-500 dark:text-yellow-400">
                              {"★".repeat(Math.round(product.rating))}
                            </span>
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        )}
                      </div>

                      {/* View Details Button */}
                      <div className="mt-auto p-4">
                        <span className="btn btn-primary w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white">
                          View Details
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-300 dark:text-neutral-400 py-12 mt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">
                East Africa Wholesale Foods
              </h4>
              <p className="text-sm">
                Premium quality foods at wholesale prices.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Shop</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sale Items
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Company</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Support</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-700 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} East Africa Wholesale Foods. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
