import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { createQuickNote } from "../../Api-Calls/createQuickNote.js";
import toast from "react-hot-toast";

export default function CreateQuickNoteForm() {
    const navigate = useNavigate();

    // States
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(false);

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // UX → Validation checks
        if (!title.trim()) {
            toast.error("Please enter a title.");
            return;
        }
        if (!note.trim() || note === "<p><br></p>") {
            toast.error("Note content cannot be empty.");
            return;
        }
        if (!tag.trim()) {
            toast.error("Please select a tag.");
            return;
        }

        try {
            setLoading(true);

            const result = await createQuickNote(title, note, tag);

            if (result.status === true) {
                toast.success("Quick note created successfully!");
                navigate("/dashboard");
            } else {
                toast.error(result.data || "Something went wrong!");
            }

        } catch (error) {
            toast.error("Failed to create note.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                fixed max-h-screen inset-0 flex items-center justify-center z-50
                bg-linear-to-br from-[#E6F4EF] via-white to-[#CDEAE1]
                p-4
            "
        >
            <div
                className="
                    bg-white/60 backdrop-blur-xl
                    border border-white/40 shadow-2xl
                    w-full max-w-4xl rounded-2xl p-6
                "
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-[#0A5244]">
                        Create Quick Note
                    </h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-600 hover:text-gray-800 text-lg"
                    >
                        ✕
                    </button>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Title */}
                    <div className="relative">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="
                                w-full px-3 pt-5 pb-2 rounded-xl border border-gray-300 
                                bg-white/70 backdrop-blur-sm
                                focus:border-[#0A5244] focus:ring-2 focus:ring-[#0A5244]/30
                                transition-all peer placeholder-transparent
                            "
                            placeholder="Title"
                        />

                        <label
                            className="
                                absolute left-3 top-3 text-gray-500 text-sm 
                                transition-all duration-200 pointer-events-none
                                peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#0A5244]
                                peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
                            "
                        >
                            Title
                        </label>
                    </div>

                    {/* Rich Text Editor */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">
                            Note Content
                        </label>

                        <div className="h-40 sm:h-52 md:h-64 lg:h-72 xl:h-64 mb-12">
                            <ReactQuill
                                value={note}
                                onChange={setNote}
                                theme="snow"
                                className="
                                    h-full bg-white/50 backdrop-blur-xl rounded-xl 
                                    border border-white/60 shadow-inner
                                "
                                placeholder="Write your note…"
                                modules={{
                                    toolbar: [
                                        ["bold", "italic", "underline"],
                                        [{ list: "ordered" }, { list: "bullet" }],
                                        ["image"], // 🔥 enable image button
                                        ["clean"],
                                    ],
                                    clipboard: {
                                        matchVisual: false,
                                    },
                                }}

                            />
                        </div>
                    </div>

                    {/* Tag */}
                    <div>
                        <select
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="
                                w-full px-3 py-2 mt-1 rounded-xl border border-gray-300 
                                bg-white/70 backdrop-blur-sm
                                focus:border-[#0A5244] focus:ring-2 focus:ring-[#0A5244]/30
                            "
                        >
                            <option value="">Select Tag</option>
                            <option value="work">Work</option>
                            <option value="creative-work">Creative-Work</option>
                            <option value="personal">Personal</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="
                                px-4 py-1.5 rounded-full text-gray-700 bg-white/60 
                                hover:bg-white/80 transition
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                px-4 py-1.5 rounded-full text-white transition
                                ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#0A5244] hover:bg-[#0a5244d6]"
                                }
                            `}
                        >
                            {loading ? "Creating..." : "Create Note"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
