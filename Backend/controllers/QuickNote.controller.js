import QuickNote from "../modals/QuickNote.modal.js";
import UserStats from "../modals/UserStats.modal.js";

export const createQuickNote = async (req, res) => {
    try {
        const { title, note, tag } = req.body;

        if (!title || !note || !tag)
            return res.status(400).json({ success: false, message: "Please enter all fields" });

        const quickNote = await QuickNote.create({
            title,
            note,
            tag,
            author: req.user._id
        });

        await UserStats.findOneAndUpdate(
            { userId: req.user._id },
            { $inc: { totalQuickNotes: 1 } },
            { upsert: true }
        );

        res.status(201).json({
            success: true,
            message: "Quick note created successfully and stats updated",
            quickNote
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export const getAllQuickNotes = async (req, res) => {
    const userID = req.user._id;
    if (!userID) return res.status(401).json({ message: "Unauthorized, no UserID" });

    try {
        const { tag, page = 1, limit = 10 } = req.query;

        // Convert query strings → number
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        // Filters
        const filter = { author: userID };
        if (tag) filter.tag = tag;

        // Fetch notes + pagination
        const quickNotes = await QuickNote.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber)
            .lean();

        // Count total notes for this user
        const totalNotes = await QuickNote.countDocuments(filter);

        res.status(200).json({
            success: true,
            message: "Quick notes fetched successfully",
            data: quickNotes,
            pagination: {
                totalNotes,
                totalPages: Math.ceil(totalNotes / limitNumber),
                currentPage: pageNumber,
                limit: limitNumber
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export const deleteQuickNote = async (req, res) => {
    const { noteId } = req.params;

    if (!noteId)
        return res.status(400).json({ success: false, message: "NoteId not provided" });

    try {
        const note = await QuickNote.findById(noteId);
        if (!note)
            return res.status(400).json({ success: false, message: "Note not found" });

        if (note.author.toString() !== req.user._id.toString())
            return res.status(401).json({ success: false, message: "Unauthorized to delete the note of another user" });

        await QuickNote.findByIdAndDelete(noteId);

        await UserStats.findOneAndUpdate(
            { userId: req.user._id },
            { $inc: { totalQuickNotes: -1 } },
            { upsert: true }
        );

        res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const openNote = async (req, res) => {
    try {
        const { noteId } = req.params;

        if (!noteId)
            return res.status(400).json({ success: false, message: "NoteId not provided" });

        const note = await QuickNote.findById(noteId);
        if (!note)
            return res.status(400).json({ success: false, message: "Note not found" });

        res.status(200).json({ success: true, message: "Note opened successfully", data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
