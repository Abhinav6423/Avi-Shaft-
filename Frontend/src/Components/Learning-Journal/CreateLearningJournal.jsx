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
    const [difficulty, setDifficulty] = useState(3);
    const [effort, setEffort] = useState(3);
    const [loading, setLoading] = useState(false);

    const tags = ["General", "Programming", "Fitness", "Mindset", "Reading", "Projects"];
    const options = ["1", "2", "3", "4", "5"];

    const submitHandler = async (e) => {
        e.preventDefault();

        // remove HTML from quill content
        const cleaned = content.replace(/<(.|\n)*?>/g, "").trim();
        if (!cleaned) {
            toast.error("Please write something in the journal");
            return;
        }

        if (!title) {
            toast.error("Please enter a title");
            return;
        }

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
                navigate("/dashboard");
            } else {
                toast.error(result.data || "Failed to create journal");
            }
        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen w-full flex justify-center items-start p-6 
            bg-gradient-to-br from-[#b7ffe4] via-white to-[#71eccc]">

            <div className="
                w-full max-w-3xl 
                bg-white/80 backdrop-blur-2xl 
                border border-white/50 
                shadow-xl 
                rounded-3xl 
                p-8 mt-4
            ">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-[#0A5244]">
                        Create Learning Journal
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Track your learnings, experiences, and breakthroughs.
                    </p>
                </div>

                <form onSubmit={submitHandler} className="space-y-8">

                    <div className="relative">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="
                                w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 
                                bg-white/70 backdrop-blur-sm shadow-sm
                                focus:border-[#0A5244] focus:ring-2 focus:ring-[#0A5244]/30
                                transition peer placeholder-transparent
                            "
                            placeholder="Title"
                        />

                        <label
                            className="
                                absolute left-4 top-3 text-gray-500 text-sm 
                                pointer-events-none transition-all duration-200
                                peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#0A5244]
                                peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
                            "
                        >
                            Journal Title
                        </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm text-gray-700 mb-1 block">
                                Difficulty (1–5)
                            </label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(Number(e.target.value))}
                                className="
                                    w-full px-4 py-2 rounded-xl border border-gray-300 
                                    bg-white/70 focus:ring-2 focus:ring-[#0A5244]/30 shadow-sm
                                "
                            >
                                {options.map((o) => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-700 mb-1 block">
                                Time Effort (1–5)
                            </label>
                            <select
                                value={effort}
                                onChange={(e) => setEffort(Number(e.target.value))}
                                className="
                                    w-full px-4 py-2 rounded-xl border border-gray-300 
                                    bg-white/70 focus:ring-2 focus:ring-[#0A5244]/30 shadow-sm
                                "
                            >
                                {options.map((o) => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-700 mb-2 block">
                            Select Tag
                        </label>

                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setSelectedTag(tag)}
                                    className={`
                                        px-4 py-1.5 rounded-full text-sm transition-all
                                        border shadow-sm
                                        ${selectedTag === tag
                                            ? "bg-[#0A5244] text-white scale-105 shadow-md"
                                            : "bg-white text-[#0A5244] border-[#0A5244]/40 hover:bg-[#0A5244]/10"
                                        }
                                    `}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-700 mb-2 block">
                            What did you learn today?
                        </label>

                        <div className="h-[60vh]">
                            <ReactQuill
                                value={content}
                                onChange={(value) => setContent(value)}
                                theme="snow"
                                className="h-full bg-white/70 rounded-2xl shadow-inner"
                                placeholder="Write your insights, breakthroughs, struggles…"
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

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="reset"
                            className="
                                px-5 py-2 rounded-full 
                                bg-gray-100 text-gray-700 
                                hover:bg-gray-200 shadow-sm
                            "
                        >
                            Clear
                        </button>

                        <button
                            type="submit"
                            className="
                                px-6 py-2 rounded-full 
                                bg-[#0A5244] text-white 
                                hover:bg-[#094c3e] shadow-md
                                transition font-medium
                            "
                        >
                            Save Entry
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
