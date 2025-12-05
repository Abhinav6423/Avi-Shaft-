import React from "react";
import { Sparkles, Star, Flame } from "lucide-react";

export default function UserXPCard({ level, xp, xpNeeded }) {
    const progress = Math.min((xp / xpNeeded) * 100, 100);

    return (
        <div
            className="
                w-full 
                relative 
                p-6 
                rounded-3xl 
                overflow-hidden
                bg-gradient-to-br from-[#E8FFF6] via-[#F7FFFB] to-[#DBF7EE]
                border border-[#CFEDE2]
                shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                transition-all duration-300
                hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]
            "
        >
            {/* Soft floating sparkles */}
            <Sparkles
                className="absolute top-4 right-4 text-emerald-500/30"
                size={24}
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div
                    className="
                        h-12 w-12 
                        rounded-2xl 
                        bg-emerald-100 
                        flex items-center justify-center 
                        border border-emerald-200
                        shadow-inner
                    "
                >
                    <Star size={26} className="text-yellow-500 drop-shadow-sm" />
                </div>

                <div>
                    <p className="text-sm text-emerald-600 font-medium tracking-wide">
                        Current Level
                    </p>
                    <h2 className="text-3xl font-bold text-emerald-700">
                        Lv. {level}
                    </h2>
                </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-3">
                <div className="w-full bg-emerald-100 h-3 rounded-full overflow-hidden">
                    <div
                        className="
                            h-full 
                            rounded-full
                            bg-gradient-to-r 
                            from-yellow-300 
                            via-emerald-300 
                            to-emerald-400
                            transition-all duration-500
                            shadow-[0_0_10px_rgba(0,0,0,0.1)]
                        "
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* XP text */}
                <div className="flex justify-between mt-2 text-xs sm:text-sm">
                    <p className="text-emerald-700">
                        <span className="font-semibold text-yellow-600">{xp}</span> XP earned
                    </p>
                    <p className="text-emerald-700">
                        <span className="font-semibold text-yellow-600">{xpNeeded - xp}</span> XP to next level
                    </p>
                </div>
            </div>

            {/* Motivational Badge */}
            <div
                className="
                    mt-5 inline-flex items-center gap-2 px-4 py-2 
                    rounded-full bg-white border border-emerald-100 
                    shadow-sm
                "
            >
                <Flame size={18} className="text-emerald-500 animate-pulse" />
                <span className="text-sm text-emerald-700 font-medium">
                    You're improving every day ✨
                </span>
            </div>
        </div>
    );
}
