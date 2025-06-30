const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        hostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        listingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing",
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

BookingSchema.index(
    { customerId: 1, listingId: 1, startDate: 1, endDate: 1 },
    { unique: true }
);


const Booking = mongoose.model("Booking", BookingSchema)
module.exports = Booking