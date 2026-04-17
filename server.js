import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================

const allowedOrigins = [
  "http://localhost:5173",
  "https://study-ai-p.vercel.app"
];
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // allow all (safe for now)
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


import { register, login } from "./controllers/authController.js";

// Direct routes (no router file)
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

// ================= STATIC FILES =================
app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================
import authRoutes from "./routes/authRoutes.js";
import studyRoutes from "./routes/studyRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import visionRoutes from "./routes/visionRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/study", studyRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/groups", groupRoutes);


// ================= HEALTH CHECK =================
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