import React, { useEffect, useState } from "react";
import { Flame, Gauge, Star, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { openLearningJournal } from "../Api-Calls/openLearningJournal.js";
import Loader from "../Components/Loader.jsx";

export default function ViewLearningJournal() {
    const navigate = useNavigate();
    const { journalId } = useParams();

    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchJournal = async () => {
        try {
            const result = await openLearningJournal(journalId);
            if (result.status) setJournal(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJournal();
    }, []);

    if (loading || !journal) return <Loader />;

    return (
        <div className="
            min-h-screen w-full p-5 
            bg-gradient-to-br from-[#E9FFF6] via-white to-[#D8FAEE]
            flex justify-center items-start
        ">
            <div className="
                w-full max-w-4xl 
                bg-white/70 backdrop-blur-2xl 
                rounded-3xl p-10 shadow-xl 
                border border-white/40
            ">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#0A5244] hover:opacity-70 mb-6"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back</span>
                </button>

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-[#064E3B] leading-tight tracking-tight mb-3">
                    {journal?.title}
                </h1>

                {/* Date + Tag */}
                <div className="flex items-center justify-between mb-8">
                    <span className="text-gray-600 text-sm font-medium">
                        {new Date(journal?.createdAt).toDateString()}
                    </span>

                    <span className="
                        px-4 py-1.5 rounded-full text-xs font-semibold
                        bg-emerald-100 text-emerald-700 border border-emerald-300
                    ">
                        {journal?.tag}
                    </span>
                </div>

                {/* --- STATS BAR (Minimal + Soft) --- */}
                <div className="
                    grid grid-cols-3 gap-4 mb-12
                    bg-white/60 backdrop-blur-xl 
                    rounded-2xl p-5 shadow-inner border border-gray-100
                ">
                    {/* Difficulty */}
                    <div className="flex flex-col items-center">
                        <Flame className="text-orange-500 mb-1" size={20} />
                        <p className="text-gray-700 text-sm font-medium">Difficulty</p>
                        <span className="text-lg font-semibold text-gray-900">{journal?.difficulty}/5</span>
                    </div>

                    {/* Effort */}
                    <div className="flex flex-col items-center">
                        <Gauge className="text-blue-500 mb-1" size={20} />
                        <p className="text-gray-700 text-sm font-medium">Effort</p>
                        <span className="text-lg font-semibold text-gray-900">{journal?.timeRate}/5</span>
                    </div>

                    {/* XP */}
                    <div className="flex flex-col items-center">
                        <Star className="text-yellow-500 mb-1" size={20} />
                        <p className="text-gray-700 text-sm font-medium">XP Earned</p>
                        <span className="text-lg font-semibold text-gray-900">{journal?.xp} XP</span>
                    </div>
                </div>

                {/* ===================== JOURNAL ENTRY ===================== */}
                <section className="mb-14">
                    <h2 className="text-2xl font-semibold text-[#0A5244] mb-4">Your Journal Entry</h2>

                    <div className="
                        p-7 rounded-2xl bg-white
                        border border-gray-200 shadow-inner
                        prose prose-green max-w-none leading-relaxed
                    ">
                        <div
                            className="journal-content"
                            dangerouslySetInnerHTML={{ __html: journal?.note }}
                        />
                    </div>
                </section>

                {/* ===================== AI EVALUATION ===================== */}
                <section className="
                    p-8 bg-white/90 backdrop-blur-xl 
                    rounded-3xl border border-gray-200 shadow-lg
                ">
                    <h2 className="text-3xl font-semibold text-[#0A5244] mb-8 flex items-center gap-3">
                        <Star className="text-yellow-500" size={26} />
                        AI Evaluation
                    </h2>

                    {/* Rating */}
                    <div className="mb-10">
                        <p className="text-xs text-gray-500 font-semibold mb-3">Overall Rating</p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={`${i < journal?.aiRating ? "text-yellow-500" : "text-gray-300"}`}
                                        fill={i < journal?.aiRating ? "#FACC15" : "none"}
                                    />
                                ))}
                            </div>
                            <span className="text-xl font-bold text-gray-700">
                                {journal?.aiRating}/10
                            </span>
                        </div>
                    </div>

                    {/* AI Explanation */}
                    <div className="mb-10">
                        <p className="text-xs text-gray-500 font-semibold mb-2">AI Explanation</p>
                        <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm">
                            <p className="text-gray-700 leading-relaxed">{journal?.aiReason}</p>
                        </div>
                    </div>

                    {/* Honest Review */}
                    <div className="mb-10">
                        <p className="text-xs text-gray-500 font-semibold mb-2">Honest Review</p>
                        <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
                            <p className="text-gray-700 leading-relaxed">{journal?.honestReview}</p>
                        </div>
                    </div>

                    {/* Improvements */}
                    <div>
                        <p className="text-xs text-gray-500 font-semibold mb-2">Suggested Improvements</p>

                        <div className="space-y-4">
                            {journal?.improvement?.map((item, index) => (
                                <div
                                    key={index}
                                    className="
                                        flex items-start gap-3 p-4 
                                        bg-gradient-to-r from-green-50 to-white
                                        border border-green-200 
                                        rounded-xl shadow-sm
                                    "
                                >
                                    <CheckCircle size={20} className="text-green-600 mt-1" />
                                    <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
