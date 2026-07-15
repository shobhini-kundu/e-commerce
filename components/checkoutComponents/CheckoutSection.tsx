"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CheckoutSection.css";
import { ICheckoutForm } from "@/interfaces/checkout";
import { useCart } from "@/context/CartContext";

const CheckoutSection = () => {
  const { cartItems, checkout, isCheckingOut } = useCart();
  const navigate = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICheckoutForm>();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = cartItems.length > 0 ? 10 : 0;
  const tax = cartItems.length > 0 ? 15 : 0;
  const total = subtotal + shipping + tax;

  const onSubmit: SubmitHandler<ICheckoutForm> = async (data) => {
    setSubmitError(null);
    const result = await checkout(data);

    if (result.success) {
      reset();
      navigate.push(`/order-confirmation/${result.orderId}`);
    } else {
      setSubmitError(
        "Something went wrong placing your order. Please try again.",
      );
    }
  };

  return (
    <div className="order_page">
      <div className="container">
        <div className="order_header">
          <h1>Checkout</h1>
          <p>Complete your order details</p>
        </div>

        <div className="order_layout">
          <div className="order_form_card">
            <h2>Customer Information</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form_group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", { required: "Full name is required" })}
                  className={errors.name ? "input_error" : ""}
                />
                {errors.name && (
                  <span className="error">{errors.name.message}</span>
                )}
              </div>

              <div className="form_group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={errors.email ? "input_error" : ""}
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>

              <div className="form_group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  id="mobile"
                  type="tel"
                  placeholder="Enter mobile number"
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit mobile number",
                    },
                  })}
                  className={errors.mobile ? "input_error" : ""}
                />
                {errors.mobile && (
                  <span className="error">{errors.mobile.message}</span>
                )}
              </div>

              <div className="form_group">
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  rows={4}
                  placeholder="Enter complete address"
                  {...register("address", { required: "Address is required" })}
                  className={errors.address ? "input_error" : ""}
                />
                {errors.address && (
                  <span className="error">{errors.address.message}</span>
                )}
              </div>

              {submitError && <span className="error">{submitError}</span>}

              <button
                type="submit"
                className="confirm_btn"
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Confirm Order"}
              </button>
            </form>
          </div>

          <div className="order_summary_card">
            <h2>Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="empty_summary">Your cart is empty.</p>
            ) : (
              <>
                <div className="summary_items">
                  {cartItems.map((item) => (
                    <div className="summary_item" key={item.id}>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSection;