import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const groupSchema = new mongoose.Schema({
  name: String,
  code: String, // unique join code
  members: [String], // user IDs
  messages: [messageSchema],
});

export default mongoose.model("Group", groupSchema); 