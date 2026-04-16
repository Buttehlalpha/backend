import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  userId: String,
  title: String,
}, { timestamps: true });

export default mongoose.model("Module", moduleSchema);