import express from "express";
import { speechToText } from "../controllers/speechController.js";

const router = express.Router();

// POST /api/speech
router.post("/", speechToText);

export default router;
