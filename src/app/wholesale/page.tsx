import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactModal } from "@/components/ContactModal";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateFaqSchema } from "@/lib/seo";
import { getActiveCategories } from "@/lib/catalog";
import { BUSINESS, FORMATTED_ADDRESS, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "African Food Wholesaler Canada | Wholesale African Foods",
  description:
    "Wholesale African foods for retailers, grocery stores, restaurants and caterers across Canada. Bulk African food supply from our Edmonton, Alberta base. Request pricing.",
  alternates: {
    canonical: "/wholesale",
  },
  openGraph: {
    title: "African Food Wholesaler Canada | Wholesale African Foods",
    description:
      "Wholesale African foods for retailers, grocery stores, restaurants and caterers across Canada. Bulk supply from Edmonton, Alberta.",
    url: absoluteUrl("/wholesale"),
    type: "website",
  },
};

const FAQS = [
  {
    question: "Who does East Africa Wholesale Foods supply?",
    answer:
      "We supply African food products to retailers, grocery stores, distributors, restaurants, caterers and other food-service businesses.",
  },
  {
    question: "How do I request wholesale pricing?",
    answer:
      "Send us the products and quantities you are interested in by phone, WhatsApp or email and our team will follow up with pricing and availability.",
  },
  {
    question: "Where are you based?",
    answer: `We are based at ${FORMATTED_ADDRESS} and supply customers across Canada.`,
  },
];

export default function WholesalePage() {
  const categories = getActiveCategories();
  const faqSchema = generateFaqSchema(FAQS);

  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Wholesale", url: "/wholesale" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f2e5] dark:bg-[#0f2a1d] text-neutral-900 dark:text-neutral-100">
      <StructuredData schema={faqSchema} />
      <SiteHeader />

      <main className="container py-10 md:py-16">
        <Breadcrumbs items={crumbs} />

        {/* Hero */}
        <section className="mb-16 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#d64b35] mb-3">
            Wholesale African foods · Canada
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            African Food Wholesaler in Canada
          </h1>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
            East Africa Wholesale Foods supplies authentic African grocery
            products at wholesale and bulk quantities to retailers, grocery
            stores, distributors, restaurants and caterers. Based in Edmonton,
            Alberta, we help food businesses across Canada stock the African
            staples their customers are looking for.
          </p>
          <div className="flex flex-wrap gap-4">
            <ContactModal buttonLabel="Request wholesale pricing" />
            <Link
              href="/products"
              className="rounded-full border-2 border-[#1f633f] px-6 py-3 text-sm font-bold text-[#1f633f] transition-colors hover:bg-[#e5efd9] dark:border-[#7da453] dark:text-[#d8e7c9]"
            >
              Browse the catalogue
            </Link>
          </div>
        </section>

        {/* Who we supply */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Who we supply</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Grocery stores & retailers",
              "Distributors & wholesalers",
              "Restaurants & caterers",
              "Food-service businesses",
              "African & specialty food shops",
              "Independent supermarkets",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1c4030] p-5 font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Product categories */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Wholesale product categories
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products/category/${cat.slug}`}
                className="group rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1c4030] p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="font-bold group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {cat.name}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* How enquiries work */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            How wholesale enquiries work
          </h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Tell us what you stock",
                body: "Send the products and quantities you are interested in by phone, WhatsApp or email.",
              },
              {
                step: "2",
                title: "We follow up with pricing",
                body: "Our team responds with current wholesale pricing and availability for your order.",
              },
              {
                step: "3",
                title: "Arrange your supply",
                body: "We arrange your order so you can keep your shelves and kitchen stocked.",
              },
            ].map((s) => (
              <li
                key={s.step}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-[#e5efd9] dark:bg-[#1c4030] p-6"
              >
                <span className="font-serif text-3xl font-bold text-[#d64b35]">
                  0{s.step}
                </span>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Contact block */}
        <section className="rounded-3xl bg-[#173b2b] text-white p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Request product and pricing information
          </h2>
          <p className="text-[#d8e7c9] mb-6 max-w-2xl">
            Get in touch to discuss wholesale supply for your business. We are
            based at {FORMATTED_ADDRESS}, open {BUSINESS.hours}.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="rounded-full bg-[#d64b35] px-6 py-3 text-sm font-bold text-white hover:bg-[#b83d2b]"
            >
              Call {BUSINESS.phone}
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Email us
            </a>
            <Link
              href="/distribution"
              className="rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              About distribution
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
