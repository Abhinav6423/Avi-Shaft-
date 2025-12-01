import React from "react";

export default function Loader() {
    return (
        <div className="w-full h-full flex items-center justify-center py-10">
            <div className="flex flex-col items-center gap-4">

                {/* Spinning Loader */}
                <div className="
                    w-12 h-12 
                    border-4 border-[#0A5244]/30 
                    border-t-[#0A5244] 
                    rounded-full 
                    animate-spin
                " />

                {/* Loading Text */}
                <p className="text-[#0A5244] text-sm font-medium opacity-80">
                    Loading...
                </p>
            </div>
        </div>
    );
}
