const ELEVENLABS_API =
  "https://api.elevenlabs.io/v1/text-to-speech";

export async function generateSpeech(text) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY is missing.");
  }

  if (!voiceId) {
    throw new Error("ELEVENLABS_VOICE_ID is missing.");
  }

  const response = await fetch(`${ELEVENLABS_API}/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2"
    })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const audioBuffer = await response.arrayBuffer();

  return Buffer.from(audioBuffer);
}
