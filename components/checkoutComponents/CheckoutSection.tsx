"use client"
import { ICartItem } from '@/interfaces/cart';
import { ICheckoutForm } from '@/interfaces/checkout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import "./CheckoutSection.css";
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

const CheckoutSection= () => {
    const [cartItems, setCartItems] = useState<ICartItem[]>([cartData]);
    const navigate = useRouter();

    const{
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ICheckoutForm>();

      //Order Calculations
      const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,

      );
      const shipping = cartItems.length > 0 ? 10 : 0; 
      const tax = cartItems.length > 0 ? 15: 0;
        const total = subtotal + shipping + tax;

    const onSubmit: SubmitHandler <ICheckoutForm> = (data) => {
        console.log("Customer Details:", data);
        console.log("Cart Items:", cartItems);
        alert("Order Placed Successfully!");

        localStorage.removeItem("cartItems");
        setCartItems([]);
        reset();
        navigate.push("/");
    };
    
  return (
    <div className="order_page">
        <div className="container">
            <div className="order_header">
                <h1>Checkout</h1>
                <p>Complete your order details</p>

        </div>

        <div className="order_layout">
            {/* Customer Form*/}
            <div className="order_form_card">
                <h2>Customer Information</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form_group">
                        <label htmlFor="name">Name</label>

                        <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        {...register("name",{
                            required: "Full name is required",
                        })}
                        className={errors.name ? "input_error" : ""}
                        />
                        {errors.name && (
                            <span className = "error">{errors.name.message}</span>
                        )}
                    </div>
                    <div className="form_group">
                        <label htmlFor="email">Email Address</label>
                        <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email",{
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                        className={errors.email ? "input_error" : ""}
                        />
                        {errors.email && (
                            <span className = "error">{errors.email.message}</span>
                        )}
                    </div>
 <div className="form_group">
                <label htmlFor="address">Delivery Address</label>

                <textarea
                  id="address"
                  rows={4}
                  placeholder="Enter complete address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  className={errors.address ? "input_error" : ""}
                />

                {errors.address && (
                  <span className="error">{errors.address.message}</span>
                )}
              </div>

              <button type="submit" className="confirm_btn">
                Confirm Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
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