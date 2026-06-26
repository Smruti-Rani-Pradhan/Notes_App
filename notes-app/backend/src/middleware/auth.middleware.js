const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("./asyncHandler");

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request.");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, "Invalid access token.");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token.");
  }
});

module.exports = verifyJWT;