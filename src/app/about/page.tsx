"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Phil",
      role: "Founder & CEO",
      focus: "Direct farmer relationships & quality assurance",
      bio: "Phil built East Africa Wholesale Foods on a simple belief: authentic food starts with authentic partnerships. With direct relationships spanning 6,000+ African farmers, Phil ensures every product meets our rigorous organic standards before reaching your door.",
    },
    {
      name: "Community",
      role: "Farmer Network",
      focus: "Sustainable agriculture & fair trade",
      bio: "Our 6,000+ partner farmers across East Africa are the heart of what we do. We work directly with them to ensure fair pricing, sustainable practices, and the highest quality organic produce.",
    },
    {
      name: "Wholesale Team",
      role: "Customer Success",
      focus: "Same-day fulfillment & relationship building",
      bio: "Our team responds to every enquiry same-day. We believe in building partnerships, not just transactions. Your success as a retailer or restaurant is our success.",
    },
  ];

  const values = [
    {
      icon: "🌱",
      title: "100% Organic Certified",
      description:
        "Every product is certified organic. No shortcuts. This is non-negotiable. We partner with certification bodies to ensure transparency.",
    },
    {
      icon: "🤝",
      title: "Direct Farmer Partnerships",
      description:
        "We eliminate middlemen. Paying fair prices directly to 6,000+ farmers means better margins for you and sustainable income for them.",
    },
    {
      icon: "⚡",
      title: "Same-Day Dispatch",
      description:
        "Order before 2pm, ships the same day. We keep it simple so restaurants, retailers, and distributors can focus on serving their customers.",
    },
    {
      icon: "🍲",
      title: "Authentic East African Foods",
      description:
        "Not imported from supermarket shelves. Our products are sourced from the source—grains, vegetables, specialty items that define East African cuisine.",
    },
    {
      icon: "💰",
      title: "Competitive Wholesale Pricing",
      description:
        "Direct farmer relationships mean better prices for you. Bulk discounts available for restaurants, supermarkets, and distributors.",
    },
    {
      icon: "🚚",
      title: "Canada-Wide Delivery",
      description:
        "From Edmonton to coast-to-coast. We ship across Canada with reliable logistics partners, tracking included.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f2e5] dark:bg-[#0f2a1d]">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1f633f] to-[#173b2b] py-20 text-white md:py-32">
        <div className="container">
          <div className="mb-6 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#b8d58e]">
              Our Story
            </p>
            <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl">
              The short route from{" "}
              <span className="text-[#d64b35]">farmers to your table.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#d8e7c9]">
              East Africa Wholesale Foods connects 6,000+ certified organic
              farmers directly with restaurants, retailers, and food businesses
              across Canada. No middlemen. No compromises. Just authentic,
              organic African foods.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">
              Our Mission
            </p>
            <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
              Make authentic African foods accessible to everyone.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-[#d8e7c9]">
              For too long, African food products have been marked up through
              supply chain middlemen, making them expensive for retailers and
              restaurants. We built East Africa Wholesale Foods to change
              that—by connecting directly with farmers and eliminating
              unnecessary intermediaries.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-[#d8e7c9]">
              When you order from us, you're buying directly from the source.
              Fair prices, consistent quality, same-day dispatch. That's the
              promise.
            </p>
          </div>
          <div className="relative min-h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-[#d8e7c9] to-[#c5dbb3] dark:from-[#1c4030] dark:to-[#152a21]">
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#7da453]/30" />
            <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-[#d64b35]/20" />
            <div className="relative flex h-full items-center justify-center p-8">
              <div className="text-center">
                <p className="font-serif text-6xl font-bold text-[#1f633f] dark:text-[#b8d58e]">
                  6,000+
                </p>
                <p className="mt-2 text-lg font-bold text-[#1f633f] dark:text-white">
                  Certified Organic Farmers
                </p>
                <p className="mt-4 max-w-xs text-sm text-[#1f633f] opacity-70 dark:text-[#d8e7c9]">
                  Direct partnerships across East Africa, delivering authentic
                  foods to Canada
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Organic Section */}
      <section className="bg-[#1f633f] py-20 text-white md:py-28">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#b8d58e]">
              Why Organic
            </p>
            <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
              Organic isn't a buzzword. It's a{" "}
              <span className="text-[#d64b35]">commitment.</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-serif text-2xl font-bold">
                Health First
              </h3>
              <p className="leading-8 text-[#d8e7c9]">
                Organic foods contain no synthetic pesticides, herbicides, or
                GMOs. That means cleaner ingredients for your restaurants,
                retail customers, and families. It's the difference between a
                product that sustains health and one that just fills a shelf.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-serif text-2xl font-bold">
                Earth-Friendly
              </h3>
              <p className="leading-8 text-[#d8e7c9]">
                Our partner farmers use regenerative practices that rebuild
                soil, conserve water, and protect biodiversity. When you buy
                organic, you're investing in farming that works with nature, not
                against it.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-serif text-2xl font-bold">
                Fair to Farmers
              </h3>
              <p className="leading-8 text-[#d8e7c9]">
                We pay our farmers premium prices for certified organic
                products. This means they can afford to invest in sustainable
                practices and provide for their families—no poverty-wage farming
                here.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-serif text-2xl font-bold">
                Taste Matters
              </h3>
              <p className="leading-8 text-[#d8e7c9]">
                Organic, heritage varieties taste better. Chefs know this. Your
                customers know this. The difference is in every bite.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-xl bg-white/10 border border-white/20 p-8">
            <p className="text-lg leading-8">
              <span className="font-bold">
                Every product we sell is certified organic.
              </span>{" "}
              We work with third-party certification bodies to verify pesticide
              residues, farming practices, and storage conditions. Transparency
              is non-negotiable. You can trust what you're buying.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="container py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">
            How It Works
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
            We handle the supply chain so you can focus on customers.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Source Directly",
              description:
                "We partner with 6,000+ certified organic farmers across East Africa. No intermediary markups. Direct relationships mean better prices and consistent quality.",
            },
            {
              step: "02",
              title: "Quality Assurance",
              description:
                "Every product is tested and certified for organic standards. Storage conditions are verified. All documentation is transparent and available on request.",
            },
            {
              step: "03",
              title: "Same-Day Dispatch",
              description:
                "Order before 2pm, ship the same day. Our Edmonton warehouse keeps inventory fresh and rotating. You get products at peak freshness.",
            },
            {
              step: "04",
              title: "Competitive Pricing",
              description:
                "Direct farmer relationships mean lower cost structure. We pass those savings to you. Bulk discounts available for restaurants and distributors.",
            },
            {
              step: "05",
              title: "Reliable Delivery",
              description:
                "Shipping across Canada with trusted logistics partners. Real-time tracking. Delivered fresh. Damage is replaced—no questions.",
            },
            {
              step: "06",
              title: "Ongoing Support",
              description:
                "Our team responds to enquiries same-day. Need product recommendations? Have questions about certifications? We're here.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-[#1a3d2e]"
            >
              <p className="font-serif text-3xl font-bold text-[#1f633f] dark:text-[#b8d58e]">
                {item.step}
              </p>
              <h3 className="mt-4 font-bold text-lg dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-[#d8e7c9]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-50 py-20 dark:bg-[#0a1f18] md:py-28">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">
              Why Choose Us
            </p>
            <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
              We stand for something.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-[#1a3d2e]"
              >
                <p className="text-4xl">{value.icon}</p>
                <h3 className="mt-4 font-bold text-lg dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-[#d8e7c9]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">
            Our Team
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
            A team focused on one thing:{" "}
            <span className="text-[#d64b35]">Your success.</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-[#d8e7c9]">
            We're small, specialized, and obsessed with making wholesale
            ordering simple. Every person here is focused on building
            relationships—not just moving product.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-[#1a3d2e]"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#d64b35] text-2xl font-bold text-white">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-serif text-2xl font-bold dark:text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-bold text-[#d64b35]">
                {member.role}
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-[#b8d58e]">
                {member.focus}
              </p>
              <p className="mt-4 text-gray-600 dark:text-[#d8e7c9]">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#1f633f] to-[#173b2b] py-20 text-white md:py-28">
        <div className="container text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
            Ready to work with us?
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#d8e7c9]">
            Whether you're a restaurant, supermarket, convenience store, or
            distributor—we've got the organic products you need at prices that
            make sense.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-[#d64b35] px-8 py-4 font-bold text-white shadow-xl shadow-[#d64b35]/30 transition-all hover:bg-[#b83d2b] hover:-translate-y-1"
            >
              Browse Products
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 font-bold text-white transition-all hover:bg-white/10"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
