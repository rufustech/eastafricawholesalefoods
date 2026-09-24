"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getActiveCategories } from "@/lib/catalog";
import { fetchProducts } from "@/lib/api/products";
import { Product } from "@/types/product";
import { SiteHeader } from "@/components/SiteHeader";
import { analytics } from "@/lib/analytics";
import { BUSINESS } from "@/lib/site";

const categories = getActiveCategories();

const productColors = [
  "bg-[#d8e7c9]",
  "bg-[#f2d5bf]",
  "bg-[#d5e1d7]",
  "bg-[#f4dfb5]",
];

export default function HomeClient() {
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
              <span className="block font-serif text-2xl font-bold text-[#b8d58e] leading-tight">
                African Foods
              </span>
              <span className="mt-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-[#e8846f]">
                Wholesale &amp; Distribution
              </span>
            </div>
          </div>
        </div>
      )}
      <SiteHeader />

      <main>
        <section className="relative isolate border-b border-[#173b2b]/10 bg-[#f5ead5] dark:border-white/10 dark:bg-[#173b2b]">
          <div className="pointer-events-none absolute -right-28 -top-28 -z-10 h-96 w-96 rounded-full bg-[#d64b35]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-[#7da453]/25 blur-3xl" />
          <div className="container grid items-start gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24 lg:gap-20 lg:py-28">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#1f633f]/20 bg-[#fbf7ee]/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1f633f] dark:bg-white/10 dark:text-[#d8e7c9]">
                <span className="h-2 w-2 rounded-full bg-[#d64b35]" /> Edmonton,
                Alberta · Canada-wide
              </div>
              <h1 className="max-w-2xl font-serif text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-[#173b2b] dark:text-[#f8f2e5] md:text-6xl">
                African Food Wholesale &amp;{" "}
                <span className="text-[#d64b35]">Distribution.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#365b48] dark:text-[#d8e7c9]">
                East Africa Wholesale Foods supplies authentic African grocery
                products &mdash; grains, flours, frozen foods, spices and
                specialty items &mdash; to retailers, grocery stores,
                distributors, restaurants and food-service businesses across
                Canada.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/wholesale"
                  className="inline-flex items-center justify-center rounded-full bg-[#d64b35] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#d64b35]/25 transition-all hover:-translate-y-1 hover:bg-[#b83d2b]"
                >
                  Wholesale Enquiries
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[#1f633f] bg-white px-7 py-4 text-sm font-bold text-[#1f633f] transition-colors hover:bg-[#f8f2e5] dark:bg-[#173b2b] dark:border-[#7da453] dark:text-[#d8e7c9]"
                >
                  Browse Catalogue
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap gap-8 border-t border-[#173b2b]/15 pt-6 dark:border-white/15">
                <div>
                  <p className="font-serif text-3xl font-bold">Retailers</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-60">
                    &amp; grocery stores
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold">Restaurants</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-60">
                    &amp; caterers
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold">Canada</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-60">
                    From Edmonton, AB
                  </p>
                </div>
              </div>
            </div>
            <div className="sticky top-24">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">
                Browse African Food Categories
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {categories.slice(0, 8).map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/products/category/${category.slug}`}
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
                                  : index === 5
                                    ? "🧂"
                                    : index === 6
                                      ? "🫘"
                                      : "🥫"}
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
                href="/products"
                className="mt-4 block w-full text-center rounded-lg bg-[#1f633f] py-3 text-sm font-bold text-white hover:bg-[#174d30] transition-colors"
              >
                View All Products
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
                  Wholesale favourites for{" "}
                  <span className="italic text-[#b8d58e]">food businesses.</span>
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
                    className={`relative aspect-square overflow-hidden bg-linear-to-br ${productColors[index % productColors.length]}`}
                  >
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        fill
                        className="object-contain p-6"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-7xl font-bold text-[#1f633f]/20">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                    <span className="absolute bottom-4 left-4 rounded-full bg-[#fbf7ee]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#173b2b] backdrop-blur-sm z-10">
                      In stock
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#d64b35]">
                      {product.category.replace("-", " ")}
                    </p>
                    <h3 className="mt-2 line-clamp-2 font-serif text-lg font-bold">
                      {product.name}
                    </h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-[#d64b35]">
                        View Details
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
                A wholesale partner for{" "}
                <span className="text-[#7da453]">serious food businesses.</span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-[#173b2b]/10 bg-white p-8 dark:border-white/10 dark:bg-[#173b2b]">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#e5efd9] text-2xl dark:bg-[#2a5a47]">
                  🌍
                </div>
                <h3 className="font-serif text-2xl font-bold">
                  Authentic African Foods
                </h3>
                <p className="mt-3 text-sm leading-6 opacity-70">
                  A focused catalogue of African grains, flours, frozen foods,
                  spices and specialty products your customers ask for.
                </p>
              </div>

              <div className="rounded-2xl border border-[#173b2b]/10 bg-white p-8 dark:border-white/10 dark:bg-[#173b2b]">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#f2d5bf] text-2xl dark:bg-[#8b3a2c]">
                  📦
                </div>
                <h3 className="font-serif text-2xl font-bold">
                  Wholesale &amp; Bulk Supply
                </h3>
                <p className="mt-3 text-sm leading-6 opacity-70">
                  Case and bulk quantities for grocery stores, retailers,
                  restaurants and caterers. Request pricing on the items you
                  stock most.
                </p>
              </div>

              <div className="rounded-2xl border border-[#173b2b]/10 bg-white p-8 dark:border-white/10 dark:bg-[#173b2b]">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#d5e1d7] text-2xl dark:bg-[#2a5a47]">
                  📍
                </div>
                <h3 className="font-serif text-2xl font-bold">
                  Based in Edmonton
                </h3>
                <p className="mt-3 text-sm leading-6 opacity-70">
                  Distributing African foods from our Edmonton, Alberta base.
                  Talk to us about supply for your business.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="container py-20 md:py-28">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">
                Shop by category
              </p>
              <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                African food categories,{" "}
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
                href={`/products/category/${category.slug}`}
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
                African foods, one trusted supplier.
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
                <p className="mt-1 text-sm opacity-70">Wholesale pricing</p>
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
                <span className="text-[#d64b35]">Let&apos;s connect.</span>
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#365b48] dark:text-[#d8e7c9]">
                Call, message, email, or visit our Edmonton location to discuss
                wholesale supply for your business.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-4 md:gap-4">
              {/* Phone */}
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                onClick={() => analytics.phoneClick()}
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
                  {BUSINESS.phone}
                </p>
              </a>

              {/* WhatsApp */}
              <a
                href={BUSINESS.whatsapp}
                onClick={() => analytics.whatsappClick()}
                className="group rounded-xl border border-[#1f633f]/20 bg-white p-6 transition-all hover:bg-[#e5efd9] hover:border-[#1f633f] dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 dark:hover:border-[#b8d58e]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#e5efd9] text-xl text-[#1f633f] font-bold dark:bg-[#b8d58e] dark:text-[#1f633f]">
                  💬
                </div>
                <h3 className="font-bold mb-2 text-[#1f633f] dark:text-white">
                  WhatsApp
                </h3>
                <p className="text-sm text-[#365b48] mb-3 dark:text-[#d8e7c9]">
                  Quick messages &amp; quotes
                </p>
                <p className="font-bold text-[#1f633f] dark:text-[#b8d58e]">
                  Send Message →
                </p>
              </a>

              {/* Email */}
              <a
                href={`mailto:${BUSINESS.email}`}
                onClick={() => analytics.emailClick()}
                className="group rounded-xl border border-[#1f633f]/20 bg-white p-6 transition-all hover:bg-[#e5efd9] hover:border-[#1f633f] dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 dark:hover:border-[#b8d58e]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#e5efd9] text-xl text-[#1f633f] font-bold dark:bg-[#b8d58e] dark:text-[#1f633f]">
                  ✉️
                </div>
                <h3 className="font-bold mb-2 text-[#1f633f] dark:text-white">
                  Email
                </h3>
                <p className="text-sm text-[#365b48] mb-3 dark:text-[#d8e7c9]">
                  Detailed enquiry
                </p>
                <p className="font-bold text-[#1f633f] text-sm break-all dark:text-[#b8d58e]">
                  info@eastafrican...
                </p>
              </a>

              {/* Visit */}
              <a
                href="https://maps.google.com/?q=10548+169+St+NW+Edmonton+AB"
                className="group rounded-xl border border-[#1f633f]/20 bg-white p-6 transition-all hover:bg-[#e5efd9] hover:border-[#1f633f] dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 dark:hover:border-[#b8d58e]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#e5efd9] text-xl text-[#1f633f] font-bold dark:bg-[#b8d58e] dark:text-[#1f633f]">
                  📍
                </div>
                <h3 className="font-bold mb-2 text-[#1f633f] dark:text-white">
                  Visit
                </h3>
                <p className="text-sm text-[#365b48] mb-3 dark:text-[#d8e7c9]">
                  10548 169 St NW
                </p>
                <p className="font-bold text-[#1f633f] dark:text-[#b8d58e]">
                  {BUSINESS.hours}
                </p>
              </a>
            </div>

            <div className="mt-12 flex flex-col items-center gap-6 border-t border-[#1f633f]/20 pt-12 sm:flex-row sm:justify-between dark:border-white/20">
              <div>
                <p className="font-bold text-lg mb-1 text-[#173b2b] dark:text-white">
                  Need wholesale pricing?
                </p>
                <p className="text-[#365b48] dark:text-[#d8e7c9]">
                  Tell us what you stock and we&apos;ll follow up.
                </p>
              </div>
              <Link
                href="/wholesale"
                className="inline-flex items-center justify-center rounded-full bg-[#d64b35] px-8 py-4 font-bold text-white shadow-xl shadow-[#d64b35]/30 transition-all hover:bg-[#b83d2b] hover:-translate-y-1"
              >
                Request Wholesale Info
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
