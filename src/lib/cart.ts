import { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  lastUpdated: Date;
}

const CART_STORAGE_KEY = "eawf_cart";

/**
 * Get cart from localStorage (client-side only)
 */
export function getCartFromStorage(): Cart {
  if (typeof window === "undefined")
    return { items: [], lastUpdated: new Date() };

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return { items: [], lastUpdated: new Date() };

    const cart = JSON.parse(stored);
    return {
      ...cart,
      lastUpdated: new Date(cart.lastUpdated),
      items: cart.items.map((item: any) => ({
        ...item,
        addedAt: new Date(item.addedAt),
      })),
    };
  } catch {
    return { items: [], lastUpdated: new Date() };
  }
}

/**
 * Save cart to localStorage (client-side only)
 */
export function saveCartToStorage(cart: Cart): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
}

/**
 * Add item to cart or increase quantity if already exists
 */
export function addToCart(
  cart: Cart,
  product: Product,
  quantity: number = 1,
): Cart {
  const existingItem = cart.items.find(
    (item) => item.product.id === product.id,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product,
      quantity,
      addedAt: new Date(),
    });
  }

  cart.lastUpdated = new Date();
  return cart;
}

/**
 * Remove item from cart
 */
export function removeFromCart(cart: Cart, productId: string): Cart {
  cart.items = cart.items.filter((item) => item.product.id !== productId);
  cart.lastUpdated = new Date();
  return cart;
}

/**
 * Update item quantity
 */
export function updateCartItemQuantity(
  cart: Cart,
  productId: string,
  quantity: number,
): Cart {
  const item = cart.items.find((item) => item.product.id === productId);
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(cart, productId);
    }
    item.quantity = quantity;
    cart.lastUpdated = new Date();
  }
  return cart;
}

/**
 * Clear entire cart
 */
export function clearCart(): Cart {
  return { items: [], lastUpdated: new Date() };
}

/**
 * Get cart totals
 */
export function getCartTotals(cart: Cart) {
  let subtotal = 0;
  let itemCount = 0;

  cart.items.forEach((item) => {
    const quantity = item.quantity;
    const price = item.product.pricing.retail.amount; // Use retail price by default
    subtotal += price * quantity;
    itemCount += quantity;
  });

  const taxRate = 0.16; // 16% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return {
    itemCount,
    subtotal,
    tax,
    total,
    taxRate,
  };
}
