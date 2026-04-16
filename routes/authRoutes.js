import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login); // 🔥 THIS LINE IS THE FIX
router.get("/test", (req, res) => {
  res.send("Auth routes working 🚀");
});

export default router;