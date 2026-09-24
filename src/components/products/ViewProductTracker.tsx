"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

/**
 * Fires a GA4 `view_product` event once when a product page mounts.
 * Renders nothing.
 */
export function ViewProductTracker({
  productName,
  category,
}: {
  productName: string;
  category?: string;
}) {
  useEffect(() => {
    analytics.viewProduct(productName, category);
  }, [productName, category]);

  return null;
}
