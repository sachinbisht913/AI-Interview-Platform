// File: src/components/common/GlassCard.jsx

import { motion } from "framer-motion";

function GlassCard({
    children,
    className = "",
}) {

    return (

        <motion.div
            whileHover={{
                y: -5,
                scale: 1.01,
            }}
            transition={{
                duration: 0.25,
            }}
            className={`
                glass-card
                w-full
                max-w-full
                overflow-hidden
                rounded-3xl
                border
                border-slate-700
                bg-slate-900/70
                shadow-2xl
                backdrop-blur-xl

                ${className}
            `}
        >
            {children}
        </motion.div>

    );
}

export default GlassCard;