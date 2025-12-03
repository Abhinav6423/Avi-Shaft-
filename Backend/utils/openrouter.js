import axios from "axios";

export async function evaluateLearningCompleteness({ title, note }) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "x-ai/grok-4.1-fast:free",
                messages: [
                    {
                        role: "system",
                        content: `
You are a strict JSON-only assistant. 
Always respond ONLY with pure JSON inside \`\`\`json ... \`\`\`.
Never include text before or after JSON.

Return ONLY this JSON structure:
{
  "rating": number,
  "reason": "short explanation",
  "honest_review": "big brother style review",
  "improvements": ["...", "...", "..."]
}
                        `
                    },
                    {
                        role: "user",
                        content: `
Evaluate this learning note:

Title: ${title}
Note: ${note}

Return ONLY valid JSON.
                        `
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost",
                    "X-Title": "Learning Completeness Evaluator"
                }
            }
        );

        let content = response.data.choices[0].message.content;

        // Try to extract JSON inside ```json ... ```
        const jsonMatch = content.match(/```json([\s\S]*?)```/);

        if (jsonMatch) {
            content = jsonMatch[1];
        }

        // Final safe JSON parse
        try {
            return JSON.parse(content.trim());
        } catch (err) {
            console.log("❌ AI returned INVALID JSON. Falling back.");

            return {
                rating: 1,
                reason: "Invalid AI JSON format",
                honest_review: "AI could not analyze your note properly.",
                improvements: [
                    "Rewrite your note and try again.",
                    "Add more structure.",
                    "Be more clear and detailed."
                ]
            };
        }

    } catch (error) {
        console.error("🔥 Error evaluating learning completeness:", error?.response?.data || error);

        return {
            rating: 1,
            reason: "AI request failed completely",
            honest_review: "The AI system failed to respond. No analysis available.",
            improvements: [
                "Try again later.",
                "Ensure your note is clear.",
                "Write with more detail."
            ]
        };
    }
}
