import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    app: process.env.APP_NAME || "J.A.X Backend",
    version: process.env.APP_VERSION || "1.0.0",
    environment: process.env.NODE_ENV || "development",
    services: {
      groq: !!process.env.GROQ_API_KEY,
      gemini: !!process.env.GEMINI_API_KEY,
      elevenlabs: !!process.env.ELEVENLABS_API_KEY,
      supabase: !!process.env.SUPABASE_URL
    },
    timestamp: new Date().toISOString()
  });
});

export default router;
