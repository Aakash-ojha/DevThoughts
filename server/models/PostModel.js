import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the post"],
  },
  content: {
    type: String,
    required: [true, "Please provide content for the post"],
  },
  photo: {
    type: String,
    required: [false, "Please provide a photo for the post"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
