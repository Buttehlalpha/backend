// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  groupId: String,
  sender: String,
  text: String,
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);