// File: src/components/common/PageHeader.jsx

import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function PageHeader({ title, subtitle }) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
                mb-8
                flex
                flex-col
                gap-6
                sm:mb-10
                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >
            {/* Title */}

            <div className="min-w-0">
                <h1
                    className="
                        break-words
                        text-2xl
                        font-bold
                        text-white
                        sm:text-3xl
                        lg:text-4xl
                    "
                >
                    {title}
                </h1>

                <p
                    className="
                        mt-2
                        max-w-2xl
                        text-sm
                        leading-6
                        text-slate-400
                        sm:text-base
                        sm:leading-7
                    "
                >
                    {subtitle}
                </p>
            </div>

            {/* Actions */}

            <div
                className="
                    flex
                    w-full
                    flex-col
                    gap-3
                    sm:flex-row
                    lg:w-auto
                    lg:shrink-0
                "
            >
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-slate-800
                        px-5
                        py-3
                        text-sm
                        text-white
                        transition
                        hover:bg-slate-700
                        sm:w-auto
                        sm:text-base
                    "
                >
                    <ArrowLeft size={18} />

                    Back
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-5
                        py-3
                        text-sm
                        text-white
                        transition
                        hover:bg-blue-700
                        sm:w-auto
                        sm:text-base
                    "
                >
                    <LayoutDashboard size={18} />

                    Dashboard
                </button>
            </div>
        </motion.div>
    );
}

export default PageHeader;