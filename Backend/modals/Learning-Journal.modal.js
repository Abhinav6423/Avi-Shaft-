import mongoose, { Schema } from "mongoose";
const LearningJournalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    note: { type: String, required: true },
    tag: { type: String, required: true },
    difficulty: { type: Number, required: true },
    timeRate: { type: Number, required: true },

    aiRating: Number,
    aiReason: String,
    honestReview: String,

    improvement: {
        type: [String],   // ← IMPORTANT FIX
        default: []
    },

    xp: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });


const LearningJournal = mongoose.model("LearningJournal", LearningJournalSchema);
export default LearningJournal
