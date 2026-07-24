import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import GlassCard from "../common/GlassCard";

function QuestionCard({ question }) {

    const [open, setOpen] = useState(false);

    return (

        <GlassCard className="overflow-hidden">

            <button
                onClick={() => setOpen(!open)}
                className="
                    w-full
                    flex
                    justify-between
                    items-center
                    p-5
                    text-left
                "
            >

                <span className="text-white font-medium">

                    {question}

                </span>

                <motion.div
                    animate={{
                        rotate: open ? 180 : 0,
                    }}
                >

                    <ChevronDown />

                </motion.div>

            </button>

            {open && (

                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0 }}
                    className="px-5 pb-5 text-slate-400"
                >

                    Think about how you would answer this question during your interview.

                </motion.div>

            )}

        </GlassCard>

    );

}

export default QuestionCard;