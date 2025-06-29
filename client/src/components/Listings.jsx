import { useEffect, useState, useCallback } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const listings = useSelector((state) => state.listings);

  const getFeedListings = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();
      if (selectedCategory !== "All")
        queryParams.append("category", selectedCategory);
      if (selectedLocation) {
        const [city, province, country] = selectedLocation.split(", ");
        if (city) queryParams.append("city", city);
        if (province) queryParams.append("province", province);
        if (country) queryParams.append("country", country);
      }

      const response = await fetch(
        `http://localhost:3001/properties?${queryParams.toString()}`
      );
      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  }, [selectedCategory, selectedLocation, dispatch]); // add all used deps here

  const fetchLocations = async () => {
    try {
      const res = await fetch("http://localhost:3001/properties/locations/all");
      const data = await res.json();
      console.log("Fetched Locations:", data); // ✅ Confirm output
      setLocations(data);
    } catch (err) {
      console.log("Failed to fetch locations", err.message);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    getFeedListings();
  }, [getFeedListings]);

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";

  return (
    <>
      <div className="filters-container">
        <div className="category-list">
          {categories?.map((category, index) => (
            <div
              className={`category ${
                category.label === selectedCategory ? "selected" : ""
              }`}
              key={index}
              onClick={() => setSelectedCategory(category.label)}
            >
              <div className="category_icon">{category.icon}</div>
              <p>{category.label}</p>
            </div>
          ))}
        </div>
        <div className="location-dropdown-container">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="location-dropdown"
          >
            <option value="">All Locations</option>
            {locations.map(({ city, province, country }, index) => (
              <option key={index} value={`${city}, ${province}, ${country}`}>
                {`${capitalize(city)}, ${capitalize(province)}, ${capitalize(
                  country
                )}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
