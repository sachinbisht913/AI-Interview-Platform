import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function UploadButton({ loading, onClick }) {

    return (

        <motion.button

            whileHover={{
                scale: 1.03,
            }}

            whileTap={{
                scale: .98,
            }}

            disabled={loading}

            onClick={onClick}

            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-2xl text-white font-semibold text-lg mt-10 shadow-xl"

        >

            <div className="flex justify-center gap-3">

                <Sparkles />

                {

                    loading

                        ?

                        "AI is analyzing..."

                        :

                        "Analyze Resume"

                }

            </div>

        </motion.button>

    );

}

export default UploadButton;