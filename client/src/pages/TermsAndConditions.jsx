import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/TermsAndConditions.scss";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div className="terms-container">
        <h1>Terms and Conditions</h1>

        <p>
          Welcome to <strong>RenyEasy</strong>! Please read these terms...
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using RentEasy...</p>

        <h2>2. User Responsibilities</h2>
        <ul>
          <li>Provide accurate and updated info.</li>
          <li>Respect the rights of others.</li>
          <li>Use only for lawful purposes.</li>
        </ul>
        <h2>3. Listings and Bookings</h2>
        <p>
          All listings are created by individual hosts. RentEasy acts as a
          platform and is not directly involved in transactions between guests
          and hosts.
        </p>

        <h2>4. Payment and Fees</h2>
        <p>
          All payments must be made through our secure payment system. Service
          fees may apply and will be disclosed during booking.
        </p>

        <h2>5. Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these Terms at any time
          without prior notice.
        </p>

        <p>
          By continuing to use RentEasy after changes are made, you accept and
          agree to the revised Terms.
        </p>

        <p className="thank-you">
          Thank you for choosing <strong>RentEast</strong>!
        </p>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
