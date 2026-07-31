// File: src/components/dashboard/QuickActions.jsx

import { useNavigate } from "react-router-dom";
import {
    FileText,
    Mic,
    Code2,
    BarChart3,
    ArrowRight,
} from "lucide-react";

function QuickActions() {
    const navigate = useNavigate();

    const actions = [
        {
            title: "Analyze Resume",
            description:
                "Upload your resume and receive an AI-powered ATS analysis.",
            icon: FileText,
            color: "from-blue-500 to-cyan-500",
            path: "/resume-analyzer",
        },
        {
            title: "Mock Interview",
            description:
                "Practice with AI-generated interview questions and feedback.",
            icon: Mic,
            color: "from-violet-500 to-fuchsia-500",
            path: "/mock-interview",
        },
        {
            title: "Coding Round",
            description:
                "Solve coding challenges to prepare for technical interviews.",
            icon: Code2,
            color: "from-orange-500 to-red-500",
            path: "/coding-round",
        },
        {
            title: "View Analytics",
            description:
                "Track your interview progress and overall performance.",
            icon: BarChart3,
            color: "from-emerald-500 to-green-500",
            path: "/analytics",
        },
    ];

    return (
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Quick Actions
                </h2>

                <p className="mt-1 text-slate-400">
                    Jump directly to the most important features.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <button
                            key={action.title}
                            onClick={() => navigate(action.path)}
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                border-slate-800
                                bg-slate-900
                                p-6
                                text-left
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-slate-700
                                hover:shadow-xl
                                hover:shadow-blue-500/10
                            "
                        >
                            {/* Background Glow */}
                            <div
                                className={`
                                    absolute
                                    -top-10
                                    -right-10
                                    h-32
                                    w-32
                                    rounded-full
                                    bg-gradient-to-r
                                    ${action.color}
                                    opacity-10
                                    blur-3xl
                                    transition-all
                                    duration-500
                                    group-hover:opacity-20
                                `}
                            />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div
                                    className={`
                                        mb-6
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-gradient-to-r
                                        ${action.color}
                                        shadow-lg
                                        transition-transform
                                        duration-300
                                        group-hover:scale-110
                                        group-hover:rotate-6
                                    `}
                                >
                                    <Icon
                                        size={26}
                                        className="text-white"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-white">
                                    {action.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-3 text-sm leading-6 text-slate-400">
                                    {action.description}
                                </p>

                                {/* Footer */}
                                <div className="mt-6 flex items-center gap-2 font-medium text-blue-400 transition-all duration-300 group-hover:gap-3">
                                    Get Started
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default QuickActions;