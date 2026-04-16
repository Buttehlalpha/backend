import mongoose from "mongoose";

const studySessionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    module: {
      type: String,
      required: true,
    },
    timeSpent: {
      type: Number, // minutes
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("StudySession", studySessionSchema);