import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/ai.js";
import voiceRoutes from "./routes/voice.js";
import speechRoutes from "./routes/speech.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// =====================================
// Middleware
// =====================================
app.use(cors());

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
    app: "J.A.X Backend",
    version: "1.0.0",
    developer: "Johnny TEC",
    status: "ONLINE",
    uptime: process.uptime()
  });
});

// =====================================
// Health Check
// =====================================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// =====================================
// API Routes
// =====================================
app.use("/api", aiRoutes);

app.use("/api/voice", voiceRoutes);

app.use("/api/speech", speechRoutes);

// =====================================
// 404 Handler
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
  console.error("J.A.X Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// =====================================
// Start Server
// =====================================
app.listen(PORT, () => {
  console.log(`
=========================================
🚀 J.A.X Backend Started
=========================================
Status      : ONLINE
Port        : ${PORT}
Environment : ${process.env.NODE_ENV || "development"}
Developer   : Johnny TEC
=========================================
Health URL  : http://localhost:${PORT}/api/health
AI URL      : http://localhost:${PORT}/api/chat
Voice URL   : http://localhost:${PORT}/api/voice
Speech URL  : http://localhost:${PORT}/api/speech
=========================================
`);
});
