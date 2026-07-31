// File: src/components/dashboard/StatsGrid.jsx

import {
    Mic,
    Award,
    FileText,
    Code2,
} from "lucide-react";


import StatCard from "./StatCard";

function StatsGrid() {
    const stats = [
        {
            title: "Total Interviews",
            value: "18",
            change: "+3 this week",
            icon: Mic,
            iconColor: "text-blue-400",
            changeColor: "text-emerald-400",
        },
        {
            title: "Average Score",
            value: "84%",
            change: "+6% this month",
            icon: Award,
            iconColor: "text-emerald-400",
            changeColor: "text-emerald-400",
        },
        {
            title: "ATS Resume Score",
            value: "91%",
            change: "Excellent",
            icon: FileText,
            iconColor: "text-violet-400",
            changeColor: "text-violet-400",
        },
        {
            title: "Coding Problems",
            value: "125",
            change: "+15 solved",
            icon: Code2,
            iconColor: "text-orange-400",
            changeColor: "text-orange-400",
        },
    ];

    return (
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Dashboard Overview
                </h2>

                <p className="mt-1 text-slate-400">
                    Here's a quick summary of your interview preparation.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        icon={stat.icon}
                        iconColor={stat.iconColor}
                        changeColor={stat.changeColor}
                    />
                ))}
            </div>
        </section>
    );
}

export default StatsGrid;