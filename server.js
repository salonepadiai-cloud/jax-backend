import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  res.json({
    app: "J.A.X Backend",
    version: "1.0.0",
    developer: "Johnny TEC",
    status: "ONLINE"
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "J.A.X Backend is running.",
    timestamp: new Date().toISOString()
  });
});

// Placeholder AI Route
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  res.json({
    success: true,
    user: message,
    reply: "J.A.X AI connection is not configured yet."
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found."
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 J.A.X Backend running on http://localhost:${PORT}`);
});
