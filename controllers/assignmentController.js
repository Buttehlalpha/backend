import Assignment from "../models/Assignment.js";

export const addAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.json(assignment);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAssignments = async (req, res) => {
  try {
    const { userId, module } = req.params;

    const data = await Assignment.find({ userId, module }).sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};