// File: src/components/dashboard/StatsGrid.jsx

import {
    Mic,
    Award,
    FileText,
    Code2,
} from "lucide-react";

import StatCard from "./StatCard";

function StatsGrid({ stats }) {

    const statCards = [
        {
            title: "Total Interviews",
            value: stats?.totalInterviews ?? 0,
            change: "Completed",
            icon: Mic,
            iconColor: "text-blue-400",
            changeColor: "text-blue-400",
        },
        {
            title: "Average Score",
            value: `${stats?.averageScore ?? 0}%`,
            change: "Overall Performance",
            icon: Award,
            iconColor: "text-emerald-400",
            changeColor: "text-emerald-400",
        },
        {
            title: "ATS Resume Score",
            value: `${stats?.atsScore ?? 0}%`,
            change: "Latest Resume",
            icon: FileText,
            iconColor: "text-violet-400",
            changeColor: "text-violet-400",
        },
        {
            title: "Coding Problems",
            value: stats?.codingSolved ?? 0,
            change: "Problems Solved",
            icon: Code2,
            iconColor: "text-orange-400",
            changeColor: "text-orange-400",
        },
    ];

    return (

        <section className="space-y-6">

            <div>

                <h2
                    className="
                        dashboard-section-title
                        text-xl
                        font-bold
                        text-white
                        sm:text-2xl
                    "
                >
                    Dashboard Overview
                </h2>

                <p
                    className="
                        dashboard-section-description
                        mt-2
                        text-sm
                        text-slate-400
                        sm:text-base
                    "
                >
                    A quick overview of your interview preparation progress.
                </p>

            </div>


            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {statCards.map((card) => (

                    <StatCard
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        change={card.change}
                        icon={card.icon}
                        iconColor={card.iconColor}
                        changeColor={card.changeColor}
                    />

                ))}

            </div>

        </section>

    );
}

export default StatsGrid;