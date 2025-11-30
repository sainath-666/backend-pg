// src/models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PG",
      required: true,
    },

    roomType: {
      type: String,
      required: true, // "Single" | "Double" | "Triple"
    },

    stayType: {
      type: String,
      enum: ["daily", "monthly"],
      required: true,
    },

    checkInDate: {
      type: Date,
      required: true,
    },

    days: {
      type: Number,
      default: null, // filled only when stayType === "daily"
    },

    months: {
      type: Number,
      default: null, // filled only when stayType === "monthly"
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
