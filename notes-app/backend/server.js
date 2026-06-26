const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/auth.routes");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
// const cookieParser = require("cookie-parser");
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Notes API Running...");
});
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});