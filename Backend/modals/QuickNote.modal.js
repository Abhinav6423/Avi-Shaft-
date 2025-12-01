import mongoose, { Schema } from "mongoose"

const quickNoteSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        note: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }
)


const QuickNote = mongoose.model("QuickNote", quickNoteSchema)
export default QuickNote