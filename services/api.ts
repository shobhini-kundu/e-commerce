// services/api.ts

import { ICartItem } from "@/interfaces/cart";
import { ICheckoutForm } from "@/interfaces/checkout";
import { IOrder, IOrderItem } from "@/interfaces/order";
import { IProduct } from "@/interfaces/products";

const FAKESTORE_URL = "https://fakestoreapi.com";
const SERVER_URL =
"https://6a57794c914a025dcff310e9.mockapi.io/api/internship2026";
// ---------------- PRODUCTS (FakeStoreAPI) ----------------

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

function mapFakeStoreProduct(p: FakeStoreProduct): IProduct {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    oldPrice: Math.random() > 0.5 ? +(p.price * 1.3).toFixed(2) : undefined,
    rating: p.rating.rate,
    reviews: p.rating.count,
    badge:
      Math.random() > 0.7 ? "NEW" : Math.random() > 0.5 ? "SALE" : undefined,
    image: p.image,
  };
}

export async function fetchProducts(): Promise<IProduct[]> {
  const limit = 8;
  const res = await fetch(`${FAKESTORE_URL}/products?limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const data: FakeStoreProduct[] = await res.json();
  return data.map(mapFakeStoreProduct);
}

// ---------------- CART (mockapi.io) ----------------

export async function fetchCartApi(userId: string): Promise<ICartItem[]> {
  const url = `${SERVER_URL}/carts?userId=${userId}`; // 👈 Changed from /carts to /cart
  const res = await fetch(url);

  if (!res.ok) {
    // 👈 This logs the exact status (e.g., 404, 403, 500) to help you pinpoint the bug
    const errorText = await res.text().catch(() => "No error body");
    console.error(
      `Cart Fetch Failed! URL: ${url} | Status: ${res.status} | Response: ${errorText}`,
    );

    // Instead of crashing the whole application, return an empty cart as a safe fallback
    return [];
  }

  const data = await res.json();

  return data.map((item: ICartItem) => ({
    id: item.productId,
    title: item.title,
    category: item.category,
    price: item.price,
    oldPrice: item.oldPrice || undefined,
    rating: item.rating,
    reviews: item.reviews,
    badge: item.badge || undefined,
    image: item.image,
    quantity: item.quantity,
    _mockApiId: item.id,
  }));
}
export async function addToCartApi(userId: string, item: ICartItem) {
  const res = await fetch(`${SERVER_URL}/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      productId: item.id,
      title: item.title,
      category: item.category,
      price: item.price,
      oldPrice: item.oldPrice || null,
      rating: item.rating,
      reviews: item.reviews,
      badge: item.badge || null,
      image: item.image,
      quantity: item.quantity,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("mockapi.io error:", res.status, errorBody); // 👈 temp debug
    throw new Error("Failed to add to cart");
  }

  return res.json();
}

export async function updateCartQuantityApi(
  mockApiId: string,
  quantity: number,
) {
  const res = await fetch(`${SERVER_URL}/carts/${mockApiId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Failed to update quantity");
  return res.json();
}

export async function removeFromCartApi(mockApiId: string) {
  const res = await fetch(`${SERVER_URL}/carts/${mockApiId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove item");
  return res.json();
}

// ---------------- ORDERS / CHECKOUT (mockapi.io) ----------------

export interface CheckoutResult {
  success: boolean;
  orderId: string;
  estimatedDelivery: string;
}

export async function checkoutApi(
  userId: string,
  items: (ICartItem & { _mockApiId?: string })[],
  customer: ICheckoutForm,
): Promise<CheckoutResult> {
  try {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = items.length > 0 ? 10 : 0;
    const tax = items.length > 0 ? 15 : 0;
    const total = subtotal + shipping + tax;

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 5);
    const estimatedDelivery = delivery.toDateString();

    const orderItems: IOrderItem[] = items.map((i) => ({
      productId: i.id,
      title: i.title,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    }));

    const res = await fetch(`${SERVER_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        orderId,
        name: customer.name,
        email: customer.email,
        mobile: customer.mobile,
        address: customer.address,
        items: orderItems,
        subtotal,
        shipping,
        tax,
        total,
        status: "Confirmed",
        estimatedDelivery,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) throw new Error("Failed to create order");

    await Promise.all(
      items.map((item) =>
        item._mockApiId
          ? fetch(`${SERVER_URL}/carts/${item._mockApiId}`, {
              method: "DELETE",
            })
          : Promise.resolve(),
      ),
    );

    return { success: true, orderId, estimatedDelivery };
  } catch {
    return { success: false, orderId: "", estimatedDelivery: "" };
  }
}

export async function fetchOrderByOrderId(
  orderId: string,
): Promise<IOrder | null> {
  const res = await fetch(`${SERVER_URL}/orders?orderId=${orderId}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
}

export async function fetchOrdersByUserId(userId: string): Promise<IOrder[]> {
  const res = await fetch(`${SERVER_URL}/orders?userId=${userId}`);
  if (!res.ok) return [];
  return res.json();
}