// File: src/components/analytics/StatCard.jsx

import { TrendingUp } from "lucide-react";

function StatCard({
    title,
    value,
    icon: Icon,
    color = "text-blue-400",
    change = null,
}) {

    return (

        <section
            className="
                analytics-stat-card
                relative
                overflow-hidden
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

            {/* Background Glow */}

            <div
                className="
                    absolute
                    -right-12
                    -top-12
                    h-32
                    w-32
                    rounded-full
                    bg-blue-500/5
                    blur-3xl
                "
            />


            <div className="relative z-10">

                {/* Top */}

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-4
                    "
                >

                    <p
                        className="
                            analytics-stat-title
                            max-w-[70%]
                            text-sm
                            font-medium
                            leading-5
                        "
                    >
                        {title}
                    </p>


                    {Icon && (

                        <div
                            className="
                                analytics-stat-icon
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                bg-slate-800

                                sm:h-12
                                sm:w-12
                            "
                        >

                            <Icon
                                size={21}
                                className={color}
                            />

                        </div>

                    )}

                </div>


                {/* Value */}

                <h2
                    className="
                        analytics-stat-value
                        mt-5
                        text-4xl
                        font-bold
                        leading-none

                        sm:mt-6
                        sm:text-5xl
                    "
                >
                    {value}
                </h2>


                {/* Footer */}

                <div
                    className="
                        mt-4
                        flex
                        items-center
                        gap-2

                        sm:mt-5
                    "
                >

                    <TrendingUp
                        size={16}
                        className="shrink-0 text-emerald-400"
                    />

                    <span
                        className="
                            text-xs
                            leading-5
                            text-emerald-400

                            sm:text-sm
                        "
                    >
                        {change || "Performance Updated"}
                    </span>

                </div>

            </div>

        </section>

    );
}

export default StatCard;