export async function speechToText(req, res) {
  try {
    res.json({
      success: true,
      message: "Speech endpoint is ready.",
      transcript: ""
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
