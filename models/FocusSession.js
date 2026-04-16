import mongoose from "mongoose";

const focusSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  module: String,
  duration: Number, // in minutes
  completed: Boolean,
}, { timestamps: true });

export default mongoose.model("FocusSession", focusSessionSchema);