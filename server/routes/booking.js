const router = require("express").Router()
const Booking = require("../models/Booking");
const stripe = require("stripe")(process.env.SECRET_KEY); 

require("dotenv").config();

/* CREATE BOOKING */
router.post("/create-checkout-session", async (req, res) => {
  const { listingId, price, customerId, hostId, startDate, endDate } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Booking for Listing ${listingId}`,
            },
            unit_amount: price * 100, // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/listing/${listingId}`,
      metadata: {
        customerId,
        hostId,
        listingId,
        startDate,
        endDate,
        price,
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe session creation failed", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get session details after payment success
router.get("/session-details/:sessionId", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.status(200).json(session);
  } catch (error) {
    console.error("Fetching session failed", error.message);
    res.status(400).json({ error: error.message });
  }
});


router.post("/create", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully" });
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ error: "Booking creation failed" });
  }
});

// Get all booked date ranges for a listing
router.get("/booked-dates/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const bookings = await Booking.find({ listingId });

    const bookedRanges = bookings.map((booking) => ({
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
    }));

    res.status(200).json(bookedRanges);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch booked dates", error: err.message });
  }
});


module.exports = router
