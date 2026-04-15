import Post from "../models/PostModel.js";
import Tag from "../models/TagModel.js";
import catchAsync from "../utils/catchAsync.js";
import Comment from "../models/CommentModel.js";
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

const getPosts = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const tagName = req.query.tag;

  const offset = (page - 1) * limit;

  let filter = {};
  if (tagName) {
    const tag = await Tag.findOne({ name: tagName });

    if (tag) {
      filter = { tags: tag._id };
    } else {
      return res.status(200).json({ length: 0, status: "success", data: [] });
    }
  }

  console.log("page", page, "limit", limit);

  const posts = await Post.find(filter)
    .populate("author", "name username")
    .populate("tags")
    .sort("-createdAt")
    .skip(offset)
    .limit(limit);

  const postsWithCounts = await Promise.all(
    posts.map(async (post) => {
      const commentCount = await Comment.countDocuments({
        post: post._id,
      });

      return {
        ...post.toObject(),
        commentCount,
      };
    }),
  );

  res.status(200).json({
    length: posts.length,
    status: "success",
    data: posts,
  });
});

export { createPost, getPosts };
