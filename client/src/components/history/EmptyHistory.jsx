// File: src/components/history/EmptyHistory.jsx

import { History } from "lucide-react";

function EmptyHistory() {
    return (

        <section
            className="
                empty-history
                flex
                min-h-[400px]
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                px-6
                py-12
                text-center

                sm:min-h-[450px]
                sm:px-8
                sm:py-16

                transition-colors
                duration-300
            "
        >

            {/* Icon */}

            <div
                className="
                    empty-history-icon
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-slate-800

                    sm:h-20
                    sm:w-20
                "
            >

                <History
                    size={32}
                    className="empty-history-icon-color sm:h-9 sm:w-9"
                />

            </div>


            {/* Title */}

            <h2
                className="
                    empty-history-title
                    mt-6
                    text-xl
                    font-bold

                    sm:text-2xl
                "
            >
                No Interviews Yet
            </h2>


            {/* Description */}

            <p
                className="
                    empty-history-description
                    mt-3
                    max-w-md
                    text-sm
                    leading-6

                    sm:text-base
                    sm:leading-7
                "
            >
                Complete your first AI mock interview to
                start building your interview history.
            </p>

        </section>

    );
}

export default EmptyHistory;