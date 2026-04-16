import Study from "../models/Study.js";

// ➕ ADD SESSION
export const addSession = async (req, res) => {
  try {
    const { userId, module, timeSpent } = req.body;

    const session = await Study.create({
      userId,
      module,
      timeSpent,
      createdAt: new Date(),
    });

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📊 GET SESSIONS
export const getSessions = async (req, res) => {
  try {
    const sessions = await Study.find({ userId: req.params.userId });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};