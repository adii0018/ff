const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tournaments", require("./routes/tournaments"));
app.use("/api/registrations", require("./routes/registrations"));

// Health check
app.get("/", (req, res) => res.json({ message: "FreeFire Tournament API running" }));

// Connect to MongoDB — supports both Atlas URI and local
const MONGO_URI =
  process.env.MONGO_URI && !process.env.MONGO_URI.includes("REPLACE")
    ? process.env.MONGO_URI
    : "mongodb://127.0.0.1:27017/freefire-tournaments";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected:", MONGO_URI.split("@").pop() || "local");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("⚠️  Starting server without DB (API will return errors on DB calls)");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`)
    );
  });
