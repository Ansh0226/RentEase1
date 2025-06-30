import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { enUS } from "date-fns/locale";
import { loadStripe } from "@stripe/stripe-js";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setListing(data);
      setLoading(false);
      const bookedRes = await fetch(
        `http://localhost:3001/bookings/booked-dates/${listingId}`
      );
      const bookedData = await bookedRes.json();

      const allBookedDates = [];
      bookedData.forEach(({ startDate, endDate }) => {
        let current = new Date(startDate);
        const end = new Date(endDate);
        while (current <= end) {
          allBookedDates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
      });

      setBookedDates(allBookedDates);
    } catch (err) {
      console.log("Fetch Listing Details failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, [listingId]);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id);

  const navigate = useNavigate();

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const handleSubmit = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe failed to load.");
      return;
    }

    try {
      const body = {
        listingId,
        price: listing.price * dayCount,
        customerId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
      };

      const response = await fetch(
        "http://localhost:3001/stripe/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! ${response.status} - ${errorText}`);
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Stripe redirect failed:", result.error.message);
      }
    } catch (err) {
      console.error("Stripe Checkout Failed:", err.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>
        <div className="photos">
          {listing.listingPhotoPaths?.map((item, index) => (
            <img
              key={index}
              src={`http://localhost:3001/${item?.replace("public", "")}`}
              alt={`listing photo ${index + 1}`}
            />
          ))}
        </div>
        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          {listing.creator && (
            <>
              <img
                src={`http://localhost:3001/${listing.creator.profileImagePath?.replace(
                  "public",
                  ""
                )}`}
                alt={`${listing.creator.firstName}'s profile`}
              />
              <h3>
                Hosted by {listing.creator.firstName} {listing.creator.lastName}
              </h3>
            </>
          )}
        </div>

        <hr />
        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />
        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />
        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities?.[0]?.split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange
                ranges={dateRange}
                onChange={handleSelect}
                minDate={new Date()} // Prevent selecting past dates
                locale={enUS}
                disabledDates={bookedDates}
              />
              {dayCount > 1 ? (
                <h2>
                  ${listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ${listing.price} x {dayCount} night
                </h2>
              )}
              <h2>Total price: ${listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>
              <button className="button" type="submit" onClick={handleSubmit}>
                Proceed for payment
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;
