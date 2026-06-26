const User = require("../models/user.model");
const ApiError = require("./ApiError");

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId).select("+refreshToken");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
      validateBeforeSave: false,
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating tokens."
    );
  }
};

module.exports = generateAccessAndRefreshTokens;