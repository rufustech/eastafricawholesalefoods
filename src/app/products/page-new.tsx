"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { fetchProducts } from "@/lib/api/products";
import { Product } from "@/types/product";
import { SiteHeader } from "@/components/SiteHeader";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Pagination } from "@/components/products/Pagination";

type SortOption = "name" | "rating" | "newest";

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  // Filter logic
  let filtered = products;

  if (selectedCategory) {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.specs.origin?.toLowerCase().includes(query),
    );
  }

  // Sort logic
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

      <main className="min-h-screen bg-[linear-gradient(120deg,#fbf7ee_0%,#f8efdf_52%,#f1dfcd_100%)] dark:bg-[#10251b]">
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1" aria-label="Product filters">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 space-y-6 border border-neutral-200 dark:border-neutral-700 sticky top-4">
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
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    aria-describedby="search-help"
                  />
                  <p id="search-help" className="sr-only">
                    Search for products by name, description, or origin
                  </p>
                </div>

                {/* Categories */}
                <div>
                  <fieldset>
                    <legend className="block text-sm font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
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
                              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
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

                {/* Sort */}
                <div>
                  <label
                    htmlFor="sort-select"
                    className="block text-sm font-semibold mb-2 text-neutral-900 dark:text-neutral-100"
                  >
                    Sort By
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) =>
                      handleSortChange(e.target.value as SortOption)
                    }
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                {/* Results Count */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
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
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-12 text-center border border-neutral-200 dark:border-neutral-700">
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
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
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
                    role="region"
                    aria-label="Product grid"
                  >
                    {paginatedProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="group flex flex-col h-full bg-white dark:bg-neutral-800 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-neutral-900/50 transition-shadow rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 focus-within:ring-2 focus-within:ring-primary-500"
                        aria-label={`View ${product.name} details - ${product.specs.origin}`}
                      >
                        {/* Product Image */}
                        <div className="relative w-full aspect-[4/3] bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
                          <Image
                            src={
                              product.images[0]?.url ||
                              "/eastafricawholesalefoodsLogo.png"
                            }
                            alt={product.images[0]?.alt || product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="p-4 flex-1 flex flex-col">
                          <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-2">
                            {product.category.replace(/-/g, " ")}
                          </p>

                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {product.name}
                          </h3>

                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2 flex-1">
                            {product.description}
                          </p>

                          {/* Rating & Origin */}
                          <div className="flex items-center justify-between text-xs mb-3">
                            <div className="flex items-center gap-1">
                              <span
                                className="text-primary-600 dark:text-primary-400"
                                aria-label={`Rating: ${product.rating || 0} out of 5`}
                              >
                                {"★".repeat(Math.round(product.rating || 0))}
                                {"☆".repeat(
                                  5 - Math.round(product.rating || 0),
                                )}
                              </span>
                              <span className="text-neutral-600 dark:text-neutral-400">
                                ({product.reviews || 0})
                              </span>
                            </div>
                            <span
                              className="text-neutral-600 dark:text-neutral-400"
                              aria-label={`Origin: ${product.specs.origin}`}
                            >
                              {product.specs.origin}
                            </span>
                          </div>

                          {/* Inventory Badge */}
                          <div className="inline-flex">
                            <span
                              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              aria-label="Product inventory status"
                            >
                              {product.inventory}
                            </span>
                          </div>
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
