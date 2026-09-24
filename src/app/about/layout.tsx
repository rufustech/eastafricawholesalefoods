import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | East Africa Wholesale Foods",
  description:
    "Learn about East Africa Wholesale Foods, an Edmonton-based African food wholesale and distribution business supplying retailers, distributors and restaurants across Canada.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
