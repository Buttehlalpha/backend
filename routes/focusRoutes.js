import express from "express";
import FocusSession from "../models/FocusSession.js";

const router = express.Router();

// SAVE SESSION
router.post("/save", async (req, res) => {
  try {
    const { userId, module, duration, completed } = req.body;

    const session = await FocusSession.create({
      userId,
      module,
      duration,
      completed,
    });

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET STATS
router.get("/stats/:userId", async (req, res) => {
  try {
    const sessions = await FocusSession.find({
      userId: req.params.userId,
    });

    const totalMinutes = sessions.reduce(
      (acc, s) => acc + s.duration,
      0
    );

    const completed = sessions.filter((s) => s.completed).length;

    res.json({
      studyHours: (totalMinutes / 60).toFixed(1),
      completed,
      total: sessions.length,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;