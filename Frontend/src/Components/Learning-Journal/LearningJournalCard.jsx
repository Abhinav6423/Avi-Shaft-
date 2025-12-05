import React from "react";
import { FileText, Flame, Gauge } from "lucide-react";

export default function LearningJournalCard({
    title,
    note,
    date,
    tag,
    difficulty,
    effort,
}) {

    return (
        <div className="
            bg-white/70 backdrop-blur-xl
            rounded-3xl p-5 border border-white/40 shadow-lg 
            hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer
        ">

            {/* Top Row: Icon + Tag */}
            <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center shadow-inner">
                    <FileText className="text-green-700" size={20} />
                </div>

                <span className="
                    px-3 py-1 rounded-full text-xs font-medium 
                    bg-green-50 text-green-700 border border-green-200
                ">
                    {tag}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                {title}
            </h3>

            {/* Description */}
            <div
                className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2"
                dangerouslySetInnerHTML={{ __html: note }}
            ></div>


            {/* Depth Indicators */}
            <div className="flex items-center gap-5 mb-4">

                {/* Difficulty */}
                <div className="flex items-center gap-2">
                    <Flame className="text-orange-500" size={16} />
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                            <div
                                key={lvl}
                                className={`
                                    w-2 h-2 rounded-full
                                    ${lvl <= difficulty ? "bg-orange-500" : "bg-gray-300"}
                                `}
                            />
                        ))}
                    </div>
                </div>

                {/* Effort */}
                <div className="flex items-center gap-2">
                    <Gauge className="text-blue-600" size={16} />
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                            <div
                                key={lvl}
                                className={`
                                    w-2 h-2 rounded-full
                                    ${lvl <= effort ? "bg-blue-600" : "bg-gray-300"}
                                `}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Gradient Depth Bar */}
            <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden mb-4">
                <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600"
                    style={{ width: `${(difficulty * effort) * 4}%` }} // depth score
                />
            </div>

            {/* Footer */}
            <p className="text-gray-400 text-xs">
                {new Date(date).toLocaleDateString()}
            </p>
        </div>
    );
}
