import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  userId: String,
  module: String,
  title: String,
  deadline: String,
  priority: String,
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);