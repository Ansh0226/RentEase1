const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js")
const userRoutes=require("./routes/user.js")
const stripeRoutes = require("./routes/booking.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/stripe", stripeRoutes);


/* Routes  */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users",userRoutes);


// first connecting to mongodb database then making the server listen at port 
const PORT = 3001;
mongoose
    .connect(process.env.MONGO_URL, {
        dbName: "Haven_Rent",
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log(` Database connected! `);
        app.listen( PORT, () => console.log(`Server is running at Port:  ${PORT} ` ));
    })
    .catch((err) => console.log(`${err} did not connect `));





