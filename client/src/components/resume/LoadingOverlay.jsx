import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { ClipLoader } from "react-spinners";

function LoadingOverlay() {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

            <motion.div
                initial={{ scale: .8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-900 rounded-3xl p-10 w-[500px] text-center shadow-2xl"
            >

                <motion.div
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "linear"
                    }}
                >
                    <BrainCircuit
                        size={70}
                        className="mx-auto text-blue-500"
                    />
                </motion.div>

                <h1 className="text-3xl font-bold text-white mt-6">
                    AI is analyzing...
                </h1>

                <p className="text-slate-400 mt-3">
                    Please wait while AI analyzes your resume.
                </p>

                <div className="mt-8">
                    <ClipLoader
                        color="#3B82F6"
                        size={45}
                    />
                </div>

            </motion.div>

        </div>
    );
}

export default LoadingOverlay;