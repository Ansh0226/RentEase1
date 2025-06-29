import { useEffect, useState, useRef } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/24/solid";
import "../styles/PaymentSuccess.scss";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const [message, setMessage] = useState("Finalizing booking...");
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingData, setBookingData] = useState(null); // To store session data

  const hasCreatedBookingRef = useRef(false);

  useEffect(() => {
    const createBooking = async () => {
      if (hasCreatedBookingRef.current) return;
      hasCreatedBookingRef.current = true; // Set the flag once

      try {
        const response = await fetch(
          `http://localhost:3001/stripe/session-details/${sessionId}`
        );
        const session = await response.json();
        setBookingData(session);

        const res = await fetch("http://localhost:3001/bookings/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: session.metadata.customerId,
            hostId: session.metadata.hostId,
            listingId: session.metadata.listingId,
            startDate: session.metadata.startDate,
            endDate: session.metadata.endDate,
            totalPrice: session.metadata.price,
          }),
        });

        const result = await res.json();
        console.log("Booking creation result:", result);

        if (res.ok) {
          setIsSuccess(true);
          setMessage("Booking confirmed! Redirecting...");
          setTimeout(() => {
            navigate(`/${session.metadata.customerId}/trips`);
          }, 3000);
        } else {
          setMessage("Booking creation failed. Please contact support.");
        }
      } catch (error) {
        console.log("Error finalizing booking:", error);
        setMessage("Something went wrong. Please try again.");
      }
    };

    if (sessionId) createBooking();
  }, [sessionId, navigate]);

  return (
    <div className="payment-success">
      {!isSuccess ? (
        <>
          <div className="payment-success__loader"></div>
          <h2 className="payment-success__message">{message}</h2>
        </>
      ) : (
        <>
          <div className="payment-success__confetti">
            {[...Array(30)].map((_, i) => (
              <i key={i}></i>
            ))}
          </div>
          <div className="payment-success__success-icon">
            <CheckIcon />
          </div>
          <h2 className="payment-success__message">{message}</h2>
          {bookingData && (
            <button
              className="payment-success__button"
              onClick={() =>
                navigate(`/${bookingData.metadata.customerId}/trips`)
              }
            >
              View Your Trips
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
