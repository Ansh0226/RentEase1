import "../styles/AboutUs.scss";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="aboutus-container">
        <div className="aboutus-content">
          <h1>About RentEasy</h1>
          <p>
            At <strong>RentEasy</strong>, we believe finding your perfect stay
            should be as exciting as the journey itself. Whether you're looking
            for a cozy home for a weekend getaway or a long-term rental, we make
            it easy, safe, and simple.
          </p>
          <p>
            Our mission is to connect travelers with beautiful spaces — helping
            hosts showcase their properties and helping guests create
            unforgettable memories.
          </p>
          <p>
            <strong>Why choose Renteasy?</strong>
          </p>
          <ul>
            <li>✔️ Verified and Trusted Listings</li>
            <li>✔️ Seamless Booking Experience</li>
            <li>✔️ Secure Payments and Transparent Policies</li>
            <li>✔️ 24/7 Customer Support</li>
          </ul>
          <p>
            We are passionate about building a community where travelers feel at
            home, no matter where they roam. Thank you for trusting HavenRent —
            your next adventure starts here!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
