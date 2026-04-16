import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================

// ✅ CORS FIX (VERY IMPORTANT)
app.use(cors({
  origin: ["https://study-ai.vercel.app"],
  credentials: true
}));

// ✅ Extra headers (for safety)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://study-ai.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================
import authRoutes from "./routes/authRoutes.js";
import studyRoutes from "./routes/studyRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import visionRoutes from "./routes/visionRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";

console.log("🔥 Registering routes...");

// ✅ Register routes
app.use("/api/auth", authRoutes);
app.use("/api/study", studyRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/groups", groupRoutes);

console.log("🔥 Routes loaded");

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });