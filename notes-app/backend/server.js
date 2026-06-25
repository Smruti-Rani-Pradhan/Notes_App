const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notes API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});