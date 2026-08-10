// File: src/components/resume/QuestionCard.jsx

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import GlassCard from "../common/GlassCard";

function QuestionCard({ question }) {

    const [open, setOpen] = useState(false);

    return (

        <GlassCard className="overflow-hidden">

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    p-4
                    text-left

                    sm:p-5
                "
            >

                <span
                    className="
                        resume-question-text
                        min-w-0
                        break-words
                        text-sm
                        font-medium
                        leading-6
                        text-white

                        sm:text-base
                        sm:leading-7
                    "
                >
                    {question}
                </span>


                <motion.div
                    animate={{
                        rotate: open ? 180 : 0,
                    }}
                    className="shrink-0"
                >

                    <ChevronDown
                        size={20}
                        className="
                            resume-question-icon
                            text-slate-400

                            sm:h-6
                            sm:w-6
                        "
                    />

                </motion.div>

            </button>


            {open && (

                <motion.div
                    initial={{
                        height: 0,
                        opacity: 0,
                    }}
                    animate={{
                        height: "auto",
                        opacity: 1,
                    }}
                    exit={{
                        height: 0,
                    }}
                    className="
                        resume-question-answer
                        px-4
                        pb-4
                        text-sm
                        leading-6
                        text-slate-400

                        sm:px-5
                        sm:pb-5
                        sm:text-base
                        sm:leading-7
                    "
                >
                    Think about how you would answer this question during
                    your interview.
                </motion.div>

            )}

        </GlassCard>

    );
}

export default QuestionCard;