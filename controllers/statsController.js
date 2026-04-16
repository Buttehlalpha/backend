import Stats from "../models/Stats.js";
import jwt from "jsonwebtoken";

export const saveSession = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { module, duration } = req.body;

    let stats = await Stats.findOne({ userId: decoded.id });

    if (!stats) {
      stats = new Stats({ userId: decoded.id });
    }

    stats.studyHours += duration / 60;
    stats.completed += 1;

    stats.sessions.push({ module, duration });

    await stats.save();

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await Stats.findOne({ userId: req.params.userId });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};