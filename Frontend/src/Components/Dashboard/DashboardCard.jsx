import React from "react";
import { ArrowUpRight } from "lucide-react"; // optional icon, remove if not using lucide

export default function DashboardCard({ icon: Icon, value, change, label }) {
  // dummy data
  const data = {
    icon: "💼",
    value: 310,
    change: "+8.72%",
    label: "Total Employees",
  };

  return (
    <div className="w-full bg-[#FFFF] rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.06)]
 border hover:bg-[#F9FAFB] border-[#E5E7EB] p-4 flex flex-col gap-3">

      {/* Top Icons */}
      <div className="flex justify-between items-center">
        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl">
          <Icon size={18} bgColor="#475569" />
        </div>

        <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <ArrowUpRight size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Number + Percentage */}
      <div className="flex items-center gap-3">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>

        <span className="text-sm px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
          {change}
        </span>
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-gray-500">{label}</p>
    </div>
  );
}
