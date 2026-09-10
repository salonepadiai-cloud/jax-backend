const config = {
  app: {
    name: process.env.APP_NAME || "J.A.X Backend",
    version: process.env.APP_VERSION || "1.0.0",
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000
  },

  groq: {
    apiKey: process.env.GROQ_API_KEY
  },

  gemini: {
    apiKey: process.env.GEMINI_API_KEY
  },

  elevenLabs: {
    apiKey: process.env.ELEVENLABS_API_KEY,
    voiceId: process.env.ELEVENLABS_VOICE_ID
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  },

  security: {
    jwtSecret: process.env.JWT_SECRET
  }
};

export default config;
