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
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="sm:hidden overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4"
            >
                {quickNotes.map((item, idx) => (
                    <Link to={`/single-note/${item._id}`}>
                        <div

                            key={idx} className="min-w-full snap-center">
                            <DashboardQuickNoteCard {...item}
                            />
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


            {/* Desktop Pagination Arrows */}
            <div className="hidden sm:flex justify-center items-center gap-4 mt-4">

                {/* Previous Button */}
                <button
                    disabled={page === 1}
                    onClick={() => {
                        const newPage = Math.max(page - 1, 1);
                        setPage(newPage);


                    }}
                    className={`px-4 py-1 rounded border 
            ${page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                >
                    ◀ Prev
                </button>

                {/* Next Button */}
                <button
                    disabled={page === totalPages}
                    onClick={() => {
                        const newPage = Math.min(page + 1, totalPages);
                        setPage(newPage);

                    }}
                    className={`px-4 py-1 rounded border 
            ${page === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                >
                    Next ▶
                </button>

            </div>



        </div>
    );
}
