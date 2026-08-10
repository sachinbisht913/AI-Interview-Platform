// File: src/components/history/HistoryHeader.jsx

import { History } from "lucide-react";

function HistoryHeader() {

    return (

        <section
            className="
                history-header
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-5

                sm:p-6

                lg:p-8

                transition-colors
                duration-300
            "
        >

            {/* Background Glow */}

            <div
                className="
                    absolute
                    -right-16
                    -top-16
                    h-44
                    w-44
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
                    flex-col
                    items-start
                    gap-5

                    sm:flex-row
                    sm:items-center
                "
            >

                {/* Icon */}

                <div
                    className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-500
                        to-violet-600

                        sm:h-16
                        sm:w-16
                    "
                >

                    <History
                        className="text-white"
                        size={26}
                    />

                </div>


                {/* Content */}

                <div className="min-w-0">

                    <h1
                        className="
                            history-header-title
                            text-3xl
                            font-bold
                            leading-tight

                            sm:text-4xl
                        "
                    >
                        Interview History
                    </h1>


                    <p
                        className="
                            history-header-description
                            mt-2
                            max-w-3xl
                            text-sm
                            leading-6

                            sm:text-base
                            sm:leading-7
                        "
                    >
                        Review every mock interview you've completed,
                        revisit AI feedback, and track your improvement.
                    </p>

                </div>

            </div>

        </section>

    );
}

export default HistoryHeader;