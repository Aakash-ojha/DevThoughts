import mongoose from "mongoose";
const { Schema } = mongoose;

const followSchema = new mongoose.Schema({
  follower: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  following: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow = mongoose.model("Follow", followSchema);
export default Follow;
