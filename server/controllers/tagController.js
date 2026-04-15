import Post from "../models/PostModel.js";
import Tag from "../models/TagModel.js";
import catchAsync from "../utils/catchAsync.js";

const getTag = catchAsync(async (req, res) => {
  const tags = await Tag.find().sort({ name: 1 });

  res.status(200).json({ status: "success", data: tags });
});

const getTrendingTags = catchAsync(async (req, res, nexxt) => {
  const trendingTags = await Post.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 6 },

    {
      $lookup: {
        // ← get tag details
        from: "tags",
        localField: "_id",
        foreignField: "_id",
        as: "tag",
      },
    },
    { $unwind: "$tag" },
    {
      $project: {
        _id: 0,
        name: "$tag.name",
        color: "$tag.color",
        slug: "$tag.slug",
        count: 1, // ← post count
      },
    },
  ]);

  res.status(200).json({
    length: trendingTags.length,
    status: "success",
    data: trendingTags,
  });
});

export { getTag, getTrendingTags };
