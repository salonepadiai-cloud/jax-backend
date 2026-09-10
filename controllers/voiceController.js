export async function textToSpeech(req, res) {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required."
      });
    }

    // ElevenLabs integration will be added next.
    res.json({
      success: true,
      message: "Voice endpoint is ready.",
      text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
