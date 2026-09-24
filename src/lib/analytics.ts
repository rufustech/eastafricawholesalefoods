/**
 * Analytics helpers — push B2B conversion events to the GTM/GA4 dataLayer.
 *
 * Events are only meaningful once a real GA4 tag (or GTM trigger) is configured.
 * These helpers are safe to call even when analytics is not yet configured;
 * they simply push to window.dataLayer which GTM/GA4 will consume when ready.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/** Push a named event with optional params to the dataLayer. */
export function trackEvent(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/** B2B conversion event helpers. */
export const analytics = {
  wholesaleEnquiry: (params?: EventParams) =>
    trackEvent("wholesale_enquiry", params),
  productEnquiry: (productName: string) =>
    trackEvent("product_enquiry", { product_name: productName }),
  phoneClick: () => trackEvent("phone_click"),
  emailClick: () => trackEvent("email_click"),
  whatsappClick: () => trackEvent("whatsapp_click"),
  catalogueDownload: () => trackEvent("catalogue_download"),
  viewProduct: (productName: string, category?: string) =>
    trackEvent("view_product", {
      product_name: productName,
      category,
    }),
  searchProducts: (query: string) =>
    trackEvent("search_products", { search_term: query }),
};
