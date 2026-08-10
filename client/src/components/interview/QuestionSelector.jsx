// File: src/components/interview/QuestionSelector.jsx

const values = [5, 10, 15];

function QuestionSelector({
    questions,
    setQuestions,
}) {

    return (

        <div
            className="
                question-selector-card
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
                    question-selector-title
                    mb-5
                    text-xl
                    font-bold

                    sm:text-2xl
                "
            >
                Number of Questions
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

                {values.map((value) => {

                    const selected = questions === value;

                    return (

                        <button
                            key={value}
                            type="button"
                            onClick={() => setQuestions(value)}
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
                                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                                        : "question-option"
                                }
                            `}
                        >
                            {value}
                        </button>

                    );

                })}

            </div>

        </div>

    );
}

export default QuestionSelector;