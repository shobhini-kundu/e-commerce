// context/CartContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { ICartItem } from "@/interfaces/cart";
import { ICheckoutForm } from "@/interfaces/checkout";
import {
  fetchCartApi,
  addToCartApi,
  updateCartQuantityApi,
  removeFromCartApi,
  checkoutApi,
  CheckoutResult,
} from "@/services/api";
import { getUserId } from "@/services/userId";

interface CartContextType {
  cartItems: ICartItem[];
  userId: string;
  isLoading: boolean;
  isAddingToCart: boolean;
  isUpdating: boolean;
  isCheckingOut: boolean;
  addToCart: (
    item: Omit<ICartItem, "quantity">,
    quantity?: number,
  ) => Promise<void>;
  increaseQuantity: (id: number) => Promise<void>;
  decreaseQuantity: (id: number) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
  checkout: (customer: ICheckoutForm) => Promise<CheckoutResult>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId] = useState<string>(() => getUserId()); // lazy init, no effect needed
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Fetch cart from mockapi.io on mount — this IS legitimate effect usage,
  // since it's syncing with an external system (the API)
  useEffect(() => {
    if (!userId) return;

    fetchCartApi(userId)
      .then(setCartItems)
      .catch(() => setCartItems([]))
      .finally(() => setIsLoading(false));
  }, [userId]);

  const refreshCart = useCallback(async () => {
    const data = await fetchCartApi(userId);
    setCartItems(data);
  }, [userId]);

  const addToCart = useCallback(
    async (item: Omit<ICartItem, "quantity">, quantity = 1) => {
      setIsAddingToCart(true);
      try {
        const existing = cartItems.find((i) => i.id === item.id);
        if (existing && existing._mockApiId) {
          await updateCartQuantityApi(
            existing._mockApiId,
            existing.quantity + quantity,
          );
        } else {
          await addToCartApi(userId, { ...item, quantity } as ICartItem);
        }
        await refreshCart();
      } finally {
        setIsAddingToCart(false);
      }
    },
    [cartItems, userId, refreshCart],
  );

  const increaseQuantity = useCallback(
    async (id: number) => {
      const target = cartItems.find((i) => i.id === id);
      if (!target?._mockApiId) return;
      setIsUpdating(true);
      try {
        await updateCartQuantityApi(target._mockApiId, target.quantity + 1);
        await refreshCart();
      } finally {
        setIsUpdating(false);
      }
    },
    [cartItems, refreshCart],
  );

  const decreaseQuantity = useCallback(
    async (id: number) => {
      const target = cartItems.find((i) => i.id === id);
      if (!target?._mockApiId) return;
      setIsUpdating(true);
      try {
        if (target.quantity - 1 <= 0) {
          await removeFromCartApi(target._mockApiId);
        } else {
          await updateCartQuantityApi(target._mockApiId, target.quantity - 1);
        }
        await refreshCart();
      } finally {
        setIsUpdating(false);
      }
    },
    [cartItems, refreshCart],
  );

  const removeProduct = useCallback(
    async (id: number) => {
      const target = cartItems.find((i) => i.id === id);
      if (!target?._mockApiId) return;
      setIsUpdating(true);
      try {
        await removeFromCartApi(target._mockApiId);
        await refreshCart();
      } finally {
        setIsUpdating(false);
      }
    },
    [cartItems, refreshCart],
  );

  const checkout = useCallback(
    async (customer: ICheckoutForm) => {
      setIsCheckingOut(true);
      try {
        const result = await checkoutApi(userId, cartItems, customer);
        if (result.success) setCartItems([]);
        return result;
      } finally {
        setIsCheckingOut(false);
      }
    },
    [cartItems, userId],
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        userId,
        isLoading,
        isAddingToCart,
        isUpdating,
        isCheckingOut,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeProduct,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}