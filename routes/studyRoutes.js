import express from "express";
import { addSession, getSessions } from "../controllers/studyController.js";

const router = express.Router();

router.post("/add", addSession);
router.get("/:userId", getSessions);

export default router;