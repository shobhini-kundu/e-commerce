"use client";

import { useState } from "react";
import "./CartSection.css";
import { useRouter } from "next/navigation";
import { ICartItem } from "@/interfaces/cart";

const cartData: ICartItem = {
  id: 1,
  title: "Premium Noise-Cancelling Headphones",
  category: "Electronics",
  price: 189.99,
  oldPrice: 249.99,
  rating: 4.8,
  reviews: 124,
  badge: "SALE",
  image:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
  quantity: 2,
};

const CartSection: React.FC = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([cartData]);
  const navigate = useRouter();

  const saveCart = (updatedCart: ICartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    saveCart(updatedCart);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const removeProduct = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = cartItems.length > 0 ? 10 : 0;
  const tax = cartItems.length > 0 ? 15 : 0;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart_page">
        <div className="container">
          <div className="empty_cart">
            <h1>Your Cart Is Empty</h1>

            <button className="checkout_btn" onClick={() => navigate.push("/")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart_page">
      <div className="container">
        <div className="cart_header">
          <h1>Shopping Cart</h1>

          <span>
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items
          </span>
        </div>

        <div className="cart_layout">
          <div className="cart_items">
            {cartItems.map((item) => (
              <div className="cart_card" key={item.id}>
                <div className="cart_image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="cart_info">
                  <h3>{item.title}</h3>

                  <p>{item.category}</p>

                  <h4>${item.price.toFixed(2)}</h4>
                </div>

                <div className="cart_quantity">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <div className="cart_total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className="remove_btn"
                  onClick={() => removeProduct(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="order_summary">
            <h2>Order Summary</h2>

            <div className="summary_row">
              <span>Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary_row">
              <span>Shipping</span>

              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="summary_row">
              <span>Tax</span>

              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary_row total">
              <span>Total</span>

              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="checkout_btn"
              onClick={() => navigate.push("/src/order")}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;