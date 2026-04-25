import React, { useState } from "react";
// import { useAuth } from "../store/auth-context";
import apiClient from "../api/apiClient";
// import { useCart } from "../store/cart-context";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useNavigate, useNavigation } from "react-router-dom";
import PageTltle from "./PageTltle";
import { toast } from "react-toastify";
import { selectCartItems,selectTotalPrice,clearCart } from "../store/cart-slice";
import { useSelector,useDispatch } from "react-redux";
import { selectUser } from "../store/auth-slice";

export default function CheckoutForm() {
  const user=useSelector(selectUser);
  const cart=useSelector(selectCartItems);
  const totalPrice=useSelector(selectTotalPrice);
  const dispatch=useDispatch();

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [elementErrors, setElementErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const isDarkMode = localStorage.getItem("theme") === "dark";

  const labelStyle = "glass-label";
  const fieldBaseClass = "glass-input";
  const fieldErrorClass = "glass-input-error";

  const getClassForElement = (field) =>
    `${fieldBaseClass} ${elementErrors[field] ? fieldErrorClass : ""}`;

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        fontFamily: "Sora, sans-serif",
        color: isDarkMode ? "#E5E7EB" : "#374151",
        backgroundColor: "transparent",
      },
      invalid: {
        color: "#F87171",
        backgroundColor: "transparent",
      },
    },
  };

  function handleCardChange(field, event) {
    setElementErrors((prev) => ({
      ...prev,
      [field]: event.error ? event.error.message : "",
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe.js is not loaded yet.");
      return;
    }

    if (Object.values(elementErrors).some((error) => error)) {
      setErrorMessage("Please correct the highlighted errors.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await apiClient.post("/payment/create-payment-intent", {
        amount: totalPrice * 100,
        currency: "usd",
      });

      const { clientSecret } = response.data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              phone: user.mobileNumber,
              address: {
                line1: user.street,
                city: user.city,
                state: user.state,
                postal_code: user.postalCode,
                country: user.country,
              },
            },
          },
        }
      );

      if (error) {
       
        setErrorMessage(error.message || "Payment failed. Please try again.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
      
        try {
          await apiClient.post("/orders", {
            totalPrice: totalPrice,
            paymentId: paymentIntent.id,
            paymentStatus: paymentIntent.status,
            orderItems: cart.map((orderItems) => ({
              productId: orderItems.productId,
              quantity: orderItems.quantity,


              price: orderItems.price,
            })),
          });
          sessionStorage.setItem("skipRedirectPath", "true");
          dispatch(clearCart());
          navigate("/order-success");
        } catch (orderError) {
          console.error("Failed to create order:", orderError);
          setErrorMessage("Order creation failed. Please contact support.");
        }
      }
    } catch (error) {
      setErrorMessage("Error processing payment. Please try again later.");
      console.error("Error creating PaymentIntent:", error);
    } finally {
      setIsProcessing(false);
    }

    
  };
   
  return (
    <div className="min-h-[852px] flex items-center justify-center font-primary dark:bg-darkbg">
      <div
        className={
          isProcessing
            ? "visible  flex flex-col justify-center items-center my-[200px] "
            : "hidden"
        }
      >
        <p className="mt-4 text-2xl font-normal text-primary dark:text-light">
          Processing Payment.... Don't refresh the page
        </p>
      </div>
      <div
        className={
          isProcessing
            ? "hidden"
            : "visible glass-form-shell max-w-md w-full rounded-[28px] px-8 py-8"
        }
      >
        <PageTltle title="Complete Your Payment" />

        <p className="text-center mt-8 text-lg text-gray-600 dark:text-lighter mb-8">
          Amount to be charged: <strong>${totalPrice.toFixed(2)}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}
          {/* Card Number */}
          <div>
            <label htmlFor="cardNumber" className={labelStyle}>
              Card Number
            </label>
            <div id="cardNumber" className={getClassForElement("cardNumber")}>
              <CardNumberElement
                options={elementOptions}
                onChange={(event) => handleCardChange("cardNumber", event)}
              />
            </div>
            {elementErrors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {elementErrors.cardNumber}
              </p>
            )}
          </div>

          {/* Card Expiry */}
          <div>
            <label htmlFor="cardExpiry" className={labelStyle}>
              Expiry Date
            </label>
            <div id="cardExpiry" className={getClassForElement("cardExpiry")}>
              <CardExpiryElement
                options={elementOptions}
                onChange={(event) => handleCardChange("cardExpiry", event)}
              />
            </div>
            {elementErrors.cardExpiry && (
              <p className="text-red-500 text-sm mt-1">
                {elementErrors.cardExpiry}
              </p>
            )}
          </div>

          {/* Card CVC */}
          <div>
            <label htmlFor="cardCvc" className={labelStyle}>
              CVC
            </label>
            <div id="cardCvc" className={getClassForElement("cardCvc")}>
              <CardCvcElement
                options={elementOptions}
                onChange={(event) => handleCardChange("cardCvc", event)}
              />
            </div>
            {elementErrors.cardCvc && (
              <p className="text-red-500 text-sm mt-1">
                {elementErrors.cardCvc}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="glass-button mt-6"
            >
              {isProcessing ? "Payment processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
