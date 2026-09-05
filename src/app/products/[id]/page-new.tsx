"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactModal } from "@/components/ContactModal";
import { SiteHeader } from "@/components/SiteHeader";
import { BrandSpinner } from "@/components/BrandSpinner";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { ReviewsSection } from "@/components/products/ReviewsSection";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateProductSchema } from "@/lib/seo";
import { fetchProduct, fetchProducts } from "@/lib/api/products";
import { Product } from "@/types/product";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const startedAt = Date.now();

    async function loadProduct() {
      try {
        const { id } = await params;
        const [productData, productsData] = await Promise.all([
          fetchProduct(id),
          fetchProducts(),
        ]);
        if (active) {
          setProduct(productData);
          setAllProducts(productsData);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        const remaining = Math.max(0, 300 - (Date.now() - startedAt));
        window.setTimeout(() => {
          if (active) setIsLoading(false);
        }, remaining);
      }
    }

    loadProduct();
    return () => {
      active = false;
    };
  }, [params]);

  if (isLoading) return <BrandSpinner />;

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Not Found
          </p>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
            Product not found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            This item may have been removed from our catalogue.
          </p>
          <Link
            href="/products"
            className="inline-flex rounded-lg bg-primary-600 hover:bg-primary-700 px-6 py-3 font-bold text-white transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = product.category.replace(/-/g, " ");
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <StructuredData schema={generateProductSchema(product)} />
      <SiteHeader />

      <main className="container py-10 md:py-16">
        {/* Breadcrumb Navigation */}
        <nav
          className="mb-8 flex flex-wrap items-center gap-2 text-sm"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
          >
            Home
          </Link>
          <span className="text-neutral-400" aria-hidden="true">
            /
          </span>
          <Link
            href="/products"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
          >
            Products
          </Link>
          <span className="text-neutral-400" aria-hidden="true">
            /
          </span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {product.name}
          </span>
        </nav>

        {/* Main Product Section */}
        <section className="grid gap-10 lg:grid-cols-2 lg:gap-16 mb-16">
          {/* Product Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-4/3 bg-neutral-200 dark:bg-neutral-800 rounded-lg overflow-hidden">
              <Image
                src={
                  product.images[0]?.url || "/eastafricawholesalefoodsLogo.png"
                }
                alt={product.images[0]?.alt || product.name}
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority
                className="object-contain p-4"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-start">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-2">
              {categoryName}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  <span
                    className="text-primary-600 dark:text-primary-400 text-lg"
                    aria-label={`Rating: ${product.rating} out of 5 stars`}
                  >
                    {"★".repeat(Math.round(product.rating))}
                    {"☆".repeat(5 - Math.round(product.rating))}
                  </span>
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {product.rating.toFixed(1)} ({product.reviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Product Specs */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase mb-1">
                  Origin
                </p>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {product.specs.origin || "East Africa"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase mb-1">
                  Inventory
                </p>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {product.inventory}
                </p>
              </div>
              {product.specs.storageCondition && (
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase mb-1">
                    Storage
                  </p>
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">
                    {product.specs.storageCondition}
                  </p>
                </div>
              )}
              {product.specs.certification &&
                product.specs.certification.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase mb-2">
                      Certifications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.specs.certification.map((cert) => (
                        <span
                          key={cert}
                          className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full capitalize"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col gap-3">
              <ContactModal productName={product.name} />
              <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center">
                Get a quote or place an order
              </p>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
              Related Products
            </h2>
            <RelatedProducts products={relatedProducts} />
          </section>
        )}

        {/* Reviews Section */}
        <section>
          <ReviewsSection productId={product.id} productName={product.name} />
        </section>
      </main>
    </div>
  );
}
