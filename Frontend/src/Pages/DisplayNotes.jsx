import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Tag } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import "../note-viewer.css"; // ⬅ IMPORTANT (custom spacing styles)
import { openNote } from "../Api-Calls/openQuickNote.js";
import Navbar from "../Components/Dashboard/Navbar.jsx";

export default function DisplayNote() {
    const navigate = useNavigate();
    const { noteId } = useParams();
    console.log(noteId)
    const [note, setNote] = useState({
        title: "",
        content: "",
        tag: ""
    })



    const fetchNote = async () => {
        try {
            const result = await openNote(noteId)
            if (result.status === true) {
                console.log(result?.data?.data)
                setNote({
                    title: result?.data?.data?.title,
                    content: result?.data?.data?.note,
                    tag: result?.data?.data?.tag
                })
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchNote();
    }, []);


    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <Navbar />

            {/* Note Content */}
            <div className="max-w-3xl mx-auto px-6 py-12 mt-10">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                >
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium">Back</span>
                </button>

                <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                    {note.title}
                </h1>

                <p className="text-gray-400 text-sm mb-10">{note.date}</p>

                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
                    <div className="note-viewer">
                        <ReactQuill value={note.content} readOnly theme="bubble" />
                    </div>
                </div>

            </div>
        </div>
    );
}
