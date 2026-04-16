import mongoose from "mongoose";

const visionSchema = new mongoose.Schema({
  userId: String,
  images: [String], // filenames only
  texts: [String],
});

export default mongoose.model("Vision", visionSchema);