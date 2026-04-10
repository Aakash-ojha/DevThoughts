import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // "JavaScript"
  slug: { type: String, required: true, unique: true }, // "javascript"
  color: { type: String, default: "#64748b" },
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
