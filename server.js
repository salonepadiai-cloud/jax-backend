import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/ai.js";
import voiceRoutes from "./routes/voice.js";
import speechRoutes from "./routes/speech.js";
import statusRoutes from "./routes/status.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// =====================================
// Middleware
// =====================================

app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));

app.use(express.json({
  limit: "10mb"
}));

app.use(express.urlencoded({
  extended: true
}));

// =====================================
// Root
// =====================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    app: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    developer: "Johnny TEC",
    status: "ONLINE",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// =====================================
// Health Check
// =====================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// =====================================
// API Routes
// =====================================

app.use("/api", aiRoutes);
app.use("/api/voice", voiceRoutes);
app.use("/api/speech", speechRoutes);
app.use("/api/status", statusRoutes);

// =====================================
// 404
// =====================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found.",
    path: req.originalUrl
  });
});

// =====================================
// Global Error Handler
// =====================================

app.use((err, req, res, next) => {
  console.error("J.A.X ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error"
  });
});

// =====================================
// Server
// =====================================

app.listen(PORT, () => {
  console.log(`
==================================================
🚀 J.A.X Backend Started Successfully
==================================================
App          : ${process.env.APP_NAME}
Version      : ${process.env.APP_VERSION}
Environment  : ${process.env.NODE_ENV}
Status       : ONLINE
Port         : ${PORT}

Endpoints
--------------------------------------------------
GET    /
GET    /api/health
GET    /api/status
POST   /api/chat
POST   /api/voice
POST   /api/speech
==================================================
`);
});
