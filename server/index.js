const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

// Route imports
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js"); // booking.js handles both bookings and stripe
const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth");

app.use(express.json());

// CORS setup
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Serve static files
app.use(express.static("public"));

// Mount routes
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);     // for bookings
app.use("/stripe", bookingRoutes);       // for Stripe payment routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// MongoDB and server start
const PORT = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "rentease"
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
