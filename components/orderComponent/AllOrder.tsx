"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchOrdersByUserId } from "@/services/api";
import { IOrder } from "@/interfaces/order";
import { getUserId } from "@/services/userId";
import "./AllOrder.css"
const AllOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useRouter();

  // ⚠️ NOTE: Replace "user_1" with your dynamic modern auth user ID
  // (e.g., from a logic state, clerk, or context) if applicable.
  const [userId] = useState<string>(() => getUserId());

  useEffect(() => {
    fetchOrdersByUserId(userId)
      .then(setOrders)
      .catch((error) => {
        console.error("Failed to fetch orders list:", error);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  if (isLoading) {
    return (
      <div className="order_page">
        <div className="container">
          <p>Loading your order history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order_page">
      <div className="container">
        <div className="order_header">
          <h1>Your Orders</h1>
          <p>Track and manage your recent purchases</p>
        </div>

        {orders.length === 0 ? (
          <div
            className="order_summary_card"
            style={{ textAlign: "center", padding: "40px 20px" }}
          >
            <h2>No orders found</h2>
            <p>Looks like you have not placed any orders yet.</p>
            <button
              className="checkout_btn"
              style={{
                marginTop: "20px",
                maxWidth: "200px",
                margin: "20px auto 0",
              }}
              onClick={() => navigate.push("/")}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {orders.map((order) => (
              <div
                className="order_summary_card"
                key={order.orderId}
                style={{ padding: "20px" }}
              >
                {/* Order Meta Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "15px",
                    marginBottom: "15px",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        display: "block",
                      }}
                    >
                      ORDER PLACED
                    </span>
                    <strong>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "Recent"}
                    </strong>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        display: "block",
                      }}
                    >
                      TOTAL PRICE
                    </span>
                    <strong>${order.total.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        display: "block",
                      }}
                    >
                      ORDER ID
                    </span>
                    <strong>#{order.orderId}</strong>
                  </div>
                  <button
                    className="checkout_btn"
                    style={{
                      padding: "8px 16px",
                      fontSize: "14px",
                      width: "auto",
                    }}
                    onClick={() =>
                      navigate.push(`/order-confirmation/${order.orderId}`)
                    }
                  >
                    View Details
                  </button>
                </div>

                {/* Order Status Badge */}
                <div style={{ marginBottom: "15px" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      backgroundColor: "#e6f4ea",
                      color: "#137333",
                      fontWeight: "bold",
                    }}
                  >
                    Status: {order.status || "Confirmed"}
                  </span>
                  <span
                    style={{
                      marginLeft: "15px",
                      fontSize: "13px",
                      color: "#555",
                    }}
                  >
                    Estimated Delivery: {order.estimatedDelivery}
                  </span>
                </div>

                {/* Item Thumbnail Previews */}
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    overflowX: "auto",
                    paddingBottom: "5px",
                  }}
                >
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        minWidth: "200px",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                          border: "1px solid #eee",
                          borderRadius: "4px",
                        }}
                      />
                      <div style={{ maxWidth: "140px" }}>
                        <h4
                          style={{
                            margin: 0,
                            fontSize: "13px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{ margin: 0, fontSize: "12px", color: "#666" }}
                        >
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;