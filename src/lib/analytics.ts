/**
 * Google Analytics 4 Event Tracking
 * Tracks user interactions and commerce events
 */

type EventName =
  | "view_item"
  | "view_item_list"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "add_shipping_info"
  | "add_payment_info"
  | "purchase"
  | "refund"
  | "search"
  | "page_view"
  | "login"
  | "sign_up";

interface EventParams {
  [key: string]: any;
}

/**
 * Send event to Google Analytics 4
 * Safely handles gtag in SSR context
 */
export function trackEvent(eventName: EventName, params?: EventParams): void {
  // Only track in browser environment
  if (typeof window === "undefined") return;

  // Check if gtag is available
  if (typeof window.gtag !== "function") {
    console.warn("Google Analytics not initialized");
    return;
  }

  try {
    window.gtag("event", eventName, params || {});
  } catch (error) {
    console.error("Error tracking event:", error);
  }
}

/**
 * Track product view event
 */
export function trackViewItem(
  productId: string,
  productName: string,
  price: number,
  currency: string,
): void {
  trackEvent("view_item", {
    items: [
      {
        item_id: productId,
        item_name: productName,
        price,
        currency,
      },
    ],
  });
}

/**
 * Track add to cart event
 */
export function trackAddToCart(
  productId: string,
  productName: string,
  quantity: number,
  price: number,
): void {
  trackEvent("add_to_cart", {
    currency: "USD",
    value: price * quantity,
    items: [
      {
        item_id: productId,
        item_name: productName,
        quantity,
        price,
      },
    ],
  });
}

/**
 * Track purchase event
 */
export function trackPurchase(
  orderId: string,
  total: number,
  currency: string,
  items: any[],
): void {
  trackEvent("purchase", {
    transaction_id: orderId,
    value: total,
    currency,
    items: items.map((item) => ({
      item_id: item.productId,
      item_name: item.productName,
      quantity: item.quantity,
      price: item.price,
    })),
  });
}

/**
 * Track product search
 */
export function trackSearch(query: string): void {
  trackEvent("search", {
    search_term: query,
  });
}

/**
 * Track page view
 */
export function trackPageView(pageTitle: string, pagePath: string): void {
  trackEvent("page_view", {
    page_title: pageTitle,
    page_path: pagePath,
  });
}

/**
 * Set user properties for analytics
 */
export function setUserProperties(properties: Record<string, any>): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;

  try {
    window.gtag("config", "G-XXXXXXXX", {
      user_properties: properties,
    });
  } catch (error) {
    console.error("Error setting user properties:", error);
  }
}

// Type augmentation for gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: any) => void;
  }
}
