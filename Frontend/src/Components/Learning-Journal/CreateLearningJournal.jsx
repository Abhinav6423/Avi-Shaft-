import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { createLearningJournal } from "../../Api-Calls/createLearningJournal.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../Loader.jsx";

export default function CreateLearningJournal() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedTag, setSelectedTag] = useState("General");
    const [difficulty, setDifficulty] = useState("3");
    const [effort, setEffort] = useState("3");
    const [loading, setLoading] = useState(false);

    const tags = [
        "General",
        "Programming",
        "Fitness",
        "Mindset",
        "Reading",
        "Projects",
    ];

    const options = ["1", "2", "3", "4", "5"];

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const result = await createLearningJournal(
                title,
                content,
                selectedTag,
                difficulty,
                effort
            );

            if (result.status === true) {
                toast.success("Journal created successfully!");

                // Redirect after success
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div
            className="
                min-h-screen w-full p-4 
                bg-linear-to-br from-[#8debca] via-white to-[#57e9bb]
                flex justify-center items-start
            "
        >
            <div
                className="
                    w-full max-w-4xl 
                    bg-white/60 backdrop-blur-2xl 
                    border border-white/40 
                    shadow-2xl 
                    rounded-3xl 
                    p-6 sm:p-8 
                    mt-6
                "
            >
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A5244] mb-2">
                    Create Learning Journal Entry
                </h1>
                <p className="text-gray-600 mb-6">
                    Capture today’s learnings, insights, struggles, and breakthroughs.
                </p>

                <div className="space-y-8">
                    <form onSubmit={submitHandler}>

                        {/* Title */}
                        <div className="relative">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="
                                    w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 
                                    bg-white/70 backdrop-blur-sm
                                    focus:border-[#0A5244] focus:ring-2 focus:ring-[#0A5244]/30
                                    transition-all peer placeholder-transparent
                                "
                                placeholder="Journal Title"
                            />

                            <label
                                className="
                                    absolute left-4 top-3 text-gray-500 text-sm 
                                    transition-all duration-200 pointer-events-none
                                    peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#0A5244]
                                    peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
                                "
                            >
                                Journal Title
                            </label>
                        </div>

                        {/* Difficulty + Effort */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">
                                    Difficulty (1–5)
                                </label>
                                <select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    className="
                                        w-full px-4 py-2 rounded-xl border border-gray-300 
                                        bg-white/70 backdrop-blur-sm
                                        focus:ring-2 focus:ring-[#0A5244]/30
                                    "
                                >
                                    {options.map((o) => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">
                                    Time Effort (1–5)
                                </label>
                                <select
                                    value={effort}
                                    onChange={(e) => setEffort(e.target.value)}
                                    className="
                                        w-full px-4 py-2 rounded-xl border border-gray-300 
                                        bg-white/70 backdrop-blur-sm
                                        focus:ring-2 focus:ring-[#0A5244]/30
                                    "
                                >
                                    {options.map((o) => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="text-sm text-gray-600 mb-2 block">
                                Choose Tag
                            </label>

                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <button
                                        type="button"
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`
                                            px-3 py-1.5 rounded-full text-sm transition cursor-pointer
                                            ${selectedTag === tag
                                                ? "bg-[#0A5244] text-white shadow"
                                                : "bg-white/70 text-[#0A5244] border border-[#0A5244]/30"
                                            }
                                        `}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Editor */}
                        <div>
                            <label className="text-sm text-gray-600 mb-2 block">
                                What did you learn today?
                            </label>

                            <div className="h-[70vh]">
                                <ReactQuill
                                    value={content}
                                    onChange={setContent}
                                    theme="snow"
                                    className="
                                        h-full
                                        bg-white/70 backdrop-blur-xl rounded-2xl 
                                        shadow-inner
                                    "
                                    placeholder="Write your insights, progress, struggles, breakthroughs…"
                                    modules={{
                                        toolbar: [
                                            ["bold", "italic", "underline"],
                                            [{ list: "ordered" }, { list: "bullet" }],
                                            ["clean"],
                                        ],
                                    }}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-3">
                            <button
                                type="reset"
                                className="
                                    px-5 py-2 rounded-full 
                                    bg-white/70 text-gray-700 
                                    hover:bg-white/90 transition
                                "
                            >
                                Clear
                            </button>

                            <button
                                type="submit"
                                className="
                                    px-6 py-2 rounded-full 
                                    bg-[#0A5244] text-white font-medium
                                    hover:bg-[#0a5244d6] transition
                                "
                            >
                                Save Entry
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
