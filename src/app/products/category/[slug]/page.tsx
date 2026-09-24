import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/products/ProductCard";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateItemListSchema } from "@/lib/seo";
import {
  getActiveCategories,
  getCategory,
  getProductsByCategory,
} from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render a static page for every category that has products. */
export function generateStaticParams() {
  return getActiveCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  const products = getProductsByCategory(slug);

  if (!category || products.length === 0) {
    return { title: "Category not found" };
  }

  const title = `${category.name} Wholesale Canada | East Africa Wholesale Foods`;
  const description = `Wholesale ${category.name.toLowerCase()} for retailers, grocery stores and restaurants across Canada. ${category.description}. Request pricing from East Africa Wholesale Foods.`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical: `/products/category/${category.slug}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: absoluteUrl(`/products/category/${category.slug}`),
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  const products = getProductsByCategory(slug);

  if (!category || products.length === 0) {
    notFound();
  }

  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: category.name, url: `/products/category/${category.slug}` },
  ];

  const itemList = generateItemListSchema(
    products.map((p) => ({
      name: p.name,
      url: `/products/${p.slug}`,
    })),
  );

  return (
    <div className="min-h-screen bg-[#f8f2e5] dark:bg-[#0f2a1d] text-neutral-900 dark:text-neutral-100">
      <StructuredData schema={itemList} />
      <SiteHeader />

      <main className="container py-10 md:py-16">
        <Breadcrumbs items={crumbs} />

        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
            Wholesale category
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {category.description}. Available for wholesale and bulk supply to
            retailers, grocery stores, restaurants and food-service businesses
            across Canada. Browse the range below and{" "}
            <Link
              href="/wholesale"
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              request wholesale pricing
            </Link>
            .
          </p>
        </div>

        <section aria-label={`${category.name} products`}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-4 border-t border-neutral-200 dark:border-neutral-700 pt-8">
          <Link
            href="/categories"
            className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            ← All categories
          </Link>
          <Link
            href="/products"
            className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            View all products
          </Link>
        </div>
      </main>
    </div>
  );
}
