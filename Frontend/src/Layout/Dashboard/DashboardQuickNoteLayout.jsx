import React, { useState, useEffect, useRef } from "react";
import DashboardQuickNoteCard from "../../Components/Dashboard/DashboardQuickNoteCard";
import { getAllQuickNote } from "../../Api-Calls/getAllQuickNote.js"
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader.jsx"

export default function DashboardQuickNoteLayout() {



    const [activeIndex, setActiveIndex] = useState(0);
    const [totalNotes, setTotalNotes] = useState(0);
    const [page, setPage] = useState(1)
    const [tag, setTag] = useState()
    const [limit, setLimit] = useState(5)

    const [loading, setLoading] = useState(true);
    const [quickNotes, setQuickNotes] = useState([]);



    const totalPages = Math.ceil(totalNotes / limit);


    const scrollRef = useRef(null);

    // Fetch API
    const fetchQuickNotes = async () => {
        setLoading(true);
        setQuickNotes([]);
        try {
            const res = await getAllQuickNote(tag, page, limit);

            if (res.status) {
                setTotalNotes(res?.data?.pagination?.totalNotes || 0);
                console.log(res?.data?.pagination?.totalNotes)
                setQuickNotes(res?.data?.data || []);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuickNotes();
    }, [page, tag, limit]);

    // Handle scroll for mobile active index
    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollLeft = container.scrollLeft;
        const width = container.clientWidth;

        const index = Math.round(scrollLeft / width);
        setActiveIndex(index);
    };

    if (loading) return <Loader />;

    return (
        <div className="container mx-auto px-4 py-6">

            {/* Heading */}
            <h2 className="text-2xl font-semibold mb-4">Quick Notes</h2>

            {/* Filter Dropdown */}
            <div className="mb-4 flex gap-3 items-center">
                <label className="text-sm font-medium">Filter:</label>

                <select
                    value={tag || ""}
                    onChange={(e) => {
                        setPage(1); // Reset to page 1 whenever filter changes
                        setTag(e.target.value || undefined);
                    }}
                    className="border px-3 py-2 rounded-md text-sm"
                >
                    <option value="">All</option>
                    <option value="work">Work</option>
                    <option value="creative-work">Creative Work</option>
                    <option value="personal">Personal</option>
                </select>
            </div>


            {/* MOBILE VIEW — Horizontal Scroll */}
            {/* MOBILE VIEW — Horizontal Scroll */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="
        sm:hidden 
        overflow-x-auto 
        snap-x snap-mandatory 
        flex gap-6 
        pb-4 pt-2 
        px-4 
        scroll-smooth
    "
            >
                {quickNotes.map((item, idx) => (
                    <Link key={item._id} to={`/single-note/${item._id}`}>
                        <div
                            className="
                    min-w-[85%] 
                    snap-center 
                    bg-white 
                    rounded-2xl 
                    shadow-md 
                    overflow-hidden 
                    border border-gray-100
                "
                        >
                            <DashboardQuickNoteCard {...item} />
                        </div>
                    </Link>
                ))}
            </div>


            {/* DESKTOP VIEW — Grid */}
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
                {quickNotes.map((item, idx) => (

                    <Link to={`/single-note/${item._id}`}>
                        <DashboardQuickNoteCard key={idx} {...item} />
                    </Link>

                ))}
            </div>

            {/* Pagination Dots — only for mobile */}
            <div className="flex sm:hidden justify-center mt-4 gap-2">
                {quickNotes.map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 w-2 rounded-full transition 
                            ${i === activeIndex ? "bg-gray-800" : "bg-gray-300"}`}
                    />
                ))}
            </div>


            {/* Desktop Pagination – Modern Buttons */}
            {/* Desktop Pagination – Green Minimal Theme */}
            <div className="hidden sm:flex justify-center items-center gap-6 mt-10">

                {/* Prev Button */}
                <button
                    disabled={page === 1}
                    onClick={() => setPage(Math.max(page - 1, 1))}
                    className={`
            px-6 py-2 rounded-xl text-sm font-medium
            transition-all duration-200 shadow-sm border
            ${page === 1
                            ? "opacity-40 cursor-not-allowed bg-white border-gray-200 text-gray-400"
                            : "bg-white text-[#0A5244] border-[#0A5244]/30 hover:bg-[#0A5244] hover:text-white hover:shadow-lg"
                        }
        `}
                >
                    Previous
                </button>

                {/* Page Indicator */}
                <div className="px-5 py-2 bg-white/70 border border-[#0A5244]/20 rounded-xl shadow-sm text-[#0A5244] text-sm font-semibold">
                    Page {page} of {totalPages}
                </div>

                {/* Next Button */}
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(Math.min(page + 1, totalPages))}
                    className={`
            px-6 py-2 rounded-xl text-sm font-medium
            transition-all duration-200 shadow-sm border
            ${page === totalPages
                            ? "opacity-40 cursor-not-allowed bg-white border-gray-200 text-gray-400"
                            : "bg-white text-[#0A5244] border-[#0A5244]/30 hover:bg-[#0A5244] hover:text-white hover:shadow-lg"
                        }
        `}
                >
                    Next
                </button>

            </div>





        </div>
    );
}
