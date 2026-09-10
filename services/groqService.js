export async function generateResponse(message) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are J.A.X (Johnny's Automated X-Engine), a futuristic AI assistant created by Johnny TEC. Respond helpfully, clearly, and concisely."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1024
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API Error: ${error}`);
  }

  const data = await response.json();

  return data.choices[0].message.content;
}
