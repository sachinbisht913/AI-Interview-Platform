import {
    BarChart3,
    Sparkles,
    TrendingUp,
} from "lucide-react";

function AnalyticsHero({ totalInterviews = 0 }) {

    return (

        <section
            className="
                analytics-hero
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

            {/* Background Glow */}

            <div
                className="
                    absolute
                    -right-16
                    -top-16
                    h-48
                    w-48
                    rounded-full
                    bg-blue-500/10
                    blur-3xl

                    sm:h-64
                    sm:w-64
                "
            />

            <div
                className="
                    absolute
                    -bottom-20
                    -left-16
                    h-48
                    w-48
                    rounded-full
                    bg-violet-500/10
                    blur-3xl

                    sm:h-64
                    sm:w-64
                "
            />


            <div
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    gap-7

                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* Left */}

                <div className="min-w-0 space-y-4 sm:space-y-5">

                    {/* Badge */}

                    <div
                        className="
                            inline-flex
                            max-w-full
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-blue-500/20
                            bg-blue-500/10
                            px-3
                            py-2

                            sm:px-4
                        "
                    >

                        <Sparkles
                            size={16}
                            className="shrink-0 text-blue-400"
                        />

                        <span className="
                            text-xs
                            font-medium
                            text-blue-300

                            sm:text-sm
                        ">
                            AI Performance Analytics
                        </span>

                    </div>


                    {/* Heading */}

                    <div>

                        <h1
                            className="
                                analytics-hero-title
                                text-3xl
                                font-bold
                                leading-tight

                                sm:text-4xl
                            "
                        >
                            Analytics Dashboard
                        </h1>


                        <p
                            className="
                                analytics-hero-description
                                mt-3
                                max-w-2xl
                                text-sm
                                leading-6

                                sm:text-base
                                sm:leading-7
                            "
                        >
                            Monitor your interview journey, visualize
                            progress over time, and discover insights
                            generated from your AI mock interviews.
                        </p>

                    </div>

                </div>


                {/* Right */}

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-3

                        sm:grid-cols-2
                        sm:gap-4

                        lg:flex
                    "
                >

                    {/* Interviews */}

                    <div
                        className="
                            analytics-stat
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-800/60
                            p-4
                            backdrop-blur-sm

                            sm:min-w-[170px]
                            sm:p-5
                        "
                    >

                        <div
                            className="
                                mb-3
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <span
                                className="
                                    analytics-stat-label
                                    text-sm
                                "
                            >
                                Interviews
                            </span>

                            <BarChart3
                                size={18}
                                className="text-blue-400"
                            />

                        </div>


                        <h2
                            className="
                                analytics-stat-value
                                text-3xl
                                font-bold

                                sm:text-4xl
                            "
                        >
                            {totalInterviews}
                        </h2>


                        <p className="
                            mt-2
                            text-sm
                            text-blue-400
                        ">
                            Completed
                        </p>

                    </div>


                    {/* Progress */}

                    <div
                        className="
                            analytics-stat
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-800/60
                            p-4
                            backdrop-blur-sm

                            sm:min-w-[170px]
                            sm:p-5
                        "
                    >

                        <div
                            className="
                                mb-3
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <span
                                className="
                                    analytics-stat-label
                                    text-sm
                                "
                            >
                                Progress
                            </span>


                            <TrendingUp
                                size={18}
                                className="text-emerald-400"
                            />

                        </div>


                        <h2
                            className="
                                analytics-stat-value
                                text-3xl
                                font-bold

                                sm:text-4xl
                            "
                        >
                            ↗
                        </h2>


                        <p className="
                            mt-2
                            text-sm
                            text-emerald-400
                        ">
                            Keep improving
                        </p>

                    </div>

                </div>

            </div>

        </section>

    );
}

export default AnalyticsHero;