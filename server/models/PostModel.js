import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [false, "Please provide a title for the post"],
    },
    content: {
      type: String,
      required: [true, "Please provide content for the post"],
    },
    codeSnippet: {
      type: String,
      trim: true,
    },
    image: [
      {
        type: String,
        default: [],
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A post must have an author"],
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    tags: [{ type: Schema.ObjectId, ref: "Tag" }],
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
