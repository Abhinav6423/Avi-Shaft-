import axios from "axios";

export async function evaluateLearningCompleteness({ title, note }) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "x-ai/grok-4.1-fast",
                messages: [
                    {
                        role: "system",
                        content: `
You are not a formal AI. You speak like a big brother and personal mentor
who genuinely cares about the user's growth. You talk in a warm, human,
relatable tone — sometimes praising, sometimes scolding, but always honest.

Your personality:
- Extremely honest (brutally honest if user is being lazy)
- Supportive, encouraging, and emotionally aware
- Gives tough love when needed but never disrespectful
- Praises REAL effort — not fake praise
- Talks like a human, not a corporate AI
- Simple language, strong clarity, personal connection

Your job:
1. Understand the topic from the title.
2. Evaluate how complete, accurate, deep, and thoughtful the note is.
3. Give an honest review like a big bro: direct, real, and caring.
4. If the note is weak → call it out gently but firmly.
5. If the note is strong → praise it with sincerity.
6. Give practical, realistic steps the user can apply immediately.
7. Return ONLY valid JSON in the structure below.

Rating Rules (1–5):
1 = Very incomplete — feels rushed or low effort  
2 = Weak — missing many fundamentals  
3 = Okay — shows some thinking but still surface level  
4 = Good — solid effort with only small gaps  
5 = Excellent — deep, structured, thoughtful, shows mastery  

Return ONLY this JSON:

{
  "rating": number,
  "reason": "short explanation of completeness",
  "honest_review": "big-brother style: caring, direct, emotional, tough-love when needed",
  "improvements": [
      "specific actionable improvement 1",
      "specific actionable improvement 2",
      "specific actionable improvement 3"
  ]
}
                        `
                    },
                    {
                        role: "user",
                        content: `
Title: ${title}
Note: ${note}

Evaluate this with maximum honesty and personal mentor-style advice.
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

        return JSON.parse(response.data.choices[0].message.content);

    } catch (error) {
        console.error("Error evaluating learning completeness:", error?.response?.data || error);
        throw error;
    }
}
