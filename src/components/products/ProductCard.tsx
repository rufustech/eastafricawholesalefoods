import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { getCategoryName } from "@/lib/catalog";

interface ProductCardProps {
  product: Product;
  /** Set true only for above-the-fold cards to prioritise their image. */
  priority?: boolean;
}

/**
 * Server-rendered product card used on category and listing pages so product
 * links are crawlable in the initial HTML.
 */
export function ProductCard({ product, priority = false }: ProductCardProps) {
  const image = product.images[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col h-full bg-white dark:bg-[#0d3d2c] hover:shadow-lg dark:hover:shadow-xl transition-shadow rounded-lg overflow-hidden border border-neutral-200 dark:border-[#2a8f6d] focus-within:ring-2 focus-within:ring-primary-500"
    >
      <div className="relative w-full aspect-4/3 bg-neutral-100 dark:bg-[#1f6d4a] overflow-hidden">
        <Image
          src={image?.url || "/eastafricawholesalefoodsLogo.png"}
          alt={image?.alt || `${product.name} — wholesale from East Africa Wholesale Foods`}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-2">
          {getCategoryName(product.category)}
        </p>
        <h3 className="font-semibold text-neutral-900 dark:text-[#e8f5e9] mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-[#a8d5b8] mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>
        <span className="mt-auto w-full bg-green-800 group-hover:bg-green-900 text-white font-bold py-2 px-4 rounded transition-colors text-center text-sm">
          View Details
        </span>
      </div>
    </Link>
  );
}
