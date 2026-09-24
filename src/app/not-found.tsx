import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8f2e5] dark:bg-[#0f2a1d] text-neutral-900 dark:text-neutral-100">
      <SiteHeader />
      <main className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d64b35]">
          404
        </p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Page not found</h1>
        <p className="mb-8 max-w-md text-neutral-600 dark:text-neutral-400">
          The page you were looking for doesn&apos;t exist or may have moved.
          Explore our wholesale African food catalogue instead.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-[#d64b35] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#b83d2b]"
          >
            Back to home
          </Link>
          <Link
            href="/products"
            className="rounded-full border-2 border-[#1f633f] px-6 py-3 text-sm font-bold text-[#1f633f] transition-colors hover:bg-[#e5efd9] dark:border-[#7da453] dark:text-[#d8e7c9]"
          >
            Browse products
          </Link>
          <Link
            href="/wholesale"
            className="rounded-full border-2 border-[#1f633f] px-6 py-3 text-sm font-bold text-[#1f633f] transition-colors hover:bg-[#e5efd9] dark:border-[#7da453] dark:text-[#d8e7c9]"
          >
            Wholesale enquiries
          </Link>
        </div>
      </main>
    </div>
  );
}
