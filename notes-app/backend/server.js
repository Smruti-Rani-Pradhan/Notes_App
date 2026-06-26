const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");
const noteRoutes = require("./src/routes/note.routes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Trust proxy (for deployment)
app.set("trust proxy", 1);

// Hide Express technology
app.disable("x-powered-by");

// ==============================
// Security Middlewares
// ==============================

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ==============================
// Parsing Middlewares
// ==============================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// ==============================
// Logger
// ==============================

app.use(morgan("dev"));

// ==============================
// Routes
// ==============================

app.get("/", (req, res) => {
  res.status(200).send("Notes API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==============================
// Global Error Handler
// ==============================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
});

// ==============================
// Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});