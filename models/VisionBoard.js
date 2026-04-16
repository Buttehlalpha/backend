import mongoose from "mongoose";

const visionSchema = new mongoose.Schema({
  userId: String,
  images: [String],
  texts: [String],
});

export default mongoose.model("VisionBoard", visionSchema);