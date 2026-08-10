// File: src/components/resume/UploadButton.jsx

import { motion } from "framer-motion";

function UploadButton({ loading, onClick }) {

    return (

        <motion.button
            whileHover={{
                scale: 1.03,
            }}
            whileTap={{
                scale: 0.98,
            }}
            disabled={loading}
            onClick={onClick}
            className="
                resume-upload-button
                mt-8
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                py-3.5
                text-base
                font-semibold
                text-white
                shadow-xl
                transition

                disabled:cursor-not-allowed
                disabled:opacity-60

                sm:mt-10
                sm:py-4
                sm:text-lg
            "
        >

            {loading
                ? "AI is analyzing..."
                : "Analyze Resume"}

        </motion.button>

    );
}

export default UploadButton;