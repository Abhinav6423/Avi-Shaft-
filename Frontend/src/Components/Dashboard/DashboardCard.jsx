import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function DashboardCard({ Icon, value, label }) {
  return (
    <div
      className="
        w-full 
        rounded-3xl 
        p-6 
        bg-white/60
        backdrop-blur-xl
        border border-white/40
        shadow-[0_8px_25px_rgba(0,0,0,0.05)]
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]
        transition-all 
        duration-300 
        hover:-translate-y-1
        relative
        overflow-hidden
      "
    >
      {/* Glow Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 to-transparent pointer-events-none" />

      {/* Top Row */}
      <div className="flex justify-between items-center relative z-10">
        <div
          className="
            h-12 w-12 
            rounded-2xl 
            bg-gradient-to-br from-emerald-200/60 to-emerald-100/40
            flex items-center justify-center
            shadow-inner
          "
        >
          <Icon size={22} className="text-emerald-700 drop-shadow-sm" />
        </div>

        <button
          className="
            h-9 w-9 
            rounded-xl 
            bg-white/40 
            backdrop-blur-md
            flex items-center justify-center
            transition-all 
            hover:bg-white/70
            hover:shadow
          "
        >
          <ArrowUpRight size={18} className="text-emerald-700" />
        </button>
      </div>

      {/* Value */}
      <div className="mt-4 relative z-10">
        <p className="text-4xl font-bold text-gray-900 tracking-tight">
          {value}
        </p>
      </div>

      {/* Label */}
      <p className="text-sm font-semibold text-emerald-800 mt-1 opacity-80 relative z-10 tracking-wide">
        {label.replace("total", "")}
      </p>
    </div>
  );
}
