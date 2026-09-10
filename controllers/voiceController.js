import { generateSpeech } from "../services/elevenLabsService.js";

export async function textToSpeech(req, res) {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required."
      });
    }

    const audio = await generateSpeech(text);

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(audio);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
