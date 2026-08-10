// File: src/components/dashboard/StatCard.jsx

function StatCard({
    title,
    value,
    change,
    icon: Icon,
    iconColor = "text-blue-400",
    changeColor = "text-emerald-400",
}) {

    return (

        <div
            className="
                stat-card
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-5
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
                className="
                    absolute
                    -right-8
                    -top-8
                    h-28
                    w-28
                    rounded-full
                    bg-blue-500/5
                    blur-3xl
                "
            />


            <div
                className="
                    relative
                    z-10
                    flex
                    items-start
                    justify-between
                    gap-4
                "
            >

                {/* Left */}

                <div className="min-w-0 flex-1">

                    <p
                        className="
                            stat-card-title
                            text-xs
                            font-medium
                            text-slate-400

                            sm:text-sm
                        "
                    >
                        {title}
                    </p>


                    <h2
                        className="
                            stat-card-value
                            mt-3
                            break-words
                            text-2xl
                            font-bold
                            text-white

                            sm:text-3xl
                        "
                    >
                        {value}
                    </h2>


                    {change && (

                        <p
                            className={`
                                mt-2
                                text-xs
                                font-medium
                                sm:text-sm
                                ${changeColor}
                            `}
                        >
                            {change}
                        </p>

                    )}

                </div>


                {/* Icon */}

                <div
                    className="
                        stat-card-icon
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-slate-800
                        transition-all
                        duration-300
                        group-hover:scale-110
                    "
                >

                    <Icon
                        size={22}
                        className={iconColor}
                    />

                </div>

            </div>

        </div>

    );
}

export default StatCard;