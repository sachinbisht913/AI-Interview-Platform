// File: src/components/dashboard/WelcomeCard.jsx

import { Sparkles, TrendingUp } from "lucide-react";

function WelcomeCard({ user, summary }) {
    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
            ? "Good Afternoon"
            : "Good Evening";

    return (
        <section className="welcome-card relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-5 sm:p-6 lg:p-8">

            {/* Background Glow */}

            <div
                className="
                    absolute
                    -top-16
                    -right-16
                    h-40
                    w-40
                    rounded-full
                    bg-blue-500/10
                    blur-3xl

                    sm:h-52
                    sm:w-52
                "
            />

            <div
                className="
                    absolute
                    -bottom-20
                    -left-16
                    h-44
                    w-44
                    rounded-full
                    bg-violet-500/10
                    blur-3xl

                    sm:h-56
                    sm:w-56
                "
            />


            <div
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    gap-8

                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                "
            >

                {/* Left */}

                <div className="flex-1">

                    {/* Platform Badge */}

                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full

                            border
                            border-blue-500/20
                            bg-blue-500/10

                            px-4
                            py-2
                        "
                    >

                        <Sparkles
                            size={16}
                            className="text-blue-400"
                        />

                        <span
                            className="
                                text-xs
                                font-medium
                                text-blue-300

                                sm:text-sm
                            "
                        >
                            AI Interview Platform
                        </span>

                    </div>


                    {/* Greeting */}

                    <h1
                        className="
                            mt-6
                            text-3xl
                            font-bold
                            leading-tight
                            text-white

                            sm:text-4xl
                            lg:text-5xl

                            light:text-slate-900
                        "
                    >

                        {greeting},

                        <span
                            className="
                                bg-gradient-to-r
                                from-blue-400
                                to-violet-400
                                bg-clip-text
                                text-transparent
                            "
                        >

                            {" "}

                            {user?.fullName?.split(" ")[0] || "User"}

                        </span>

                        👋

                    </h1>


                    {/* Description */}

                    <p
                        className="
                            mt-4
                            max-w-2xl
                            text-sm
                            leading-7
                            text-slate-400

                            sm:text-base

                            light:text-slate-600
                        "
                    >
                        Continue practicing interviews, improve your technical
                        skills, and build confidence. Every interview takes
                        you one step closer to your dream job.
                    </p>

                </div>


                {/* Right */}

                <div
                    className="
                        grid
                        w-full
                        grid-cols-1
                        gap-4

                        sm:grid-cols-2
                        xl:w-auto
                    "
                >

                    {/* Progress */}

                    <div className="welcome-stat-card rounded-2xl border border-slate-700 bg-slate-800/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800">

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <span
                                className="
                                    text-sm
                                    text-slate-400

                                    light:text-slate-500
                                "
                            >
                                Progress
                            </span>

                            <TrendingUp
                                size={18}
                                className="text-emerald-400"
                            />

                        </div>


                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-bold
                                text-white

                                sm:text-4xl

                                light:text-slate-900
                            "
                        >
                            {summary?.progress ?? 0}%
                        </h2>


                        <p
                            className="
                                mt-2
                                text-sm
                                font-medium
                                text-emerald-400
                            "
                        >
                            +{summary?.progressChange ?? 0}% this month
                        </p>

                    </div>


                    {/* Streak */}

                    <div className="welcome-stat-card rounded-2xl border border-slate-700 bg-slate-800/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800">

                        <p
                            className="
                                text-sm
                                text-slate-400

                                light:text-slate-500
                            "
                        >
                            Interview Streak
                        </p>


                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-bold
                                text-white

                                sm:text-4xl

                                light:text-slate-900
                            "
                        >
                            {summary?.streak ?? 0}
                        </h2>


                        <p
                            className="
                                mt-2
                                text-sm
                                text-slate-400

                                light:text-slate-500
                            "
                        >
                            Days
                        </p>


                        <p
                            className="
                                mt-2
                                text-sm
                                font-medium
                                text-blue-400
                            "
                        >
                            Keep it going 🚀
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default WelcomeCard;