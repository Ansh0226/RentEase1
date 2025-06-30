import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Return.scss";

const ReturnAndRefundPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="refund-wrapper">
        <div style={{ padding: "2rem" }}>
          <h1 style={{ color: "#007BFF" }}>Return and Refund Policy</h1>

          <p>
            At <strong>RentEase</strong>, we strive to provide a transparent and
            fair refund experience.
          </p>

          <h2>1. Cancellation by Guest</h2>
          <p>
            If you need to cancel a booking, the refund amount will depend on
            the host’s cancellation policy, which is visible at the time of
            booking.
          </p>

          <h2>2. Cancellation by Host</h2>
          <p>
            If a host cancels your booking, you will receive a full refund, and
            we will assist you in finding a similar accommodation.
          </p>

          <h2>3. Refund Processing</h2>
          <ul>
            <li>
              Refunds are processed within 5-10 business days to your original
              payment method.
            </li>
            <li>Service fees may be non-refundable based on the situation.</li>
          </ul>

          <h2>4. Exceptional Circumstances</h2>
          <p>
            In the case of unforeseen events (natural disasters, government
            restrictions, etc.), special refund policies may apply based on our
            discretion.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions regarding your refund or booking, please
            contact our support team at <strong>rentease@support.com</strong>.
          </p>

          <p style={{ marginTop: "2rem" }}>
            Thank you for trusting <strong>RentEase</strong> — your next
            adventure starts here!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReturnAndRefundPolicy;
