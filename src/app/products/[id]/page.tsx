"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactModal } from "@/components/ContactModal";
import { SiteHeader } from "@/components/SiteHeader";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { ReviewsSection } from "@/components/products/ReviewsSection";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateProductSchema } from "@/lib/seo";
import { fetchProduct, fetchProducts } from "@/lib/api/products";
import { Product } from "@/types/product";

interface ProductDetailPageProps { params: Promise<{ id: string }> }

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadProduct() {
      try {
        const { id } = await params;
        const [productData, productsData] = await Promise.all([fetchProduct(id), fetchProducts()]);
        if (active) { setProduct(productData); setAllProducts(productsData); }
      } catch (error) { console.error("Failed to load product:", error); }
      finally { if (active) setIsLoading(false); }
    }
    loadProduct();
    return () => { active = false; };
  }, [params]);

  if (isLoading) return <div className="grid min-h-screen place-items-center bg-[#fbf7ee] text-[#173b2b]">Loading product...</div>;
  if (!product) return <div className="grid min-h-screen place-items-center bg-[#fbf7ee] px-6 text-center text-[#173b2b]"><div><p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d64b35]">Sorry</p><h1 className="font-serif text-4xl font-bold">Product not found</h1><p className="mt-3 opacity-70">This item may have been removed from the catalogue.</p><Link href="/products" className="mt-7 inline-flex rounded-full bg-[#1f633f] px-6 py-3 font-bold text-white">Back to products</Link></div></div>;

  const categoryName = product.category.replace("-", " ");
  return <div className="min-h-screen bg-[#fbf7ee] text-[#173b2b] dark:bg-[#10251b] dark:text-[#f8f2e5]"><StructuredData schema={generateProductSchema(product)} /><SiteHeader /><main className="container py-10 md:py-16"><div className="mb-8 flex flex-wrap items-center gap-2 text-sm opacity-60"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><span className="font-semibold opacity-100">{product.name}</span></div><section className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16"><div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[2.5rem] bg-[#d8e7c9] dark:bg-[#1c4030] md:min-h-[560px]"><div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[48px] border-[#7da453]/40" /><div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-[#d64b35]/80 blur-2xl" /><div className="relative h-[75%] w-[75%] overflow-hidden rounded-[3rem] bg-[#f5ead5] shadow-2xl"><Image src={product.images[0]?.url || "/eastafricawholesalefoodsLogo.png"} alt={product.images[0]?.alt || product.name} fill sizes="(max-width: 1024px) 80vw, 40vw" loading="eager" className="object-contain p-5" /></div><span className="absolute bottom-8 right-8 rounded-2xl bg-[#1f633f] px-4 py-3 text-xs font-bold uppercase tracking-widest text-white">In stock</span></div><div className="flex flex-col justify-center"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">{categoryName}</p><h1 className="mt-4 font-serif text-5xl font-bold leading-[0.98] tracking-tight md:text-6xl">{product.name}</h1><div className="mt-5 flex items-center gap-3"><span className="text-lg tracking-widest text-[#d64b35]">{"*".repeat(Math.round(product.rating || 0))}</span><span className="text-sm font-semibold">{product.rating?.toFixed(1)} ({product.reviews} reviews)</span></div><p className="mt-7 text-xl leading-9 opacity-75">{product.description}</p><div className="mt-8 rounded-3xl bg-[#e5efd9] p-6 dark:bg-[#1c4030]"><p className="text-xs font-bold uppercase tracking-widest text-[#d64b35]">Wholesale availability</p><p className="mt-2 font-serif text-2xl font-bold">Contact us for current pricing and quantities.</p><p className="mt-2 text-sm opacity-70">Minimum order: {product.inventory.minOrderQuantity} {product.pricing.retail.unit.replace("per ", "")} · {product.inventory.available.toLocaleString()} available</p><div className="mt-6"><ContactModal productName={product.name} buttonClassName="rounded-full bg-[#d64b35] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#b83d2b]" /></div></div></div></section><section className="mt-16 grid gap-6 border-t border-[#173b2b]/10 pt-12 dark:border-white/10 md:grid-cols-2"><div className="rounded-3xl bg-[#f5ead5] p-7 dark:bg-[#173b2b]"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">Product details</p><h2 className="mt-3 font-serif text-3xl font-bold">Everything you need to know.</h2><p className="mt-4 text-base leading-8 opacity-75">{product.description} Carefully selected for consistent quality, dependable supply, and the everyday needs of professional kitchens and retailers.</p></div><div className="rounded-3xl border border-[#173b2b]/10 p-7 dark:border-white/10"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">Specifications</p><div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 text-sm"><div><p className="opacity-60">Origin</p><p className="mt-1 font-bold">{product.specs.origin || "East Africa"}</p></div><div><p className="opacity-60">Expiry date</p><p className="mt-1 font-bold">{product.specs.expiryDate ? new Date(product.specs.expiryDate).toLocaleDateString() : "See packaging"}</p></div><div><p className="opacity-60">Storage</p><p className="mt-1 font-bold">{product.specs.storageCondition || "Store as directed"}</p></div><div><p className="opacity-60">Certifications</p><p className="mt-1 font-bold">{product.specs.certification?.join(", ") || "Quality checked"}</p></div></div></div></section><ReviewsSection product={product} /><RelatedProducts currentProduct={product} allProducts={allProducts} /></main><footer className="bg-[#0f2a1d] py-10 text-center text-sm text-[#f8f2e5]"><p className="font-serif text-xl font-bold">East Africa Wholesale Foods</p><p className="mt-2 text-[#b8d58e]">Good food starts with good sourcing.</p></footer></div>;
}
