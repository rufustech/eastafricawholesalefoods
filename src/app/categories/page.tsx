"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { SiteHeader } from "@/components/SiteHeader";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen w-screen bg-[#f8f2e5] dark:bg-[#0f2a1d] text-neutral-900 dark:text-neutral-100">
      <SiteHeader />

      <main className="container py-10 md:py-16">
        {/* Breadcrumb */}
        <nav
          className="mb-8 flex flex-wrap items-center gap-2 text-sm"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="text-primary-600 hover:text-primary-700">
            Home
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            All Categories
          </span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
            Browse all
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            All Categories
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Explore our complete range of East African food products, organized
            by category for easy browsing.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 p-6 transition-all hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-primary-900/20"
            >
              <span className="absolute -right-5 -top-10 font-serif text-[8rem] font-bold leading-none text-neutral-900/5 dark:text-white/5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative text-4xl mb-4 block">
                {index % 4 === 0
                  ? "✦"
                  : index % 4 === 1
                    ? "❄"
                    : index % 4 === 2
                      ? "🌾"
                      : "🥘"}
              </span>
              <div className="relative">
                <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                  {category.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-3 transition-all">
                Browse
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
