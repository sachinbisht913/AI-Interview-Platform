// File: src/components/history/HistoryCard.jsx

import {
    CalendarDays,
    ClipboardList,
    ArrowRight,
    RotateCcw,
    Trophy,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function HistoryCard({ interview }) {
    const navigate = useNavigate();

    const getScoreColor = (score) => {
        if (score >= 80) {
            return "text-emerald-400 bg-emerald-500/10";
        }

        if (score >= 60) {
            return "text-yellow-400 bg-yellow-500/10";
        }

        return "text-red-400 bg-red-500/10";
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
                history-card
                group
                rounded-3xl
                border
                bg-slate-900
                p-4
                transition-all
                duration-300

                hover:border-blue-500/40
                hover:shadow-xl
                hover:shadow-blue-500/5

                sm:p-6
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-6
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* ================================
                    Left Section
                ================================= */}

                <div className="min-w-0 space-y-5">

                    {/* Domain */}

                    <div>
                        <h2
                            className="
                                history-card-title
                                break-words
                                text-xl
                                font-bold

                                sm:text-2xl
                            "
                        >
                            {interview.domain}
                        </h2>

                        <p
                            className="
                                history-card-subtitle
                                mt-2
                                text-sm

                                sm:text-base
                            "
                        >
                            AI Mock Interview
                        </p>
                    </div>


                    {/* Tags */}

                    <div className="flex flex-wrap gap-2 sm:gap-3">

                        {/* Difficulty */}

                        <span
                            className="
                                rounded-full
                                bg-blue-500/10
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-blue-400

                                sm:px-4
                                sm:py-2
                                sm:text-sm
                            "
                        >
                            {interview.difficulty}
                        </span>


                        {/* Questions */}

                        <span
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-violet-500/10
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-violet-400

                                sm:px-4
                                sm:py-2
                                sm:text-sm
                            "
                        >
                            <ClipboardList size={14} />

                            {interview.total_questions} Questions
                        </span>


                        {/* Date */}

                        <span
                            className="
                                history-card-date
                                flex
                                items-center
                                gap-2
                                rounded-full
                                px-3
                                py-1.5
                                text-xs

                                sm:px-4
                                sm:py-2
                                sm:text-sm
                            "
                        >
                            <CalendarDays size={14} />

                            {formatDate(interview.created_at)}
                        </span>

                    </div>

                </div>


                {/* ================================
                    Right Section
                ================================= */}

                <div
                    className="
                        flex
                        w-full
                        flex-col
                        items-stretch
                        gap-5

                        lg:w-auto
                        lg:min-w-[220px]
                        lg:items-end
                    "
                >

                    {/* Score */}

                    <div
                        className={`
                            w-full
                            rounded-2xl
                            px-5
                            py-4

                            sm:px-6
                            lg:w-auto

                            ${getScoreColor(
                                interview.overall_score
                            )}
                        `}
                    >
                        <div className="flex items-center gap-2">

                            <Trophy size={18} />

                            <span className="text-sm font-medium">
                                Overall Score
                            </span>

                        </div>

                        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                            {interview.overall_score}%
                        </h2>

                    </div>


                    {/* Buttons */}

                    <div
                        className="
                            grid
                            w-full
                            grid-cols-1
                            gap-3

                            sm:grid-cols-2

                            lg:w-auto
                            lg:flex
                        "
                    >

                        {/* View Report */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    `/interview-report/${interview.id}`
                                )
                            }
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-gradient-to-r
                                from-blue-600
                                to-violet-600
                                px-5
                                py-3
                                text-sm
                                font-medium
                                text-white
                                transition-all

                                hover:scale-[1.02]

                                sm:text-base
                                lg:hover:scale-105
                            "
                        >
                            View Report

                            <ArrowRight size={18} />
                        </button>


                        {/* Retake */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/mock-interview")
                            }
                            className="
                                history-retake-button
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                px-5
                                py-3
                                text-sm
                                transition-all

                                hover:scale-[1.02]

                                sm:text-base
                            "
                        >
                            <RotateCcw size={18} />

                            Retake
                        </button>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default HistoryCard;