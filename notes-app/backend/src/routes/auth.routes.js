const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} = require("../controllers/auth.controller");

const verifyJWT = require("../middleware/auth.middleware");
const authLimiter = require("../middleware/rateLimiter");

// Public Routes
router.post("/register", authLimiter, registerUser);

router.post("/login", authLimiter, loginUser);

router.post("/refresh", authLimiter, refreshAccessToken);

// Protected Routes
router.post("/logout", verifyJWT, logoutUser);

router.get("/me", verifyJWT, getCurrentUser);

module.exports = router;