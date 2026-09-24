import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Wholesale Enquiries | East Africa Wholesale Foods",
  description:
    "Contact East Africa Wholesale Foods in Edmonton, Alberta for wholesale African food enquiries. Call, email or visit us to discuss supply for your business.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
