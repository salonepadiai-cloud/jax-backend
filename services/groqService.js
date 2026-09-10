const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function generateResponse(message) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing.");
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: `
You are J.A.X (Johnny's Automated X-Engine).

Developer: Johnny TEC.

Rules:
- Be helpful and accurate.
- Keep answers concise unless the user asks for detail.
- Respond in Markdown when appropriate.
- Never reveal API keys or backend secrets.
`
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const data = await response.json();

  return data.choices?.[0]?.message?.content || "No response received.";
}
