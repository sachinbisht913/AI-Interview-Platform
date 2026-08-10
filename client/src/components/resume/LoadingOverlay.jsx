// File: src/components/resume/LoadingOverlay.jsx

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { ClipLoader } from "react-spinners";

function LoadingOverlay() {

    return (

        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="
                flex
                min-h-[60vh]
                items-center
                justify-center
                px-4
            "
        >

            <motion.div
                className="
                    resume-loading-card
                    w-full
                    max-w-[500px]
                    rounded-3xl
                    bg-slate-900
                    p-6
                    text-center
                    shadow-2xl

                    sm:p-8

                    lg:p-10
                "
            >

                {/* Brain Animation */}

                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "linear",
                    }}
                    className="
                        mx-auto
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-500
                        to-violet-600
                    "
                >

                    <BrainCircuit
                        size={32}
                        className="text-white"
                    />

                </motion.div>


                {/* Heading */}

                <h1
                    className="
                        resume-loading-title
                        mt-5
                        text-2xl
                        font-bold
                        text-white

                        sm:mt-6
                        sm:text-3xl
                    "
                >
                    AI is analyzing...
                </h1>


                {/* Description */}

                <p
                    className="
                        resume-loading-description
                        mx-auto
                        mt-3
                        max-w-sm
                        text-sm
                        leading-6
                        text-slate-400

                        sm:text-base
                    "
                >
                    Please wait while analyzes your resume.
                </p>


                {/* Spinner */}

                <div className="mt-6 sm:mt-8">

                    <ClipLoader
                        color="#3B82F6"
                        size={40}
                    />

                </div>

            </motion.div>

        </motion.div>

    );
}

export default LoadingOverlay;