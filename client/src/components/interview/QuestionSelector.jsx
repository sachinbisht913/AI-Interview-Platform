const values = [5, 10, 15];

function QuestionSelector({

    questions,
    setQuestions,

}) {

    return (

        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            <h2 className="text-2xl font-bold text-white mb-6">

                Number of Questions

            </h2>

            <div className="flex gap-5">

                {

                    values.map((value) => (

                        <button

                            key={value}

                            onClick={() => setQuestions(value)}

                            className={`
                                px-8
                                py-4
                                rounded-2xl
                                font-semibold
                                transition
                                ${
                                    questions === value
                                        ? "bg-purple-600 text-white"
                                        : "bg-slate-800 text-slate-300"
                                }
                            `}

                        >

                            {value}

                        </button>

                    ))

                }

            </div>

        </div>

    );

}

export default QuestionSelector;