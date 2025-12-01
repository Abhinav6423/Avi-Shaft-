export function calculateXP({ rating, difficulty, timeScale }) {
    // Validate inputs
    const clamp = (v) => Math.max(1, Math.min(5, Math.round(v)));
    rating = clamp(rating);
    difficulty = clamp(difficulty);
    timeScale = clamp(timeScale);

    // Map timeScale (1..5) to representative minutes (diminishing return curve)
    const timeMap = [5, 10, 20, 40, 80];
    const minutes = timeMap[timeScale - 1];

    // Multipliers
    const ratingMultiplier = 0.6 + 0.2 * rating;           // 0.8 .. 1.6
    const difficultyMultiplier = 0.5 + 0.3 * difficulty;   // 0.8 .. 2.0
    const timeMultiplier = 1 + Math.log10(minutes + 1);    // ~1.78 .. ~2.90

    const baseXP = 10;

    const xpRaw = ratingMultiplier * difficultyMultiplier * timeMultiplier * baseXP;
    const xpRounded = Math.round(xpRaw);

    return {
        xp: xpRounded,
        xpRaw,
        breakdown: {
            rating,
            difficulty,
            timeScale,
            minutes,
            ratingMultiplier,
            difficultyMultiplier,
            timeMultiplier,
            baseXP
        }
    };
}
