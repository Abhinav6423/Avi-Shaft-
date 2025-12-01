import React, { useState } from "react";
import { Navtabs } from "../../utils/Navtabs";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../../Context/authContext";
import { Logout } from "../../Api-Calls/Logout";
import { Link, Links, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { userData } = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const result = await Logout()

            if (result) {
                navigate("/login")
            }
            else {
                alert("Something went wrong")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <nav className="w-full fixed z-50 top-0 bg-[#0A5244] text-white px-5 sm:px-10 py-3 shadow-md border-b border-black/10">

            <div className="flex items-center justify-between">

                {/* Left: Logo */}
                <Link to={"/dashboard"}>
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-white/10 rounded-xl flex items-center justify-center font-semibold text-sm">
                            TS
                        </div>
                        <span className="font-medium text-lg tracking-tight hidden sm:block text-white/90">
                            TalentaSync
                        </span>
                    </div>

                </Link>
                {/* Mobile Menu Toggle */}
                <button
                    className="sm:hidden text-white"
                    onClick={() => setOpen(!open)}
                >
                    <Menu size={24} />
                </button>

                {/* Desktop Tabs */}
                <div className="hidden sm:flex items-center gap-3">

                    {Navtabs.map((tab, index) => (
                        <Link to={`/${tab.link}`} key={index}>
                            <div

                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition cursor-pointer
                                ${tab.active
                                        ? "bg-white/15 text-white border border-white/25 shadow-sm"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.name}
                            </div>
                        </Link>
                    ))}


                </div>

                {/* Right: User + Logout */}
                <div className="hidden sm:flex items-center gap-4">

                    {/* User Info */}
                    <div className="flex items-center gap-2">
                        <img
                            src={userData?.profilePic}
                            alt="profile"
                            className="h-9 w-9 rounded-full border border-white/30 object-cover object-top"
                        />
                        <div className="text-sm leading-tight text-white">
                            <p className="font-medium text-white">{userData?.username}</p>
                            <p className="text-xs text-white/60 -mt-0.5">Product Manager</p>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1.5 rounded-md text-sm flex items-center gap-1 border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {open && (
                <div className="sm:hidden mt-4 flex flex-col gap-3 bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-lg">

                    {Navtabs.map((tab, index) => (
                        <Link to={`/${tab.link}`} key={index}>
                            <div

                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                                ${tab.active
                                        ? "bg-white/20 text-white border border-white/30"
                                        : "text-white/70 hover:bg-white/10"
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.name}
                            </div>
                        </Link>
                    ))}

                    {/* Mobile Logout */}
                    <button
                        onClick={handleLogout}
                        className="mt-2 px-3 py-2 rounded-md text-sm flex items-center gap-1 border border-white/30 text-white/80 hover:bg-white/10 hover:text-white transition">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}
