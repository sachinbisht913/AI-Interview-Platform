// File: src/components/resume/ScoreCard.jsx

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import GlassCard from "../common/GlassCard";
import { motion } from "framer-motion";

function ScoreCard({ title, score }) {

    const getColor = () => {

        if (score >= 85) return "#22c55e";

        if (score >= 70) return "#3b82f6";

        return "#f59e0b";

    };


    const getStatus = () => {

        if (score >= 85) return "Excellent";

        if (score >= 70) return "Good";

        return "Needs Improvement";

    };


    return (

        <GlassCard className="p-5 sm:p-6 lg:p-8">

            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
            >

                {/* Title */}

                <h2
                    className="
                        score-card-title
                        mb-6
                        text-lg
                        text-slate-300

                        sm:mb-8
                        sm:text-xl
                    "
                >
                    {title}
                </h2>


                {/* Progress */}

                <div
                    className="
                        mx-auto
                        h-32
                        w-32

                        sm:h-36
                        sm:w-36

                        lg:h-40
                        lg:w-40
                    "
                >

                    <CircularProgressbar
                        value={score}
                        text={`${score}%`}
                        styles={{
                            path: {
                                stroke: getColor(),
                                strokeLinecap: "round",
                            },

                            text: {
                                fill: "#fff",
                                fontSize: "18px",
                                fontWeight: "bold",
                            },

                            trail: {
                                stroke: "#1e293b",
                            },
                        }}
                    />

                </div>


                {/* Status */}

                <p
                    className="
                        mt-5
                        text-center
                        text-sm
                        font-semibold

                        sm:mt-6
                        sm:text-base
                    "
                    style={{
                        color: getColor(),
                    }}
                >
                    {getStatus()}
                </p>

            </motion.div>

        </GlassCard>

    );
}

export default ScoreCard;