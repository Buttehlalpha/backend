import express from "express";
import upload from "../middleware/upload.js";
import Vision from "../models/Vision.js";

const router = express.Router();

// ✅ SAVE VISION BOARD
router.post("/add", upload.array("images"), async (req, res) => {
  try {
    const { userId } = req.body;
    const texts = JSON.parse(req.body.texts);

    // 🔥 GET FILE PATHS
    const imagePaths = req.files.map(
      (file) => file.path
    );

    const newBoard = new Vision({
      userId,
      images: imagePaths,
      texts,
    });

    await newBoard.save();

    res.json({ message: "Saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving board" });
  }
});

// ✅ GET BOARD
router.get("/:userId", async (req, res) => {
  try {
    const board = await Vision.findOne({
      userId: req.params.userId,
    }).sort({ _id: -1 });

    res.json(board);
  } catch (err) {
    res.status(500).json({ message: "Error fetching" });
  }
});

export default router;