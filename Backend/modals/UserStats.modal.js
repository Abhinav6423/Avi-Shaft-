import mongoose, { Schema } from "mongoose";

const userStatsSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        totalProjects: {
            type: Number,
            default: 0
        },
        totalQuickNotes: {
            type: Number,
            default: 0
        },
        totalLearnings: {
            type: Number,
            default: 0
        }
    } , {timestamps: true}
)

const UserStats = mongoose.model("UserStats", userStatsSchema)

export default UserStats;