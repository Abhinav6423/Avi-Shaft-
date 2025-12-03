import LearningJournal from "../modals/Learning-Journal.modal.js";
import { evaluateLearningCompleteness } from "../utils/openrouter.js";
import User from "../modals/User.modal.js";
import UserStats from "../modals/UserStats.modal.js";
import { calculateXP } from "../utils/XpAlgo.js";


export const createLearningJournal = async (req, res) => {
    try {
        const { title, note, tag, difficulty, timeRate } = req.body;

        if (!title || !note || !tag || !difficulty || !timeRate)
            return res.status(400).json({ success: false, message: "Please enter all fields" });

        // AI evaluation
        const aiResponse = await evaluateLearningCompleteness({ title, note });

        const aiRating = aiResponse.rating;
        const aiReason = aiResponse.reason;
        const honestReview = aiResponse.honest_review;
        const improvement = aiResponse.improvements;

        // XP calculation
        const XPBreakdown = calculateXP({ rating: aiRating, difficulty, timeScale: timeRate });
        const xpEarned = XPBreakdown.xp;

        // Update Stats
        await UserStats.findOneAndUpdate(
            { userId: req.user._id },
            { $inc: { totalLearnings: 1 } }
        );

        // Add XP to user
        let user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $inc: { totalXpGained: xpEarned } },
            { new: true }
        );

        // MULTI LEVEL-UP LOOP
        while (user.totalXpGained >= user.xpToNextLevel) {
            const remainingXP = user.totalXpGained - user.xpToNextLevel;

            user = await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $inc: { level: 1 },
                    $set: {
                        totalXpGained: remainingXP,
                        xpToNextLevel: user.xpToNextLevel * 2
                    }
                },
                { new: true }
            );
        }

        // Create journal AFTER XP is stable
        const journal = await LearningJournal.create({
            title,
            note,
            tag,
            difficulty,
            timeRate,
            xp: xpEarned,
            aiRating,
            aiReason,
            honestReview,
            improvement,
            author: req.user._id
        });

        return res.status(200).json({
            success: true,
            message: "Journal created successfully",
            data: journal,
            xpEarned,
            currentXp: user.totalXpGained,
            level: user.level,
            xpToNextLevel: user.xpToNextLevel
        });

    } catch (error) {
        console.log("🔥🔥🔥 BACKEND ERROR TRIGGERED 🔥🔥🔥");
        console.log("Full error:", error);
        console.log("Message:", error.message);
        console.log("Stack:", error.stack);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}


export const getAllLearnings = async (req, res) => {
    try {
        const { tag, page, limit } = req.query

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const filter = { author: req.user._id };
        tag ? filter.tag = tag : null;

        const learnings = await LearningJournal.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber)
            .lean();

        const totalLearnings = await LearningJournal.countDocuments(filter);

        return (
            res.status(200).json(
                {
                    success: true,
                    message: "Learnings fetched successfully",
                    data: learnings,
                    pagination: {
                        totalLearnings,
                        page,
                        limit
                    }
                }
            )
        )

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const openLearningJournal = async (req, res) => {
    try {
        const { journalId } = req.params;
        if (!journalId)
            return res.status(400).json({ success: false, message: "LearningId not provided" });

        const journal = await LearningJournal.findById(journalId).lean();
        if (!journal)
            return res.status(400).json({ success: false, message: "Journal not found" });

        if (journal.author.toString() !== req.user._id.toString())
            return res.status(401).json({ success: false, message: "Unauthorized to open the journal of another user" });

        return res.status(200).json({ success: true, message: "Journal opened successfully", data: journal });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}