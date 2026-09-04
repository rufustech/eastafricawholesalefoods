"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { fetchProducts } from "@/lib/api/products";
import { Product } from "@/types/product";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteHeader } from "@/components/SiteHeader";
import { ActionIcon } from "@/components/ActionIcon";

const productColors = ["bg-[#d8e7c9]", "bg-[#f2d5bf]", "bg-[#d5e1d7]", "bg-[#f4dfb5]"];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbf7ee] text-[#173b2b] dark:bg-[#10251b] dark:text-[#f8f2e5]">
      {showIntro && (
        <div className="intro-overlay fixed inset-0 z-[200] grid place-items-center bg-[#173b2b] text-[#f8f2e5]">
          <div className="relative grid h-64 w-64 place-items-center">
            <div className="absolute inset-5 rounded-full border border-[#b8d58e]/30" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-[#b8d58e] border-t-[#d64b35]" />
            <svg className="animate-spin-slow absolute inset-0 h-full w-full" viewBox="0 0 256 256" aria-label="East Africa Wholesale Foods loading">
              <defs><path id="brand-spinner-path" d="M 128,128 m -92,0 a 92,92 0 1,1 184,0 a 92,92 0 1,1 -184,0" /></defs>
              <text className="fill-[#f8f2e5] text-[13px] font-bold uppercase tracking-[0.28em]"><textPath href="#brand-spinner-path">East Africa Wholesale Foods · East Africa Wholesale Foods · </textPath></text>
            </svg>
            <div className="relative text-center"><span className="block font-serif text-5xl font-bold text-[#b8d58e]">EA</span><span className="mt-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-[#e8846f]">Good sourcing</span></div>
          </div>
        </div>
      )}
      <SiteHeader />
      <header className="hidden relative z-20 border-b border-[#173b2b]/10 bg-[#fbf7ee]/90 backdrop-blur-md dark:border-white/10 dark:bg-[#10251b]/90">
        <div className="container flex items-center justify-between py-5">
          <Link href="/" className="group flex items-center gap-3 text-[#173b2b] dark:text-[#f8f2e5]">
            <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl bg-[#173b2b] shadow-lg shadow-[#1f633f]/20 transition-transform group-hover:-rotate-2"><Image src="/eastafricawholesalefoodsLogo.png" alt="East Africa Wholesale Foods" fill sizes="128px" quality={100} className="object-contain" /></span>
            <span><span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-[#d64b35]">East Africa</span><span className="block font-serif text-xl font-bold tracking-tight">Wholesale Foods</span></span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex"><a href="#categories" className="transition-colors hover:text-[#d64b35]">Categories</a><a href="#featured" className="transition-colors hover:text-[#d64b35]">Featured</a><a href="#story" className="transition-colors hover:text-[#d64b35]">Our story</a></nav>
          <div className="flex items-center gap-3"><Link href="/products" className="hidden rounded-full bg-[#d64b35] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#d64b35]/20 transition-all hover:-translate-y-0.5 hover:bg-[#b83d2b] sm:block">Shop wholesale</Link><ThemeToggle /></div>
        </div>
      </header>

      <main>
        <section className="relative isolate border-b border-[#173b2b]/10 bg-[#f5ead5] dark:border-white/10 dark:bg-[#173b2b]">
          <div className="pointer-events-none absolute -right-28 -top-28 -z-10 h-96 w-96 rounded-full bg-[#d64b35]/15 blur-3xl" /><div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-[#7da453]/25 blur-3xl" />
          <div className="container grid items-center gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24 lg:gap-20 lg:py-28">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#1f633f]/20 bg-[#fbf7ee]/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1f633f] dark:bg-white/10 dark:text-[#d8e7c9]"><span className="h-2 w-2 rounded-full bg-[#d64b35]" /> Trusted by food businesses</div>
              <h1 className="max-w-2xl font-serif text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-[#173b2b] dark:text-[#f8f2e5] md:text-7xl">Good food starts with <span className="text-[#d64b35]">good sourcing.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#365b48] dark:text-[#d8e7c9]">Premium staples, grains, frozen foods, and spices for the people who feed East Africa. Reliable supply, honest pricing, delivered.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4"><Link href="/products" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#1f633f] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#1f633f]/25 transition-all hover:-translate-y-1 hover:bg-[#174d30]">Browse the collection</Link><a href="#story" className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[#173b2b]/20 px-7 py-4 text-sm font-bold transition-colors hover:border-[#d64b35] hover:text-[#d64b35] dark:border-white/20">Why us?</a></div>
              <div className="mt-12 flex flex-wrap gap-8 border-t border-[#173b2b]/15 pt-6 dark:border-white/15"><div><p className="font-serif text-3xl font-bold">4.9<span className="text-[#d64b35]">/5</span></p><p className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-60">Customer rating</p></div><div><p className="font-serif text-3xl font-bold">24h</p><p className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-60">Fast dispatch</p></div><div><p className="font-serif text-3xl font-bold">Since 2020</p><p className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-60">Local expertise</p></div></div>
            </div>
            <div className="relative mx-auto w-full max-w-[500px]"><div className="relative aspect-[0.88] overflow-hidden rounded-[2.5rem] bg-[#1f633f] p-6 shadow-2xl shadow-[#173b2b]/20 md:p-8"><div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[28px] border-[#d8e7c9]/20" /><div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#d64b35]/90 blur-2xl" /><div className="relative flex h-full flex-col justify-between text-[#f8f2e5]"><div className="flex items-start justify-between"><span className="rounded-full bg-[#f8f2e5]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">From the source</span><span className="font-serif text-3xl italic opacity-80">01</span></div><div className="relative flex items-center justify-center py-5"><div className="absolute h-48 w-48 rounded-full bg-[#d8e7c9]/20 blur-2xl" /><div className="relative grid h-48 w-48 place-items-center rounded-[3rem] border border-[#f8f2e5]/30 bg-[#7da453] text-center shadow-2xl rotate-[-7deg]"><div><span className="block text-6xl">✦</span><span className="mt-1 block text-xs font-bold uppercase tracking-[0.25em]">Fresh supply</span></div></div><div className="absolute bottom-1 right-4 rounded-2xl bg-[#d64b35] px-4 py-3 text-center text-white shadow-xl rotate-[8deg]"><span className="block text-[9px] font-bold uppercase tracking-widest">Quality</span><span className="font-serif text-xl font-bold">you can taste</span></div></div><div><p className="font-serif text-3xl font-bold leading-none">From our region.</p><p className="mt-2 text-sm text-[#d8e7c9]">To your kitchen, shelf, and table.</p></div></div></div><div className="absolute -bottom-5 -left-5 rounded-2xl bg-[#fbf7ee] px-5 py-4 shadow-xl dark:bg-[#f8f2e5] dark:text-[#173b2b]"><p className="text-xs font-bold uppercase tracking-widest text-[#d64b35]">Wholesale made simple</p><p className="mt-1 text-sm font-semibold">Better margins. Better meals.</p></div></div>
          </div>
        </section>

        <section id="categories" className="container py-20 md:py-28"><div className="mb-10 flex items-end justify-between gap-6"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">Shop by need</p><h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">The essentials, <span className="italic text-[#7da453]">sorted.</span></h2></div><Link href="/products" className="hidden text-sm font-bold text-[#1f633f] hover:text-[#d64b35] sm:block">View all products -&gt;</Link></div><div className="grid gap-5 md:grid-cols-2">{categories.map((category, index) => <Link key={category.id} href={`/products?category=${category.slug}`} className="group relative overflow-hidden rounded-[2rem] border border-[#173b2b]/10 bg-[#e5efd9] p-7 transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#1c4030] md:p-9"><span className="absolute -right-5 -top-10 font-serif text-[10rem] font-bold leading-none text-[#1f633f]/10">0{index + 1}</span><span className="relative text-4xl">{index === 0 ? "✦" : "❄"}</span><div className="relative mt-14 flex items-end justify-between gap-6"><div><h3 className="font-serif text-2xl font-bold">{category.name}</h3><p className="mt-2 max-w-sm text-sm leading-6 opacity-70">{category.description}</p></div><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#fbf7ee] text-xl text-[#1f633f] transition-transform group-hover:rotate-[-45deg] dark:bg-[#f8f2e5]">-&gt;</span></div></Link>)}</div></section>

        <section id="featured" className="bg-[#173b2b] py-20 text-[#f8f2e5] md:py-28"><div className="container"><div className="mb-10 flex items-end justify-between gap-6"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#e8846f]">The good stuff</p><h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Popular with <span className="italic text-[#b8d58e]">pros.</span></h2></div><Link href="/products" className="hidden text-sm font-bold text-[#b8d58e] hover:text-white sm:block">Browse catalogue -&gt;</Link></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0, 4).map((product, index) => <Link key={product.id} href={`/products/${product.id}`} className="group overflow-hidden rounded-[1.5rem] bg-[#f8f2e5] text-[#173b2b] transition-all hover:-translate-y-2 hover:shadow-2xl"><div className={`relative flex aspect-square items-center justify-center ${productColors[index]}`}><span className="font-serif text-7xl font-bold text-[#1f633f]/20">{String(index + 1).padStart(2, "0")}</span><span className="absolute bottom-4 left-4 rounded-full bg-[#fbf7ee]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">In stock</span></div><div className="p-5"><p className="text-xs font-bold uppercase tracking-widest text-[#d64b35]">{product.category.replace("-", " ")}</p><h3 className="mt-2 line-clamp-1 font-serif text-xl font-bold">{product.name}</h3><div className="mt-5 flex items-center justify-between"><span className="text-sm font-bold">From ${product.pricing.retail.amount.toFixed(2)} <span className="font-normal opacity-60">/ {product.pricing.retail.unit}</span></span><span className="grid h-9 w-9 place-items-center rounded-full bg-[#1f633f] text-white transition-transform group-hover:rotate-[-45deg]">-&gt;</span></div></div></Link>)}</div></div></section>

        <section id="story" className="container grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28"><div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#d8e7c9] p-8 dark:bg-[#1c4030]"><div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#7da453]" /><div className="absolute -right-20 top-12 h-72 w-72 rounded-full border-[40px] border-[#d64b35]/80" /><div className="relative flex h-full flex-col justify-between"><span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">Our promise</span><p className="max-w-xs font-serif text-4xl font-bold leading-tight">The short route from source to service.</p><span className="text-sm font-semibold opacity-70">East Africa, one trusted supplier.</span></div></div><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">Built for busy kitchens</p><h2 className="max-w-lg font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl">Your supplier should feel like part of the team.</h2><p className="mt-6 max-w-lg text-lg leading-8 opacity-70">We keep the ordering simple and the standards high, so restaurants, retailers, and food businesses can focus on serving their customers.</p><div className="mt-8 grid max-w-lg grid-cols-2 gap-5 border-t border-[#173b2b]/15 pt-6 dark:border-white/15"><div><p className="font-serif text-2xl font-bold">01</p><p className="mt-1 text-sm opacity-70">Consistent quality</p></div><div><p className="font-serif text-2xl font-bold">02</p><p className="mt-1 text-sm opacity-70">Transparent pricing</p></div></div></div></section>
      </main>

      <footer className="bg-[#0f2a1d] py-10 text-[#f8f2e5]"><div className="container flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="font-serif text-xl font-bold">East Africa Wholesale Foods</p><p className="mt-1 text-sm text-[#b8d58e]">Good food starts with good sourcing.</p></div><p className="text-xs uppercase tracking-widest text-white/50">Copyright {new Date().getFullYear()} East Africa Wholesale Foods</p></div></footer>
    </div>
  );
}
