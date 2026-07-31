// File: src/components/dashboard/WelcomeCard.jsx

import { useSelector } from "react-redux";
import { Sparkles, TrendingUp } from "lucide-react";

function WelcomeCard() {
    const { user } = useSelector((state) => state.auth);

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-8">
            {/* Background Decorations */}
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                {/* Left Content */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
                        <Sparkles size={16} className="text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">
                            AI Interview Platform
                        </span>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-white lg:text-4xl">
                            {getGreeting()},
                            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                                {" "}
                                {user?.fullName?.split(" ")[0] || "User"}
                            </span>{" "}
                            👋
                        </h1>

                        <p className="mt-3 max-w-2xl text-slate-400">
                            Welcome back! Continue your interview preparation,
                            improve your skills, and move one step closer to
                            landing your dream job.
                        </p>
                    </div>
                </div>

                {/* Right Stats */}
                <div className="flex gap-4">
                    <div className="min-w-[150px] rounded-2xl border border-slate-700 bg-slate-800/60 p-5 backdrop-blur-sm">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm text-slate-400">
                                Progress
                            </span>

                            <TrendingUp
                                size={18}
                                className="text-emerald-400"
                            />
                        </div>

                        <h2 className="text-3xl font-bold text-white">84%</h2>

                        <p className="mt-2 text-sm text-emerald-400">
                            +12% this month
                        </p>
                    </div>

                    <div className="min-w-[150px] rounded-2xl border border-slate-700 bg-slate-800/60 p-5 backdrop-blur-sm">
                        <p className="text-sm text-slate-400">
                            Interview Streak
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-white">
                            7 Days
                        </h2>

                        <p className="mt-2 text-sm text-blue-400">
                            Keep it going 🚀
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomeCard;