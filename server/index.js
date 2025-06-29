const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const stripeRoutes = require("./routes/booking.js");

// listing api routes
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes=require("./routes/user.js")


// payment 
app.use("/stripe", stripeRoutes);
// Import routes
const authRoutes = require("./routes/auth");

// Use middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users",userRoutes);


// Set up routes
app.use("/auth", authRoutes);

// MongoDB setup
const PORT = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "rentease"
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })

  .catch((err) => console.log(`${err} did not connect`

  ));