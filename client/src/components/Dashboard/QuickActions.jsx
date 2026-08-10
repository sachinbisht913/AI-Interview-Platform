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

        <section className="quick-actions space-y-6">

            {/* Header */}

            <div>

                <h2
                    className="
                        quick-actions-title
                        text-xl
                        font-bold
                        text-white

                        sm:text-2xl
                    "
                >
                    Quick Actions
                </h2>


                <p
                    className="
                        quick-actions-description
                        mt-2
                        text-sm
                        text-slate-400

                        sm:text-base
                    "
                >
                    Jump directly to the most important features.
                </p>

            </div>


            {/* Action Cards */}

            <div
                className="
                    grid
                    grid-cols-1
                    gap-5

                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <button
                            key={action.title}
                            onClick={() => navigate(action.path)}
                            className="
                                quick-action-card
                                group
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                border-slate-800
                                bg-slate-900
                                p-5
                                text-left
                                transition-all
                                duration-300

                                hover:-translate-y-1
                                hover:border-slate-700
                                hover:shadow-xl

                                sm:p-6
                            "
                        >

                            {/* Background Glow */}

                            <div
                                className={`
                                    absolute
                                    -top-10
                                    -right-10
                                    h-28
                                    w-28
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
                                        mb-5
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-gradient-to-r
                                        ${action.color}
                                        shadow-lg
                                        transition-transform
                                        duration-300

                                        group-hover:scale-110

                                        sm:h-14
                                        sm:w-14
                                    `}
                                >

                                    <Icon
                                        size={22}
                                        className="text-white"
                                    />

                                </div>


                                {/* Title */}

                                <h3
                                    className="
                                        quick-action-title
                                        text-lg
                                        font-semibold
                                        text-white
                                    "
                                >
                                    {action.title}
                                </h3>


                                {/* Description */}

                                <p
                                    className="
                                        quick-action-description
                                        mt-3
                                        text-sm
                                        leading-6
                                        text-slate-400
                                    "
                                >
                                    {action.description}
                                </p>


                                {/* Footer */}

                                <div
                                    className="
                                        mt-6
                                        inline-flex
                                        items-center
                                        gap-2
                                        text-sm
                                        font-medium
                                        text-blue-400
                                        transition-all
                                        duration-300

                                        group-hover:gap-3
                                    "
                                >
                                    Get Started

                                    <ArrowRight size={16} />

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