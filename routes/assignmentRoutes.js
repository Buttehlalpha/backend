import express from "express";
import {
  addAssignment,
  getAssignments,
} from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/add", addAssignment);
router.get("/:userId/:module", getAssignments);

export default router;