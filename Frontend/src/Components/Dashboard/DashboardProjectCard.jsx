import React from "react";

export default function DashboardProjectCard({ tag, title, description, location, time }) {
    return (
        <div className="
        w-full 
        bg-white 
        border border-[#E5E7EB] 
        rounded-xl 
        p-5 
        shadow-sm 
        hover:shadow-md 
        transition
    ">

            {/* Tag */}
            <div className="flex items-center justify-between mb-3">
                <span className="
            px-2.5 
            py-1 
            text-xs 
            rounded-lg 
            bg-[#E6F4EF]        /* soft mint */
            text-[#0A5244]      /* brand teal */
            font-medium
        ">
                    {tag}
                </span>
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-[#111827] leading-snug">
                {title}
            </h2>

            {/* Description */}
            <p className="text-sm text-[#6B7280] mt-1 leading-relaxed">
                {description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 text-sm text-[#6B7280]">
                <span>{location}</span>
                <span>{time}</span>
            </div>

        </div>
    );
}
