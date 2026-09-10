export async function getStatus(req, res) {
  res.status(200).json({
    success: true,
    app: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    environment: process.env.NODE_ENV,

    services: {
      groq: !!process.env.GROQ_API_KEY,
      gemini: !!process.env.GEMINI_API_KEY,
      elevenLabs: !!process.env.ELEVENLABS_API_KEY,
      supabase: !!(
        process.env.SUPABASE_URL &&
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )
    },

    timestamp: new Date().toISOString()
  });
}
