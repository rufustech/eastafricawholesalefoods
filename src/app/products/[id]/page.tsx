import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactModal } from "@/components/ContactModal";
import { SiteHeader } from "@/components/SiteHeader";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ViewProductTracker } from "@/components/products/ViewProductTracker";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateProductSchema } from "@/lib/seo";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  getCategoryName,
  getCategoryUrlSlug,
} from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

/** Statically pre-render a page for every product. */
export function generateStaticParams() {
  return getAllProducts().map((product) => ({ id: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductBySlug(id);

  if (!product) {
    return { title: "Product not found" };
  }

  const title = `${product.name} Wholesale Canada | East Africa Wholesale Foods`;
  const description =
    `${product.description} Available for wholesale supply to retailers, grocery stores and restaurants across Canada.`.slice(
      0,
      160,
    );

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/products/${product.slug}`),
      type: "website",
      images: product.images.map((img) => ({
        url: img.url,
        alt: img.alt || product.name,
      })),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductBySlug(id);

  if (!product) {
    notFound();
  }

  const categoryName = getCategoryName(product.category);
  const categoryUrlSlug = getCategoryUrlSlug(product.category);
  const relatedProducts = getRelatedProducts(product, 4);

  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: categoryName, url: `/products/category/${categoryUrlSlug}` },
    { name: product.name, url: `/products/${product.slug}` },
  ];

  const productSchema = generateProductSchema(product, {
    url: absoluteUrl(`/products/${product.slug}`),
    categoryName,
  });

  return (
    <div className="min-h-screen bg-[#f8f2e5] dark:bg-[#0f2a1d] text-neutral-900 dark:text-neutral-100">
      <StructuredData schema={productSchema} />
      <ViewProductTracker
        productName={product.name}
        category={categoryName}
      />
      <SiteHeader />

      <main className="container py-10 md:py-16">
        <Breadcrumbs items={crumbs} />

        <section className="grid gap-10 lg:grid-cols-2 lg:gap-16 mb-16">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-4/3 bg-linear-to-br from-[#d8e7c9] via-[#e5efd9] to-[#d64b35]/20 dark:from-[#1c4030] dark:via-[#2a5a47] dark:to-[#8b3a2c]/30 rounded-3xl overflow-hidden shadow-2xl border border-[#d8e7c9]/30 dark:border-[#7da453]/20">
              <div className="absolute -right-24 -top-24 w-56 h-56 rounded-full border-8 border-[#7da453]/20 dark:border-[#7da453]/10" />
              <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full border-8 border-[#d64b35]/20 dark:border-[#d64b35]/10" />
              <Image
                src={product.images[0]?.url || "/eastafricawholesalefoodsLogo.png"}
                alt={
                  product.images[0]?.alt ||
                  `${product.name} available for wholesale from East Africa Wholesale Foods`
                }
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority
                className="object-contain p-8 relative z-10"
              />
              <div className="absolute bottom-6 right-6 z-20 bg-[#1f633f] dark:bg-green-700 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                In Stock
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-start">
            <p className="text-xs font-bold uppercase tracking-widest text-[#d64b35] dark:text-[#ff6b5b] mb-2">
              <Link
                href={`/products/category/${categoryUrlSlug}`}
                className="hover:underline"
              >
                {categoryName}
              </Link>
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 leading-tight">
              {product.name}
            </h1>

            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Wholesale Availability */}
            <div className="rounded-2xl bg-[#e5efd9] dark:bg-[#1c4030] p-6 mb-6 border-l-4 border-[#1f633f] dark:border-[#7da453]">
              <p className="text-xs font-bold uppercase tracking-widest text-[#d64b35] dark:text-[#ff6b5b] mb-2">
                Wholesale Availability
              </p>
              <h2 className="text-2xl font-bold text-[#1f633f] dark:text-[#d8e7c9] mb-3">
                Contact us for current pricing and quantities.
              </h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Available for wholesale and bulk supply to retailers,
                restaurants and food-service businesses across Canada.
              </p>
            </div>

            {/* Specs */}
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
                  Availability
                </p>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {typeof product.inventory === "string"
                    ? product.inventory
                    : `${product.inventory.available ?? 0} units available`}
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
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <ContactModal
                productName={product.name}
                buttonLabel="Request wholesale pricing"
              />
              <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center">
                Get a quote or place a wholesale order
              </p>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <h2
              id="related-products-heading"
              className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8"
            >
              Related Products
            </h2>
            <RelatedProducts products={relatedProducts} />
          </section>
        )}
      </main>
    </div>
  );
}
