import React from "react";
import { Sparkles, Star, Flame } from "lucide-react";

export default function UserXPCard({ level, xp, xpNeeded }) {
    const progress = Math.min((xp / xpNeeded) * 100, 100);

    return (
        <div className="
      w-full 
      relative 
      p-6 
      rounded-3xl 
      overflow-hidden
      bg-gradient-to-br from-[#0A5244] via-[#0F6A56] to-[#128F72]
      shadow-[0_8px_24px_rgba(0,0,0,0.15)]
      text-white
      border border-white/10
      backdrop-blur-xl
      transition-all duration-300
      hover:shadow-[0_12px_32px_rgba(0,0,0,0.20)]
    ">

            {/* Floating Sparkles */}
            <Sparkles className="absolute top-4 right-4 text-white/50" size={26} />

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
                <div className="
          h-12 w-12 
          rounded-2xl 
          bg-white/20 
          flex items-center justify-center 
          backdrop-blur-md
          shadow-inner
        ">
                    <Star size={26} className="text-yellow-300 drop-shadow" />
                </div>

                <div>
                    <p className="text-lg opacity-80 tracking-wide">Current Level</p>
                    <h2 className="text-3xl font-extrabold tracking-tight">Lv. {level}</h2>
                </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-4">
                <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
                    <div
                        className="
              h-full 
              bg-gradient-to-r 
              from-yellow-300 
              via-emerald-300
              to-green-400
              shadow-[0_0_12px_rgba(255,255,255,0.6)]
              transition-all duration-500
            "
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* XP numbers */}
                <div className="flex justify-between mt-2 text-sm">
                    <p className="opacity-90">
                        <span className="font-semibold text-yellow-300">{xp}</span> XP earned
                    </p>
                    <p className="opacity-90">
                        <span className="font-semibold text-yellow-300">{xpNeeded - xp}</span> XP to next level
                    </p>
                </div>
            </div>

            {/* Motivational Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 
        rounded-full bg-white/15 backdrop-blur-lg border border-white/20">
                <Flame size={18} className="text-yellow-300 animate-pulse" />
                <span className="text-sm font-medium tracking-wide">
                    You're leveling up fast!
                </span>
            </div>
        </div>
    );
}
