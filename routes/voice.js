import express from "express";
import { textToSpeech } from "../controllers/voiceController.js";

const router = express.Router();

// POST /api/voice
router.post("/", textToSpeech);

export default router;
