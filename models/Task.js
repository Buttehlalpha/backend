import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: String,
  assignmentId: String,
  title: String,
  date: Date,
  status: {
    type: String,
    default: "pending",
  },
});

export default mongoose.model("Task", taskSchema);