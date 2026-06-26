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

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", verifyJWT, logoutUser);

router.post("/refresh", refreshAccessToken);

router.get("/me", verifyJWT, getCurrentUser);

module.exports = router;