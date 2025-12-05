import React, { useEffect, useState } from "react";
import LearningJournalCard from "../../Components/Learning-Journal/LearningJournalCard";
import { getLearningJournal } from "../../Api-Calls/getLearningJournal.js";
import Loader from "../../Components/Loader.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function LearningJournalGrid() {
    const [loading, setLoading] = useState(true);
    const [journals, setJournals] = useState([]);

    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    const [totalJournals, setTotalJournals] = useState(0);

    // Filters
    const [tag, setTag] = useState("");
    const [search, setSearch] = useState("");

    const fetchJournals = async (reset = false) => {
        try {
            setLoading(true);

            const result = await getLearningJournal(tag, page, limit);

            if (result.status) {
                setTotalJournals(result.data.pagination.totalNotes || 0);

                if (reset) {
                    setJournals(result.data.data || []);
                } else {
                    setJournals((prev) => [...prev, ...(result.data.data || [])]);
                }
            }
        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // When tag changes → reset list
        fetchJournals(true);
    }, [tag]);

    useEffect(() => {
        // When page increases → append
        if (page !== 1) {
            fetchJournals(false);
        }
    }, [page]);

    if (loading && journals.length === 0) return <Loader />;

    const canLoadMore = journals.length < totalJournals;

    return (
        <div className="container mx-auto px-4 py-10 bg-gradient-to-br from-[#C8F5E6] via-white to-[#A0EDD9]">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-semibold text-[#0A5244] tracking-tight">
                    Learning Journals
                </h2>
            </div>

            {/* Filter Section */}
            <div
                className="
                bg-white/70 backdrop-blur-xl border border-gray-200 
                rounded-2xl p-5 shadow-sm mb-10
                flex flex-wrap gap-4 items-center
            "
            >
                {/* TAG FILTER */}
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-600 mb-1">
                        Filter by Tag
                    </label>
                    <select
                        value={tag}
                        onChange={(e) => {
                            setTag(e.target.value);
                            setPage(1);
                        }}
                        className="
                            px-4 py-2 rounded-xl border bg-white text-sm 
                            focus:ring-2 focus:ring-[#0A5244]/30
                        "
                    >
                        <option value="">All Tags</option>
                        <option value="General">General</option>
                        <option value="Programming">Programming</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Mindset">Mindset</option>
                        <option value="Reading">Reading</option>
                        <option value="Projects">Projects</option>
                    </select>
                </div>

                {/* SEARCH */}
                <div className="flex-grow">
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">
                        Search Title
                    </label>
                    <input
                        type="text"
                        placeholder="Search by journal title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            w-full px-4 py-2 rounded-xl border bg-white text-sm 
                            focus:ring-2 focus:ring-[#0A5244]/30
                        "
                    />
                </div>
            </div>

            {/* JOURNAL GRID */}
            <div
                className="
                grid gap-6
                grid-cols-1 sm:grid-cols-2 
                lg:grid-cols-3 xl:grid-cols-4
            "
            >
                {journals
                    .filter((item) =>
                        item.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((item) => (
                        <Link key={item._id} to={`/viewjournal/${item._id}`}>
                            <LearningJournalCard
                                title={item.title}
                                note={item.note}
                                date={item.createdAt}
                                tag={item.tag}
                                difficulty={item.difficulty}
                                effort={item.timeRate}
                            />
                        </Link>
                    ))}
            </div>

            {/* LOAD MORE BUTTON */}
            {canLoadMore && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        className="
                            px-6 py-2.5 rounded-full 
                            bg-[#0A5244] text-white 
                            shadow-lg hover:bg-[#083e33] 
                            transition text-sm font-medium
                        "
                    >
                        Load More
                    </button>
                </div>
            )}

            {/* No more results */}
            {!canLoadMore && journals.length > 0 && (
                <div className="text-center mt-10 text-gray-500 text-sm">
                    You’ve reached the end 🎉
                </div>
            )}
        </div>
    );
}
