"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { fetchProducts } from "@/lib/api/products";
import { Product } from "@/types/product";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteHeader } from "@/components/SiteHeader";

const productColors = [
  "bg-[#d8e7c9]",
  "bg-[#f2d5bf]",
  "bg-[#d5e1d7]",
  "bg-[#f4dfb5]",
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbf7ee] text-[#173b2b] dark:bg-[#10251b] dark:text-[#f8f2e5]">
      {showIntro && (
        <div className="intro-overlay fixed inset-0 z-[200] grid place-items-center bg-[#173b2b] text-[#f8f2e5]">
          <div className="relative grid h-64 w-64 place-items-center">
            <div className="absolute inset-5 rounded-full border border-[#b8d58e]/30" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-[#b8d58e] border-t-[#d64b35]" />
            <svg
              className="animate-spin-slow absolute inset-0 h-full w-full"
              viewBox="0 0 256 256"
              aria-label="East Africa Wholesale Foods loading"
            >
              <defs>
                <path
                  id="brand-spinner-path"
                  d="M 128,128 m -92,0 a 92,92 0 1,1 184,0 a 92,92 0 1,1 -184,0"
                />
              </defs>
              <text className="fill-[#f8f2e5] text-[13px] font-bold uppercase tracking-[0.28em]">
                <textPath href="#brand-spinner-path">
                  East Africa Wholesale Foods · East Africa Wholesale Foods
                  ·{" "}
                </textPath>
              </text>
            </svg>
            <div className="relative text-center">
              <span className="block font-serif text-5xl font-bold text-[#b8d58e]">
                EA
              </span>
              <span className="mt-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-[#e8846f]">
                Good sourcing
              </span>
            </div>
          </div>
        </div>
      )}
      <SiteHeader />
      <header className="hidden relative z-20 border-b border-[#173b2b]/10 bg-[#fbf7ee]/90 backdrop-blur-md dark:border-white/10 dark:bg-[#10251b]/90">
        <div className="container flex items-center justify-between py-5">
          <Link
            href="/"
            className="group flex items-center gap-3 text-[#173b2b] dark:text-[#f8f2e5]"
          >
            <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl bg-[#173b2b] shadow-lg shadow-[#1f633f]/20 transition-transform group-hover:-rotate-2">
              <Image
                src="/eastafricawholesalefoodsLogo.png"
                alt="East Africa Wholesale Foods"
                fill
                sizes="128px"
                quality={100}
                className="object-contain"
              />
            </span>
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-[#d64b35]">
                East Africa
              </span>
              <span className="block font-serif text-xl font-bold tracking-tight">
                Wholesale Foods
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a
              href="#categories"
              className="transition-colors hover:text-[#d64b35]"
            >
              Categories
            </a>
            <a
              href="#featured"
              className="transition-colors hover:text-[#d64b35]"
            >
              Featured
            </a>
            <a href="#story" className="transition-colors hover:text-[#d64b35]">
              Our story
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="hidden rounded-full bg-[#d64b35] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#d64b35]/20 transition-all hover:-translate-y-0.5 hover:bg-[#b83d2b] sm:block"
            >
              Shop wholesale
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate border-b border-[#173b2b]/10 bg-[#f5ead5] dark:border-white/10 dark:bg-[#173b2b]">
          <div className="pointer-events-none absolute -right-28 -top-28 -z-10 h-96 w-96 rounded-full bg-[#d64b35]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-[#7da453]/25 blur-3xl" />
          <div className="container grid items-start gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24 lg:gap-20 lg:py-28">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#1f633f]/20 bg-[#fbf7ee]/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1f633f] dark:bg-white/10 dark:text-[#d8e7c9]">
                <span className="h-2 w-2 rounded-full bg-[#d64b35]" /> 100%
                Organic African Foods
              </div>
              <h1 className="max-w-2xl font-serif text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-[#173b2b] dark:text-[#f8f2e5] md:text-6xl">
                Authentic wholesale foods.{" "}
                <span className="text-[#d64b35]">One source.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#365b48] dark:text-[#d8e7c9]">
                Direct from 6,000+ East African farmers. Premium grains, frozen
                foods, spices & specialty items. Competitive wholesale pricing,
                same-day dispatch across Canada.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full bg-[#d64b35] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#d64b35]/25 transition-all hover:-translate-y-1 hover:bg-[#b83d2b]"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[#1f633f] bg-white px-7 py-4 text-sm font-bold text-[#1f633f] transition-colors hover:bg-[#f8f2e5] dark:bg-[#173b2b] dark:border-[#7da453] dark:text-[#d8e7c9]"
                >
                  Browse Catalog
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap gap-8 border-t border-[#173b2b]/15 pt-6 dark:border-white/15">
                <div>
                  <p className="font-serif text-3xl font-bold">
                    6,000<span className="text-[#d64b35]">+</span>
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-60">
                    Farmer partners
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold">24h</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-60">
                    Same-day dispatch
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold">Canada</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-60">
                    Nationwide delivery
                  </p>
                </div>
              </div>
            </div>
            <div className="sticky top-24">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">
                Browse Categories
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {categories.slice(0, 6).map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className="group relative overflow-hidden rounded-xl border border-[#173b2b]/20 bg-[#f0f5f1] p-4 transition-all hover:border-[#d64b35] hover:shadow-lg dark:bg-[#2a5a47] dark:border-white/40"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e5efd9] text-lg dark:bg-[#3a7a5f]">
                        {index === 0
                          ? "✦"
                          : index === 1
                            ? "❄"
                            : index === 2
                              ? "🌾"
                              : index === 3
                                ? "🥘"
                                : index === 4
                                  ? "🍚"
                                  : "🧂"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-[#173b2b] dark:text-[#f8f2e5] truncate">
                          {category.name}
                        </p>
                        <p className="text-xs text-[#365b48] dark:text-[#b8d58e]">
                          Browse →
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/categories"
                className="mt-4 block w-full text-center rounded-lg bg-[#1f633f] py-3 text-sm font-bold text-white hover:bg-[#174d30] transition-colors"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </section>

        <section
          id="featured"
          className="bg-[#173b2b] py-20 text-[#f8f2e5] md:py-28"
        >
          <div className="container">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#e8846f]">
                  Most Requested
                </p>
                <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                  What businesses{" "}
                  <span className="italic text-[#b8d58e]">love.</span>
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden text-sm font-bold text-[#b8d58e] hover:text-white sm:block"
              >
                View all products →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 8).map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group overflow-hidden rounded-3xl bg-[#f8f2e5] text-[#173b2b] transition-all hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div
                    className={`relative flex aspect-square items-center justify-center ${productColors[index % productColors.length]}`}
                  >
                    <span className="font-serif text-7xl font-bold text-[#1f633f]/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute bottom-4 left-4 rounded-full bg-[#fbf7ee]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                      In stock
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#d64b35]">
                      {product.category.replace("-", " ")}
                    </p>
                    <h3 className="mt-2 line-clamp-1 font-serif text-xl font-bold">
                      {product.name}
                    </h3>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-sm font-bold text-[#d64b35]">
                        Get Quote
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1f633f] text-white transition-transform group-hover:-rotate-45">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5ead5] py-20 dark:bg-[#1c4030] md:py-28">
          <div className="container">
            <div className="mb-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">
                Why Us
              </p>
              <h2 className="max-w-2xl font-serif text-4xl font-bold tracking-tight md:text-5xl">
                The trusted choice for{" "}
                <span className="text-[#7da453]">serious businesses.</span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-2xl border border-[#173b2b]/10 bg-white p-8 dark:border-white/10 dark:bg-[#173b2b]">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#e5efd9] text-2xl dark:bg-[#2a5a47]">
                  🌱
                </div>
                <h3 className="font-serif text-2xl font-bold">100% Organic</h3>
                <p className="mt-3 text-sm leading-6 opacity-70">
                  Direct partnerships with 6,000+ certified East African
                  farmers. No middlemen, no compromises. Pure, authentic
                  products.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl border border-[#173b2b]/10 bg-white p-8 dark:border-white/10 dark:bg-[#173b2b]">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#f2d5bf] text-2xl dark:bg-[#8b3a2c]">
                  💰
                </div>
                <h3 className="font-serif text-2xl font-bold">
                  Competitive Pricing
                </h3>
                <p className="mt-3 text-sm leading-6 opacity-70">
                  Wholesale rates without minimum orders. Bulk discounts.
                  Transparent pricing. Better margins for your business.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl border border-[#173b2b]/10 bg-white p-8 dark:border-white/10 dark:bg-[#173b2b]">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#d5e1d7] text-2xl dark:bg-[#2a5a47]">
                  ⚡
                </div>
                <h3 className="font-serif text-2xl font-bold">
                  Same-Day Dispatch
                </h3>
                <p className="mt-3 text-sm leading-6 opacity-70">
                  Orders placed before 5pm ship today. Delivery across Canada.
                  Reliable, professional logistics partners.
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 grid gap-6 rounded-2xl border border-[#173b2b]/10 bg-[#e5efd9] p-8 dark:border-white/10 dark:bg-[#1c4030] md:grid-cols-4">
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-[#1f633f] dark:text-[#d8e7c9]">
                  6,000+
                </p>
                <p className="mt-2 text-sm font-semibold text-[#365b48] dark:text-[#b8d58e]">
                  Farmer Partners
                </p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-[#1f633f] dark:text-[#d8e7c9]">
                  Canada
                </p>
                <p className="mt-2 text-sm font-semibold text-[#365b48] dark:text-[#b8d58e]">
                  Nationwide Delivery
                </p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-[#d64b35]">
                  24h
                </p>
                <p className="mt-2 text-sm font-semibold text-[#365b48] dark:text-[#b8d58e]">
                  Order Fulfillment
                </p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-[#1f633f] dark:text-[#d8e7c9]">
                  ✓
                </p>
                <p className="mt-2 text-sm font-semibold text-[#365b48] dark:text-[#b8d58e]">
                  Organic Certified
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="container py-20 md:py-28">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">
                Shop by need
              </p>
              <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                The essentials,{" "}
                <span className="italic text-[#7da453]">sorted.</span>
              </h2>
            </div>
            <Link
              href="/categories"
              className="hidden text-sm font-bold text-[#1f633f] hover:text-[#d64b35] sm:block"
            >
              View all categories -&gt;
            </Link>
          </div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {categories.slice(0, 4).map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative overflow-hidden rounded-[2rem] border border-[#173b2b]/10 bg-[#e5efd9] p-7 transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#1c4030] md:p-9"
              >
                <span className="absolute -right-5 -top-10 font-serif text-[10rem] font-bold leading-none text-[#1f633f]/10">
                  0{index + 1}
                </span>
                <span className="relative text-4xl">
                  {index === 0 ? "✦" : "❄"}
                </span>
                <div className="relative mt-14 flex items-end justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold">
                      {category.name}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 opacity-70">
                      {category.description}
                    </p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#fbf7ee] text-xl text-[#1f633f] transition-transform group-hover:rotate-[-45deg] dark:bg-[#f8f2e5]">
                    -&gt;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="story"
          className="container grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28"
        >
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#d8e7c9] p-8 dark:bg-[#1c4030]">
            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#7da453]" />
            <div className="absolute -right-20 top-12 h-72 w-72 rounded-full border-[40px] border-[#d64b35]/80" />
            <div className="relative flex h-full flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">
                Our promise
              </span>
              <p className="max-w-xs font-serif text-4xl font-bold leading-tight">
                The short route from source to service.
              </p>
              <span className="text-sm font-semibold opacity-70">
                East Africa, one trusted supplier.
              </span>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">
              Built for busy kitchens
            </p>
            <h2 className="max-w-lg font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Your supplier should feel like part of the team.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 opacity-70">
              We keep the ordering simple and the standards high, so
              restaurants, retailers, and food businesses can focus on serving
              their customers.
            </p>
            <div className="mt-8 grid max-w-lg grid-cols-2 gap-5 border-t border-[#173b2b]/15 pt-6 dark:border-white/15">
              <div>
                <p className="font-serif text-2xl font-bold">01</p>
                <p className="mt-1 text-sm opacity-70">Consistent quality</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold">02</p>
                <p className="mt-1 text-sm opacity-70">Transparent pricing</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Order / Contact Section */}
        <section className="bg-[#f0f5f1] py-20 text-[#173b2b] md:py-28 dark:bg-[#1f633f] dark:text-white">
          <div className="container">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#1f633f] dark:text-[#b8d58e]">
                Get Started
              </p>
              <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                Ready to order?{" "}
                <span className="text-[#d64b35]">Let's connect.</span>
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#365b48] dark:text-[#d8e7c9]">
                We handle wholesale enquiries same-day. Call, message, email, or
                visit our Edmonton warehouse.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-4 md:gap-4">
              {/* Phone */}
              <a
                href="tel:+15875900886"
                className="group rounded-xl border border-[#1f633f]/20 bg-white p-6 transition-all hover:bg-[#e5efd9] hover:border-[#1f633f] dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 dark:hover:border-[#b8d58e]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#e5efd9] text-xl text-[#1f633f] font-bold dark:bg-[#b8d58e] dark:text-[#1f633f]">
                  📞
                </div>
                <h3 className="font-bold mb-2 text-[#1f633f] dark:text-white">
                  Call
                </h3>
                <p className="text-sm text-[#365b48] mb-3 dark:text-[#d8e7c9]">
                  Speak with a wholesale specialist
                </p>
                <p className="font-bold text-[#1f633f] text-lg dark:text-[#b8d58e]">
                  587-590-0886
                </p>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/15875900886"
                className="group rounded-xl border border-[#1f633f]/20 bg-white p-6 transition-all hover:bg-[#e5efd9] hover:border-[#1f633f] dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 dark:hover:border-[#b8d58e]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#e5efd9] text-xl text-[#1f633f] font-bold dark:bg-[#b8d58e] dark:text-[#1f633f]">
                  💬
                </div>
                <h3 className="font-bold mb-2 text-[#1f633f] dark:text-white">
                  WhatsApp
                </h3>
                <p className="text-sm text-[#365b48] mb-3 dark:text-[#d8e7c9]">
                  Quick messages & quotes
                </p>
                <p className="font-bold text-[#1f633f] dark:text-[#b8d58e]">
                  Send Message →
                </p>
              </a>

              {/* Email */}
              <a
                href="mailto:info@eastafricawholesalefoods.com"
                className="group rounded-xl border border-[#1f633f]/20 bg-white p-6 transition-all hover:bg-[#e5efd9] hover:border-[#1f633f] dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 dark:hover:border-[#b8d58e]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#e5efd9] text-xl text-[#1f633f] font-bold dark:bg-[#b8d58e] dark:text-[#1f633f]">
                  ✉️
                </div>
                <h3 className="font-bold mb-2 text-[#1f633f] dark:text-white">
                  Email
                </h3>
                <p className="text-sm text-[#365b48] mb-3 dark:text-[#d8e7c9]">
                  Detailed enquiry form
                </p>
                <p className="font-bold text-[#1f633f] text-sm break-all dark:text-[#b8d58e]">
                  info@eastafrican...
                </p>
              </a>

              {/* Visit Warehouse */}
              <a
                href="https://maps.google.com/?q=Edmonton+Alberta"
                className="group rounded-xl border border-[#1f633f]/20 bg-white p-6 transition-all hover:bg-[#e5efd9] hover:border-[#1f633f] dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 dark:hover:border-[#b8d58e]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#e5efd9] text-xl text-[#1f633f] font-bold dark:bg-[#b8d58e] dark:text-[#1f633f]">
                  📍
                </div>
                <h3 className="font-bold mb-2 text-[#1f633f] dark:text-white">
                  Visit
                </h3>
                <p className="text-sm text-[#365b48] mb-3 dark:text-[#d8e7c9]">
                  10548 169 Street
                </p>
                <p className="font-bold text-[#1f633f] dark:text-[#b8d58e]">
                  Mon-Fri 9am-5pm
                </p>
              </a>
            </div>

            {/* CTA Button */}
            <div className="mt-12 flex flex-col items-center gap-6 border-t border-[#1f633f]/20 pt-12 sm:flex-row sm:justify-between dark:border-white/20">
              <div>
                <p className="font-bold text-lg mb-1 text-[#173b2b] dark:text-white">
                  Still need help?
                </p>
                <p className="text-[#365b48] dark:text-[#d8e7c9]">
                  Our team responds same-day to all enquiries
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-[#d64b35] px-8 py-4 font-bold text-white shadow-xl shadow-[#d64b35]/30 transition-all hover:bg-[#b83d2b] hover:-translate-y-1"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0f2a1d] py-10 text-[#f8f2e5]">
        <div className="container flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-xl font-bold">
              East Africa Wholesale Foods
            </p>
            <p className="mt-1 text-sm text-[#b8d58e]">
              Good food starts with good sourcing.
            </p>
          </div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            Copyright {new Date().getFullYear()} East Africa Wholesale Foods
          </p>
        </div>
      </footer>
    </div>
  );
}
