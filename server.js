import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================

// ✅ FINAL CORS FIX (works for all environments)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

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

// ================= FRONTEND (OPTIONAL FULLSTACK ON RENDER) =================
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
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