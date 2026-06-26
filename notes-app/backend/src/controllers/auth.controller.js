const User = require("../models/user.model");

const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const asyncHandler = require("../middleware/asyncHandler");

const {
  validateRegister,
  validateLogin,
} = require("../validators/auth.validator");

const generateAccessAndRefreshTokens = require("../utils/generateTokens");

const cookieOptions = require("../utils/cookieOptions");
const registerUser = asyncHandler(async (req, res) => {

  const error = validateRegister(req.body);

  if (error) {
    throw new ApiError(400, error);
  }

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  return res.status(201).json(
    new ApiResponse(
      201,
      createdUser,
      "User registered successfully."
    )
  );
});
const loginUser = asyncHandler(async (req, res) => {
  const error = validateLogin(req.body);

  if (error) {
    throw new ApiError(400, error);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email })
    .select("+password +refreshToken");

  if (!user) {
    throw new ApiError(404, "Invalid email or password.");
  }

  const isPasswordCorrect =
    await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const {
    accessToken,
    refreshToken,
  } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id);

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "Login successful."
      )
    );
});
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      refreshToken: null,
    },
  });

  return res
    .status(200)
    .clearCookie("refreshToken", cookieOptions)
    .json(
      new ApiResponse(
        200,
        null,
        "Logged out successfully."
      )
    );
});
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      req.user,
      "Current user fetched successfully."
    )
  );
});
const jwt = require("jsonwebtoken");

const refreshAccessToken = asyncHandler(async (req, res) => {

  const incomingRefreshToken =
    req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request.");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken.id)
    .select("+refreshToken");

  if (!user) {
    throw new ApiError(401, "Invalid refresh token.");
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Refresh token expired.");
  }

  const {
    accessToken,
    refreshToken,
  } = await generateAccessAndRefreshTokens(user._id);

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
        },
        "Access token refreshed."
      )
    );
});
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
};