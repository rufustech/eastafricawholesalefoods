"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
  limit?: number;
}

export function RelatedProducts({ products, limit = 4 }: RelatedProductsProps) {
  const related = products.slice(0, limit);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="py-8" aria-labelledby="related-products-heading">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group flex flex-col h-full bg-white dark:bg-neutral-800 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-neutral-900/50 transition-shadow rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 focus-within:ring-2 focus-within:ring-primary-500"
            aria-label={`View ${product.name} details`}
          >
            {/* Product Image */}
            <div className="relative w-full aspect-4/3 bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
              <Image
                src={
                  product.images[0]?.url || "/eastafricawholesalefoodsLogo.png"
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
                    {"☆".repeat(5 - Math.round(product.rating || 0))}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    ({product.reviews || 0})
                  </span>
                </div>
              </div>

              {/* Inventory Badge */}
              <div className="inline-flex">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  {product.inventory}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
