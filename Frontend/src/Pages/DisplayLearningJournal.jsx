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
            bg-linear-to-br from-[#8debca] via-white to-[#57e9bb]
            flex justify-center items-start
        ">
            <div className="
                w-full max-w-4xl 
                bg-white/70 backdrop-blur-2xl 
                rounded-3xl p-8 shadow-2xl border border-white/40
            ">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#0A5244] hover:opacity-70 mb-6"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back</span>
                </button>

                {/* Title */}
                <h1 className="text-4xl font-bold text-[#064E3B] mb-3 tracking-tight">
                    {journal?.title}
                </h1>

                {/* Date + Tag */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-600 text-sm font-medium">
                        {new Date(journal?.date).toDateString()}
                    </p>
                    <span className="
                        px-3 py-1 rounded-full text-xs font-semibold 
                        bg-emerald-100 text-emerald-700 border border-emerald-300
                    ">
                        {journal?.tag}
                    </span>
                </div>

                {/* STAT BLOCKS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">

                    {/* Difficulty */}
                    <div className="
                        p-4 bg-gradient-to-br from-orange-50 to-orange-100 
                        rounded-2xl border border-orange-200 shadow 
                        hover:shadow-md transition
                    ">
                        <p className="text-xs text-orange-700 font-semibold mb-1">Difficulty</p>
                        <div className="flex items-center gap-2">
                            <Flame className="text-orange-600" size={20} />
                            <span className="font-bold text-gray-800 text-xl">
                                {journal?.difficulty}/5
                            </span>
                        </div>
                    </div>

                    {/* Effort */}
                    <div className="
                        p-4 bg-gradient-to-br from-blue-50 to-blue-100 
                        rounded-2xl border border-blue-200 shadow 
                        hover:shadow-md transition
                    ">
                        <p className="text-xs text-blue-700 font-semibold mb-1">Effort</p>
                        <div className="flex items-center gap-2">
                            <Gauge className="text-blue-600" size={20} />
                            <span className="font-bold text-gray-800 text-xl">
                                {journal?.timeRate}/5
                            </span>
                        </div>
                    </div>

                    {/* XP */}
                    <div className="
                        p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 
                        rounded-2xl border border-yellow-200 shadow 
                        hover:shadow-md transition
                    ">
                        <p className="text-xs text-yellow-700 font-semibold mb-1">XP Gained</p>
                        <div className="flex items-center gap-2">
                            <Star className="text-yellow-600" size={20} />
                            <span className="font-bold text-gray-800 text-xl">
                                {journal?.xp} XP
                            </span>
                        </div>
                    </div>

                </div>

                {/* AI EVALUATION */}
                <div className="
                    mb-12 p-8 
                    bg-white/95 backdrop-blur-xl 
                    rounded-3xl border border-gray-200 shadow-xl
                ">
                    <h2 className="text-3xl font-semibold text-[#0A5244] mb-8 flex items-center gap-3">
                        <Star className="text-yellow-500" size={26} />
                        AI Evaluation
                    </h2>

                    {/* Rating */}
                    <div className="mb-10">
                        <p className="text-xs text-gray-500 mb-3 font-semibold">Overall Rating</p>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={`${i < journal?.aiRating
                                            ? "text-yellow-500 drop-shadow-sm"
                                            : "text-gray-300"
                                            }`}
                                        fill={i < journal?.aiRating ? "#FBBF24" : "none"}
                                    />
                                ))}
                            </div>
                            <span className="text-xl font-bold text-gray-700">
                                {journal?.aiRating}/10
                            </span>
                        </div>
                    </div>

                    {/* AI Reason */}
                    <div className="mb-10">
                        <p className="text-xs text-gray-500 font-semibold mb-2">AI Explanation</p>

                        <div className="
                            p-5 bg-green-50 border border-green-200 
                            rounded-xl shadow-sm
                        ">
                            <p className="text-gray-700 leading-relaxed font-medium">
                                {journal?.aiReason}
                            </p>
                        </div>
                    </div>

                    {/* Honest Review */}
                    <div className="mb-10">
                        <p className="text-xs text-gray-500 font-semibold mb-2">Honest Review</p>

                        <div className="
                            p-5 bg-white border border-gray-200 rounded-xl shadow-sm
                        ">
                            <p className="text-gray-700 leading-relaxed font-medium">
                                {journal?.honestReview}
                            </p>
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
                                    <p className="text-gray-700 font-medium leading-relaxed">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* JOURNAL CONTENT */}
                <div className="
                    p-8 bg-white/95 rounded-3xl border border-gray-200 shadow-xl
                ">
                    <h2 className="text-3xl font-semibold text-[#0A5244] mb-8">
                        Your Journal Entry
                    </h2>

                    {/* Full Notes */}
                    <div>
                        <p className="text-xs text-gray-500 font-semibold mb-2">Written Notes</p>

                        <div className="
                            p-6 bg-white border border-gray-200 rounded-2xl shadow-inner
                            prose prose-green max-w-none
                        ">
                            <div
                                className="quill-content"
                                dangerouslySetInnerHTML={{ __html: journal?.note }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
