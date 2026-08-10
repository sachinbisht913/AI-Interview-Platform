// File: src/components/resume/ResumeHistoryCard.jsx

import {
    FileText,
    CalendarDays,
    ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function ResumeHistoryCard({ resume }) {
    const navigate = useNavigate();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div
            className="
                resume-history-card
                rounded-3xl
                border
                p-4
                transition
                hover:border-blue-500
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
                {/* Resume Information */}

                <div className="min-w-0">

                    <div className="flex items-start gap-3">

                        <FileText
                            className="
                                mt-1
                                shrink-0
                                text-blue-400
                            "
                            size={22}
                        />

                        <h2
                            className="
                                resume-history-file-name
                                break-all
                                text-lg
                                font-bold
                                sm:text-xl
                                sm:break-words
                            "
                        >
                            {resume.file_name}
                        </h2>

                    </div>


                    {/* Scores & Date */}

                    <div
                        className="
                            mt-4
                            flex
                            flex-wrap
                            gap-2
                            sm:gap-3
                        "
                    >

                        {/* ATS Score */}

                        <span
                            className="
                                rounded-full
                                bg-blue-500/10
                                px-3
                                py-2
                                text-xs
                                text-blue-400
                                sm:text-sm
                            "
                        >
                            ATS {resume.ats_score}
                        </span>


                        {/* Grammar Score */}

                        <span
                            className="
                                rounded-full
                                bg-green-500/10
                                px-3
                                py-2
                                text-xs
                                text-green-400
                                sm:text-sm
                            "
                        >
                            Grammar {resume.grammar_score}
                        </span>


                        {/* Date */}

                        <span
                            className="
                                resume-history-date
                                flex
                                items-center
                                gap-2
                                rounded-full
                                px-3
                                py-2
                                text-xs
                                sm:text-sm
                            "
                        >
                            <CalendarDays size={15} />

                            {formatDate(resume.created_at)}
                        </span>

                    </div>

                </div>


                {/* View Analysis */}

                <button
                    type="button"
                    onClick={() =>
                        navigate(`/resume-report/${resume.id}`)
                    }
                    className="
                        flex
                        w-full
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
                        transition
                        hover:scale-[1.02]
                        sm:w-auto
                        sm:text-base
                    "
                >
                    View Analysis

                    <ArrowRight size={18} />
                </button>

            </div>
        </div>
    );
}

export default ResumeHistoryCard;