import express from "express";
import { getAISuggestion } from "../controllers/realAI.js";

const router = express.Router();

router.post("/suggest", getAISuggestion);

export default router;