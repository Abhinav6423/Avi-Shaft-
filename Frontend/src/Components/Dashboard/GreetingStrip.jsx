import { PlusCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/authContext";

export default function GreenStrip({ small }) {
    const { userData } = useAuth();

    return (
        <div className="flex items-center justify-between w-full">
            
            {/* LEFT SIDE – Pastel Header */}
            <div
                className={`
                
                    w-full 
                    rounded-b-3xl
                    px-6 sm:px-10
                    flex flex-col gap-1
                    
                    ${small ? "pt-6 pb-7" : "pt-10 pb-12"}
                `}
            >
                <p className="text-sm font-medium text-emerald-700/70">
                    Good Day,
                </p>

                <h1 className="text-3xl font-semibold text-emerald-800 tracking-tight">
                    {userData?.username}
                </h1>
            </div>

            {/* RIGHT SIDE – Action Buttons */}
            <div className="flex flex-col gap-2 pl-3">

                {/* Explore Learnings Button */}
                <Link to={"/create-journal"}>
                    <button
                        className="
                            flex items-center gap-2 
                            bg-white 
                            border border-emerald-200 
                            text-emerald-700
                            px-4 py-1.5 
                            rounded-full 
                            text-sm font-medium
                            shadow-sm
                            hover:bg-emerald-50
                            transition
                        "
                    >
                        <span>Explore</span>
                        <span>Learnings</span>
                    </button>
                </Link>

                {/* Quick Note Button */}
                <Link to={"/create-quicknote"}>
                    <button
                        className="
                            flex items-center gap-2 
                            bg-white 
                            border border-emerald-200
                            text-emerald-700
                            px-4 py-[6px] 
                            rounded-full 
                            text-sm font-medium
                            shadow-sm
                            hover:bg-emerald-50 
                            transition
                        "
                    >
                        <PlusCircle size={16} />
                        <span>Quick Note</span>
                    </button>
                </Link>
            </div>

        </div>
    );
}
