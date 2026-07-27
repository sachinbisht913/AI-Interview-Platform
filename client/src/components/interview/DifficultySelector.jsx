const levels = [

    "Easy",
    "Medium",
    "Hard"

];

function DifficultySelector({

    difficulty,
    setDifficulty,

}) {

    return (

        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            <h2 className="text-2xl font-bold text-white mb-6">

                Difficulty

            </h2>

            <div className="flex gap-5">

                {

                    levels.map((level) => (

                        <button

                            key={level}

                            onClick={() => setDifficulty(level)}

                            className={`
                                px-8
                                py-4
                                rounded-2xl
                                font-semibold
                                transition
                                ${
                                    difficulty === level
                                        ? "bg-green-600 text-white"
                                        : "bg-slate-800 text-slate-300"
                                }
                            `}

                        >

                            {level}

                        </button>

                    ))

                }

            </div>

        </div>

    );

}

export default DifficultySelector;