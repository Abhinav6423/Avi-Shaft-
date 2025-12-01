import React from "react";
import { StickyNote } from "lucide-react";


export default function DashboardQuickNoteCard({ title, note, date = Date.now(), _id, tag }) {

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };


  return (
    <div
      className="
        w-full 
        bg-white 
        border border-[#E5E7EB] 
        rounded-xl 
        p-5 
        shadow-sm 
        hover:shadow-md 
        transition
      "
    >
      {/* Header Icon */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-9 w-9 rounded-lg bg-[#E6F4EF] flex items-center justify-center">
          <StickyNote size={18} className="text-[#0A5244]" />
        </div>

        <span className="text-sm font-medium bg-gray-400 p-1 rounded-2xl  text-white">{tag}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-[#111827]">{title}</h3>

      {/* Note Content */}
      <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
        <p>{stripHtml(note).slice(0, 50)}...</p>

      </p>
    </div>
  );
}
