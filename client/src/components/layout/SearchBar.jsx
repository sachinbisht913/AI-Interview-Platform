// File: src/components/layout/SearchBar.jsx

import { Search } from "lucide-react";

function SearchBar() {

    return (

        <div className="relative w-full">

            {/* Search Icon */}

            <Search
                size={19}
                className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2

                    text-slate-500
                    light:text-slate-400
                "
            />


            {/* Input */}

            <input
                type="text"
                placeholder="Search interviews, resumes, analytics..."
                className="
                    h-12
                    w-full
                    rounded-xl

                    border
                    border-slate-700
                    bg-slate-800/80

                    pl-11
                    pr-4

                    text-white
                    outline-none

                    placeholder:text-slate-500

                    transition-all
                    duration-300

                    hover:border-slate-600

                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20

                    light:border-slate-200
                    light:bg-slate-100
                    light:text-slate-900
                    light:placeholder:text-slate-400
                    light:hover:border-slate-300
                "
            />

        </div>

    );

}

export default SearchBar;