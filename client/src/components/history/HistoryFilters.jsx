// File: src/components/history/HistoryFilters.jsx

import { Search } from "lucide-react";

function HistoryFilters() {
    return (
        <section
            className="
                history-filters
                rounded-3xl
                border
                bg-slate-900
                p-4
                sm:p-6
            "
        >
            <div
                className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                    lg:grid-cols-3
                "
            >

                {/* Search */}

                <div
                    className="
                        relative
                        sm:col-span-2
                        lg:col-span-1
                    "
                >
                    <Search
                        size={20}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-500
                        "
                    />

                    <input
                        type="text"
                        placeholder="Search interviews..."
                        className="
                            history-filter-input
                            w-full
                            rounded-2xl
                            border
                            bg-slate-950
                            py-3
                            pl-11
                            pr-4
                            text-sm
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/10
                        "
                    />
                </div>


                {/* Difficulty */}

                <select
                    className="
                        history-filter-input
                        w-full
                        rounded-2xl
                        border
                        bg-slate-950
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/10
                    "
                >
                    <option>All Difficulty</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>


                {/* Sort */}

                <select
                    className="
                        history-filter-input
                        w-full
                        rounded-2xl
                        border
                        bg-slate-950
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/10
                    "
                >
                    <option>Newest First</option>
                    <option>Oldest First</option>
                    <option>Highest Score</option>
                    <option>Lowest Score</option>
                </select>

            </div>
        </section>
    );
}

export default HistoryFilters;