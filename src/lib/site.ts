/**
 * Central site configuration — single source of truth for verified business facts.
 *
 * IMPORTANT: Only verified information belongs here. Do not add claims
 * (certifications, delivery areas, farmer counts, etc.) that are not confirmed
 * by the business owner.
 */

/**
 * Production site URL. Override via NEXT_PUBLIC_SITE_URL in the environment.
 * Falls back to the known production domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://eastafricawholesalefoods.com"
).replace(/\/$/, "");

/** Google Analytics 4 Measurement ID. Configure NEXT_PUBLIC_GA4_ID to enable. */
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";

/** Google Tag Manager container ID. */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NDFMNF29";

/** Verified business name, address, and contact details (NAP). */
export const BUSINESS = {
  name: "East Africa Wholesale Foods",
  legalName: "East Africa Wholesale Foods",
  description:
    "African food wholesaler and distributor based in Edmonton, Alberta, supplying African grocery products to retailers, grocery stores, distributors, restaurants and food-service businesses across Canada.",
  email: "info@eastafricawholesalefoods.com",
  phone: "587-590-0886",
  phoneE164: "+15875900886",
  whatsapp: "https://wa.me/15875900886",
  address: {
    street: "10548 169 St NW",
    city: "Edmonton",
    region: "AB",
    regionName: "Alberta",
    postalCode: "T5P 3X6",
    country: "CA",
    countryName: "Canada",
  },
  hours: "Mon–Fri 9am–5pm",
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  logo: "/eastafricawholesalefoodsLogo.png",
} as const;

/** Full formatted address as a single string. */
export const FORMATTED_ADDRESS = `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}, ${BUSINESS.address.countryName}`;

/**
 * Build an absolute URL from a site-relative path.
 */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
