import mongoose from "mongoose";

const studySchema = new mongoose.Schema(
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
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Study = mongoose.model("Study", studySchema);

export default Study;