import { motion } from "framer-motion";

import {
    BookOpen,
    User,
    Sparkles,
    Award,
} from "lucide-react";

function QuestionFeedback({ item }) {

    return (

        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className="
                question-feedback
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-5

                sm:p-6

                lg:p-8
            "
        >

            {/* Header */}

            <div
                className="
                    flex
                    flex-col
                    gap-6

                    lg:flex-row
                    lg:items-start
                    lg:justify-between
                "
            >

                {/* Question */}

                <div className="min-w-0 flex-1">

                    <span
                        className="
                            inline-flex
                            max-w-full
                            rounded-full
                            bg-blue-500/10
                            px-3
                            py-1
                            text-xs
                            text-blue-400

                            sm:text-sm
                        "
                    >
                        {item.topic}
                    </span>


                    <h2
                        className="
                            question-feedback-title
                            mt-4
                            break-words
                            text-xl
                            font-bold
                            leading-8

                            sm:text-2xl
                            sm:leading-9

                            lg:text-3xl
                            lg:leading-10
                        "
                    >
                        {item.question}
                    </h2>

                </div>


                {/* Score */}

                <div
                    className="
                        flex
                        w-full
                        shrink-0
                        items-center
                        gap-4
                        rounded-2xl
                        bg-blue-600
                        px-5
                        py-4

                        sm:w-auto
                        sm:min-w-[130px]
                        sm:flex-col
                        sm:justify-center
                        sm:text-center
                    "
                >

                    <Award
                        size={24}
                        className="text-white sm:mx-auto"
                    />

                    <h3
                        className="
                            text-2xl
                            font-bold
                            text-white

                            sm:text-3xl
                        "
                    >
                        {item.evaluation.score}/10
                    </h3>

                </div>

            </div>


            {/* Expected Answer */}

            <div className="mt-8 sm:mt-10">

                <div className="flex items-center gap-3">

                    <BookOpen
                        size={21}
                        className="shrink-0 text-green-400"
                    />

                    <h3
                        className="
                            question-feedback-heading
                            text-base
                            font-semibold

                            sm:text-lg
                        "
                    >
                        Expected Answer
                    </h3>

                </div>


                <p
                    className="
                        question-feedback-body
                        mt-4
                        break-words
                        text-sm
                        leading-7

                        sm:text-base
                        sm:leading-8
                    "
                >
                    {item.expected_answer}
                </p>

            </div>


            {/* User Answer */}

            <div className="mt-8 sm:mt-10">

                <div className="flex items-center gap-3">

                    <User
                        size={21}
                        className="shrink-0 text-blue-400"
                    />

                    <h3
                        className="
                            question-feedback-heading
                            text-base
                            font-semibold

                            sm:text-lg
                        "
                    >
                        Your Answer
                    </h3>

                </div>


                <p
                    className="
                        question-feedback-body
                        mt-4
                        break-words
                        whitespace-pre-wrap
                        text-sm
                        leading-7

                        sm:text-base
                        sm:leading-8
                    "
                >
                    {item.user_answer}
                </p>

            </div>


            {/* AI Feedback */}

            <div className="mt-8 sm:mt-10">

                <div className="flex items-center gap-3">

                    <Sparkles
                        size={21}
                        className="shrink-0 text-yellow-400"
                    />

                    <h3
                        className="
                            question-feedback-heading
                            text-base
                            font-semibold

                            sm:text-lg
                        "
                    >
                        AI Feedback
                    </h3>

                </div>


                <div
                    className="
                        question-feedback-ai
                        mt-4
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-950/50
                        p-4

                        sm:p-5
                    "
                >

                    <p
                        className="
                            question-feedback-body
                            text-sm
                            leading-7

                            sm:text-base
                            sm:leading-8
                        "
                    >
                        {item.evaluation.feedback}
                    </p>

                </div>

            </div>

        </motion.div>

    );
}

export default QuestionFeedback;