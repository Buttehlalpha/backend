import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  userId: String,
  studyHours: { type: Number, default: 0 },
  completed: { type: Number, default: 0 },
  sessions: [
    {
      module: String,
      duration: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Stats", statsSchema);