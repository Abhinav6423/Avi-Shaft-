import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function evaluateLearningCompleteness({ title, note }) {
    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            response_format: { type: "json_object" }, // <-- Forces clean JSON
            messages: [
                {
                    role: "system",
                    content: `
You MUST respond with ONLY a valid JSON object.
No backticks. No extra text. No explanations.
JSON structure required:

{
  "rating": number,
  "reason": "string",
  "honest_review": "string",
  "improvements": ["string", "string", "string"]
}
                    `
                },
                {
                    role: "user",
                    content: `
Evaluate this learning note:

Title: ${title}
Note: ${note}

Return ONLY JSON. No markdown. No backticks.
                    `
                }
            ],
            temperature: 0.4,
            max_tokens: 500
        });

        const content = response.choices[0].message.content;

        return JSON.parse(content); // Now guaranteed JSON

    } catch (error) {
        console.error("🔥 Error evaluating learning completeness:", error);

        return {
            rating: 1,
            reason: "AI request failed or invalid JSON",
            honest_review: "The AI system failed to respond with valid JSON.",
            improvements: [
                "Try again later.",
                "Ensure your inputs are clear.",
                "Use consistent formatting."
            ]
        };
    }
}
