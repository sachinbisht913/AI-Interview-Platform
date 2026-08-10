// File: src/components/interview/WeaknessCard.jsx

import {
    Target,
    AlertTriangle,
    TrendingUp,
    ArrowUpCircle,
} from "lucide-react";

function WeaknessCard({ weaknesses = [] }) {

    return (

        <section
            className="
                weakness-card
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-5
                sm:p-6
                lg:p-8
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
                    bg-orange-500/10
                    blur-3xl

                    sm:h-48
                    sm:w-48
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
                        sm:gap-4
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
                            from-orange-500
                            to-red-500
                            shadow-lg

                            sm:h-14
                            sm:w-14
                        "
                    >

                        <Target
                            size={24}
                            className="text-white sm:size-7"
                        />

                    </div>


                    <div className="min-w-0">

                        <h2
                            className="
                                weakness-card-title
                                text-xl
                                font-bold

                                sm:text-2xl
                            "
                        >
                            Areas for Improvement
                        </h2>


                        <p
                            className="
                                weakness-card-description
                                mt-1
                                text-sm
                                leading-6
                            "
                        >
                            Focus on these areas to significantly improve
                            your future interview performance.
                        </p>

                    </div>

                </div>


                {/* Empty State */}

                {weaknesses.length === 0 ? (

                    <div
                        className="
                            weakness-empty
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-700
                            px-4
                            py-10
                            text-center

                            sm:py-12
                        "
                    >

                        <p className="text-sm text-slate-500">
                            No improvement suggestions available.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-3 sm:space-y-4">

                        {weaknesses.map((item, index) => (

                            <div
                                key={index}
                                className="
                                    weakness-item
                                    group
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

                                    hover:border-orange-500/30
                                    hover:bg-slate-800/40
                                "
                            >

                                {/* Icon */}

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-orange-500/10

                                        sm:h-11
                                        sm:w-11
                                    "
                                >

                                    <AlertTriangle
                                        size={19}
                                        className="text-orange-400"
                                    />

                                </div>


                                {/* Content */}

                                <div className="min-w-0 flex-1">

                                    <div
                                        className="
                                            mb-2
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >

                                        <ArrowUpCircle
                                            size={15}
                                            className="
                                                shrink-0
                                                text-orange-400
                                            "
                                        />

                                        <span
                                            className="
                                                text-[11px]
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-orange-400

                                                sm:text-xs
                                            "
                                        >
                                            Improvement {index + 1}
                                        </span>

                                    </div>


                                    <p
                                        className="
                                            weakness-item-text
                                            break-words
                                            text-sm
                                            leading-6

                                            sm:leading-7
                                        "
                                    >
                                        {item}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* Footer */}

                <div
                    className="
                        weakness-footer
                        mt-6
                        rounded-2xl
                        border
                        border-orange-500/20
                        bg-gradient-to-r
                        from-orange-500/10
                        to-red-500/10
                        p-4

                        sm:mt-8
                        sm:p-5
                    "
                >

                    <div className="flex items-start gap-3">

                        <TrendingUp
                            size={20}
                            className="
                                mt-1
                                shrink-0
                                text-orange-400
                            "
                        />


                        <div className="min-w-0">

                            <h3
                                className="
                                    weakness-footer-title
                                    text-sm
                                    font-semibold

                                    sm:text-base
                                "
                            >
                                Improvement Strategy
                            </h3>


                            <p
                                className="
                                    weakness-footer-text
                                    mt-2
                                    text-sm
                                    leading-6

                                    sm:leading-7
                                "
                            >
                                Focus on improving one skill at a time
                                instead of trying to master everything at
                                once. Consistent practice, mock interviews,
                                and regular coding sessions will steadily
                                improve your confidence and overall interview
                                performance.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );
}

export default WeaknessCard;