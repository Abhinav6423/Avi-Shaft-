import React, { useState, useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { useNavigate } from "react-router-dom";
import { createQuickNote } from "../../Api-Calls/createQuickNote";
import toast from "react-hot-toast";
import Loader from "../Loader";

export default function CreateQuickNoteForm() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(false);

    // Quill toolbar config
    const quillModules = useMemo(() => {
        return {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
            ],
        };
    }, []);

    // Auto-expand functionality
    const handleEditorChange = (content, delta, source, editor) => {
        setNote(content);

        const el = document.querySelector(".auto-expand-editor .ql-editor");
        if (el) {
            el.style.height = "auto"; // reset height
            el.style.height = el.scrollHeight + "px"; // adjust to content
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return toast.error("Title required.");
        if (!note.trim() || note === "<p><br></p>") return toast.error("Note is empty.");
        if (!tag.trim()) return toast.error("Select tag.");

        try {
            setLoading(true);

            const result = await createQuickNote(title, note, tag);

            if (result.status) {
                toast.success("Quick note created!");
                navigate("/dashboard");
            } else {
                toast.error("Something went wrong.");
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div
            className="
            fixed inset-0 
            bg-gradient-to-br from-[#C8F5E6] via-white to-[#A0EDD9]
            flex justify-center items-start 
            p-6
            overflow-y-auto
            backdrop-blur-xl
            z-50
        "
        >
            <div
                className="
                w-full max-w-8xl 
                bg-white/70 
                backdrop-blur-2xl 
                rounded-3xl 
                shadow-[0_8px_40px_rgba(0,0,0,0.12)]
                border border-white/40
                p-8
            "
            >
                {/* Header */}
                <div className="flex items-center w-full justify-between mb-8">
                    <h2 className="text-3xl font-semibold text-[#0A5244] tracking-wide">
                        Create Quick Note
                    </h2>

                    <button
                        onClick={() => navigate(-1)}
                        className=" cursor-pointer
                        text-gray-600 hover:text-[#0A5244] 
                        transition text-3xl font-light leading-none
                    "
                    >
                        ✕
                    </button>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700 font-medium">Title</label>
                        <input
                            type="text"
                            placeholder="Enter a short title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="
                            w-full px-4 py-3 
                            rounded-xl 
                            border border-gray-200 
                            bg-white/80 
                            focus:ring-2 focus:ring-[#0A5244]/40 
                            focus:border-[#0A5244]
                            transition-all
                        "
                        />
                    </div>

                    {/* Auto-expanding Editor */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700 font-medium">Note Content</label>

                        <div
                            className="
                            bg-white/90 
                            rounded-xl 
                            border border-gray-200 
                            shadow-inner 
                            overflow-visible
                        "
                        >
                            <ReactQuill
                                value={note}
                                onChange={handleEditorChange}
                                theme="snow"
                                modules={quillModules}
                                placeholder="Write your note..."
                                className="auto-expand-editor"
                            />
                        </div>
                    </div>

                    {/* Tag */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-700 font-medium">Tag</label>
                        <select
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="
                            w-full px-4 py-3 
                            rounded-xl 
                            border border-gray-200 
                            bg-white/80 
                            focus:ring-2 focus:ring-[#0A5244]/40 
                            focus:border-[#0A5244]
                            transition
                        "
                        >
                            <option value="">Select a tag</option>
                            <option value="work">Work</option>
                            <option value="creative-work">Creative Work</option>
                            <option value="personal">Personal</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="
                            px-5 py-2.5 
                            rounded-full 
                            bg-white/70 
                            text-gray-700
                            border border-gray-200
                            hover:bg-white 
                            transition shadow-sm
                        "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="
                            px-6 py-2.5 
                            rounded-full 
                            bg-[#0A5244] 
                            text-white 
                            shadow-lg shadow-[#0A5244]/30
                            hover:bg-[#083e33] 
                            transition
                        "
                        >
                            Create Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
