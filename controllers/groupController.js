import Group from "../models/Group.js";

// 🔹 CREATE GROUP
export const createGroup = async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    const code = Math.random().toString(36).substring(2, 8);

    const group = await Group.create({
      name,
      description,
      code,
      members: [userId],
      createdBy: userId,
    });

    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 JOIN GROUP
export const joinGroup = async (req, res) => {
  try {
    const { code, userId } = req.body;

    const group = await Group.findOne({ code });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 GET USER GROUPS
export const getUserGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.params.userId,
    });

    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};