import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title:
    "African Food Wholesaler & Distributor Canada | East Africa Wholesale Foods",
  description:
    "Edmonton-based African food wholesaler and distributor supplying grocery stores, retailers, restaurants and food-service businesses with African foods across Canada.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomeClient />;
}
