// File: src/components/history/HistoryStats.jsx

import {
    ClipboardList,
    Trophy,
    TrendingUp,
} from "lucide-react";

function HistoryStats({ interviews = [] }) {

    const total = interviews.length;

    const avg =
        total === 0
            ? 0
            : Math.round(
                  interviews.reduce(
                      (sum, interview) =>
                          sum + Number(interview.overall_score || 0),
                      0
                  ) / total
              );

    const best =
        total === 0
            ? 0
            : Math.max(
                  ...interviews.map((interview) =>
                      Number(interview.overall_score || 0)
                  )
              );

    const cards = [
        {
            title: "Total Interviews",
            value: total,
            icon: ClipboardList,
            color: "text-blue-400",
        },
        {
            title: "Average Score",
            value: `${avg}%`,
            icon: TrendingUp,
            color: "text-emerald-400",
        },
        {
            title: "Best Score",
            value: `${best}%`,
            icon: Trophy,
            color: "text-yellow-400",
        },
    ];

    return (
        <div
            className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
                sm:gap-6
            "
        >
            {cards.map((card) => {

                const Icon = card.icon;

                return (
                    <section
                        key={card.title}
                        className="
                            history-stat-card
                            rounded-3xl
                            border
                            bg-slate-900
                            p-5
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-xl

                            sm:p-6
                        "
                    >

                        {/* Header */}

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-4
                            "
                        >

                            <p
                                className="
                                    history-stat-title
                                    text-sm
                                    font-medium

                                    sm:text-base
                                "
                            >
                                {card.title}
                            </p>

                            <div
                                className="
                                    history-stat-icon
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl

                                    sm:h-11
                                    sm:w-11
                                "
                            >
                                <Icon
                                    size={21}
                                    className={card.color}
                                />
                            </div>

                        </div>


                        {/* Value */}

                        <h2
                            className="
                                history-stat-value
                                mt-4
                                text-4xl
                                font-bold

                                sm:mt-5
                                sm:text-5xl
                            "
                        >
                            {card.value}
                        </h2>

                    </section>
                );
            })}
        </div>
    );
}

export default HistoryStats;