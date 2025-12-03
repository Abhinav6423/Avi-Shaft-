import React from "react";
import DashboardCard from "../../Components/Dashboard/DashboardCard";
import Navbar from "../../Components/Dashboard/Navbar";
import GreenStrip from "../../Components/Dashboard/GreetingStrip";
import { DashboardCardWidgets } from "../../utils/DashboardCardWidgets";
import DashboardQuickNoteLayout from "./DashboardQuickNoteLayout";
import DashboardProjectLayout from "./DashboardProjectLayout";
import { getUserStats } from "../../Api-Calls/getUserStats.js";
import { useState } from "react";
import { useEffect } from "react";
import { ICON_MAP } from "../../utils/IconMap.jsx";
import UserXPCard from "../../Components/Dashboard/UserXpCard.jsx";
import { useAuth } from "../../Context/authContext.js";
import Loader from "../../Components/Loader.jsx";
const DashboardLayout = () => {

    const [statscard, setStatscard] = useState([]);
    const [loader, setLoader] = useState(true)

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
            setLoader(false)
        }
    };



    useEffect(() => {
        getStats();
    }, [])

    if (loader) {
        return <Loader />
    }

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
                        {statscard.map((card, idx) => (
                            <DashboardCard key={idx}
                                value={card.value}
                                Icon={card.Icon}
                                label={card.key} />
                        ))}
                    </div>
                </div>
            </div>

            {/* XP / LEVEL SECTION */}
            <div className=" pb-6">
                <div className="container mx-auto px-5">
                    <UserXPCard
                        level={userData?.level}
                        xp={userData?.totalXpGained}
                        xpNeeded={userData?.xpToNextLevel}
                    />
                </div>
            </div>

            {/* OTHER SECTIONS */}
            <DashboardQuickNoteLayout />
            <DashboardProjectLayout />
        </div>
    );
};

export default DashboardLayout;
