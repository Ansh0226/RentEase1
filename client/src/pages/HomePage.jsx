import React from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Footer from "../components/Footer";
const BASE_URL = process.env.REACT_APP_BASE_ADDRESS;
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
      <Footer />
    </>
  );
};

export default HomePage;
