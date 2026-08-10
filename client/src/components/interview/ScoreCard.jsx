import {
    TrendingUp,
    TrendingDown,
    Minus,
} from "lucide-react";

function ScoreCard({
    title,
    score = 0,
    subtitle,
    color = "blue",
}) {

    const colorClasses = {

        blue: {
            ring: "ring-blue-500/20",
            bg: "from-blue-500/10 to-blue-600/5",
            text: "text-blue-400",
            progress: "from-blue-500 to-cyan-400",
        },

        emerald: {
            ring: "ring-emerald-500/20",
            bg: "from-emerald-500/10 to-emerald-600/5",
            text: "text-emerald-400",
            progress: "from-emerald-500 to-green-400",
        },

        violet: {
            ring: "ring-violet-500/20",
            bg: "from-violet-500/10 to-violet-600/5",
            text: "text-violet-400",
            progress: "from-violet-500 to-fuchsia-400",
        },

        amber: {
            ring: "ring-amber-500/20",
            bg: "from-amber-500/10 to-amber-600/5",
            text: "text-amber-400",
            progress: "from-amber-500 to-yellow-400",
        },

        red: {
            ring: "ring-red-500/20",
            bg: "from-red-500/10 to-red-600/5",
            text: "text-red-400",
            progress: "from-red-500 to-rose-400",
        },

    };


    const theme =
        colorClasses[color] || colorClasses.blue;


    const getStatus = () => {

        if (score >= 85) {

            return {
                text: "Excellent",
                icon: TrendingUp,
                color: "text-emerald-400",
            };

        }

        if (score >= 70) {

            return {
                text: "Good",
                icon: Minus,
                color: "text-amber-400",
            };

        }

        return {
            text: "Needs Improvement",
            icon: TrendingDown,
            color: "text-red-400",
        };

    };


    const status = getStatus();

    const StatusIcon = status.icon;


    return (

        <div
            className={`
                interview-score-card
                group
                rounded-3xl
                border
                border-slate-800
                bg-gradient-to-br
                ${theme.bg}
                p-6
                ring-1
                ${theme.ring}
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-slate-700
                hover:shadow-xl
            `}
        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="score-card-label text-sm">
                        {title}
                    </p>

                    <h2
                        className={`
                            mt-2
                            text-4xl
                            font-bold
                            ${theme.text}
                        `}
                    >
                        {score}%
                    </h2>

                </div>


                {/* Status Icon */}

                <div
                    className="
                        score-card-icon
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-slate-800
                    "
                >

                    <StatusIcon
                        size={22}
                        className={status.color}
                    />

                </div>

            </div>


            {/* Progress */}

            <div className="mt-6">

                <div
                    className="
                        mb-2
                        flex
                        items-center
                        justify-between
                        text-sm
                    "
                >

                    <span className="score-card-progress-label">
                        Progress
                    </span>

                    <span className={status.color}>
                        {status.text}
                    </span>

                </div>


                <div
                    className="
                        score-card-progress-track
                        h-3
                        overflow-hidden
                        rounded-full
                        bg-slate-800
                    "
                >

                    <div
                        className={`
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            ${theme.progress}
                            transition-all
                            duration-700
                        `}
                        style={{
                            width: `${score}%`,
                        }}
                    />

                </div>

            </div>


            {/* Footer */}

            {subtitle && (

                <p className="score-card-subtitle mt-5 text-sm leading-6">
                    {subtitle}
                </p>

            )}

        </div>

    );
}

export default ScoreCard;