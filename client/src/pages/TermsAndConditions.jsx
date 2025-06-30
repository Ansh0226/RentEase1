import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/TermsAndConditions.scss";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div className="terms-wrapper">
        <div className="terms-header">
          <h1>Terms & Conditions</h1>
          <p>Last Updated: June 30, 2025</p>
        </div>

        <div className="terms-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>RentEase</strong>. These Terms and Conditions
            govern your use of our platform. By accessing or using the website,
            you agree to comply with these terms.
          </p>
        </div>

        <div className="terms-section">
          <h2>2. User Responsibilities</h2>
          <ul>
            <li>Keep your account credentials secure.</li>
            <li>Provide accurate and truthful information.</li>
            <li>Use the platform only for lawful purposes.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>3. Booking & Payments</h2>
          <p>
            All bookings and transactions are facilitated via our secure payment
            gateway. Service charges and taxes may apply as shown during
            checkout.
          </p>
        </div>

        <div className="terms-section">
          <h2>4. Cancellations & Refunds</h2>
          <p>
            Each host sets their own cancellation policy. Please review it
            before confirming your booking.
          </p>
        </div>

        <div className="terms-section">
          <h2>5. Modifications</h2>
          <p>
            RentEase reserves the right to modify these terms at any time.
            Continued use of the platform implies acceptance of the updated
            terms.
          </p>
        </div>

        <div className="terms-footer">
          <p>
            Thank you for using <strong>RentEase</strong>. Your trust matters to
            us.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
