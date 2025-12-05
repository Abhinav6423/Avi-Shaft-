import React, { useState, useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../Loader.jsx";
import { createLearningJournal } from "../../Api-Calls/createLearningJournal";

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

    // Quill toolbar config
    const quillModules = useMemo(() => {
        return {
            toolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
            ],
        };
    }, []);

    // Auto-expand Quill editor
    const handleEditorChange = (value) => {
        setContent(value);

        const editor = document.querySelector(".auto-expand-editor .ql-editor");
        if (editor) {
            editor.style.height = "auto";
            editor.style.height = editor.scrollHeight + "px";
        }
    };

    // Submit handler
    const submitHandler = async (e) => {
        e.preventDefault();

        const cleaned = content.replace(/<(.|\n)*?>/g, "").trim();
        if (!cleaned) return toast.error("Please write something in the journal");
        if (!title.trim()) return toast.error("Please enter a title");

        try {
            setLoading(true);
            const result = await createLearningJournal(
                title,
                content,
                selectedTag,
                difficulty,
                effort
            );

            if (result.status) {
                toast.success("Journal created successfully!");
                navigate("/dashboard");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen w-full flex justify-center p-6 bg-gradient-to-br from-[#B7FFE4] via-white to-[#71ECCC]">

            <div className="
                w-full max-w-5xl 
                bg-white/80 backdrop-blur-2xl 
                border border-white/50 
                shadow-xl rounded-3xl 
                p-10 mt-4
            ">

                {/* TITLE HEADER */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-[#0A5244] tracking-wide">
                        Create Learning Journal
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">
                        Reflect, grow, and track your learning journey.
                    </p>
                </div>

                <form onSubmit={submitHandler} className="space-y-10">

                    {/* JOURNAL TITLE */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 font-medium">Journal Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your journal title..."
                            className="
                                w-full px-4 py-3 bg-white/80 
                                border border-gray-300 rounded-xl
                                shadow-sm focus:ring-2 focus:ring-[#0A5244]/40 
                                focus:border-[#0A5244] transition
                            "
                        />
                    </div>

                    {/* DIFFICULTY + EFFORT */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <label className="text-sm text-gray-600 font-medium">
                                Difficulty (1–5)
                            </label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(Number(e.target.value))}
                                className="
                                    w-full px-4 py-3 bg-white/80 border border-gray-300 
                                    rounded-xl shadow-sm focus:ring-2 focus:ring-[#0A5244]/40
                                "
                            >
                                {options.map((o) => <option key={o}>{o}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-medium">
                                Time Effort (1–5)
                            </label>
                            <select
                                value={effort}
                                onChange={(e) => setEffort(Number(e.target.value))}
                                className="
                                    w-full px-4 py-3 bg-white/80 border border-gray-300 
                                    rounded-xl shadow-sm focus:ring-2 focus:ring-[#0A5244]/40
                                "
                            >
                                {options.map((o) => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* TAG SELECTOR */}
                    <div>
                        <label className="text-sm text-gray-600 font-medium">Select Tag</label>

                        <div className="flex flex-wrap gap-3 mt-2">
                            {tags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setSelectedTag(tag)}
                                    className={`
                                        px-4 py-2 rounded-full text-sm transition border
                                        ${selectedTag === tag
                                            ? "bg-[#0A5244] text-white shadow-md scale-[1.05]"
                                            : "bg-white text-[#0A5244] border-[#0A5244]/40 hover:bg-[#0A5244]/10"
                                        }
                                    `}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* EDITOR */}
                    <div>
                        <label className="text-sm text-gray-600 font-medium">
                            What did you learn today?
                        </label>

                        <div className="
                            bg-white/80 border border-gray-300 rounded-2xl 
                            shadow-inner p-2
                        ">
                            <ReactQuill
                                value={content}
                                onChange={handleEditorChange}
                                theme="snow"
                                placeholder="Write your insights, breakthroughs, struggles…"
                                modules={quillModules}
                                className="auto-expand-editor"
                            />
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-end gap-4 pt-6">
                        <button
                            type="reset"
                            className="
                                px-6 py-2 rounded-full bg-gray-100 text-gray-700 
                                hover:bg-gray-200 transition shadow-sm
                            "
                        >
                            Clear
                        </button>

                        <button
                            type="submit"
                            className="
                                px-8 py-2 rounded-full bg-[#0A5244] text-white 
                                hover:bg-[#094c3e] shadow-md transition text-lg
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
