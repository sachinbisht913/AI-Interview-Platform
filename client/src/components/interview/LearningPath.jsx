function LearningPath({ topics }) {

    return (

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">

            <h2 className="text-2xl text-yellow-400 font-bold mb-6">

                Recommended Learning

            </h2>

            <div className="flex flex-wrap gap-4">

                {

                    topics.map((topic,index)=>(

                        <span

                            key={index}

                            className="bg-purple-600 px-5 py-2 rounded-full"

                        >

                            {topic}

                        </span>

                    ))

                }

            </div>

        </div>

    );

}

export default LearningPath;