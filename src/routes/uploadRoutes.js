// src/routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { protect, requireOwner } = require("../middleware/auth");

const router = express.Router();

// store file in memory (buffer)
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/pg-photo",
  protect,
  requireOwner,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // convert buffer to base64 data URI
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "pg-app/pg-photos",
      });

      return res.status(201).json({
        message: "Image uploaded",
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error.message);
      return res.status(500).json({ message: "Image upload failed" });
    }
  }
);

module.exports = router;
