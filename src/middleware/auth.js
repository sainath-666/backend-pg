// src/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Check if request has valid JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    // Expecting header: Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (without password)
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user; // now req.user is available in routes
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Only allow PG owners
const requireOwner = (req, res, next) => {
  if (req.user && req.user.role === "owner") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access denied. Owner role required." });
};

module.exports = { protect, requireOwner };
