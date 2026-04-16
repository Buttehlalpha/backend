import express from "express";
import Group from "../models/Group.js";

const router = express.Router();

// ✅ CREATE GROUP
router.post("/create", async (req, res) => {
  const { name, userId } = req.body;

  const code = Math.random().toString(36).substring(2, 8);

  const group = await Group.create({
    name,
    code,
    members: [userId],
    messages: [],
  });

  res.json(group);
});

// ✅ JOIN GROUP
router.post("/join", async (req, res) => {
  const { code, userId } = req.body;

  const group = await Group.findOne({ code });

  if (!group) return res.status(404).json({ message: "Group not found" });

  if (!group.members.includes(userId)) {
    group.members.push(userId);
    await group.save();
  }

  res.json(group);
});

// ✅ GET USER GROUPS
router.get("/:userId", async (req, res) => {
  const groups = await Group.find({
    members: req.params.userId,
  });

  res.json(groups);
});

// ✅ SEND MESSAGE
router.post("/message", async (req, res) => {
  const { groupId, sender, text } = req.body;

  const group = await Group.findById(groupId);

  group.messages.push({ sender, text });
  await group.save();

  res.json(group);
});

export default router;