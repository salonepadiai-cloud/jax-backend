import express from "express";
import { chatWithJAX } from "../controllers/aiController.js";

const router = express.Router();

// POST /api/chat
router.post("/chat", chatWithJAX);

export default router;
