const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  // Allow cross-site cookies in development for local dev servers
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
};

module.exports = cookieOptions;