// File: src/components/interview/ReportHero.jsx

import {
    FileText,
    Trophy,
} from "lucide-react";

function ReportHero({
    domain = "Interview",
    difficulty = "Medium",
    overallScore = 0,
}) {
    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-gradient-to-br
                from-slate-900
                via-slate-900
                to-blue-950
                p-5

                sm:p-6

                lg:p-8
            "
        >

            {/* ================================
                Background Glow
            ================================= */}

            <div
                className="
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-blue-500/10
                    blur-3xl

                    sm:-right-20
                    sm:-top-20
                    sm:h-52
                    sm:w-52
                "
            />

            <div
                className="
                    absolute
                    -bottom-16
                    -left-16
                    h-44
                    w-44
                    rounded-full
                    bg-violet-500/10
                    blur-3xl

                    sm:-bottom-20
                    sm:-left-20
                    sm:h-56
                    sm:w-56
                "
            />


            <div
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    gap-8

                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* ================================
                    Left
                ================================= */}

                <div className="min-w-0">

                    <div className="flex items-center gap-3">

                        <FileText
                            className="
                                h-7
                                w-7
                                shrink-0
                                text-blue-400

                                sm:h-8
                                sm:w-8
                            "
                        />

                        <h1
                            className="
                                text-2xl
                                font-bold
                                text-white

                                sm:text-3xl

                                lg:text-4xl
                            "
                        >
                            Interview Report
                        </h1>

                    </div>


                    {/* Tags */}

                    <div
                        className="
                            mt-5
                            flex
                            flex-wrap
                            gap-2

                            sm:mt-6
                            sm:gap-3
                        "
                    >

                        {/* Domain */}

                        <span
                            className="
                                rounded-full
                                bg-blue-500/10
                                px-3
                                py-1.5
                                text-sm
                                text-blue-400

                                sm:px-4
                                sm:py-2
                            "
                        >
                            {domain}
                        </span>


                        {/* Difficulty */}

                        <span
                            className="
                                rounded-full
                                bg-violet-500/10
                                px-3
                                py-1.5
                                text-sm
                                text-violet-400

                                sm:px-4
                                sm:py-2
                            "
                        >
                            {difficulty}
                        </span>

                    </div>

                </div>


                {/* ================================
                    Score
                ================================= */}

                <div
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-900/70
                        p-5

                        sm:rounded-3xl
                        sm:p-6

                        lg:w-auto
                        lg:min-w-[210px]
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-yellow-400

                            sm:text-base
                        "
                    >

                        <Trophy size={19} />

                        Overall Score

                    </div>


                    <h2
                        className="
                            mt-2
                            text-4xl
                            font-bold
                            text-white

                            sm:mt-3
                            sm:text-5xl

                            lg:text-6xl
                        "
                    >
                        {overallScore}/10
                    </h2>

                </div>

            </div>

        </section>
    );
}

export default ReportHero;