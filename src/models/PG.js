// src/models/PG.js
const mongoose = require("mongoose");

// Subdocument schema for room options inside a PG
const roomOptionSchema = new mongoose.Schema(
  {
    type: {
      type: String, // e.g. "Single", "Double", "Triple"
      required: true,
      trim: true,
    },
    pricePerMonth: {
      type: Number,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: false, // optional for now
    },
    totalBeds: {
      type: Number,
      required: true,
    },
    availableBeds: {
      type: Number,
      required: true,
    },
  },
  { _id: false } // we don't need separate _id for each room entry
);

const pgSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // every PG belongs to an owner
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: String, // e.g. "Madhapur", "Ameerpet"
      required: true,
      trim: true,
    },
    city: {
      type: String,
      default: "Hyderabad",
      trim: true,
    },
    genderType: {
      type: String,
      enum: ["boys", "girls", "co-ed"],
      required: true,
    },
    hasFood: {
      type: Boolean,
      default: false,
    },
    amenities: [
      {
        type: String, // e.g. "WiFi", "Washing Machine", "Geyser"
        trim: true,
      },
    ],
    photos: [
      {
        type: String, // image URLs (Cloudinary later)
      },
    ],
    rooms: [roomOptionSchema], // array of room options
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PG", pgSchema);
