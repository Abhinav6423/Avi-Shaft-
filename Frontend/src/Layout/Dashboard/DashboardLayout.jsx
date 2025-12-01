import React from "react";
import DashboardCard from "../../Components/Dashboard/DashboardCard";
import Navbar from "../../Components/Dashboard/Navbar";
import GreenStrip from "../../Components/Dashboard/GreetingStrip";
import { DashboardCardWidgets } from "../../utils/DashboardCardWidgets";
import DashboardQuickNoteLayout from "./DashboardQuickNoteLayout";
import DashboardProjectLayout from "./DashboardProjectLayout";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-[#F3F7F4]"
            style={{
                backgroundImage: `url(')`,
                backgroundSize: "cover",
                backgroundPosition: "center",

            }}>

            {/* HEADER SECTION (Navbar + Greeting) */}
            <div className="bg-[#0A5244] pb-16 rounded-b-3xl shadow-xl">

                {/* Navbar (sits inside the green header) */}
                <Navbar />

                {/* Greeting */}
                <div className="pt-16">
                    <div className="container mx-auto px-5">
                        <GreenStrip small />
                    </div>
                </div>
            </div>

            {/* DASHBOARD CARDS GRID */}
            <div className="-mt-12 pb-6">
                <div className="container mx-auto px-5">
                    <div
                        className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4 
                        xl:grid-cols-5 
                        gap-8
                    "
                    >
                        {DashboardCardWidgets.map((card, idx) => (
                            <DashboardCard key={card.label} {...card} />
                        ))}
                    </div>
                </div>
            </div>

            {/* OTHER SECTIONS */}
            <DashboardQuickNoteLayout />
            <DashboardProjectLayout />
        </div>
    );
};

export default DashboardLayout;
