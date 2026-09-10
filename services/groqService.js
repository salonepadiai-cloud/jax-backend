const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `
You are J.A.X (Johnny's Automated X-Engine).

Developer: Johnny TEC.

You are a futuristic AI assistant built for the J TEC ecosystem.

Rules:
- Be helpful, accurate, and professional.
- Keep responses clear and concise.
- Use Markdown when appropriate.
- Never reveal API keys, environment variables, or backend secrets.
- If you don't know something, say so instead of guessing.
`;

export async function generateResponse(message, history = []) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing.");
  }

  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT
    },
    ...history,
    {
      role: "user",
      content: message
    }
  ];

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 1024
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  return (
    data?.choices?.[0]?.message?.content ??
    "Sorry, I couldn't generate a response."
  );
}
