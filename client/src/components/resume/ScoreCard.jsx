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

        <GlassCard className="p-8">

            <motion.div
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
            >

                <h2 className="text-xl text-slate-300 mb-8">

                    {title}

                </h2>

                <div className="w-40 h-40 mx-auto">

                    <CircularProgressbar

                        value={score}

                        text={`${score}%`}

                        styles={{
                            path:{
                                stroke:getColor(),
                                strokeLinecap:"round",
                            },
                            text:{
                                fill:"#fff",
                                fontSize:"18px",
                                fontWeight:"bold",
                            },
                            trail:{
                                stroke:"#1e293b",
                            },
                        }}

                    />

                </div>

                <p
                    className="text-center mt-6 font-semibold"
                    style={{color:getColor()}}
                >

                    {getStatus()}

                </p>

            </motion.div>

        </GlassCard>

    );
}

export default ScoreCard;