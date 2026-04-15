import express from "express";
import {
  followUser,
  getUserProfile,
  checkIsFollowing,
  getSuggestedUsers,
} from "../controllers/userController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.get("/suggested", protect, getSuggestedUsers); // /api/user/suggested
router.get("/check-follow/:id", protect, checkIsFollowing); // /api/user/check-follow/:id
router.post("/follow/:id", protect, followUser); // /api/user/follow/:id
router.get("/:id", protect, getUserProfile); // /api/user/:id

export default router;
