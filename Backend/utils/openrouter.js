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
                        content: `... your system prompt ...`
                    },
                    {
                        role: "user",
                        content: `Title: ${title}\nNote: ${note}\nEvaluate this.`
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

        let content = response.data?.choices?.[0]?.message?.content;

        if (!content) {
            console.error("❌ AI returned empty or invalid response:", response.data);
            return {
                rating: 1,
                reason: "AI returned empty response",
                honest_review: "Could not analyze your entry.",
                improvements: ["Try again later."]
            };
        }

        // Extract JSON safely from ANY output format
        const first = content.indexOf("{");
        const last = content.lastIndexOf("}");

        if (first === -1 || last === -1) {
            console.error("❌ AI returned invalid JSON format:", content);
            return {
                rating: 1,
                reason: "Invalid AI response format",
                honest_review: "AI could not provide proper feedback.",
                improvements: ["Rewrite your note and try again."]
            };
        }

        const jsonString = content.slice(first, last + 1);

        return JSON.parse(jsonString);

    } catch (error) {
        console.error("🔥 AI Evaluation Error:", error?.response?.data || error);
        return {
            rating: 1,
            reason: "AI evaluation failed",
            honest_review: "AI could not analyze your note.",
            improvements: ["Try again later."]
        };
    }
}
