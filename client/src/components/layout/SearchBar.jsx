// File: SearchBar.jsx

import { Search } from "lucide-react";

function SearchBar() {
    return (
        <div className="group relative w-full">
            {/* Search Icon */}
            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-blue-400"
            />

            {/* Input */}
            <input
                type="text"
                placeholder="Search interviews, resumes, analytics..."
                className="
                    w-full
                    h-12
                    pl-11
                    pr-4
                    rounded-xl
                    bg-slate-800/80
                    border
                    border-slate-700
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all
                    duration-300
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    hover:border-slate-600
                "
            />
        </div>
    );
}

export default SearchBar;