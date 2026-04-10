import Tag from "../models/TagModel.js";
import catchAsync from "../utils/catchAsync.js";

const getTag = catchAsync(async (req, res) => {
  const tags = await Tag.find().sort({ name: 1 });

  res.status(200).json({ status: "success", data: tags });
});

export { getTag };
