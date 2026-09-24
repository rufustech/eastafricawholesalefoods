import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactModal } from "@/components/ContactModal";
import { BUSINESS, FORMATTED_ADDRESS, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "African Food Distributor Canada | Edmonton, Alberta",
  description:
    "African food distributor based in Edmonton, Alberta, supplying African grocery products to retailers, grocery stores and restaurants. Talk to us about distribution.",
  alternates: {
    canonical: "/distribution",
  },
  openGraph: {
    title: "African Food Distributor Canada | Edmonton, Alberta",
    description:
      "African food distributor in Edmonton, Alberta supplying retailers, grocery stores and restaurants with African foods.",
    url: absoluteUrl("/distribution"),
    type: "website",
  },
};

export default function DistributionPage() {
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Distribution", url: "/distribution" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f2e5] dark:bg-[#0f2a1d] text-neutral-900 dark:text-neutral-100">
      <SiteHeader />

      <main className="container py-10 md:py-16">
        <Breadcrumbs items={crumbs} />

        <section className="mb-16 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#d64b35] mb-3">
            African food distribution · Edmonton, Alberta
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            African Food Distributor in Canada
          </h1>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
            East Africa Wholesale Foods is an African food distribution company
            based in Edmonton, Alberta. We distribute African grocery products
            &mdash; grains, flours, frozen foods, spices and specialty items
            &mdash; to retailers, grocery stores, restaurants and food-service
            businesses.
          </p>
          <div className="flex flex-wrap gap-4">
            <ContactModal buttonLabel="Talk to us about distribution" />
            <Link
              href="/wholesale"
              className="rounded-full border-2 border-[#1f633f] px-6 py-3 text-sm font-bold text-[#1f633f] transition-colors hover:bg-[#e5efd9] dark:border-[#7da453] dark:text-[#d8e7c9]"
            >
              Wholesale enquiries
            </Link>
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Edmonton base",
              body: `We operate from ${FORMATTED_ADDRESS}, serving food businesses in Edmonton and beyond.`,
            },
            {
              title: "Retail & food-service supply",
              body: "We distribute to grocery stores, retailers, restaurants and caterers who need a reliable source of African foods.",
            },
            {
              title: "A focused catalogue",
              body: "Our range covers the African staples your customers ask for, from grains and flours to frozen foods and spices.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1c4030] p-6"
            >
              <h2 className="text-lg font-bold mb-2">{c.title}</h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {c.body}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-[#173b2b] text-white p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Discuss distribution for your business
          </h2>
          <p className="text-[#d8e7c9] mb-6 max-w-2xl">
            Get in touch to find out how we can supply African foods to your
            business. Call {BUSINESS.phone} or email {BUSINESS.email}. Open{" "}
            {BUSINESS.hours}.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="rounded-full bg-[#d64b35] px-6 py-3 text-sm font-bold text-white hover:bg-[#b83d2b]"
            >
              Call {BUSINESS.phone}
            </a>
            <Link
              href="/products"
              className="rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Browse products
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
