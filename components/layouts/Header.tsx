"use client";

import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { GrCart } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext"; // 👈 Import the useCart hook
import "./Header.css";

const Header: React.FC = () => {
  const navigate = useRouter();

  // 1. Pull the live cart items array directly from your Context
  const { cartItems } = useCart();

  // 2. Calculate the total quantity of items dynamically from the state
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="main_header">
      <div
        className="header_left"
        onClick={() => navigate.push("/")}
        style={{ cursor: "pointer" }}
      >
        <div className="header_left_icon">
          <FiHome />
        </div>
        <div className="header_title">Shop Ease</div>
      </div>

      <div className="header_right">
        <div
          className="header_right_icon"
          onClick={() => navigate.push("/orders")}
          style={{ cursor: "pointer" }}
        >
          <FaRegUser />
        </div>

        <div
          className="header_right_icon cart_icon_wrapper"
          onClick={() => navigate.push("/cart")}
          style={{ cursor: "pointer" }}
        >
          <GrCart />
          {/* 3. Render the badge dynamically based on Context count */}
          {cartCount > 0 && <span className="cart_badge">{cartCount}</span>}
        </div>
      </div>
    </div>
  );
};

export default Header;