// ================= SIMPLE 5 FILTER STRINGS =================


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

    // ========== SIMPLE STRING FILTERS ==========
    const [tag, setTag] = useState("");
    const [search, setSearch] = useState("");

    const fetchJournals = async () => {
        try {
            setLoading(true);

            const result = await getLearningJournal(
                tag,
                page,
                limit,
            );



            if (result.status) {
                setJournals(result.data.data || []);
                setTotalJournals(result.data.pagination.totalNotes || 0);
            }
        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJournals();
    }, [page, tag, limit]);

    if (loading) return <Loader />;

    const totalPages = Math.max(1, Math.ceil(totalJournals / limit));

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-2xl font-semibold mb-6">Learning Journals</h2>

            {/* ================= FILTER BAR ================= */}
            <div className="
                bg-white/70 backdrop-blur-lg border border-gray-200 
                rounded-2xl p-4 shadow-sm mb-8
                flex flex-wrap gap-4
            ">

                {/* TAG */}
                <select
                    value={tag}
                    onChange={(e) => { setTag(e.target.value); setPage(1); }}
                    className="px-3 py-2 border rounded-xl bg-white"
                >
                    <option value="">All Tags</option>
                    <option value="General">General</option>
                    <option value="Programming">Programming</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Mindset">Mindset</option>
                    <option value="Reading">Reading</option>
                    <option value="Projects">Projects</option>
                </select>







                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Search title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded-xl bg-white flex-1"
                />
            </div>

            {/* ================= JOURNAL GRID ================= */}

            <div
                className="
                        grid 
                        grid-cols-1 sm:grid-cols-2 
                        lg:grid-cols-3 xl:grid-cols-4 
                        gap-6
                    "
            >
                {journals.map((item) => (
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


            {/* ================= PAGINATION ================= */}
            <div className="flex justify-center items-center gap-4 mt-10">

                <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                    className="
                        px-4 py-2 rounded-lg border 
                        bg-white hover:bg-gray-100 disabled:opacity-40
                    "
                >
                    ← Previous
                </button>

                <span className="text-gray-700 font-medium">
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page === totalPages}
                    className="
                        px-4 py-2 rounded-lg border 
                        bg-white hover:bg-gray-100 disabled:opacity-40
                    "
                >
                    Next →
                </button>

            </div>
        </div>
    );
}
