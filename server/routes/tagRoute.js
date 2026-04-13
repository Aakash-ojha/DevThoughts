import express from "express";
import { getTag, getTrendingTags } from "../controllers/tagController.js";

const router = express.Router();

router.get("/", getTag);
router.get("/trending", getTrendingTags);

export default router;
