import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/getpost", protect, getPosts);

export default router;
