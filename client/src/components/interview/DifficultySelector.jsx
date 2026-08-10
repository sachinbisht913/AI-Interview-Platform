// File: src/components/interview/DifficultySelector.jsx

const levels = [
    "Easy",
    "Medium",
    "Hard",
];

function DifficultySelector({
    difficulty,
    setDifficulty,
}) {

    return (

        <div
            className="
                difficulty-card
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-5

                sm:p-6

                lg:p-8
            "
        >

            <h2
                className="
                    difficulty-card-title
                    mb-5
                    text-xl
                    font-bold

                    sm:text-2xl
                "
            >
                Difficulty
            </h2>


            <div
                className="
                    grid
                    grid-cols-1
                    gap-3

                    sm:grid-cols-3
                    sm:gap-4
                "
            >

                {levels.map((level) => {

                    const selected = difficulty === level;

                    return (

                        <button
                            key={level}
                            type="button"
                            onClick={() => setDifficulty(level)}
                            className={`
                                min-h-[52px]
                                rounded-2xl
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                transition-all
                                duration-200

                                sm:text-base

                                ${
                                    selected
                                        ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                                        : "difficulty-option"
                                }
                            `}
                        >
                            {level}
                        </button>

                    );

                })}

            </div>

        </div>

    );
}

export default DifficultySelector;