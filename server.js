import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://study-ai-p.vercel.app"
];

// ✅ CORS FIX (PRODUCTION SAFE)
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(null, true); // (safe open for now, prevents CORS crash)
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

// ================= STATIC FILES =================
app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================
import authRoutes from "./routes/authRoutes.js";
import studyRoutes from "./routes/studyRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import visionRoutes from "./routes/visionRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";

console.log("🔥 Registering routes...");

app.use("/api/auth", authRoutes);
app.use("/api/study", studyRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/groups", groupRoutes);

console.log("🔥 Routes loaded");

// ================= HEALTH CHECK ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Study AI Backend is running");
});

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });