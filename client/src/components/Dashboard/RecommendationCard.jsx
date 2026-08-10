// File: src/components/dashboard/RecommendationCard.jsx

import {
    BrainCircuit,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    BookOpen,
    AlertTriangle,
    Wrench,
} from "lucide-react";

function RecommendationCard({ recommendations = [] }) {

    const getRecommendationStyle = (type) => {

        switch (type) {

            case "Missing Skill":
                return {
                    icon: Wrench,
                    badge:
                        "bg-red-500/10 text-red-400 border border-red-500/20",
                    iconColor: "text-red-400",
                };

            case "Weakness":
                return {
                    icon: AlertTriangle,
                    badge:
                        "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                    iconColor: "text-amber-400",
                };

            case "Learning Path":
                return {
                    icon: BookOpen,
                    badge:
                        "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                    iconColor: "text-blue-400",
                };

            default:
                return {
                    icon: CheckCircle2,
                    badge:
                        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                    iconColor: "text-emerald-400",
                };
        }

    };

    return (

        <section
            className="
                recommendation-card
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

            {/* Background Glow */}

            <div
                className="
                    absolute
                    -top-16
                    -right-16
                    h-40
                    w-40
                    rounded-full
                    bg-violet-500/10
                    blur-3xl

                    sm:h-52
                    sm:w-52
                "
            />


            <div className="relative z-10">

                {/* Header */}

                <div
                    className="
                        mb-6
                        flex
                        items-start
                        gap-4
                    "
                >

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-r
                            from-blue-500
                            to-violet-600

                            sm:h-14
                            sm:w-14
                        "
                    >

                        <BrainCircuit
                            size={24}
                            className="text-white"
                        />

                    </div>


                    <div>

                        <h2
                            className="
                                recommendation-title
                                text-xl
                                font-bold
                                text-white

                                sm:text-2xl
                            "
                        >
                            AI Recommendations
                        </h2>


                        <p
                            className="
                                recommendation-description
                                mt-2
                                text-sm
                                leading-6
                                text-slate-400
                            "
                        >
                            Personalized recommendations generated from your
                            resume analysis and interview performance.
                        </p>

                    </div>

                </div>


                {/* Empty */}

                {recommendations.length === 0 ? (

                    <div
                        className="
                            recommendation-empty
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-700
                            py-10
                            text-center
                        "
                    >

                        <p className="text-slate-500">
                            No recommendations available.
                        </p>

                    </div>

                ) : (

                    <>

                        {/* Recommendation List */}

                        <div className="space-y-4">

                            {recommendations.map((item, index) => {

                                const {
                                    icon: Icon,
                                    badge,
                                    iconColor,
                                } = getRecommendationStyle(
                                    item.type
                                );

                                return (

                                    <div
                                        key={index}
                                        className="
                                            recommendation-item
                                            group
                                            flex
                                            items-start
                                            gap-4
                                            rounded-2xl
                                            border
                                            border-slate-800
                                            bg-slate-950/60
                                            p-4
                                            transition-all
                                            duration-300

                                            hover:border-violet-500/30
                                            hover:bg-slate-800/40

                                            sm:p-5
                                        "
                                    >

                                        <div
                                            className="
                                                recommendation-icon
                                                mt-1
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-slate-800
                                            "
                                        >

                                            <Icon
                                                size={20}
                                                className={iconColor}
                                            />

                                        </div>


                                        <div className="min-w-0 flex-1">

                                            <span
                                                className={`
                                                    inline-flex
                                                    rounded-full
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    font-semibold
                                                    ${badge}
                                                `}
                                            >
                                                {item.type}
                                            </span>


                                            <p
                                                className="
                                                    recommendation-text
                                                    mt-3
                                                    break-words
                                                    text-sm
                                                    leading-6
                                                    text-slate-300
                                                "
                                            >
                                                {item.text}
                                            </p>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>


                        {/* AI Insight */}

                        <div
                            className="
                                ai-insight
                                mt-8
                                rounded-2xl
                                border
                                border-blue-500/20
                                bg-gradient-to-r
                                from-blue-500/10
                                to-violet-500/10
                                p-5
                            "
                        >

                            <div className="flex items-center gap-2">

                                <Sparkles
                                    size={18}
                                    className="text-blue-400"
                                />

                                <h3
                                    className="
                                        ai-insight-title
                                        font-semibold
                                        text-white
                                    "
                                >
                                    AI Insight
                                </h3>

                            </div>


                            <p
                                className="
                                    ai-insight-text
                                    mt-3
                                    text-sm
                                    leading-7
                                    text-slate-300
                                "
                            >
                                These recommendations are generated using your
                                latest resume analysis and interview
                                performance. Focus on improving your weakest
                                areas first and follow the suggested learning
                                path consistently.
                            </p>

                        </div>

                    </>

                )}


                {/* Footer */}

                <button
                    className="
                        mt-8
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-600
                        to-violet-600
                        px-5
                        py-3.5
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        duration-300

                        hover:brightness-110

                        sm:text-base
                    "
                >

                    View Full AI Report

                    <ArrowRight size={18} />

                </button>

            </div>

        </section>
    );
}

export default RecommendationCard;