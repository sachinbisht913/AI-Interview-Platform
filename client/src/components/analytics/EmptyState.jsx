// File: src/components/analytics/EmptyState.jsx

function EmptyState() {
    return (
        <div
            className="
                empty-state
                min-h-screen
                flex
                flex-col
                items-center
                justify-center
                px-6
                text-center

                bg-slate-950
                text-white

                transition-colors
                duration-300
            "
        >

            <h1
                className="
                    empty-state-title
                    text-3xl
                    font-bold

                    sm:text-4xl
                "
            >
                No Analytics Yet
            </h1>

            <p
                className="
                    empty-state-description
                    mt-3
                    max-w-md
                    text-sm
                    leading-6

                    sm:mt-4
                    sm:text-base
                    sm:leading-7
                "
            >
                Complete your first interview to unlock analytics.
            </p>

        </div>
    );
}

export default EmptyState;