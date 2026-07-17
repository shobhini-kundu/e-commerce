// components/OrderDetails.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchOrderByOrderId } from "@/services/api";
import { IOrder } from "@/interfaces/order";
// import "./OrderDetails.css";

const OrderDetails: React.FC = () => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useRouter();

  // Dynamically grab route parameters (e.g. from app/orders/[orderId]/page.tsx)
  const params = useParams();
  const orderId = params?.orderId as string;

  useEffect(() => {
    if (!orderId) return;

    // setIsLoading(true);
    fetchOrderByOrderId(orderId)
      .then(setOrder)
      .catch((error) => {
        console.error("Failed to fetch order details:", error);
      })
      .finally(() => setIsLoading(false));
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="order_page">
        <div className="container">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order_page">
        <div className="container">
          <h1>Order Not Found</h1>
          <button className="checkout_btn" onClick={() => navigate.push("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order_page">
      <div className="container">
        <div className="order_header">
          <h1>Order Confirmed 🎉</h1>
          <p>
            Order <strong>{order.orderId}</strong> — Estimated delivery:{" "}
            {order.estimatedDelivery}
          </p>
        </div>

        <div className="order_summary_card">
          <h2>Order Summary</h2>

          <div className="summary_items">
            {order.items.map((item, idx) => (
              <div className="summary_item" key={idx}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="summary_item_img"
                />
                <div className="summary_item_info">
                  <h4>{item.title}</h4>
                  <p>
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <span className="summary_item_total">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary_row">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="summary_row">
            <span>Shipping</span>
            <span>${order.shipping.toFixed(2)}</span>
          </div>
          <div className="summary_row">
            <span>Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="summary_row total">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>

          <div className="order_customer_info">
            <h3>Shipping To</h3>
            <p>{order.name}</p>
            <p>
              {order.email} • {order.mobile}
            </p>
            <p>{order.address}</p>
          </div>

          <button className="checkout_btn" onClick={() => navigate.push("/")}>
            Continue Shopping
          </button>
          <button
            className="checkout_btn"
            onClick={() => navigate.push("/orders")}
          >
            All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;