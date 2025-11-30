// src/routes/bookingRoutes.js

const express = require("express");

const Booking = require("../models/Booking");
const PG = require("../models/PG");
const { protect, requireOwner } = require("../middleware/auth");

const router = express.Router();


// ==========================
// CREATE BOOKING (USER)
// ==========================
router.post("/", protect, async (req, res) => {
  try {
    const {
      pgId,
      roomType,
      stayType,
      checkInDate,
      days,
      months
    } = req.body;

    if (!pgId || !roomType || !stayType || !checkInDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const pg = await PG.findById(pgId);

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    const room = pg.rooms.find(r => r.type === roomType);

    if (!room) {
      return res.status(404).json({ message: "Room type not found" });
    }

    if (room.availableBeds <= 0) {
      return res.status(400).json({ message: "No beds available" });
    }

    let totalAmount = 0;

    // Calculate price
    if (stayType === "daily") {
      if (!days || days <= 0) {
        return res.status(400).json({ message: "Days required for daily stay" });
      }
      totalAmount = room.pricePerDay * days;
    }

    if (stayType === "monthly") {
      if (!months || months <= 0) {
        return res.status(400).json({ message: "Months required for monthly stay" });
      }
      totalAmount = room.pricePerMonth * months;
    }

    // Create Booking
    const booking = await Booking.create({
      user: req.user._id,
      pg: pgId,
      roomType,
      stayType,
      checkInDate,
      days,
      months,
      totalAmount,
      status: "pending",
    });

    // Reduce available beds
    room.availableBeds -= 1;
    await pg.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});



// ==========================
// USER BOOKINGS LIST
// ==========================
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("pg");

    res.json({ bookings });

  } catch (error) {
    console.error("Get user bookings error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});




// ==========================
// OWNER VIEW BOOKINGS
// ==========================
router.get("/owner", protect, requireOwner, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "pg",
        match: { owner: req.user._id }
      })
      .populate("user", "name phone");

    // Remove entries where pg didn't match owner
    const filtered = bookings.filter(b => b.pg !== null);

    res.json({ bookings: filtered });

  } catch (error) {
    console.error("Owner bookings error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
