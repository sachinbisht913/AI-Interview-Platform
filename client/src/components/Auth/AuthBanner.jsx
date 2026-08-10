// File: src/components/Auth/AuthBanner.jsx

import { motion } from "framer-motion";

import {
    Bot,
    FileSearch,
    Sparkles,
    ChartNoAxesCombined,
    CheckCircle2,
} from "lucide-react";

function AuthBanner() {
    const features = [
        {
            icon: Bot,
            title: "Mock Technical Interviews",
            description: "Practice with AI-generated interview questions.",
        },
        {
            icon: FileSearch,
            title: "AI Resume Analyzer",
            description: "Get intelligent feedback on your resume.",
        },
        {
            icon: Sparkles,
            title: "Instant AI Feedback",
            description: "Understand your strengths and improvement areas.",
        },
        {
            icon: ChartNoAxesCombined,
            title: "Performance Analytics",
            description: "Track your progress across multiple interviews.",
        },
    ];

    return (
        <div
            className="
                relative
                flex
                h-full
                w-full
                items-center
                justify-center
                overflow-hidden
                bg-gradient-to-br
                from-blue-600
                via-blue-700
                to-violet-700
                px-8
                py-12
                text-white
                lg:px-12
                xl:px-16
            "
        >

            {/* Background Decorations */}

            <motion.div
                animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    -right-20
                    -top-20
                    h-64
                    w-64
                    rounded-full
                    bg-white/10
                    blur-3xl
                "
            />

            <motion.div
                animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    -bottom-24
                    -left-20
                    h-72
                    w-72
                    rounded-full
                    bg-violet-400/20
                    blur-3xl
                "
            />

            {/* Content */}

            <div className="relative z-10 w-full max-w-xl">

                {/* AI Badge */}

                

                {/* Heading */}

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.1,
                        duration: 0.6,
                    }}
                    className="
                        text-3xl
                        font-bold
                        leading-tight
                        sm:text-4xl
                        lg:text-5xl
                    "
                >
                    AI Interview
                    <span className="block text-blue-100">
                        Platform
                    </span>
                </motion.h1>

                {/* Description */}

                <motion.p
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.2,
                        duration: 0.6,
                    }}
                    className="
                        mb-8
                        mt-4
                        max-w-lg
                        text-base
                        leading-7
                        text-blue-50
                        sm:mb-10
                        sm:mt-5
                        sm:text-lg
                        sm:leading-8
                    "
                >
                    Prepare smarter with AI-powered interviews,
                    intelligent resume analysis, and personalized
                    feedback designed to help you succeed.
                </motion.p>

                {/* Features */}

                <div className="space-y-3 sm:space-y-4">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    delay: 0.3 + index * 0.1,
                                    duration: 0.5,
                                }}
                                whileHover={{
                                    x: 6,
                                }}
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-4
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-white/10
                                    p-3
                                    backdrop-blur-sm
                                    transition-colors
                                    hover:bg-white/15
                                "
                            >

                                {/* Icon */}

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-white/15
                                        transition
                                        group-hover:bg-white/20
                                    "
                                >
                                    <Icon
                                        size={21}
                                        className="text-white"
                                    />
                                </div>

                                {/* Text */}

                                <div className="min-w-0">

                                    <div className="flex items-center gap-2">

                                        <h3 className="
                                            text-sm
                                            font-semibold
                                            text-white
                                            sm:text-base
                                        ">
                                            {feature.title}
                                        </h3>

                                        <CheckCircle2
                                            size={15}
                                            className="shrink-0 text-blue-200"
                                        />

                                    </div>

                                    <p className="
                                        mt-1
                                        text-xs
                                        leading-5
                                        text-blue-100/80
                                        sm:text-sm
                                    ">
                                        {feature.description}
                                    </p>

                                </div>

                            </motion.div>
                        );
                    })}

                </div>

                {/* Bottom AI Indicator */}

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.9,
                    }}
                    className="
                        mt-8
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-blue-100
                    "
                >
                    <span className="
                        h-2
                        w-2
                        animate-pulse
                        rounded-full
                        bg-emerald-300
                    " />

                    AI system ready to help you prepare
                </motion.div>

            </div>
        </div>
    );
}

export default AuthBanner;