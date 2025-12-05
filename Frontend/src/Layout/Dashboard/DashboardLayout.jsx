import React, { useState, useEffect } from "react";
import DashboardCard from "../../Components/Dashboard/DashboardCard";
import Navbar from "../../Components/Dashboard/Navbar";
import GreenStrip from "../../Components/Dashboard/GreetingStrip";
import DashboardQuickNoteLayout from "./DashboardQuickNoteLayout";
import DashboardProjectLayout from "./DashboardProjectLayout";
import { getUserStats } from "../../Api-Calls/getUserStats.js";
import { ICON_MAP } from "../../utils/IconMap.jsx";
import UserXPCard from "../../Components/Dashboard/UserXpCard.jsx";
import { useAuth } from "../../Context/authContext.js";
import Loader from "../../Components/Loader.jsx";

export default function DashboardLayout() {
    const [statscard, setStatscard] = useState([]);
    const [loader, setLoader] = useState(true);
    const { userData } = useAuth();

    const getStats = async () => {
        try {
            const result = await getUserStats();
            if (result.status) {
                const stats = result.data;

                const formatted = Object.keys(stats).map((key) => ({
                    key: key.charAt(0).toUpperCase() + key.slice(1),
                    value: stats[key],
                    Icon: ICON_MAP[key]
                }));

                setStatscard(formatted);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        getStats();
    }, []);

    if (loader) return <Loader />;

    return (
        <div
            className="
                min-h-screen py-4
                bg-gradient-to-br from-[#F4FFF9] via-[#F9FFFD] to-[#E4F7EF]
            "
        >

            {/* ===================== HEADER SECTION ===================== */}
            <div
                className="
                    bg-gradient-to-br 
                    from-[#DFF8EE] via-[#ECFFFA] to-[#CFF3E8]
                    rounded-b-3xl 
                    shadow-md 
                    pb-20
                    border-b border-[#CFEDE2]
                "
            >
                <Navbar />

                {/* Greeting Section */}
                <div className="pt-10 container mx-auto px-5">
                    <GreenStrip small />
                </div>
            </div>

            {/* ===================== DASHBOARD CARDS ===================== */}
            <div className="-mt-12 pb-10">
                <div className="container mx-auto px-5">
                    <div
                        className="
                            grid 
                            grid-cols-1 
                            sm:grid-cols-2 
                            md:grid-cols-3 
                            lg:grid-cols-4 
                            xl:grid-cols-5 
                            gap-6
                        "
                    >
                        {statscard.map((card, idx) => (
                            <DashboardCard
                                key={idx}
                                value={card.value}
                                Icon={card.Icon}
                                label={card.key}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ===================== XP / LEVEL SECTION ===================== */}
            <div className="pb-10">
                <div className="container mx-auto px-5">
                    <UserXPCard
                        level={userData?.level}
                        xp={userData?.totalXpGained}
                        xpNeeded={userData?.xpToNextLevel}
                    />
                </div>
            </div>

            {/* ===================== QUICK NOTES ===================== */}
            <DashboardQuickNoteLayout />

            {/* ===================== PROJECTS ===================== */}
            <DashboardProjectLayout />
        </div>
    );
}
