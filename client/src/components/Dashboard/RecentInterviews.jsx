// File: src/components/dashboard/RecentInterviews.jsx

import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    Code2,
    Database,
    Globe,
    Layers3,
} from "lucide-react";

const iconMap = {
    Frontend: Globe,
    Programming: Code2,
    Database: Database,
    "Core Subject": Layers3,
};

const colorMap = {
    Frontend: "text-blue-400",
    Programming: "text-orange-400",
    Database: "text-violet-400",
    "Core Subject": "text-cyan-400",
};

function RecentInterviews({ interviews = [] }) {

    return (

        <section className="recent-interviews">

            {/* Header */}

            <div
                className="
                    mb-6
                    flex
                    flex-col
                    gap-4

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div>

                    <h2
                        className="
                            recent-interviews-title
                            text-xl
                            font-bold
                            text-white

                            sm:text-2xl
                        "
                    >
                        Recent Interviews
                    </h2>

                    <p
                        className="
                            recent-interviews-description
                            mt-2
                            text-sm
                            text-slate-400

                            sm:text-base
                        "
                    >
                        Your latest interview sessions and results.
                    </p>

                </div>


                <button
                    className="
                        recent-interviews-button
                        inline-flex
                        items-center
                        gap-2
                        self-start
                        rounded-xl
                        border
                        border-slate-700
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-slate-300
                        transition

                        hover:border-blue-500
                        hover:text-white
                    "
                >
                    View All

                    <ArrowRight size={16} />

                </button>

            </div>


            {/* Empty */}

            {interviews.length === 0 ? (

                <div
                    className="
                        recent-interviews-empty
                        flex
                        h-56
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-dashed
                        border-slate-700
                    "
                >

                    <p className="text-slate-500">
                        No interviews found.
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {interviews.map((item) => {

                        const Icon =
                            iconMap[item.category] || Code2;

                        const iconColor =
                            colorMap[item.category] ||
                            "text-blue-400";

                        const interviewDate =
                            item.completedAt
                                ? new Date(
                                      item.completedAt
                                  ).toLocaleDateString(
                                      "en-GB",
                                      {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                      }
                                  )
                                : "--";

                        const completed =
                            item.status === "COMPLETED";


                        return (

                            <div
                                key={item.id}
                                className="
                                    recent-interview-item
                                    group
                                    rounded-2xl
                                    border
                                    border-slate-800
                                    bg-slate-950/60
                                    p-5
                                    transition-all
                                    duration-300

                                    hover:border-slate-700
                                    hover:bg-slate-800/40
                                "
                            >

                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-5

                                        lg:flex-row
                                        lg:items-center
                                        lg:justify-between
                                    "
                                >

                                    {/* Left */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                        "
                                    >

                                        <div
                                            className="
                                                recent-interview-icon
                                                flex
                                                h-12
                                                w-12
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                bg-slate-800
                                            "
                                        >

                                            <Icon
                                                size={22}
                                                className={iconColor}
                                            />

                                        </div>


                                        <div className="min-w-0">

                                            <h3
                                                className="
                                                    recent-interview-title
                                                    truncate
                                                    font-semibold
                                                    text-white
                                                "
                                            >
                                                {item.title}
                                            </h3>


                                            <p
                                                className="
                                                    recent-interview-category
                                                    mt-1
                                                    text-sm
                                                    text-slate-400
                                                "
                                            >
                                                {item.category}
                                            </p>


                                            <p
                                                className="
                                                    recent-interview-date
                                                    mt-2
                                                    text-xs
                                                    text-slate-500
                                                "
                                            >
                                                {interviewDate}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Right */}

                                    <div
                                        className="
                                            flex
                                            flex-wrap
                                            items-center
                                            justify-between
                                            gap-4

                                            lg:justify-end
                                        "
                                    >

                                        <div>

                                            <p
                                                className="
                                                    recent-interview-score-label
                                                    text-sm
                                                    text-slate-400
                                                "
                                            >
                                                Score
                                            </p>


                                            <h3
                                                className="
                                                    recent-interview-score
                                                    mt-1
                                                    text-2xl
                                                    font-bold
                                                    text-white
                                                "
                                            >
                                                {item.score ?? "--"}

                                                {item.score != null &&
                                                    "%"}
                                            </h3>

                                        </div>


                                        {completed ? (

                                            <div
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    rounded-full
                                                    bg-emerald-500/10
                                                    px-3
                                                    py-2
                                                    text-sm
                                                    font-medium
                                                    text-emerald-400
                                                "
                                            >

                                                <CheckCircle2 size={16} />

                                                Completed

                                            </div>

                                        ) : (

                                            <div
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    rounded-full
                                                    bg-amber-500/10
                                                    px-3
                                                    py-2
                                                    text-sm
                                                    font-medium
                                                    text-amber-400
                                                "
                                            >

                                                <Clock3 size={16} />

                                                {item.status}

                                            </div>

                                        )}

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </section>

    );
}

export default RecentInterviews;