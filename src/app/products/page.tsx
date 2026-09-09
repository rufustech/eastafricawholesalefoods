"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { fetchProducts } from "@/lib/api/products";
import { Product } from "@/types/product";
import { SiteHeader } from "@/components/SiteHeader";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Pagination } from "@/components/products/Pagination";
import { CategoryScroll } from "@/components/products/CategoryScroll";

type SortOption = "name" | "rating" | "newest";

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Read category from URL query params on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      const startedAt = Date.now();
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        const remaining = Math.max(0, 300 - (Date.now() - startedAt));
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
        p.description.toLowerCase().includes(query) ||
        p.specs.origin?.toLowerCase().includes(query),
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

  // Pagination
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedProducts = sorted.slice(startIdx, endIdx);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryChange = (slug: string | null) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#f8f2e5] dark:bg-linear-to-b dark:from-[#0f2a1d] dark:via-[#1c4030] dark:to-[#0a1f16] relative overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="hidden dark:block absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#1f633f]/20 blur-3xl" />
          <div className="absolute top-1/3 -left-20 w-96 h-96 rounded-full bg-[#2a5a47]/15 blur-3xl" />
          <div className="absolute -bottom-20 right-1/3 w-80 h-80 rounded-full bg-[#1f633f]/10 blur-3xl" />
        </div>

        <div className="container py-8 relative z-10">
          {/* Mobile Category Scroll */}
          <CategoryScroll
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters - Hidden on Mobile */}
            <aside
              className="hidden lg:block lg:col-span-1"
              aria-label="Product filters"
            >
              <div className="bg-white dark:bg-[#1c4030] rounded-lg p-6 space-y-6 border border-neutral-200 dark:border-[#2a5a47] sticky top-4">
                {/* Sort */}
                <div>
                  <label
                    htmlFor="sort-select"
                    className="block text-sm font-semibold mb-2 text-neutral-900 dark:text-[#f8f2e5]"
                  >
                    Sort By
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) =>
                      handleSortChange(e.target.value as SortOption)
                    }
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-[#1f633f] rounded-lg bg-neutral-50 dark:bg-[#1f633f] text-neutral-900 dark:text-[#f8f2e5] focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                {/* Search */}
                <div>
                  <label
                    htmlFor="product-search"
                    className="block text-sm font-semibold mb-2 text-neutral-900 dark:text-neutral-100"
                  >
                    Search Products
                  </label>
                  <input
                    id="product-search"
                    type="text"
                    placeholder="Search by name, origin..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-[#1f633f] rounded-lg bg-neutral-50 dark:bg-[#1f633f] text-neutral-900 dark:text-[#f8f2e5] placeholder-neutral-500 dark:placeholder-[#b8d58e]/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    aria-describedby="search-help"
                  />
                  <p id="search-help" className="sr-only">
                    Search for products by name, description, or origin
                  </p>
                </div>

                {/* Categories */}
                <div>
                  <fieldset>
                    <legend className="block text-sm font-semibold mb-3 text-neutral-900 dark:text-[#f8f2e5]">
                      Categories
                    </legend>
                    <div className="space-y-2" role="group">
                      <button
                        onClick={() => handleCategoryChange(null)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === null
                            ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        }`}
                        aria-pressed={selectedCategory === null}
                      >
                        All Categories
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.slug)}
                          className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === cat.slug
                              ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium"
                              : "text-neutral-700 dark:text-[#b8d58e] hover:bg-neutral-100 dark:hover:bg-[#1f633f]"
                          }`}
                          aria-pressed={selectedCategory === cat.slug}
                        >
                          <span className="mr-2" aria-hidden="true">
                            {cat.icon}
                          </span>
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Results Count */}
                <div className="pt-4 border-t border-neutral-200 dark:border-[#2a5a47]">
                  <p className="text-xs text-neutral-600 dark:text-[#b8d58e]">
                    Showing{" "}
                    <span className="font-semibold">
                      {paginatedProducts.length}
                    </span>{" "}
                    of <span className="font-semibold">{sorted.length}</span>{" "}
                    products
                  </p>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3" id="products-section">
              {sorted.length === 0 ? (
                <div className="bg-white dark:bg-[#1c4030] rounded-lg p-12 text-center border border-neutral-200 dark:border-[#2a5a47]">
                  <p className="text-neutral-600 dark:text-[#b8d58e] mb-4">
                    No products found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      handleSearchChange("");
                      handleCategoryChange(null);
                    }}
                    className="btn btn-primary bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    aria-label="Clear all filters"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Products Grid */}
                  <div
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                    role="region"
                    aria-label="Product grid"
                  >
                    {paginatedProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="group flex flex-col h-full bg-white dark:bg-[#1c4030] hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-neutral-200 dark:border-[#2a5a47] focus-within:ring-2 focus-within:ring-primary-500"
                        aria-label={`View ${product.name} details`}
                      >
                        {/* Product Image */}
                        <div className="relative w-full aspect-square bg-neutral-100 dark:bg-[#1f633f] flex items-center justify-center p-6 overflow-hidden">
                          <Image
                            src={
                              product.images[0]?.url ||
                              "/eastafricawholesalefoodsLogo.png"
                            }
                            alt={product.images[0]?.alt || product.name}
                            width={200}
                            height={200}
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-lg text-neutral-900 dark:text-[#f8f2e5] mb-2 line-clamp-2">
                            {product.name}
                          </h3>

                          <p className="text-sm text-neutral-600 dark:text-[#b8d58e] mb-4 line-clamp-2 flex-1">
                            {product.description}
                          </p>

                          {/* Rating */}
                          {product.rating && (
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-yellow-400 text-sm">
                                {"★".repeat(Math.round(product.rating))}
                                {"☆".repeat(5 - Math.round(product.rating))}
                              </span>
                              <span className="text-xs text-neutral-600 dark:text-[#b8d58e]">
                                {product.rating.toFixed(1)} (
                                {product.reviews || 0})
                              </span>
                            </div>
                          )}

                          {/* View Details Button */}
                          <button
                            className="w-full bg-green-800 hover:bg-orange-700 dark:bg-green-800 dark:hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors"
                            aria-label={`View ${product.name} details`}
                          >
                            View Details
                          </button>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={sorted.length}
                      itemsPerPage={ITEMS_PER_PAGE}
                      onPageChange={handlePageChange}
                      ariaLabel="Product listing pagination"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
