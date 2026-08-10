// File: src/components/resume/UploadArea.jsx

import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

function UploadArea({ file, setFile }) {

    return (

        <motion.label
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
                resume-upload-area
                flex
                cursor-pointer
                flex-col
                items-center
                rounded-3xl
                border-2
                border-dashed
                border-slate-700
                bg-gradient-to-br
                from-slate-800
                to-slate-900
                p-8
                text-center
                shadow-2xl
                transition

                hover:border-blue-500

                sm:p-12

                lg:p-16
            "
        >

            {/* Upload Icon */}

            <UploadCloud
                className="
                    resume-upload-icon
                    text-blue-400
                "
                size={48}
            />


            {/* Heading */}

            <h2
                className="
                    resume-upload-title
                    mt-5
                    text-xl
                    font-semibold
                    text-white

                    sm:mt-6
                    sm:text-2xl
                "
            >
                Drag & Drop Resume
            </h2>


            {/* Description */}

            <p
                className="
                    resume-upload-description
                    mt-2
                    text-sm
                    text-slate-400

                    sm:text-base
                "
            >
                or click to browse PDF
            </p>


            {/* File Input */}

            <input
                hidden
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
            />


            {/* Selected File */}

            {file && (

                <div
                    className="
                        resume-selected-file
                        mt-6
                        max-w-full
                        truncate
                        rounded-lg
                        bg-slate-700
                        px-4
                        py-3
                        text-sm
                        text-green-400

                        sm:mt-8
                        sm:px-5
                        sm:text-base
                    "
                >
                    {file.name}
                </div>

            )}

        </motion.label>

    );
}

export default UploadArea;