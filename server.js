import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/ai.js";
import voiceRoutes from "./routes/voice.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===============================
// Middleware
// ===============================
app.use(cors());

app.use(express.json({
    limit: "10mb"
}));

app.use(express.urlencoded({
    extended: true
}));

// ===============================
// Root
// ===============================
app.get("/", (req, res) => {
    res.json({
        app: "J.A.X Backend",
        version: "1.0.0",
        developer: "Johnny TEC",
        status: "ONLINE"
    });
});

// ===============================
// Health Check
// ===============================
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "J.A.X Backend is running.",
        timestamp: new Date().toISOString()
    });
});

// ===============================
// API Routes
// ===============================
app.use("/api", aiRoutes);
app.use("/api/voice", voiceRoutes);

// ===============================
// 404 Handler
// ===============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found."
    });
});

// ===============================
// Error Handler
// ===============================
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
    console.log(`
==================================
🚀 J.A.X Backend Started
==================================
Status     : ONLINE
Port       : ${PORT}
Developer  : Johnny TEC
==================================
`);
});
