import { PlusCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
export default function GreenStrip({ small }) {
  const { userData } = useAuth();
  return (
    <div className="flex items-center justify-between">
      <div
        className={`
        w-full 
        rounded-b-3xl
        bg-[#0A5244] 
        text-white 
        px-5 sm:px-10
        flex items-start flex-col gap-2 
        ${small ? "pt-6 pb-8" : "pt-10 pb-14"}
      `}
      >
        <p className="text-md font-medium text-white/70"> Good Day,</p>

        <h1 className="text-3xl font-semibold tracking-tight">
          {userData?.username}
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <Link to={"/create-journal"}>
          <button
            className=" cursor-pointer  
    flex items-center gap-2 
    bg-[#E6F4EF] text-[#0A5244] 
    px-4 py-1.5 rounded-full 
    font-medium text-sm
    hover:bg-[#d8ece6] transition
  "
          >
            <span>Explore</span>
            <span>Learnings</span>
          </button>
        </Link>
        <Link to={"/create-quicknote"}>
          <button
            className=" cursor-pointer  
    flex items-center gap-2 
    bg-[#E6F4EF] text-[#0A5244] 
    px-4 py-1 rounded-full 
    font-medium text-sm
    hover:bg-[#d8ece6] transition
  "
          >
            <span><PlusCircle /></span>
            <span>QuickNote</span>
          </button></Link>



      </div>
    </div>
  );
}
