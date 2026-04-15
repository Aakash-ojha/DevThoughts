import express from "express";
import {
  createComment,
  getPostComments,
} from "../controllers/commentController.js";
import { protect } from "../controllers/authController.js";
const router = express.Router();

router.post("/", protect, createComment);
router.get("/post/:postId", protect, getPostComments);

export default router;
