import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList"

import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import List from "./pages/List";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  return (
    <div>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          {/* Home page by default */}
          <Route path="/" element={<HomePage />} />

          {/* Register page Path */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Login page Path */}
          <Route path="/login" element={<LoginPage />} />

          {/* createlisting page path  */}
          <Route path="/create-listing" element={<CreateListing />} />

          {/* listingdetail path */}
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          {/* category */}
          <Route
            path="/properties/category/:category"
            element={<CategoryPage />}
          />
          {/* search bar */}
          <Route  path="/properties/search/:search" element={<SearchPage />}/>
          { /* List page */}
          <Route path="/list" element={<List />} />
          {/* Trips path */}
          <Route path="/:userId/trips" element={<TripList />} />
          {/* wishlist path */}
          <Route path="/:userId/wishlist" element={<WishList />} />
          {/* property List path */}
          <Route path="/:userId/properties" element={<PropertyList />} />
          {/* reservation List path */}
          <Route path="/:userId/reservations" element={<ReservationList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
