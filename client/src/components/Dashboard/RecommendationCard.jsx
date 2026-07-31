// File: src/components/dashboard/RecommendationCard.jsx

import {
    BrainCircuit,
    ArrowRight,
    CheckCircle2,
    Sparkles,
} from "lucide-react";

const recommendations = [
    "Improve your DBMS concepts before your next interview.",
    "Practice Java Collections and Multithreading.",
    "Solve 5 SQL queries to strengthen database skills.",
    "Attempt one AI Mock Interview today.",
];

function RecommendationCard() {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6">
            {/* Background Glow */}
            <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative z-10">
                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 shadow-lg">
                        <BrainCircuit size={28} className="text-white" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            AI Recommendations
                        </h2>

                        <p className="text-sm text-slate-400">
                            Personalized suggestions to improve your interview
                            performance.
                        </p>
                    </div>
                </div>

                {/* Recommendation List */}
                <div className="space-y-4">
                    {recommendations.map((item, index) => (
                        <div
                            key={index}
                            className="
                                group
                                flex
                                items-start
                                gap-3
                                rounded-2xl
                                border
                                border-slate-800
                                bg-slate-950/60
                                p-4
                                transition-all
                                duration-300
                                hover:border-violet-500/30
                                hover:bg-slate-800/50
                            "
                        >
                            <div className="mt-0.5">
                                <CheckCircle2
                                    size={18}
                                    className="text-emerald-400"
                                />
                            </div>

                            <p className="flex-1 text-sm leading-6 text-slate-300">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>

                {/* AI Insight */}
                <div className="mt-8 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-violet-500/10 p-5">
                    <div className="flex items-center gap-2">
                        <Sparkles size={18} className="text-blue-400" />

                        <h3 className="font-semibold text-white">
                            AI Insight
                        </h3>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-300">
                        Based on your recent interview performance, your
                        strongest area is <span className="font-semibold text-blue-400">Frontend Development</span>.
                        Focus more on <span className="font-semibold text-violet-400">Core CS subjects</span> like
                        DBMS, Operating Systems, and SQL to improve your overall
                        interview score.
                    </p>
                </div>

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
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:scale-[1.02]
                        hover:shadow-lg
                        hover:shadow-blue-500/20
                        active:scale-95
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