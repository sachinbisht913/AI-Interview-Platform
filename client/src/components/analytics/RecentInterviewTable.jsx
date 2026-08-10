// File: src/components/analytics/RecentInterviewTable.jsx

import {
    ArrowRight,
    CalendarDays,
    Trophy,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function RecentInterviewTable({ data = [] }) {

    const navigate = useNavigate();

    const getScoreBadge = (score) => {

        if (score >= 8)
            return "bg-emerald-500/10 text-emerald-400";

        if (score >= 6)
            return "bg-yellow-500/10 text-yellow-400";

        return "bg-red-500/10 text-red-400";
    };


    const formatDate = (date) => {

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    };


    return (

        <section
            className="
                recent-interview-table
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-5

                sm:p-6

                transition-colors
                duration-300
            "
        >

            {/* Header */}

            <div className="mb-6 sm:mb-8">

                <h2
                    className="
                        recent-table-title
                        text-xl
                        font-bold

                        sm:text-2xl
                    "
                >
                    Recent Interviews
                </h2>

                <p
                    className="
                        recent-table-description
                        mt-1
                        text-sm
                        leading-6
                    "
                >
                    Your latest interview sessions.
                </p>

            </div>


            {/* Empty State */}

            {data.length === 0 ? (

                <div
                    className="
                        recent-table-empty
                        flex
                        min-h-[180px]
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-dashed
                        border-slate-700
                        px-5
                        text-center
                        text-sm
                    "
                >
                    No interview history found.
                </div>

            ) : (

                <div className="space-y-4">

                    {data.map((item) => (

                        <div
                            key={item.id}
                            className="
                                recent-interview-item
                                group
                                flex
                                flex-col
                                gap-5
                                rounded-2xl
                                border
                                border-slate-800
                                bg-slate-950/60
                                p-4

                                transition-all
                                duration-300

                                hover:border-blue-500/30
                                hover:bg-slate-800/40

                                sm:p-5

                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                            "
                        >

                            {/* Left */}

                            <div className="min-w-0 flex-1">

                                <h3
                                    className="
                                        recent-item-title
                                        truncate
                                        text-lg
                                        font-semibold

                                        sm:text-xl
                                    "
                                >
                                    {item.domain}
                                </h3>


                                <div
                                    className="
                                        mt-3
                                        flex
                                        flex-wrap
                                        gap-2

                                        sm:gap-3
                                    "
                                >

                                    {/* Difficulty */}

                                    <span
                                        className="
                                            rounded-full
                                            bg-blue-500/10
                                            px-3
                                            py-1
                                            text-xs
                                            text-blue-400

                                            sm:text-sm
                                        "
                                    >
                                        {item.difficulty}
                                    </span>


                                    {/* Date */}

                                    <span
                                        className="
                                            recent-date
                                            flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            bg-slate-800
                                            px-3
                                            py-1
                                            text-xs

                                            sm:text-sm
                                        "
                                    >

                                        <CalendarDays
                                            size={14}
                                            className="shrink-0"
                                        />

                                        {formatDate(item.created_at)}

                                    </span>

                                </div>

                            </div>


                            {/* Right */}

                            <div
                                className="
                                    flex
                                    w-full
                                    flex-col
                                    gap-3

                                    sm:flex-row
                                    sm:items-center

                                    lg:w-auto
                                "
                            >

                                {/* Score */}

                                <div
                                    className={`
                                        rounded-xl
                                        px-4
                                        py-3
                                        ${getScoreBadge(
                                            item.overall_score
                                        )}
                                    `}
                                >

                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                    ">

                                        <Trophy size={16} />

                                        <span className="text-sm">
                                            Score
                                        </span>

                                    </div>


                                    <h3 className="
                                        mt-1
                                        text-xl
                                        font-bold

                                        sm:text-2xl
                                    ">
                                        {item.overall_score}/10
                                    </h3>

                                </div>


                                {/* View Report */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            `/interview-report/${item.id}`
                                        )
                                    }
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-blue-600
                                        px-5
                                        py-3
                                        text-sm
                                        font-medium
                                        text-white
                                        transition-all

                                        hover:bg-blue-700

                                        sm:w-auto
                                    "
                                >

                                    View Report

                                    <ArrowRight size={18} />

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>

    );
}

export default RecentInterviewTable;