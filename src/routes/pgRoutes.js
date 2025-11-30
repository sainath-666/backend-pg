// src/routes/pgRoutes.js
const express = require("express");
const PG = require("../models/PG");
const { protect, requireOwner } = require("../middleware/auth");

const router = express.Router();

/**
 * @route   POST /api/pgs
 * @desc    Create a new PG (owner only)
 * @access  Private (owner)
 */
router.post("/", protect, requireOwner, async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      area,
      genderType,
      hasFood,
      amenities,
      rooms,
      photos,
    } = req.body;

    // Basic validation
    if (!name || !address || !area || !genderType) {
      return res
        .status(400)
        .json({ message: "Name, address, area and genderType are required" });
    }

    if (!Array.isArray(rooms) || rooms.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one room option is required" });
    }

    // Create PG
    const pg = await PG.create({
      owner: req.user._id,
      name,
      description,
      address,
      area,
      genderType,
      hasFood: !!hasFood,
      amenities: amenities || [],
      photos: photos || [],
      rooms,
    });

    res.status(201).json({
      message: "PG created successfully",
      pg,
    });
  } catch (error) {
    console.error("Create PG error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/pgs
 * @desc    Get list of PGs (with optional filters)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const { area, genderType } = req.query;

    const filter = { isActive: true };

    if (area) {
      // case-insensitive match on area
      filter.area = new RegExp(area, "i");
    }

    if (genderType) {
      filter.genderType = genderType;
    }

    const pgs = await PG.find(filter)
      .populate("owner", "name phone email")
      .sort({ createdAt: -1 });

    res.json({ pgs });
  } catch (error) {
    console.error("Get PGs error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/pgs/:id
 * @desc    Get single PG details by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id).populate(
      "owner",
      "name phone email"
    );

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.json({ pg });
  } catch (error) {
    console.error("Get PG by ID error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
