"use client";

import { useEffect, useState, useCallback } from "react";
import { Product } from "@/types/product";
import {
  Cart,
  CartItem,
  getCartFromStorage,
  saveCartToStorage,
  addToCart as addToCartLib,
  removeFromCart as removeFromCartLib,
  updateCartItemQuantity as updateQuantityLib,
  clearCart as clearCartLib,
  getCartTotals,
} from "@/lib/cart";

/**
 * Hook for managing shopping cart state
 * Persists to localStorage on client-side
 */
export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    lastUpdated: new Date(),
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from storage on mount
  useEffect(() => {
    const loadedCart = getCartFromStorage();
    setCart(loadedCart);
    setIsLoaded(true);
  }, []);

  // Save cart to storage when it changes
  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage(cart);
    }
  }, [cart, isLoaded]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart((prev) => addToCartLib(prev, product, quantity));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => removeFromCartLib(prev, productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prev) => updateQuantityLib(prev, productId, quantity));
  }, []);

  const clearCart = useCallback(() => {
    setCart(clearCartLib());
  }, []);

  const totals = getCartTotals(cart);

  return {
    cart,
    items: cart.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    ...totals,
  };
}
