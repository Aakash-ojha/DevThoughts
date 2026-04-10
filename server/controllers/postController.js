import Post from "../models/PostModel.js";
import catchAsync from "../utils/catchAsync.js";

const createPost = catchAsync(async (req, res, next) => {
  const { title, content, codeSnippet, tags } = req.body;

  const newPost = await Post.create({
    title,
    content,
    codeSnippet,
    image: [],
    author: req.user.id,
    tags,
  });

  res.status(201).json({
    status: "success",
    data: { post: newPost },
  });
});

export { createPost };
