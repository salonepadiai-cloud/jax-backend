import { generateResponse } from "../services/groqService.js";

export async function chatWithJAX(req, res) {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required."
      });
    }

    const reply = await generateResponse(message);

    return res.status(200).json({
      success: true,
      user: message,
      reply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("J.A.X AI Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "AI request failed."
    });
  }
}
