import React, { useState } from "react";
import DashboardProjectCard from "../../Components/Dashboard/DashboardProjectCard";
import { DashboardProjects } from "../../utils/DashboardProjects";

export default function DashboardProjectLayout() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="container mx-auto px-5 py-10">

            {/* Heading */}
            <h2 className="text-2xl font-semibold text-[#111827] mb-6">
                Your Current Projects
            </h2>

            {/* MOBILE VIEW: Horizontal scroll */}
            <div className="sm:hidden overflow-x-auto snap-x snap-mandatory flex gap-5 pb-4">
                {DashboardProjects.map((item, idx) => (
                    <div
                        key={idx}
                        className="min-w-[90%] snap-center"
                    >
                        <DashboardProjectCard {...item} />
                    </div>
                ))}
            </div>

            {/* DESKTOP GRID VIEW */}
            <div
                className="
                    hidden sm:grid
                    grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-5 
                    gap-6
                "
            >
                {DashboardProjects.map((item, idx) => (
                    <DashboardProjectCard key={idx} {...item} />
                ))}
            </div>



            {/* Pagination Dots (MOBILE ONLY) */}
            <div className="hidden sm:flex justify-center mt-4 gap-2">
                {DashboardProjects.map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 w-2 rounded-full transition 
                                       ${i === activeIndex ? "bg-gray-800" : "bg-gray-300"}`}
                    />
                ))}
            </div>

        </div>
    );
}
