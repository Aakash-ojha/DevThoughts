import User from "../models/UserModel.js";
import Follow from "../models/FollowModel.js"; // ← import Follow model
import catchAsync from "../utils/catchAsync.js";

const followUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const currentUserId = req.user.id;

  if (id === currentUserId) {
    return res.status(400).json({
      status: "error",
      message: "You cannot follow yourself!",
    });
  }

  // ← check Follow collection not User!
  const existingFollow = await Follow.findOne({
    follower: currentUserId,
    following: id,
  });

  if (existingFollow) {
    // ← unfollow → delete from Follow collection
    await Follow.findByIdAndDelete(existingFollow._id);
    return res.status(200).json({
      status: "success",
      following: false,
      message: "Unfollowed!",
    });
  } else {
    // ← follow → create in Follow collection
    await Follow.create({
      follower: currentUserId,
      following: id,
    });
    return res.status(200).json({
      status: "success",
      following: true,
      message: "Followed!",
    });
  }
});

const getUserProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password -confirmPassword");

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found!",
    });
  }

  // ← count from Follow collection!
  const followersCount = await Follow.countDocuments({ following: id });
  const followingCount = await Follow.countDocuments({ follower: id });

  res.status(200).json({
    status: "success",
    data: {
      ...user.toObject(),
      followersCount,
      followingCount,
    },
  });
});

const checkIsFollowing = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const currentUserId = req.user.id;

  // ← check Follow collection
  const existingFollow = await Follow.findOne({
    follower: currentUserId,
    following: id,
  });

  res.status(200).json({
    status: "success",
    following: !!existingFollow, // ← true or false
  });
});

const getSuggestedUsers = catchAsync(async (req, res, next) => {
  const currentUserId = req.user.id;

  // ← get who I already follow from Follow collection
  const alreadyFollowing = await Follow.find({
    follower: currentUserId,
  }).select("following");

  const followingIds = alreadyFollowing.map((f) => f.following);

  const suggestedUsers = await User.find({
    _id: {
      $ne: currentUserId,
      $nin: followingIds,
    },
  })
    .select("name username profilePicture bio")
    .limit(5);

  res.status(200).json({
    status: "success",
    data: suggestedUsers,
  });
});

export { followUser, getUserProfile, checkIsFollowing, getSuggestedUsers };
