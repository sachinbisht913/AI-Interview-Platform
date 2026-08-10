// File: src/components/analytics/AIInsights.jsx

import {
    BrainCircuit,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    Sparkles,
} from "lucide-react";

function AIInsights({ analytics }) {

    if (!analytics) return null;

    const insights = [];

    // Best Score

    if (analytics.bestScore >= 8) {

        insights.push({
            icon: CheckCircle2,
            color: "text-emerald-400",
            title: "Excellent Performance",
            text: `Your highest interview score is ${analytics.bestScore}/10. You're consistently performing well in mock interviews.`,
        });

    }


    // Average Score

    if (analytics.averageScore < 6) {

        insights.push({
            icon: AlertTriangle,
            color: "text-red-400",
            title: "Needs Improvement",
            text: "Your average score indicates that more practice is needed before real interviews.",
        });

    } else if (analytics.averageScore < 8) {

        insights.push({
            icon: TrendingUp,
            color: "text-yellow-400",
            title: "Good Progress",
            text: "Your performance is improving. Continue practicing to reach an excellent level.",
        });

    } else {

        insights.push({
            icon: TrendingUp,
            color: "text-blue-400",
            title: "Strong Consistency",
            text: "You're maintaining excellent interview scores across multiple sessions.",
        });

    }


    // Total Interviews

    if (analytics.totalInterviews >= 10) {

        insights.push({
            icon: Sparkles,
            color: "text-violet-400",
            title: "Great Practice",
            text: `You've completed ${analytics.totalInterviews} mock interviews. Consistent practice is building strong interview confidence.`,
        });

    }


    return (

        <section
            className="
                ai-insights
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-5

                sm:p-6
            "
        >

            {/* Glow */}

            <div
                className="
                    absolute
                    -right-16
                    -top-16
                    h-44
                    w-44
                    rounded-full
                    bg-violet-500/10
                    blur-3xl

                    sm:h-56
                    sm:w-56
                "
            />


            <div className="relative z-10">

                {/* Header */}

                <div
                    className="
                        mb-6
                        flex
                        items-start
                        gap-3

                        sm:mb-8
                        sm:items-center
                        sm:gap-4
                    "
                >

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-r
                            from-blue-600
                            to-violet-600

                            sm:h-14
                            sm:w-14
                        "
                    >

                        <BrainCircuit
                            className="text-white"
                            size={22}
                        />

                    </div>


                    <div className="min-w-0">

                        <h2
                            className="
                                ai-insights-title
                                text-xl
                                font-bold

                                sm:text-2xl
                            "
                        >
                            AI Performance Insights
                        </h2>


                        <p
                            className="
                                ai-insights-description
                                mt-1
                                text-sm
                                leading-6
                            "
                        >
                            Personalized observations generated from your
                            interview history.
                        </p>

                    </div>

                </div>


                {/* Insights */}

                <div className="space-y-4 sm:space-y-5">

                    {insights.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={index}
                                className="
                                    ai-insight-item
                                    flex
                                    items-start
                                    gap-3
                                    rounded-2xl
                                    border
                                    border-slate-800
                                    bg-slate-950/60
                                    p-4

                                    sm:gap-4
                                    sm:p-5

                                    transition-all
                                    duration-300

                                    hover:border-blue-500/30
                                "
                            >

                                {/* Icon */}

                                <div
                                    className="
                                        flex
                                        shrink-0
                                        items-center
                                        justify-center
                                    "
                                >

                                    <Icon
                                        size={21}
                                        className={item.color}
                                    />

                                </div>


                                {/* Content */}

                                <div className="min-w-0">

                                    <h3
                                        className="
                                            ai-insight-title
                                            text-sm
                                            font-semibold

                                            sm:text-base
                                        "
                                    >
                                        {item.title}
                                    </h3>


                                    <p
                                        className="
                                            ai-insight-text
                                            mt-2
                                            text-sm
                                            leading-6

                                            sm:leading-7
                                        "
                                    >
                                        {item.text}
                                    </p>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>

    );
}

export default AIInsights;