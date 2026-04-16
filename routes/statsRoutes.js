import express from "express";
import { saveSession, getStats } from "../controllers/statsController.js";

const router = express.Router();

router.post("/save-session", saveSession);
router.get("/:userId", getStats);

export default router;