"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import { isOutOfStock, isLowStock } from "@/lib/products";
import { getProductSlug } from "@/lib/product-slugs";
import { ActionIcon } from "@/components/ActionIcon";

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
  limit?: number;
}

export function RelatedProducts({
  currentProduct,
  allProducts,
  limit = 4,
}: RelatedProductsProps) {
  const related = allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id && p.category === currentProduct.category,
    )
    .slice(0, limit);

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="py-12 border-t border-neutral-200">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Related Products</h2>
        <p className="text-neutral-600">
          Other products in {currentProduct.category.replace("-", " ")}
        </p>
      </div>

      <div className="grid-products">
        {related.map((product) => {
          const isLow = isLowStock(product);
          const isOut = isOutOfStock(product);

          return (
            <Link
              key={product.id}
              href={`/products/${getProductSlug(product)}`}
              className="card group flex flex-col h-full hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full aspect-square bg-neutral-100 rounded mb-4 overflow-hidden">
                <div className="w-full h-full flex-center text-4xl">📦</div>
                <div className="absolute top-2 right-2">
                  {isOut && (
                    <span className="badge badge-error">Out of Stock</span>
                  )}
                  {isLow && !isOut && (
                    <span className="badge badge-warning">Low Stock</span>
                  )}
                  {!isOut && !isLow && (
                    <span className="badge badge-success">In Stock</span>
                  )}
                </div>
              </div>

              <h3 className="font-semibold text-neutral-900 mb-1 text-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-neutral-600 mb-3 text-clamp-2">
                {product.description}
              </p>

              {product.rating && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-500">
                    {"★".repeat(Math.round(product.rating))}
                  </span>
                  <span className="text-xs text-neutral-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              )}

              <div className="mt-auto text-sm font-bold text-[#d64b35]">
                <span className="inline-flex items-center gap-2">Contact us for details <ActionIcon className="h-4 w-4" /></span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
