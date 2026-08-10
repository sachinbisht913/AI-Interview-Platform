// File: src/components/interview/ImprovementCard.jsx

import {
    Target,
    AlertTriangle,
    TrendingUp,
    ArrowUpCircle,
} from "lucide-react";

function ImprovementCard({ improvements = [] }) {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6">
            {/* Background Glow */}
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative z-10">
                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                        <Target
                            size={28}
                            className="text-white"
                        />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Areas for Improvement
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Focus on these areas to significantly improve your
                            future interview performance.
                        </p>
                    </div>
                </div>

                {/* Empty State */}
                {improvements.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-700 py-12 text-center">
                        <p className="text-slate-500">
                            No improvement suggestions available.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {improvements.map((item, index) => (
                            <div
                                key={index}
                                className="
                                    group
                                    flex
                                    items-start
                                    gap-4
                                    rounded-2xl
                                    border
                                    border-slate-800
                                    bg-slate-950/60
                                    p-5
                                    transition-all
                                    duration-300
                                    hover:border-orange-500/30
                                    hover:bg-slate-800/40
                                "
                            >
                                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                                    <AlertTriangle
                                        size={20}
                                        className="text-orange-400"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="mb-2 flex items-center gap-2">
                                        <ArrowUpCircle
                                            size={16}
                                            className="text-orange-400"
                                        />

                                        <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                                            Improvement {index + 1}
                                        </span>
                                    </div>

                                    <p className="text-sm leading-7 text-slate-300">
                                        {item}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-8 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-red-500/10 p-5">
                    <div className="flex items-start gap-3">
                        <TrendingUp
                            size={20}
                            className="mt-1 text-orange-400"
                        />

                        <div>
                            <h3 className="font-semibold text-white">
                                Improvement Strategy
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-slate-300">
                                Focus on improving one skill at a time instead
                                of trying to master everything at once.
                                Consistent daily practice, mock interviews, and
                                solving coding problems will steadily increase
                                your interview confidence and overall score.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ImprovementCard;