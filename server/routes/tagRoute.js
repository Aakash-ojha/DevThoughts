import express from "express";
import { getTag } from "../controllers/tagController.js";

const router = express.Router();

router.get("/", getTag);

export default router;
