import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

function OverallScore({ score }) {

    const color =

        score >= 80

            ? "text-green-400"

            : score >= 60

            ? "text-yellow-400"

            : "text-red-400";

    return (

        <motion.div

            initial={{

                opacity:0,

                y:-30

            }}

            animate={{

                opacity:1,

                y:0

            }}

            className="bg-slate-900 rounded-3xl border border-slate-800 p-10"

        >

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        Interview Report

                    </h1>

                    <p className="text-slate-400 mt-2">

                        AI Generated Performance Analysis

                    </p>

                </div>

                <Trophy

                    className="text-yellow-400"

                    size={48}

                />

            </div>

            <div className="flex justify-center mt-12">

                <div

                    className="w-56 h-56 rounded-full border-[10px] border-blue-500 flex flex-col items-center justify-center"

                >

                    <h2 className={`text-7xl font-black ${color}`}>

                        {score}

                    </h2>

                    <span className="text-slate-400 mt-2">

                        Overall Score

                    </span>

                </div>

            </div>

        </motion.div>

    );

}

export default OverallScore;