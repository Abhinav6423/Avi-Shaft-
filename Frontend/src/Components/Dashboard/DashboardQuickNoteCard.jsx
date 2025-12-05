import React from "react";
import { StickyNote } from "lucide-react";

export default function DashboardQuickNoteCard({ title, note, date = Date.now(), tag }) {
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div
      className="
                w-full 
                bg-white 
                border border-gray-200 
                rounded-2xl 
                p-5 
                shadow-sm 
                hover:shadow-md 
                active:scale-[0.98]
                transition-all duration-200 
                touch-pan-y
            "
    >
      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        {/* Icon */}
        <div className="h-10 w-10 rounded-xl bg-[#E6F4EF] flex items-center justify-center shadow-inner">
          <StickyNote size={20} className="text-[#0A5244]" />
        </div>

        {/* Tag Badge */}
        <span
          className="
                        text-xs 
                        font-semibold 
                        px-3 py-1 
                        rounded-full 
                        bg-[#0A5244]/10 
                        text-[#0A5244]
                        capitalize
                    "
        >
          {tag || "note"}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
        {title}
      </h3>

      {/* Note Preview */}
      <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
        {stripHtml(note)}
      </p>
    </div>
  );
}
