/**
 * Orders API Service Layer
 *
 * Handles order creation and management.
 * Currently stubs for future backend integration.
 *
 * Backend endpoints:
 * - POST /api/orders (create order)
 * - GET /api/orders/:id (get order details)
 * - GET /api/orders (get user's orders)
 */

import { CartItem } from "@/lib/cart";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface OrderRequest {
  items: CartItem[];
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  taxRate: number;
}

export interface OrderResponse {
  success: boolean;
  data?: {
    id: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: "pending" | "confirmed" | "shipped" | "delivered";
    createdAt: string;
  };
  error?: string;
}

/**
 * Create a new order
 * Currently returns mock success; will call API when backend is ready
 */
export async function createOrder(
  orderData: OrderRequest,
): Promise<OrderResponse> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${API_URL}/api/orders`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(orderData),
    // });
    // if (!response.ok) throw new Error(`API error: ${response.status}`);
    // return await response.json();

    // For now, return mock success
    const subtotal = orderData.items.reduce((sum, item) => {
      return sum + item.product.pricing.retail.amount * item.quantity;
    }, 0);
    const tax = subtotal * orderData.taxRate;
    const total = subtotal + tax;

    return {
      success: true,
      data: {
        id: `ORDER-${Date.now()}`,
        items: orderData.items,
        subtotal,
        tax,
        total,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Failed to create order:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create order",
    };
  }
}

/**
 * Fetch order details by ID
 * Currently returns null; will call API when backend is ready
 */
export async function fetchOrder(orderId: string): Promise<OrderResponse> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // if (!response.ok) throw new Error(`API error: ${response.status}`);
    // return await response.json();

    // For now, return error
    return {
      success: false,
      error: "Backend not yet integrated",
    };
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch order",
    };
  }
}

/**
 * Fetch user's orders
 * Currently returns empty array; will call API when backend is ready
 */
export async function fetchUserOrders(
  userId: string,
): Promise<OrderResponse[]> {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${API_URL}/api/orders?userId=${userId}`, {
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // if (!response.ok) throw new Error(`API error: ${response.status}`);
    // const data = await response.json();
    // return data.data || [];

    // For now, return empty array
    return [];
  } catch (error) {
    console.error(`Failed to fetch orders for user ${userId}:`, error);
    return [];
  }
}
