import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

function QuestionFeedback({ item }) {

    return (

        <motion.div

            initial={{

                opacity:0,

                y:20

            }}

            animate={{

                opacity:1,

                y:0

            }}

            className="bg-slate-900 rounded-3xl border border-slate-800 p-8"

        >

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        {item.question}

                    </h2>

                    <p className="text-slate-400 mt-2">

                        {item.topic}

                    </p>

                </div>

                <div className="bg-blue-600 rounded-full px-5 py-3">

                    {item.evaluation.score}/10

                </div>

            </div>

            <div className="mt-8">

                <div className="flex items-center gap-3">

                    <CheckCircle

                        className="text-green-400"

                    />

                    <h3 className="text-xl font-semibold">

                        AI Feedback

                    </h3>

                </div>

                <p className="text-slate-300 mt-4 leading-8">

                    {item.evaluation.feedback}

                </p>

            </div>

        </motion.div>

    );

}

export default QuestionFeedback;