import Comment from "../models/CommentModel.js";
import catchAsync from "../utils/catchAsync.js";

const createComment = catchAsync(async (req, res, next) => {
  const { postId, text, parentComment } = req.body;
  const comment = await Comment.create({
    post: postId,
    user: req.user?.id,
    text,
    parentComment: parentComment || null,
  });

  res.status(201).json({
    length: comment.length,
    data: comment,
  });
});

const getPostComments = catchAsync(async (req, res) => {
  const comments = await Comment.find({
    post: req.params.postId,
  }).populate("user");

  res.status(200).json({
    length: comments.length,
    data: comments,
  });
});

export { createComment, getPostComments };
